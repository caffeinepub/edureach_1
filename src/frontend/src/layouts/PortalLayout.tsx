import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BookOpen,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const STUDENT_NAV = [
  { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/student/my-courses", label: "My Courses", icon: BookOpen },
  { to: "/student/payments", label: "Payments", icon: CreditCard },
];

const ADMIN_NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/courses", label: "Courses", icon: BookOpen },
  { to: "/admin/students", label: "Students", icon: Users },
  { to: "/admin/payments", label: "Payments", icon: CreditCard },
];

export default function PortalLayout({
  portalRole,
}: { portalRole: "student" | "admin" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { clear } = useInternetIdentity();
  const [open, setOpen] = useState(false);
  const navItems = portalRole === "admin" ? ADMIN_NAV : STUDENT_NAV;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <div className="font-display font-bold text-white">EduReach</div>
            <div className="text-xs text-sidebar-foreground/60 capitalize">
              {portalRole} Portal
            </div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <Settings className="w-4 h-4" />
          Back to Site
        </Link>
        <button
          type="button"
          onClick={() => {
            clear();
            navigate("/");
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden lg:flex w-64 bg-sidebar flex-col fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-sidebar p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-20 bg-white border-b flex items-center gap-4 px-4 h-14">
          <SheetTrigger
            asChild
            onClick={() => setOpen(true)}
            className="lg:hidden"
          >
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <span className="font-display font-semibold capitalize">
            {portalRole === "admin" ? "Admin Panel" : "Student Portal"}
          </span>
        </header>
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
