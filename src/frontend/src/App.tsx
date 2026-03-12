import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { useQuery } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useActor } from "./hooks/useActor";
import PortalLayout from "./layouts/PortalLayout";
import PublicLayout from "./layouts/PublicLayout";

const HomePage = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/About"));
const CoursesPage = lazy(() => import("./pages/Courses"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetail"));
const FacultyPage = lazy(() => import("./pages/Faculty"));
const FeeStructurePage = lazy(() => import("./pages/FeeStructure"));
const ContactPage = lazy(() => import("./pages/Contact"));
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const StudentDashboard = lazy(() => import("./pages/student/Dashboard"));
const StudentEnroll = lazy(() => import("./pages/student/Enroll"));
const StudentMyCourses = lazy(() => import("./pages/student/MyCourses"));
const StudentPayments = lazy(() => import("./pages/student/Payments"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminCourses = lazy(() => import("./pages/admin/Courses"));
const AdminStudents = lazy(() => import("./pages/admin/Students"));
const AdminPayments = lazy(() => import("./pages/admin/Payments"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 w-full max-w-md px-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

function ProtectedRoute({
  children,
  requiredRole,
}: { children: React.ReactNode; requiredRole?: string }) {
  const { actor } = useActor();
  const { data: role, isLoading } = useQuery({
    queryKey: ["role", actor],
    queryFn: () => actor!.getCallerUserRole(),
    enabled: !!actor,
  });

  if (isLoading) return <PageLoader />;
  if (!role || role === "guest") return <Navigate to="/login" replace />;
  if (requiredRole === "admin" && role !== "admin")
    return <Navigate to="/student/dashboard" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/faculty" element={<FacultyPage />} />
            <Route path="/fee-structure" element={<FeeStructurePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<PortalLayout portalRole="student" />}>
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/enroll/:courseId"
              element={
                <ProtectedRoute>
                  <StudentEnroll />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/my-courses"
              element={
                <ProtectedRoute>
                  <StudentMyCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/payments"
              element={
                <ProtectedRoute>
                  <StudentPayments />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<PortalLayout portalRole="admin" />}>
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/courses"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/students"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/payments"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPayments />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
