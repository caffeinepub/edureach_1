import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Award, BookOpen, School, Star, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { SEED_COURSES } from "../data/courses";
import { useActor } from "../hooks/useActor";

const FEATURES = [
  {
    icon: Wifi,
    title: "Live Online Classes",
    desc: "Join live sessions from anywhere with expert instructors in real time.",
  },
  {
    icon: School,
    title: "Offline Coaching",
    desc: "Attend classroom batches with personalized attention and hands-on practice.",
  },
  {
    icon: Award,
    title: "Certifications",
    desc: "Earn recognized certificates upon course completion to boost your career.",
  },
  {
    icon: BookOpen,
    title: "Study Materials",
    desc: "Access downloadable notes, videos, and practice tests anytime.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    course: "English Language",
    rating: 5,
    text: "My communication skills improved drastically. Got placed in a top MNC after completing the 6-month course!",
  },
  {
    name: "Rahul Verma",
    course: "Government Exam Prep",
    rating: 5,
    text: "Cleared SSC CGL in my first attempt. The mock tests and current affairs sessions were incredibly helpful.",
  },
  {
    name: "Anjali Singh",
    course: "Computer & AI Skills",
    rating: 5,
    text: "Went from knowing nothing about computers to building my own spreadsheets and using AI tools for work.",
  },
];

const STATS = [
  { value: "500+", label: "Students Enrolled" },
  { value: "4", label: "Expert Courses" },
  { value: "95%", label: "Success Rate" },
  { value: "10+", label: "Qualified Teachers" },
];

export default function HomePage() {
  const { actor } = useActor();
  const { data: backendCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => actor!.getAllCourses(),
    enabled: !!actor,
  });

  const courses =
    backendCourses && backendCourses.length > 0 ? backendCourses : SEED_COURSES;
  const featuredCourses = courses.slice(0, 4);

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section
        className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden"
        data-ocid="home.hero_section"
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <Badge className="mb-4 bg-accent text-accent-foreground border-none font-medium">
            Online + Offline Coaching
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Learn. Grow. <span className="text-accent">Succeed.</span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join EduReach for expert coaching in English, Computer Skills,
            Singing, and Government Exam Preparation. Online, Offline, and
            Hybrid modes available.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              asChild
              data-ocid="home.enroll_primary_button"
            >
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
              asChild
            >
              <Link to="/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold text-primary">
                {s.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 py-16"
        data-ocid="home.courses_section"
      >
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3">
            Our Programs
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Courses We Offer
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Choose from our carefully designed courses to build skills that
            matter in today's world.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" asChild size="lg">
            <Link to="/courses">View All Courses</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-3">
              Why Choose Us
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Everything You Need to Succeed
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <Card key={f.title} className="text-center p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3">
            Success Stories
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            What Our Students Say
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="p-6">
              <CardContent className="p-0">
                <div
                  className="flex gap-0.5 mb-3"
                  aria-label={`${t.rating} stars`}
                >
                  {[1, 2, 3, 4, 5].slice(0, t.rating).map((n) => (
                    <Star key={n} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.course}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Enroll today and take the first step towards your dream career with
            EduReach.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              asChild
            >
              <Link to="/register">Admission Form</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
