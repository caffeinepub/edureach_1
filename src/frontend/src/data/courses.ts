import { type Course, CourseCategory, CourseMode } from "../backend";

export const SEED_COURSES: Course[] = [
  {
    id: "english-lang",
    title: "English Language",
    category: CourseCategory.english,
    mode: CourseMode.hybrid,
    description:
      "Master spoken English, grammar, vocabulary, writing skills, and personality development for career success. This comprehensive course prepares you for interviews, professional communication, and confident self-expression.",
    modules: [
      "Spoken English",
      "Grammar",
      "Vocabulary",
      "Writing Skills",
      "Interview Communication",
      "Personality Development",
    ],
    durationOptions: [
      { months: 3n, feeInr: 3000n },
      { months: 6n, feeInr: 5500n },
      { months: 12n, feeInr: 9000n },
    ],
    isActive: true,
  },
  {
    id: "computer-ai",
    title: "Computer & AI Skills",
    category: CourseCategory.computer,
    mode: CourseMode.hybrid,
    description:
      "From basic computer skills to AI tools and coding basics — prepare for the digital future. Learn MS Office, internet usage, programming fundamentals, and how to leverage AI for productivity.",
    modules: [
      "Basic Computer",
      "MS Office",
      "Internet & Email",
      "Programming Basics",
      "AI Introduction",
      "AI Tools for Productivity",
      "Coding Basics",
    ],
    durationOptions: [
      { months: 3n, feeInr: 4000n },
      { months: 6n, feeInr: 7500n },
      { months: 12n, feeInr: 12000n },
    ],
    isActive: true,
  },
  {
    id: "bollywood-singing",
    title: "Bollywood Singing",
    category: CourseCategory.singing,
    mode: CourseMode.offline,
    description:
      "Professional voice training, Bollywood song practice, stage performance, and social media music promotion. Learn from experienced instructors and develop your unique vocal identity.",
    modules: [
      "Voice Training",
      "Bollywood Songs Practice",
      "Music Theory Basics",
      "Stage Performance",
      "Recording Techniques",
      "Social Media Singing Promotion",
    ],
    durationOptions: [
      { months: 3n, feeInr: 3500n },
      { months: 6n, feeInr: 6000n },
      { months: 12n, feeInr: 10000n },
    ],
    isActive: true,
  },
  {
    id: "govt-exam-prep",
    title: "Government Exam Preparation",
    category: CourseCategory.govExam,
    mode: CourseMode.hybrid,
    description:
      "Complete preparation for SSC, Banking, Railway, UPSC, State PSC, Police, and Defence exams. Structured curriculum with mock tests, current affairs, and expert guidance.",
    modules: [
      "Quantitative Aptitude",
      "Reasoning",
      "English",
      "General Knowledge",
      "Current Affairs",
      "Computer Awareness",
    ],
    durationOptions: [
      { months: 6n, feeInr: 8000n },
      { months: 12n, feeInr: 15000n },
      { months: 24n, feeInr: 25000n },
    ],
    isActive: true,
  },
];

export const CATEGORY_META: Record<
  string,
  { icon: string; color: string; bg: string }
> = {
  english: { icon: "📚", color: "text-blue-700", bg: "bg-blue-50" },
  computer: { icon: "💻", color: "text-indigo-700", bg: "bg-indigo-50" },
  singing: { icon: "🎵", color: "text-pink-700", bg: "bg-pink-50" },
  govExam: { icon: "📋", color: "text-amber-700", bg: "bg-amber-50" },
};

export function formatDuration(months: bigint): string {
  const m = Number(months);
  if (m < 12) return `${m} Month${m > 1 ? "s" : ""}`;
  const y = m / 12;
  return `${y} Year${y > 1 ? "s" : ""}`;
}

export function formatFee(fee: bigint): string {
  return `₹${Number(fee).toLocaleString("en-IN")}`;
}
