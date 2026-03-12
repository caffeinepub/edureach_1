import { u as useActor, a as useQuery, j as jsxRuntimeExports, C as CreditCard } from "./index-DB5zmzan.js";
import { B as Badge } from "./badge-CCdG8Y9w.js";
import { C as Card } from "./card-B90xSgu_.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BL97rIb-.js";
import { S as SEED_COURSES, f as formatDuration, a as formatFee } from "./courses-DFZL623h.js";
function AdminPayments() {
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
  const allEnrollments = enrollments || [];
  const totalRevenue = allEnrollments.reduce((sum, e) => {
    const course = courses.find((c) => c.id === e.courseId);
    const opt = course == null ? void 0 : course.durationOptions.find(
      (d) => d.months === e.durationMonths
    );
    return sum + Number((opt == null ? void 0 : opt.feeInr) ?? 0n);
  }, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Payments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Track all enrollment payments." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      { label: "Total Enrollments", value: allEnrollments.length },
      {
        label: "Active",
        value: allEnrollments.filter((e) => e.status === "active").length
      },
      {
        label: "Total Revenue",
        value: `₹${totalRevenue.toLocaleString("en-IN")}`
      }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold mt-1", children: s.value })
    ] }) }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: allEnrollments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-12",
        "data-ocid": "admin.payments.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No payment records yet." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Course" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Duration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Enrollment ID" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: allEnrollments.map((enrollment, i) => {
        const course = courses.find(
          (c) => c.id === enrollment.courseId
        );
        const opt = course == null ? void 0 : course.durationOptions.find(
          (d) => d.months === enrollment.durationMonths
        );
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `admin.payments.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: (course == null ? void 0 : course.title) ?? enrollment.courseId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatDuration(enrollment.durationMonths) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: opt ? formatFee(opt.feeInr) : "N/A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: enrollment.status === "active" ? "default" : "secondary",
                  className: "capitalize",
                  children: enrollment.status
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-mono text-xs", children: [
                enrollment.id.slice(0, 16),
                "..."
              ] })
            ]
          },
          enrollment.id
        );
      }) })
    ] }) })
  ] });
}
export {
  AdminPayments as default
};
