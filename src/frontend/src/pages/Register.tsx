import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, GraduationCap, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function RegisterPage() {
  const { login, isLoggingIn, identity } = useInternetIdentity();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    mode: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity || identity.getPrincipal().isAnonymous()) {
      toast.info("Please login first to complete registration");
      login();
      return;
    }
    toast.success(
      "Admission form submitted! Please proceed to enroll and pay.",
    );
    setStep(3);
  };

  if (step === 3)
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-6 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="font-display text-2xl font-bold">
              Registration Submitted!
            </h2>
            <p className="text-muted-foreground">
              Thank you, {form.name || "Student"}! Your admission form has been
              received. Please complete your enrollment.
            </p>
            <Button asChild className="w-full">
              <Link to="/courses">View Courses & Enroll</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-3">
          Admission Form
        </Badge>
        <h1 className="font-display text-3xl font-bold mb-1">
          Student Registration
        </h1>
        <p className="text-muted-foreground text-sm">
          Fill in your details to register with EduReach
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Personal Information
          </CardTitle>
          <CardDescription>
            All fields are required for admission
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                required
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                data-ocid="register.name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                data-ocid="register.email.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+91 XXXXXXXXXX"
                required
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                data-ocid="register.phone.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Preferred Course</Label>
              <Select
                onValueChange={(v) => setForm((p) => ({ ...p, course: v }))}
              >
                <SelectTrigger data-ocid="register.course.select">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English Language</SelectItem>
                  <SelectItem value="computer">Computer & AI Skills</SelectItem>
                  <SelectItem value="singing">Bollywood Singing</SelectItem>
                  <SelectItem value="govexam">
                    Government Exam Preparation
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Learning Mode</Label>
              <Select
                onValueChange={(v) => setForm((p) => ({ ...p, mode: v }))}
              >
                <SelectTrigger data-ocid="register.mode.select">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline (Classroom)</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!identity || identity.getPrincipal().isAnonymous() ? (
              <Button
                type="button"
                onClick={login}
                disabled={isLoggingIn}
                variant="outline"
                className="w-full"
              >
                {isLoggingIn ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                First, Login with Internet Identity
              </Button>
            ) : null}

            <Button
              type="submit"
              className="w-full"
              data-ocid="register.submit_button"
            >
              Submit Admission Form
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
