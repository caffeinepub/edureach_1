import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Loader2, Shield } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function LoginPage() {
  const { login, isLoggingIn, identity } = useInternetIdentity();
  const { actor } = useActor();
  const navigate = useNavigate();

  const { data: role } = useQuery({
    queryKey: ["role", actor, identity?.getPrincipal().toString()],
    queryFn: () => actor!.getCallerUserRole(),
    enabled: !!actor && !!identity && !identity.getPrincipal().isAnonymous(),
  });

  useEffect(() => {
    if (role && role !== "guest") {
      if (role === "admin") navigate("/admin/dashboard");
      else navigate("/student/dashboard");
    }
  }, [role, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="font-display text-2xl">
            Welcome to EduReach
          </CardTitle>
          <CardDescription>
            Sign in with Internet Identity to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full"
            size="lg"
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="login.submit_button"
          >
            {isLoggingIn ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Shield className="w-4 h-4 mr-2" />
            )}
            {isLoggingIn ? "Connecting..." : "Login with Internet Identity"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Secure, passwordless authentication. No account needed separately.
          </p>
          <div className="text-center text-sm">
            New student?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
            >
              Register here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
