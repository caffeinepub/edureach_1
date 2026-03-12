import { u as useActor, a as useQuery, j as jsxRuntimeExports, U as Users } from "./index-DB5zmzan.js";
import { B as Badge } from "./badge-CCdG8Y9w.js";
import { C as Card } from "./card-B90xSgu_.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BL97rIb-.js";
import { S as SEED_COURSES, f as formatDuration } from "./courses-DFZL623h.js";
function AdminStudents() {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Student Enrollments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "View and manage all student enrollments." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: (enrollments || []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-12",
        "data-ocid": "admin.students.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No student enrollments yet." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Student ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Course" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Duration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Mode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: (enrollments || []).map((enrollment, i) => {
        const course = courses.find(
          (c) => c.id === enrollment.courseId
        );
        const shortId = `${enrollment.studentId.toString().slice(0, 12)}...`;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `admin.students.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: shortId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: (course == null ? void 0 : course.title) ?? enrollment.courseId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: formatDuration(enrollment.durationMonths) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "capitalize", children: enrollment.mode }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: enrollment.status === "active" ? "default" : "secondary",
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
  AdminStudents as default
};
