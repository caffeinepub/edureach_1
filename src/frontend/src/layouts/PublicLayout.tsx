import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import WhatsAppButton from "../components/WhatsAppButton";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/faculty", label: "Faculty" },
  { to: "/fee-structure", label: "Fee Structure" },
  { to: "/contact", label: "Contact" },
];

export default function PublicLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { identity, login, clear } = useInternetIdentity();
  const { actor } = useActor();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: role } = useQuery({
    queryKey: ["role", actor, identity?.getPrincipal().toString()],
    queryFn: () => actor!.getCallerUserRole(),
    enabled: !!actor && !!identity,
  });

  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();

  const handleDashboard = () => {
    if (role === "admin") navigate("/admin/dashboard");
    else navigate("/student/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2"
            data-ocid="nav.home_link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-primary">
              EduReach
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}_link`}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Button variant="outline" size="sm" onClick={handleDashboard}>
                  Dashboard
                </Button>
                <Button variant="ghost" size="sm" onClick={clear}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={login}
                  data-ocid="nav.login_button"
                >
                  Login
                </Button>
                <Button size="sm" asChild data-ocid="nav.register_button">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-lg text-primary">
                    EduReach
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 px-3 rounded-md text-sm font-medium hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 pt-2 border-t">
                  {isLoggedIn ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleDashboard();
                          setMobileOpen(false);
                        }}
                      >
                        Dashboard
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          clear();
                          setMobileOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => {
                          login();
                          setMobileOpen(false);
                        }}
                      >
                        Login
                      </Button>
                      <Button asChild>
                        <Link
                          to="/register"
                          onClick={() => setMobileOpen(false)}
                        >
                          Register
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-sidebar text-sidebar-foreground mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-xl">EduReach</span>
            </div>
            <p className="text-sm text-sidebar-foreground/70">
              Empowering students with quality education through online and
              offline coaching.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-sidebar-foreground/70">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Courses</h4>
            <ul className="space-y-2 text-sm text-sidebar-foreground/70">
              <li>
                <Link to="/courses" className="hover:text-sidebar-foreground">
                  English Language
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-sidebar-foreground">
                  Computer & AI Skills
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-sidebar-foreground">
                  Bollywood Singing
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-sidebar-foreground">
                  Govt Exam Preparation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-sidebar-foreground/70">
              <li>📞 +91-9876543210</li>
              <li>📧 info@edureach.in</li>
              <li>📍 Knowledge City, India</li>
              <li>⏰ Mon–Sat: 9 AM – 7 PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-sidebar-border py-4 text-center text-sm text-sidebar-foreground/50">
          &copy; {new Date().getFullYear()} EduReach Coaching Institute. All
          rights reserved.
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
