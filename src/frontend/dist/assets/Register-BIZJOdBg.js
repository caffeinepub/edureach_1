import { k as useInternetIdentity, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, G as GraduationCap, i as ue } from "./index-DB5zmzan.js";
import { B as Badge } from "./badge-CCdG8Y9w.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle, e as CardDescription } from "./card-B90xSgu_.js";
import { L as Label, I as Input } from "./label-BjYDeHvq.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Bmi5Z280.js";
import { C as CircleCheckBig } from "./circle-check-big-BzDZmAp8.js";
import { L as LoaderCircle } from "./loader-circle-CMJ2ohvP.js";
import "./index-C3wWXFfw.js";
import "./index-DOCSIDtg.js";
function RegisterPage() {
  const { login, isLoggingIn, identity } = useInternetIdentity();
  const [step, setStep] = reactExports.useState(1);
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    mode: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identity || identity.getPrincipal().isAnonymous()) {
      ue.info("Please login first to complete registration");
      login();
      return;
    }
    ue.success(
      "Admission form submitted! Please proceed to enroll and pay."
    );
    setStep(3);
  };
  if (step === 3)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "w-full max-w-md text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-8 pb-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8 text-green-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "Registration Submitted!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "Thank you, ",
        form.name || "Student",
        "! Your admission form has been received. Please complete your enrollment."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", children: "View Courses & Enroll" }) })
    ] }) }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mb-3", children: "Admission Form" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold mb-1", children: "Student Registration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Fill in your details to register with EduReach" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-lg flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-5 h-5 text-primary" }),
          "Personal Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "All fields are required for admission" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              placeholder: "Enter your full name",
              required: true,
              value: form.name,
              onChange: (e) => setForm((p) => ({ ...p, name: e.target.value })),
              "data-ocid": "register.name.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "email",
              type: "email",
              placeholder: "your@email.com",
              required: true,
              value: form.email,
              onChange: (e) => setForm((p) => ({ ...p, email: e.target.value })),
              "data-ocid": "register.email.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "phone",
              placeholder: "+91 XXXXXXXXXX",
              required: true,
              value: form.phone,
              onChange: (e) => setForm((p) => ({ ...p, phone: e.target.value })),
              "data-ocid": "register.phone.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Preferred Course" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              onValueChange: (v) => setForm((p) => ({ ...p, course: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "register.course.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a course" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "english", children: "English Language" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "computer", children: "Computer & AI Skills" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "singing", children: "Bollywood Singing" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "govexam", children: "Government Exam Preparation" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Learning Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              onValueChange: (v) => setForm((p) => ({ ...p, mode: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "register.mode.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select mode" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "online", children: "Online" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "offline", children: "Offline (Classroom)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "hybrid", children: "Hybrid" })
                ] })
              ]
            }
          )
        ] }),
        !identity || identity.getPrincipal().isAnonymous() ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: login,
            disabled: isLoggingIn,
            variant: "outline",
            className: "w-full",
            children: [
              isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }) : null,
              "First, Login with Internet Identity"
            ]
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full",
            "data-ocid": "register.submit_button",
            children: "Submit Admission Form"
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  RegisterPage as default
};
