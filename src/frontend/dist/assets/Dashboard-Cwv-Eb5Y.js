import { c as createLucideIcon, u as useActor, a as useQuery, b as BookOpen, U as Users, C as CreditCard, j as jsxRuntimeExports, L as Link, B as Button } from "./index-DB5zmzan.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-B90xSgu_.js";
import { S as SEED_COURSES } from "./courses-DFZL623h.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function AdminDashboard() {
  const { actor } = useActor();
  const { data: enrollments } = useQuery({
    queryKey: ["enrollments"],
    queryFn: () => actor.getAllEnrollments(),
    enabled: !!actor
  });
  const { data: backendCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => actor.getAllCourses(),
    enabled: !!actor
  });
  const courses = backendCourses && backendCourses.length > 0 ? backendCourses : SEED_COURSES;
  const totalEnrollments = (enrollments || []).length;
  const activeEnrollments = (enrollments || []).filter(
    (e) => e.status === "active"
  ).length;
  const uniqueStudents = new Set(
    (enrollments || []).map((e) => e.studentId.toString())
  ).size;
  const stats = [
    {
      label: "Total Courses",
      value: courses.length,
      icon: BookOpen,
      color: "text-primary",
      link: "/admin/courses"
    },
    {
      label: "Total Students",
      value: uniqueStudents,
      icon: Users,
      color: "text-indigo-600",
      link: "/admin/students"
    },
    {
      label: "Enrollments",
      value: totalEnrollments,
      icon: TrendingUp,
      color: "text-green-600",
      link: "/admin/students"
    },
    {
      label: "Active Courses",
      value: activeEnrollments,
      icon: CreditCard,
      color: "text-amber-600",
      link: "/admin/payments"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Admin Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Institute overview and management." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: stats.map((stat) => {
      const Icon = stat.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: stat.link, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "hover:shadow-md transition-shadow cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${stat.color} mb-2`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-bold", children: stat.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: stat.label })
      ] }) }) }, stat.label);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Quick Actions" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full justify-start", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/courses", children: "Manage Courses" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full justify-start", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/students", children: "View Students" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full justify-start", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/payments", children: "Track Payments" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Recent Enrollments" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          (enrollments || []).slice(-5).reverse().map((e, i) => {
            const course = courses.find((c) => c.id === e.courseId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between py-2 border-b last:border-0 text-sm",
                "data-ocid": `admin.recent_enrollment.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: (course == null ? void 0 : course.title) ?? e.courseId }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize text-muted-foreground text-xs ml-2 shrink-0", children: e.status })
                ]
              },
              e.id
            );
          }),
          (enrollments || []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No enrollments yet" })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminDashboard as default
};
