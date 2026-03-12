import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, CreditCard, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { SEED_COURSES } from "../../data/courses";
import { useActor } from "../../hooks/useActor";

export default function AdminDashboard() {
  const { actor } = useActor();
  const { data: enrollments } = useQuery({
    queryKey: ["enrollments"],
    queryFn: () => actor!.getAllEnrollments(),
    enabled: !!actor,
  });
  const { data: backendCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => actor!.getAllCourses(),
    enabled: !!actor,
  });

  const courses =
    backendCourses && backendCourses.length > 0 ? backendCourses : SEED_COURSES;
  const totalEnrollments = (enrollments || []).length;
  const activeEnrollments = (enrollments || []).filter(
    (e) => e.status === "active",
  ).length;
  const uniqueStudents = new Set(
    (enrollments || []).map((e) => e.studentId.toString()),
  ).size;

  const stats = [
    {
      label: "Total Courses",
      value: courses.length,
      icon: BookOpen,
      color: "text-primary",
      link: "/admin/courses",
    },
    {
      label: "Total Students",
      value: uniqueStudents,
      icon: Users,
      color: "text-indigo-600",
      link: "/admin/students",
    },
    {
      label: "Enrollments",
      value: totalEnrollments,
      icon: TrendingUp,
      color: "text-green-600",
      link: "/admin/students",
    },
    {
      label: "Active Courses",
      value: activeEnrollments,
      icon: CreditCard,
      color: "text-amber-600",
      link: "/admin/payments",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Institute overview and management.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} to={stat.link}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-4 pb-4">
                  <div className={`${stat.color} mb-2`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-display text-3xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-base">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/courses">Manage Courses</Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/students">View Students</Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/payments">Track Payments</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-base">
              Recent Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(enrollments || [])
              .slice(-5)
              .reverse()
              .map((e, i) => {
                const course = courses.find((c) => c.id === e.courseId);
                return (
                  <div
                    key={e.id}
                    className="flex items-center justify-between py-2 border-b last:border-0 text-sm"
                    data-ocid={`admin.recent_enrollment.item.${i + 1}`}
                  >
                    <span className="truncate">
                      {course?.title ?? e.courseId}
                    </span>
                    <span className="capitalize text-muted-foreground text-xs ml-2 shrink-0">
                      {e.status}
                    </span>
                  </div>
                );
              })}
            {(enrollments || []).length === 0 && (
              <p className="text-sm text-muted-foreground">
                No enrollments yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
