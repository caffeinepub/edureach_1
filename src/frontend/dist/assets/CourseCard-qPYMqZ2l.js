import { j as jsxRuntimeExports, b as BookOpen, B as Button, L as Link } from "./index-DB5zmzan.js";
import { B as Badge } from "./badge-CCdG8Y9w.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent, d as CardFooter } from "./card-B90xSgu_.js";
import { C as CATEGORY_META, f as formatDuration, a as formatFee } from "./courses-DFZL623h.js";
import { C as Clock } from "./clock-CRhMy64Z.js";
function CourseCard({
  course,
  index
}) {
  var _a;
  const meta = CATEGORY_META[course.category] ?? {
    icon: "📚",
    bg: "bg-blue-50"
  };
  const minFee = course.durationOptions.reduce(
    (min, d) => d.feeInr < min ? d.feeInr : min,
    ((_a = course.durationOptions[0]) == null ? void 0 : _a.feeInr) ?? 0n
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "flex flex-col hover:shadow-lg transition-shadow border-border",
      "data-ocid": `courses.course.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-12 h-12 rounded-xl ${meta.bg} flex items-center justify-center text-2xl mb-3`,
              children: meta.icon
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg leading-tight", children: course.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs capitalize", children: course.mode }),
            course.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-green-100 text-green-800 border-green-200", children: "Active" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex-1 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-3", children: course.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              course.modules.length,
              " modules"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: course.durationOptions.map((d) => formatDuration(d.months)).join(" / ") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-primary", children: [
            "Starting from ",
            formatFee(minFee)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", asChild: true, className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/courses/${course.id}`, children: "View Details" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              asChild: true,
              className: "flex-1",
              "data-ocid": `courses.enroll_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/student/enroll/${course.id}`, children: "Enroll" })
            }
          )
        ] })
      ]
    }
  );
}
export {
  CourseCard as C
};
