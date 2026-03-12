import { c as createLucideIcon, d as useParams, u as useActor, a as useQuery, j as jsxRuntimeExports, B as Button, L as Link, b as BookOpen } from "./index-DB5zmzan.js";
import { B as Badge } from "./badge-CCdG8Y9w.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-B90xSgu_.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BL97rIb-.js";
import { S as SEED_COURSES, C as CATEGORY_META, f as formatDuration, a as formatFee } from "./courses-DFZL623h.js";
import { C as CircleCheckBig } from "./circle-check-big-BzDZmAp8.js";
import { C as Clock } from "./clock-CRhMy64Z.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
function CourseDetailPage() {
  const { id } = useParams();
  const { actor } = useActor();
  const { data: backendCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => actor.getAllCourses(),
    enabled: !!actor
  });
  const allCourses = backendCourses && backendCourses.length > 0 ? backendCourses : SEED_COURSES;
  const course = allCourses.find((c) => c.id === id);
  if (!course)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Course not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", children: "Back to Courses" }) })
    ] });
  const meta = CATEGORY_META[course.category] ?? {
    icon: "📚",
    bg: "bg-blue-50"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", asChild: true, className: "mb-6 -ml-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1" }),
      "Back to Courses"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-14 h-14 rounded-xl ${meta.bg} flex items-center justify-center text-3xl mb-4`,
              children: meta.icon
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold mb-2", children: course.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize", children: course.mode }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "capitalize bg-green-100 text-green-800 border-green-200", children: course.category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: course.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-primary" }),
            " Course Modules"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: course.modules.map((mod) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-600 shrink-0" }),
            mod
          ] }, mod)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-primary" }),
            " Duration & Fees"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Duration" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Fee (INR)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, {})
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: course.durationOptions.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: formatDuration(d.months) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold text-primary", children: formatFee(d.feeInr) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/student/enroll/${course.id}`, children: "Enroll" }) }) })
            ] }, d.months.toString())) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/20 bg-primary/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Enroll Now" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Start your learning journey today with flexible duration options." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/student/enroll/${course.id}`, children: "Enroll in this Course" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Have Questions?" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Certificate on completion" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Study materials included" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Expert instructors" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Flexible learning modes" })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  CourseDetailPage as default
};
