import { u as useActor, k as useInternetIdentity, a as useQuery, j as jsxRuntimeExports, C as CreditCard } from "./index-DB5zmzan.js";
import { B as Badge } from "./badge-CCdG8Y9w.js";
import { C as Card, a as CardContent } from "./card-B90xSgu_.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BL97rIb-.js";
import { S as SEED_COURSES, f as formatDuration, a as formatFee } from "./courses-DFZL623h.js";
function StudentPayments() {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Payment History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Your enrollment and payment records." })
    ] }),
    myEnrollments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "text-center py-12",
        "data-ocid": "student.payments.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No payment records found." })
        ] })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Course" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Duration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Mode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: myEnrollments.map((enrollment, i) => {
        const course = courses.find(
          (c) => c.id === enrollment.courseId
        );
        const option = course == null ? void 0 : course.durationOptions.find(
          (d) => d.months === enrollment.durationMonths
        );
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `student.payments.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: (course == null ? void 0 : course.title) ?? enrollment.courseId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatDuration(enrollment.durationMonths) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "capitalize", children: enrollment.mode }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: option ? formatFee(option.feeInr) : "N/A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: enrollment.status === "active" ? "default" : enrollment.status === "completed" ? "secondary" : "outline",
                  className: "capitalize",
                  children: enrollment.status
                }
              ) })
            ]
          },
          enrollment.id
        );
      }) })
    ] }) })
  ] });
}
export {
  StudentPayments as default
};
