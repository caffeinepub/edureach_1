import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, L as Link } from "./index-DB5zmzan.js";
import { B as Badge } from "./badge-CCdG8Y9w.js";
import { C as Card } from "./card-B90xSgu_.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BL97rIb-.js";
import { S as SEED_COURSES, C as CATEGORY_META, f as formatDuration, a as formatFee } from "./courses-DFZL623h.js";
import { C as CircleCheckBig } from "./circle-check-big-BzDZmAp8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
const PAYMENT_METHODS = [
  {
    id: "phonepe",
    name: "PhonePe",
    emoji: "📱",
    feeLabel: "Free (0%)",
    isFree: true,
    note: "Instant UPI transfer",
    color: "bg-purple-50 border-purple-200",
    badgeClass: "bg-green-100 text-green-800 border-green-200"
  },
  {
    id: "googlepay",
    name: "Google Pay",
    emoji: "🔵",
    feeLabel: "Free (0%)",
    isFree: true,
    note: "Instant UPI transfer",
    color: "bg-blue-50 border-blue-200",
    badgeClass: "bg-green-100 text-green-800 border-green-200"
  },
  {
    id: "paytm",
    name: "Paytm",
    emoji: "💸",
    feeLabel: "Free (0%)",
    isFree: true,
    note: "UPI + Wallet",
    color: "bg-sky-50 border-sky-200",
    badgeClass: "bg-green-100 text-green-800 border-green-200"
  },
  {
    id: "amazonpay",
    name: "Amazon Pay",
    emoji: "📦",
    feeLabel: "Free (0%)",
    isFree: true,
    note: "UPI transfer",
    color: "bg-yellow-50 border-yellow-200",
    badgeClass: "bg-green-100 text-green-800 border-green-200"
  },
  {
    id: "upi",
    name: "UPI (Manual)",
    emoji: "📲",
    feeLabel: "Free (0%)",
    isFree: true,
    note: "PhonePe, GPay, BHIM etc.",
    color: "bg-green-50 border-green-200",
    badgeClass: "bg-green-100 text-green-800 border-green-200"
  },
  {
    id: "qr",
    name: "QR Code",
    emoji: "🔲",
    feeLabel: "Free (0%)",
    isFree: true,
    note: "Scan with any UPI app",
    color: "bg-emerald-50 border-emerald-200",
    badgeClass: "bg-green-100 text-green-800 border-green-200"
  },
  {
    id: "paypal",
    name: "PayPal",
    emoji: "🅿️",
    feeLabel: "3% fee",
    isFree: false,
    note: "For overseas payments",
    color: "bg-indigo-50 border-indigo-200",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200"
  }
];
function FeeStructurePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mb-3", children: "Transparent Pricing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold mb-2", children: "Fee Structure" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Affordable pricing for quality education. No hidden charges. All fees are one-time course fees in Indian Rupees." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: SEED_COURSES.map((course) => {
      const meta = CATEGORY_META[course.category];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 bg-muted/50 border-b flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: meta.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg", children: course.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize ml-auto", children: course.mode })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Duration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Fee (INR)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "What's Included" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, {})
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: course.durationOptions.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: formatDuration(d.months) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-bold text-primary text-lg", children: formatFee(d.feeInr) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: [
              "Study materials",
              "Live classes",
              "Certificate"
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-center gap-1 text-xs text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 text-green-600" }),
                  item
                ]
              },
              item
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/student/enroll/${course.id}`, children: "Enroll" }) }) })
          ] }, d.months.toString())) })
        ] })
      ] }, course.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "payment.methods.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mb-2", children: "No Surprises" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-1", children: "Accepted Payment Methods & Charges" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-lg mx-auto", children: "All UPI payments are instant and completely free. PayPal fee applies for international transactions only." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3",
          "data-ocid": "payment.methods.list",
          children: PAYMENT_METHODS.map((method, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `payment.methods.item.${idx + 1}`,
              className: `rounded-xl border p-4 flex flex-col items-center gap-2 text-center transition-shadow hover:shadow-md ${method.color}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: method.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm leading-tight", children: method.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: `text-xs font-semibold ${method.badgeClass}`,
                    children: method.feeLabel
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-tight", children: method.note })
              ]
            },
            method.id
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Note:" }),
          " All UPI payments (PhonePe, Google Pay, Paytm, Amazon Pay, BHIM, QR Code) are instant and completely free of charge. PayPal incurs a 3% international transaction fee. Card payments include a 2% processing fee. Net Banking and Wallets have a 1% processing fee."
        ] })
      ] })
    ] })
  ] });
}
export {
  FeeStructurePage as default
};
