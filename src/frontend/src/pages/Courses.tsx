import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CourseCard from "../components/CourseCard";
import { SEED_COURSES } from "../data/courses";
import { useActor } from "../hooks/useActor";

const CATEGORIES = [
  { value: "all", label: "All Courses" },
  { value: "english", label: "📚 English" },
  { value: "computer", label: "💻 Computer & AI" },
  { value: "singing", label: "🎵 Singing" },
  { value: "govExam", label: "📋 Govt Exams" },
];

const SKELETON_IDS = ["sk1", "sk2", "sk3", "sk4"];

export default function CoursesPage() {
  const [category, setCategory] = useState("all");
  const { actor } = useActor();
  const { data: backendCourses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => actor!.getAllCourses(),
    enabled: !!actor,
  });

  const allCourses =
    backendCourses && backendCourses.length > 0 ? backendCourses : SEED_COURSES;
  const filtered =
    category === "all"
      ? allCourses
      : allCourses.filter((c) => c.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <Badge variant="outline" className="mb-3">
          All Programs
        </Badge>
        <h1 className="font-display text-4xl font-bold mb-2">Our Courses</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Explore our expert-designed courses for skill building, career growth,
          and exam success.
        </p>
      </div>

      <div className="flex justify-center mb-8" data-ocid="courses.filter.tab">
        <Tabs value={category} onValueChange={setCategory}>
          <TabsList className="flex-wrap h-auto gap-1">
            {CATEGORIES.map((c) => (
              <TabsTrigger
                key={c.value}
                value={c.value}
                className="text-xs sm:text-sm"
                data-ocid={`courses.${c.value}.tab`}
              >
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKELETON_IDS.map((id) => (
            <div key={id} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
