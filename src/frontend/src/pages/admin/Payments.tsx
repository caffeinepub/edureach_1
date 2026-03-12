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
import { CreditCard } from "lucide-react";
import { SEED_COURSES, formatDuration, formatFee } from "../../data/courses";
import { useActor } from "../../hooks/useActor";

export default function AdminPayments() {
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
  const allEnrollments = enrollments || [];
  const totalRevenue = allEnrollments.reduce((sum, e) => {
    const course = courses.find((c) => c.id === e.courseId);
    const opt = course?.durationOptions.find(
      (d) => d.months === e.durationMonths,
    );
    return sum + Number(opt?.feeInr ?? 0n);
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Payments</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track all enrollment payments.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Enrollments", value: allEnrollments.length },
          {
            label: "Active",
            value: allEnrollments.filter((e) => e.status === "active").length,
          },
          {
            label: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString("en-IN")}`,
          },
        ].map((s) => (
          <Card key={s.label}>
            <div className="p-4">
              <div className="text-sm text-muted-foreground">{s.label}</div>
              <div className="font-display text-2xl font-bold mt-1">
                {s.value}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        {allEnrollments.length === 0 ? (
          <div
            className="text-center py-12"
            data-ocid="admin.payments.empty_state"
          >
            <CreditCard className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No payment records yet.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrollment ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allEnrollments.map((enrollment, i) => {
                const course = courses.find(
                  (c) => c.id === enrollment.courseId,
                );
                const opt = course?.durationOptions.find(
                  (d) => d.months === enrollment.durationMonths,
                );
                return (
                  <TableRow
                    key={enrollment.id}
                    data-ocid={`admin.payments.item.${i + 1}`}
                  >
                    <TableCell>
                      {course?.title ?? enrollment.courseId}
                    </TableCell>
                    <TableCell>
                      {formatDuration(enrollment.durationMonths)}
                    </TableCell>
                    <TableCell>{opt ? formatFee(opt.feeInr) : "N/A"}</TableCell>
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
                    <TableCell className="font-mono text-xs">
                      {enrollment.id.slice(0, 16)}...
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
