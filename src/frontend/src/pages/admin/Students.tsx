import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { SEED_COURSES, formatDuration } from "../../data/courses";
import { useActor } from "../../hooks/useActor";

export default function AdminStudents() {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Student Enrollments</h1>
        <p className="text-sm text-muted-foreground mt-1">
          View and manage all student enrollments.
        </p>
      </div>

      <Card>
        {(enrollments || []).length === 0 ? (
          <div
            className="text-center py-12"
            data-ocid="admin.students.empty_state"
          >
            <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No student enrollments yet.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(enrollments || []).map((enrollment, i) => {
                const course = courses.find(
                  (c) => c.id === enrollment.courseId,
                );
                const shortId = `${enrollment.studentId.toString().slice(0, 12)}...`;
                return (
                  <TableRow
                    key={enrollment.id}
                    data-ocid={`admin.students.item.${i + 1}`}
                  >
                    <TableCell className="font-mono text-xs">
                      {shortId}
                    </TableCell>
                    <TableCell>
                      {course?.title ?? enrollment.courseId}
                    </TableCell>
                    <TableCell>
                      {formatDuration(enrollment.durationMonths)}
                    </TableCell>
                    <TableCell className="capitalize">
                      {enrollment.mode}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          enrollment.status === "active"
                            ? "default"
                            : "secondary"
                        }
                        className="capitalize"
                      >
                        {enrollment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
