import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, CheckCircle, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  CATEGORY_META,
  SEED_COURSES,
  formatDuration,
  formatFee,
} from "../data/courses";
import { useActor } from "../hooks/useActor";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { actor } = useActor();
  const { data: backendCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => actor!.getAllCourses(),
    enabled: !!actor,
  });

  const allCourses =
    backendCourses && backendCourses.length > 0 ? backendCourses : SEED_COURSES;
  const course = allCourses.find((c) => c.id === id);

  if (!course)
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Course not found.</p>
        <Button asChild className="mt-4">
          <Link to="/courses">Back to Courses</Link>
        </Button>
      </div>
    );

  const meta = CATEGORY_META[course.category] ?? {
    icon: "📚",
    color: "text-blue-700",
    bg: "bg-blue-50",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Button variant="ghost" asChild className="mb-6 -ml-2">
        <Link to="/courses">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Courses
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div
              className={`w-14 h-14 rounded-xl ${meta.bg} flex items-center justify-center text-3xl mb-4`}
            >
              {meta.icon}
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">
              {course.title}
            </h1>
            <div className="flex gap-2 flex-wrap mb-4">
              <Badge variant="outline" className="capitalize">
                {course.mode}
              </Badge>
              <Badge className="capitalize bg-green-100 text-green-800 border-green-200">
                {course.category}
              </Badge>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {course.description}
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> Course Modules
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.modules.map((mod) => (
                <li key={mod} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  {mod}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Duration & Fees
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Duration</TableHead>
                  <TableHead>Fee (INR)</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {course.durationOptions.map((d) => (
                  <TableRow key={d.months.toString()}>
                    <TableCell className="font-medium">
                      {formatDuration(d.months)}
                    </TableCell>
                    <TableCell className="font-semibold text-primary">
                      {formatFee(d.feeInr)}
                    </TableCell>
                    <TableCell>
                      <Button size="sm" asChild>
                        <Link to={`/student/enroll/${course.id}`}>Enroll</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="font-display text-lg">Enroll Now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Start your learning journey today with flexible duration
                options.
              </p>
              <Button className="w-full" asChild>
                <Link to={`/student/enroll/${course.id}`}>
                  Enroll in this Course
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/contact">Have Questions?</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Certificate on completion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Study materials included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Expert instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Flexible learning modes</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
