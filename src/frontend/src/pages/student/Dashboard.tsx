import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  Award,
  BookOpen,
  Calendar,
  CreditCard,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEED_COURSES, formatDuration, formatFee } from "../../data/courses";
import { useActor } from "../../hooks/useActor";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

export default function StudentDashboard() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const { data: enrollments } = useQuery({
    queryKey: ["enrollments"],
    queryFn: () => actor!.getAllEnrollments(),
    enabled: !!actor,
  });
  const { data: allCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => actor!.getAllCourses(),
    enabled: !!actor,
  });

  const courses =
    allCourses && allCourses.length > 0 ? allCourses : SEED_COURSES;
  const myEnrollments = (enrollments || []).filter(
    (e) =>
      identity && e.studentId.toString() === identity.getPrincipal().toString(),
  );

  return (
    <div className="space-y-6" data-ocid="student.dashboard.section">
      <div>
        <h1 className="font-display text-2xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back! Here's your learning overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Enrolled Courses",
            value: myEnrollments.length,
            icon: BookOpen,
            color: "text-primary",
          },
          {
            label: "Active Courses",
            value: myEnrollments.filter((e) => e.status === "active").length,
            icon: GraduationCap,
            color: "text-green-600",
          },
          {
            label: "Completed",
            value: myEnrollments.filter((e) => e.status === "completed").length,
            icon: Award,
            color: "text-amber-600",
          },
          {
            label: "Pending Payment",
            value: myEnrollments.filter((e) => e.status === "pending").length,
            icon: CreditCard,
            color: "text-red-600",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-4 pb-4">
                <div className={`${stat.color} mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-display text-2xl font-bold">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* My Enrollments */}
      {myEnrollments.length > 0 ? (
        <div>
          <h2 className="font-display text-lg font-semibold mb-3">
            My Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myEnrollments.map((enrollment, i) => {
              const course = courses.find((c) => c.id === enrollment.courseId);
              return (
                <Card
                  key={enrollment.id}
                  data-ocid={`student.enrollment.item.${i + 1}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base font-semibold">
                        {course?.title ?? enrollment.courseId}
                      </CardTitle>
                      <Badge
                        variant={
                          enrollment.status === "active"
                            ? "default"
                            : enrollment.status === "completed"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs capitalize"
                      >
                        {enrollment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Duration: {formatDuration(enrollment.durationMonths)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span className="capitalize">
                        Mode: {enrollment.mode}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <Card
          className="text-center py-12"
          data-ocid="student.enrollments.empty_state"
        >
          <CardContent>
            <GraduationCap className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-display font-semibold mb-2">No courses yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enroll in a course to start your learning journey
            </p>
            <Button asChild>
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
