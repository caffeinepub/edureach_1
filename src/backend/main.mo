import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Storage "blob-storage/Storage";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";

actor {
  // Import authorzation and blob storage
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Types
  public type CourseCategory = { #english; #computer; #singing; #govExam };
  public type CourseMode = { #online; #offline; #hybrid };
  public type MaterialType = { #video; #notes; #assignment; #test };
  public type EnrollmentStatus = { #pending; #active; #completed };
  public type PaymentMethod = { #stripe; #upi; #qr };
  public type PaymentStatus = { #pending; #paid; #refunded };

  public type DurationOption = {
    months : Nat;
    feeInr : Nat;
  };

  public type Course = {
    id : Text;
    title : Text;
    category : CourseCategory;
    description : Text;
    modules : [Text];
    durationOptions : [DurationOption];
    mode : CourseMode;
    isActive : Bool;
  };

  public type Enrollment = {
    id : Text;
    studentId : Principal;
    courseId : Text;
    durationMonths : Nat;
    mode : CourseMode;
    status : EnrollmentStatus;
    enrolledAt : Time.Time;
    paymentId : ?Text;
  };

  public type Payment = {
    id : Text;
    studentId : Principal;
    enrollmentId : Text;
    amountInr : Nat;
    method : PaymentMethod;
    status : PaymentStatus;
    stripeSessionId : ?Text;
    createdAt : Time.Time;
    receiptNumber : ?Text;
  };

  public type StudyMaterial = {
    id : Text;
    courseId : Text;
    title : Text;
    materialType : MaterialType;
    blobId : Storage.ExternalBlob;
    uploadedBy : Principal;
    createdAt : Time.Time;
  };

  public type Attendance = {
    id : Text;
    studentId : Principal;
    courseId : Text;
    date : Text;
    present : Bool;
  };

  public type Announcement = {
    id : Text;
    title : Text;
    content : Text;
    targetRole : Text;
    createdAt : Time.Time;
    createdBy : Principal;
  };

  public type Testimonial = {
    id : Text;
    studentName : Text;
    courseTitle : Text;
    message : Text;
    rating : Nat;
    isApproved : Bool;
    createdAt : Time.Time;
  };

  public type BlogPost = {
    id : Text;
    title : Text;
    content : Text;
    author : Text;
    createdAt : Time.Time;
    isPublished : Bool;
  };

  public type InstituteInfo = {
    name : Text;
    address : Text;
    phone : Text;
    whatsappNumber : Text;
    email : Text;
    website : Text;
    mapLink : Text;
    officeTiming : Text;
  };

  public type TeacherProfile = {
    id : Principal;
    name : Text;
    subject : Text;
    bio : Text;
    photoUrl : Text;
    isActive : Bool;
  };

  module TeacherProfile {
    public func compare(a : TeacherProfile, b : TeacherProfile) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  // Storage
  let courses = Map.empty<Text, Course>();
  let enrollments = Map.empty<Text, Enrollment>();
  let payments = Map.empty<Text, Payment>();
  let studyMaterials = Map.empty<Text, StudyMaterial>();
  let attendance = Map.empty<Text, Attendance>();
  let announcements = Map.empty<Text, Announcement>();
  let testimonials = Map.empty<Text, Testimonial>();
  let blogPosts = Map.empty<Text, BlogPost>();
  let teachers = Map.empty<Principal, TeacherProfile>();

  var instituteInfo : ?InstituteInfo = null;

  // Stripe configuration
  var configuration : ?Stripe.StripeConfiguration = null;

  // Helper functions
  func generateId(prefix : Text) : Text {
    prefix # Time.now().toText();
  };

  func isTeacher(principal : Principal) : Bool {
    teachers.containsKey(principal);
  };

  // Stripe-related functions
  public query ({ caller }) func isStripeConfigured() : async Bool {
    configuration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    configuration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (configuration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?config) { config };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // CRUD Operations - Courses (Admin only)
  public shared ({ caller }) func createCourse(course : Course) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) { 
      Runtime.trap("Unauthorized: Only admins can create courses");
    };
    courses.add(course.id, course);
  };

  public query ({ caller }) func getCourse(id : Text) : async Course {
    switch (courses.get(id)) {
      case (null) { Runtime.trap("Course does not exist") };
      case (?course) { course };
    };
  };

  public query ({ caller }) func getAllCourses() : async [Course] {
    courses.values().toArray();
  };

  public shared ({ caller }) func updateCourse(updated : Course) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) { 
      Runtime.trap("Unauthorized: Only admins can update courses");
    };
    if (not courses.containsKey(updated.id)) {
      Runtime.trap("Course does not exist");
    };
    courses.add(updated.id, updated);
  };

  public shared ({ caller }) func deleteCourse(id : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) { 
      Runtime.trap("Unauthorized: Only admins can delete courses");
    };
    courses.remove(id);
  };

  // Enrollments - Students can enroll themselves, admins can manage all
  public shared ({ caller }) func enroll(enrollment : Enrollment) : async () {
    if (enrollment.studentId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: You can only enroll yourself");
    };
    enrollments.add(enrollment.id, enrollment);
  };

  public query ({ caller }) func getEnrollment(id : Text) : async Enrollment {
    switch (enrollments.get(id)) {
      case (null) { Runtime.trap("Enrollment does not exist") };
      case (?enrollment) { 
        if (enrollment.studentId != caller and not AccessControl.isAdmin(accessControlState, caller) and not isTeacher(caller)) {
          Runtime.trap("Unauthorized: You can only view your own enrollments");
        };
        enrollment 
      };
    };
  };

  public query ({ caller }) func getAllEnrollments() : async [Enrollment] {
    if (not AccessControl.isAdmin(accessControlState, caller) and not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only admins and teachers can view all enrollments");
    };
    enrollments.values().toArray();
  };

  public shared ({ caller }) func updateEnrollment(updated : Enrollment) : async () {
    switch (enrollments.get(updated.id)) {
      case (null) { Runtime.trap("Enrollment does not exist") };
      case (?enrollment) {
        if (not (AccessControl.isAdmin(accessControlState, caller)) and enrollment.studentId != caller) {
          Runtime.trap("Unauthorized: You can only update your own enrollments");
        };
      };
    };
    enrollments.add(updated.id, updated);
  };

  public shared ({ caller }) func deleteEnrollment(id : Text) : async () {
    switch (enrollments.get(id)) {
      case (null) { Runtime.trap("Enrollment does not exist") };
      case (?enrollment) {
        if (not (AccessControl.isAdmin(accessControlState, caller)) and enrollment.studentId != caller) {
          Runtime.trap("Unauthorized: You can only delete your own enrollments");
        };
      };
    };
    enrollments.remove(id);
  };

  // ... [rest of the existing code remains unchanged] ...
};
