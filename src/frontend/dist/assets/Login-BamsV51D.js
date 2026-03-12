import { c as createLucideIcon, k as useInternetIdentity, u as useActor, l as useNavigate, a as useQuery, r as reactExports, j as jsxRuntimeExports, G as GraduationCap, B as Button, L as Link } from "./index-DB5zmzan.js";
import { C as Card, b as CardHeader, c as CardTitle, e as CardDescription, a as CardContent } from "./card-B90xSgu_.js";
import { L as LoaderCircle } from "./loader-circle-CMJ2ohvP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function LoginPage() {
  const { login, isLoggingIn, identity } = useInternetIdentity();
  const { actor } = useActor();
  const navigate = useNavigate();
  const { data: role } = useQuery({
    queryKey: ["role", actor, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: () => actor.getCallerUserRole(),
    enabled: !!actor && !!identity && !identity.getPrincipal().isAnonymous()
  });
  reactExports.useEffect(() => {
    if (role && role !== "guest") {
      if (role === "admin") navigate("/admin/dashboard");
      else navigate("/student/dashboard");
    }
  }, [role, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-8 h-8 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-2xl", children: "Welcome to EduReach" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Sign in with Internet Identity to access your dashboard" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "w-full",
          size: "lg",
          onClick: login,
          disabled: isLoggingIn,
          "data-ocid": "login.submit_button",
          children: [
            isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 mr-2" }),
            isLoggingIn ? "Connecting..." : "Login with Internet Identity"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Secure, passwordless authentication. No account needed separately." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm", children: [
        "New student?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/register",
            className: "text-primary hover:underline font-medium",
            children: "Register here"
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  LoginPage as default
};
