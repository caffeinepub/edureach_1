import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const FACULTY = [
  {
    name: "Dr. Meena Patel",
    subject: "English Language",
    bio: "PhD in English Literature with 12 years of teaching experience. Specializes in spoken English and personality development.",
    initials: "MP",
    courses: ["Spoken English", "Grammar", "Interview Prep"],
  },
  {
    name: "Rajesh Kumar",
    subject: "Computer & AI Skills",
    bio: "B.Tech in Computer Science, certified AI practitioner. Has trained 200+ students in digital literacy and programming.",
    initials: "RK",
    courses: ["MS Office", "Programming", "AI Tools"],
  },
  {
    name: "Sunita Sharma",
    subject: "Bollywood Singing",
    bio: "Classical and Bollywood vocalist with 15 years of stage performance experience. Trained under Pt. Ravi Shankar school.",
    initials: "SS",
    courses: ["Voice Training", "Bollywood Songs", "Stage Performance"],
  },
  {
    name: "Amit Tiwari",
    subject: "Government Exams",
    bio: "Former government officer, SSC CGL topper. Has guided 300+ students to successfully clear competitive exams.",
    initials: "AT",
    courses: ["Quantitative Aptitude", "Reasoning", "GK & Current Affairs"],
  },
  {
    name: "Pooja Gupta",
    subject: "English & Communication",
    bio: "MA English, certified IELTS trainer. Expert in writing skills, vocabulary building, and business communication.",
    initials: "PG",
    courses: ["Writing Skills", "Vocabulary", "Business English"],
  },
  {
    name: "Vikram Singh",
    subject: "Computer & Coding",
    bio: "Full-stack developer and educator with 8 years of industry experience. Makes technology accessible to all learners.",
    initials: "VS",
    courses: ["Coding Basics", "Internet & Email", "Basic Computer"],
  },
];

export default function FacultyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <Badge variant="outline" className="mb-3">
          Meet the Team
        </Badge>
        <h1 className="font-display text-4xl font-bold mb-2">
          Our Expert Faculty
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Learn from experienced professionals who are passionate about student
          success.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FACULTY.map((f) => (
          <Card key={f.name} className="p-6">
            <CardContent className="p-0">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-14 h-14 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {f.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-display font-semibold">{f.name}</h3>
                  <p className="text-sm text-primary font-medium">
                    {f.subject}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{f.bio}</p>
              <div className="flex flex-wrap gap-1">
                {f.courses.map((c) => (
                  <Badge key={c} variant="secondary" className="text-xs">
                    {c}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
