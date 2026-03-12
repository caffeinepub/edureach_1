import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Eye, Heart, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto">
        <Badge variant="outline" className="mb-3">
          About EduReach
        </Badge>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
          Shaping Futures Through Quality Education
        </h1>
        <p className="text-muted-foreground text-lg">
          EduReach Coaching Institute has been empowering students with skills
          that matter since its founding. We believe in accessible, practical,
          and result-oriented education for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            icon: Target,
            title: "Our Mission",
            desc: "To provide affordable, high-quality coaching that bridges the gap between education and employment, empowering every student to reach their full potential.",
          },
          {
            icon: Eye,
            title: "Our Vision",
            desc: "To be the most trusted coaching institute in India, known for transforming lives through skill development, discipline, and dedicated mentorship.",
          },
          {
            icon: Heart,
            title: "Our Values",
            desc: "Integrity, excellence, inclusivity, and a student-first approach. Every decision we make centers around our students' success and well-being.",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-3xl font-bold mb-4">
            Why Students Choose EduReach
          </h2>
          <ul className="space-y-3">
            {[
              "Experienced and certified faculty members",
              "Flexible online, offline, and hybrid learning modes",
              "Affordable fee structure with installment options",
              "Regular mock tests and doubt-solving sessions",
              "Certificates recognized by employers and institutions",
              "Personal mentorship and career guidance",
              "Small batch sizes for individual attention",
              "State-of-the-art digital learning resources",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: "500+", label: "Students Trained" },
              { value: "95%", label: "Success Rate" },
              { value: "4", label: "Specialized Courses" },
              { value: "10+", label: "Expert Faculty" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="font-display text-3xl font-bold text-primary">
                  {s.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
