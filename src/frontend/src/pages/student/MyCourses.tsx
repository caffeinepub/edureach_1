import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import {
  CATEGORY_META,
  SEED_COURSES,
  formatDuration,
} from "../../data/courses";
import { useActor } from "../../hooks/useActor";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

export default function MyCourses() {
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
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">My Courses</h1>
        <p className="text-sm text-muted-foreground mt-1">
          All your enrolled courses and their status.
        </p>
      </div>

      {myEnrollments.length === 0 ? (
        <Card
          className="text-center py-12"
          data-ocid="student.my_courses.empty_state"
        >
          <CardContent>
            <GraduationCap className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No courses enrolled</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Browse and enroll in a course to get started
            </p>
            <Button asChild>
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {myEnrollments.map((enrollment, i) => {
            const course = courses.find((c) => c.id === enrollment.courseId);
            const meta = CATEGORY_META[course?.category ?? "english"];
            return (
              <Card
                key={enrollment.id}
                data-ocid={`student.my_courses.item.${i + 1}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${meta?.bg} flex items-center justify-center text-xl shrink-0`}
                    >
                      {meta?.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base truncate">
                        {course?.title ?? enrollment.courseId}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className="text-xs capitalize mt-1"
                      >
                        {enrollment.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-sm space-y-1 text-muted-foreground">
                  <div>
                    Duration: {formatDuration(enrollment.durationMonths)}
                  </div>
                  <div className="capitalize">Mode: {enrollment.mode}</div>
                  {course && (
                    <div className="pt-2">
                      <div className="text-xs font-medium text-foreground mb-1">
                        Modules:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {course.modules.slice(0, 3).map((m) => (
                          <Badge
                            key={m}
                            variant="secondary"
                            className="text-xs"
                          >
                            {m}
                          </Badge>
                        ))}
                        {course.modules.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{course.modules.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
