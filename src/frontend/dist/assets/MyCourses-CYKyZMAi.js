import { u as useActor, k as useInternetIdentity, a as useQuery, j as jsxRuntimeExports, G as GraduationCap, B as Button, L as Link } from "./index-DB5zmzan.js";
import { B as Badge } from "./badge-CCdG8Y9w.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-B90xSgu_.js";
import { S as SEED_COURSES, C as CATEGORY_META, f as formatDuration } from "./courses-DFZL623h.js";
function MyCourses() {
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "My Courses" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "All your enrolled courses and their status." })
    ] }),
    myEnrollments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "text-center py-12",
        "data-ocid": "student.my_courses.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "No courses enrolled" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Browse and enroll in a course to get started" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", children: "Browse Courses" }) })
        ] })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: myEnrollments.map((enrollment, i) => {
      const course = courses.find((c) => c.id === enrollment.courseId);
      const meta = CATEGORY_META[(course == null ? void 0 : course.category) ?? "english"];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          "data-ocid": `student.my_courses.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-10 h-10 rounded-lg ${meta == null ? void 0 : meta.bg} flex items-center justify-center text-xl shrink-0`,
                  children: meta == null ? void 0 : meta.icon
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base truncate", children: (course == null ? void 0 : course.title) ?? enrollment.courseId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs capitalize mt-1",
                    children: enrollment.status
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "text-sm space-y-1 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                "Duration: ",
                formatDuration(enrollment.durationMonths)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "capitalize", children: [
                "Mode: ",
                enrollment.mode
              ] }),
              course && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-foreground mb-1", children: "Modules:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                  course.modules.slice(0, 3).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-xs",
                      children: m
                    },
                    m
                  )),
                  course.modules.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                    "+",
                    course.modules.length - 3,
                    " more"
                  ] })
                ] })
              ] })
            ] })
          ]
        },
        enrollment.id
      );
    }) })
  ] });
}
export {
  MyCourses as default
};
