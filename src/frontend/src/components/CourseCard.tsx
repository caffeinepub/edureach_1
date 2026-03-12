import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import type { Course } from "../backend";
import { CATEGORY_META, formatDuration, formatFee } from "../data/courses";

export default function CourseCard({
  course,
  index,
}: { course: Course; index: number }) {
  const meta = CATEGORY_META[course.category] ?? {
    icon: "📚",
    color: "text-blue-700",
    bg: "bg-blue-50",
  };
  const minFee = course.durationOptions.reduce(
    (min, d) => (d.feeInr < min ? d.feeInr : min),
    course.durationOptions[0]?.feeInr ?? 0n,
  );

  return (
    <Card
      className="flex flex-col hover:shadow-lg transition-shadow border-border"
      data-ocid={`courses.course.item.${index + 1}`}
    >
      <CardHeader className="pb-3">
        <div
          className={`w-12 h-12 rounded-xl ${meta.bg} flex items-center justify-center text-2xl mb-3`}
        >
          {meta.icon}
        </div>
        <CardTitle className="font-display text-lg leading-tight">
          {course.title}
        </CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs capitalize">
            {course.mode}
          </Badge>
          {course.isActive && (
            <Badge className="text-xs bg-green-100 text-green-800 border-green-200">
              Active
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {course.description}
        </p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{course.modules.length} modules</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {course.durationOptions
              .map((d) => formatDuration(d.months))
              .join(" / ")}
          </span>
        </div>
        <div className="text-sm font-semibold text-primary">
          Starting from {formatFee(minFee)}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" asChild className="flex-1">
          <Link to={`/courses/${course.id}`}>View Details</Link>
        </Button>
        <Button
          size="sm"
          asChild
          className="flex-1"
          data-ocid={`courses.enroll_button.${index + 1}`}
        >
          <Link to={`/student/enroll/${course.id}`}>Enroll</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
