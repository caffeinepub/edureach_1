import { c as createLucideIcon, u as useActor, k as useInternetIdentity, a as useQuery, j as jsxRuntimeExports, b as BookOpen, G as GraduationCap, C as CreditCard, B as Button, L as Link } from "./index-DB5zmzan.js";
import { B as Badge } from "./badge-CCdG8Y9w.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-B90xSgu_.js";
import { S as SEED_COURSES, f as formatDuration } from "./courses-DFZL623h.js";
import { A as Award } from "./award-CGUbZg2q.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
function StudentDashboard() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const { data: enrollments } = useQuery({
    queryKey: ["enrollments"],
    queryFn: () => actor.getAllEnrollments(),
    enabled: !!actor
  });
  const { data: allCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => actor.getAllCourses(),
    enabled: !!actor
  });
  const courses = allCourses && allCourses.length > 0 ? allCourses : SEED_COURSES;
  const myEnrollments = (enrollments || []).filter(
    (e) => identity && e.studentId.toString() === identity.getPrincipal().toString()
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "student.dashboard.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Student Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Welcome back! Here's your learning overview." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
      {
        label: "Enrolled Courses",
        value: myEnrollments.length,
        icon: BookOpen,
        color: "text-primary"
      },
      {
        label: "Active Courses",
        value: myEnrollments.filter((e) => e.status === "active").length,
        icon: GraduationCap,
        color: "text-green-600"
      },
      {
        label: "Completed",
        value: myEnrollments.filter((e) => e.status === "completed").length,
        icon: Award,
        color: "text-amber-600"
      },
      {
        label: "Pending Payment",
        value: myEnrollments.filter((e) => e.status === "pending").length,
        icon: CreditCard,
        color: "text-red-600"
      }
    ].map((stat) => {
      const Icon = stat.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${stat.color} mb-2`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold", children: stat.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: stat.label })
      ] }) }, stat.label);
    }) }),
    myEnrollments.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold mb-3", children: "My Courses" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: myEnrollments.map((enrollment, i) => {
        const course = courses.find((c) => c.id === enrollment.courseId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            "data-ocid": `student.enrollment.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: (course == null ? void 0 : course.title) ?? enrollment.courseId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: enrollment.status === "active" ? "default" : enrollment.status === "completed" ? "secondary" : "destructive",
                    className: "text-xs capitalize",
                    children: enrollment.status
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Duration: ",
                    formatDuration(enrollment.durationMonths)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "capitalize", children: [
                    "Mode: ",
                    enrollment.mode
                  ] })
                ] })
              ] })
            ]
          },
          enrollment.id
        );
      }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "text-center py-12",
        "data-ocid": "student.enrollments.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold mb-2", children: "No courses yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Enroll in a course to start your learning journey" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", children: "Browse Courses" }) })
        ] })
      }
    )
  ] });
}
export {
  StudentDashboard as default
};
