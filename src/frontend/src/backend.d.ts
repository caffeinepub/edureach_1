import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface Enrollment {
    id: string;
    status: EnrollmentStatus;
    studentId: Principal;
    mode: CourseMode;
    durationMonths: bigint;
    enrolledAt: Time;
    paymentId?: string;
    courseId: string;
}
export interface DurationOption {
    feeInr: bigint;
    months: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Course {
    id: string;
    title: string;
    durationOptions: Array<DurationOption>;
    mode: CourseMode;
    description: string;
    isActive: boolean;
    category: CourseCategory;
    modules: Array<string>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export enum CourseCategory {
    govExam = "govExam",
    singing = "singing",
    computer = "computer",
    english = "english"
}
export enum CourseMode {
    hybrid = "hybrid",
    offline = "offline",
    online = "online"
}
export enum EnrollmentStatus {
    active = "active",
    pending = "pending",
    completed = "completed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createCourse(course: Course): Promise<void>;
    deleteCourse(id: string): Promise<void>;
    deleteEnrollment(id: string): Promise<void>;
    enroll(enrollment: Enrollment): Promise<void>;
    getAllCourses(): Promise<Array<Course>>;
    getAllEnrollments(): Promise<Array<Enrollment>>;
    getCallerUserRole(): Promise<UserRole>;
    getCourse(id: string): Promise<Course>;
    getEnrollment(id: string): Promise<Enrollment>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCourse(updated: Course): Promise<void>;
    updateEnrollment(updated: Enrollment): Promise<void>;
}
