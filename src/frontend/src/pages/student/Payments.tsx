import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { CreditCard } from "lucide-react";
import { SEED_COURSES, formatDuration, formatFee } from "../../data/courses";
import { useActor } from "../../hooks/useActor";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

export default function StudentPayments() {
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
        <h1 className="font-display text-2xl font-bold">Payment History</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your enrollment and payment records.
        </p>
      </div>

      {myEnrollments.length === 0 ? (
        <Card
          className="text-center py-12"
          data-ocid="student.payments.empty_state"
        >
          <CardContent>
            <CreditCard className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No payment records found.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myEnrollments.map((enrollment, i) => {
                const course = courses.find(
                  (c) => c.id === enrollment.courseId,
                );
                const option = course?.durationOptions.find(
                  (d) => d.months === enrollment.durationMonths,
                );
                return (
                  <TableRow
                    key={enrollment.id}
                    data-ocid={`student.payments.item.${i + 1}`}
                  >
                    <TableCell className="font-medium">
                      {course?.title ?? enrollment.courseId}
                    </TableCell>
                    <TableCell>
                      {formatDuration(enrollment.durationMonths)}
                    </TableCell>
                    <TableCell className="capitalize">
                      {enrollment.mode}
                    </TableCell>
                    <TableCell>
                      {option ? formatFee(option.feeInr) : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          enrollment.status === "active"
                            ? "default"
                            : enrollment.status === "completed"
                              ? "secondary"
                              : "outline"
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
        </Card>
      )}
    </div>
  );
}
