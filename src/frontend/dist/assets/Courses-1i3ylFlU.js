import { r as reactExports, u as useActor, a as useQuery, j as jsxRuntimeExports, S as Skeleton } from "./index-DB5zmzan.js";
import { B as Badge } from "./badge-CCdG8Y9w.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-CPzasHbp.js";
import { C as CourseCard } from "./CourseCard-qPYMqZ2l.js";
import { S as SEED_COURSES } from "./courses-DFZL623h.js";
import "./index-C3wWXFfw.js";
import "./card-B90xSgu_.js";
import "./clock-CRhMy64Z.js";
const CATEGORIES = [
  { value: "all", label: "All Courses" },
  { value: "english", label: "📚 English" },
  { value: "computer", label: "💻 Computer & AI" },
  { value: "singing", label: "🎵 Singing" },
  { value: "govExam", label: "📋 Govt Exams" }
];
const SKELETON_IDS = ["sk1", "sk2", "sk3", "sk4"];
function CoursesPage() {
  const [category, setCategory] = reactExports.useState("all");
  const { actor } = useActor();
  const { data: backendCourses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => actor.getAllCourses(),
    enabled: !!actor
  });
  const allCourses = backendCourses && backendCourses.length > 0 ? backendCourses : SEED_COURSES;
  const filtered = category === "all" ? allCourses : allCourses.filter((c) => c.category === category);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mb-3", children: "All Programs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold mb-2", children: "Our Courses" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Explore our expert-designed courses for skill building, career growth, and exam success." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-8", "data-ocid": "courses.filter.tab", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { value: category, onValueChange: setCategory, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "flex-wrap h-auto gap-1", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsTrigger,
      {
        value: c.value,
        className: "text-xs sm:text-sm",
        "data-ocid": `courses.${c.value}.tab`,
        children: c.label
      },
      c.value
    )) }) }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: SKELETON_IDS.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
    ] }, id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: filtered.map((course, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCard, { course, index: i }, course.id)) })
  ] });
}
export {
  CoursesPage as default
};
