import { c as createLucideIcon, u as useActor, a as useQuery, j as jsxRuntimeExports, B as Button, L as Link, b as BookOpen } from "./index-DB5zmzan.js";
import { B as Badge } from "./badge-CCdG8Y9w.js";
import { C as Card, a as CardContent } from "./card-B90xSgu_.js";
import { C as CourseCard } from "./CourseCard-qPYMqZ2l.js";
import { S as SEED_COURSES } from "./courses-DFZL623h.js";
import { A as Award } from "./award-CGUbZg2q.js";
import "./clock-CRhMy64Z.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M14 22v-4a2 2 0 1 0-4 0v4", key: "hhkicm" }],
  [
    "path",
    {
      d: "m18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10",
      key: "1xqip1"
    }
  ],
  ["path", { d: "M18 5v17", key: "1sw6gf" }],
  ["path", { d: "m4 6 7.106-3.553a2 2 0 0 1 1.788 0L20 6", key: "9d2mlk" }],
  ["path", { d: "M6 5v17", key: "1xfsm0" }],
  ["circle", { cx: "12", cy: "9", r: "2", key: "1092wv" }]
];
const School = createLucideIcon("school", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
];
const Wifi = createLucideIcon("wifi", __iconNode);
const FEATURES = [
  {
    icon: Wifi,
    title: "Live Online Classes",
    desc: "Join live sessions from anywhere with expert instructors in real time."
  },
  {
    icon: School,
    title: "Offline Coaching",
    desc: "Attend classroom batches with personalized attention and hands-on practice."
  },
  {
    icon: Award,
    title: "Certifications",
    desc: "Earn recognized certificates upon course completion to boost your career."
  },
  {
    icon: BookOpen,
    title: "Study Materials",
    desc: "Access downloadable notes, videos, and practice tests anytime."
  }
];
const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    course: "English Language",
    rating: 5,
    text: "My communication skills improved drastically. Got placed in a top MNC after completing the 6-month course!"
  },
  {
    name: "Rahul Verma",
    course: "Government Exam Prep",
    rating: 5,
    text: "Cleared SSC CGL in my first attempt. The mock tests and current affairs sessions were incredibly helpful."
  },
  {
    name: "Anjali Singh",
    course: "Computer & AI Skills",
    rating: 5,
    text: "Went from knowing nothing about computers to building my own spreadsheets and using AI tools for work."
  }
];
const STATS = [
  { value: "500+", label: "Students Enrolled" },
  { value: "4", label: "Expert Courses" },
  { value: "95%", label: "Success Rate" },
  { value: "10+", label: "Qualified Teachers" }
];
function HomePage() {
  const { actor } = useActor();
  const { data: backendCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => actor.getAllCourses(),
    enabled: !!actor
  });
  const courses = backendCourses && backendCourses.length > 0 ? backendCourses : SEED_COURSES;
  const featuredCourses = courses.slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden",
        "data-ocid": "home.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 opacity-10", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent blur-3xl" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-accent text-accent-foreground border-none font-medium", children: "Online + Offline Coaching" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight", children: [
              "Learn. Grow. ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Succeed." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8", children: "Join EduReach for expert coaching in English, Computer Skills, Singing, and Government Exam Preparation. Online, Offline, and Hybrid modes available." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  className: "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold",
                  asChild: true,
                  "data-ocid": "home.enroll_primary_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", children: "Explore Courses" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "border-white/40 text-white hover:bg-white/10",
                  asChild: true,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: "Register Now" })
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6", children: STATS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-bold text-primary", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: s.label })
    ] }, s.label)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "max-w-7xl mx-auto px-4 sm:px-6 py-16",
        "data-ocid": "home.courses_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mb-3", children: "Our Programs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold", children: "Courses We Offer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-xl mx-auto", children: "Choose from our carefully designed courses to build skills that matter in today's world." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: featuredCourses.map((course, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCard, { course, index: i }, course.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", children: "View All Courses" }) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mb-3", children: "Why Choose Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold", children: "Everything You Need to Succeed" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: FEATURES.map((f) => {
        const Icon = f.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold mb-2", children: f.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: f.desc })
        ] }, f.title);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mb-3", children: "Success Stories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold", children: "What Our Students Say" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: TESTIMONIALS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-0.5 mb-3",
            "aria-label": `${t.rating} stars`,
            children: [1, 2, 3, 4, 5].slice(0, t.rating).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-accent text-accent" }, n))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4 italic", children: [
          "“",
          t.text,
          "”"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: t.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t.course })
      ] }) }, t.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary text-primary-foreground py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold mb-4", children: "Ready to Start Your Journey?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 mb-8", children: "Enroll today and take the first step towards your dream career with EduReach." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "lg",
            className: "bg-accent text-accent-foreground hover:bg-accent/90",
            asChild: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: "Admission Form" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "lg",
            variant: "outline",
            className: "border-white/40 text-white hover:bg-white/10",
            asChild: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Contact Us" })
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  HomePage as default
};
