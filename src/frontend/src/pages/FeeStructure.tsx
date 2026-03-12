import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import {
  CATEGORY_META,
  SEED_COURSES,
  formatDuration,
  formatFee,
} from "../data/courses";

const PAYMENT_METHODS = [
  {
    id: "phonepe",
    name: "PhonePe",
    emoji: "📱",
    feeLabel: "Free (0%)",
    isFree: true,
    note: "Instant UPI transfer",
    color: "bg-purple-50 border-purple-200",
    badgeClass: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "googlepay",
    name: "Google Pay",
    emoji: "🔵",
    feeLabel: "Free (0%)",
    isFree: true,
    note: "Instant UPI transfer",
    color: "bg-blue-50 border-blue-200",
    badgeClass: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "paytm",
    name: "Paytm",
    emoji: "💸",
    feeLabel: "Free (0%)",
    isFree: true,
    note: "UPI + Wallet",
    color: "bg-sky-50 border-sky-200",
    badgeClass: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "amazonpay",
    name: "Amazon Pay",
    emoji: "📦",
    feeLabel: "Free (0%)",
    isFree: true,
    note: "UPI transfer",
    color: "bg-yellow-50 border-yellow-200",
    badgeClass: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "upi",
    name: "UPI (Manual)",
    emoji: "📲",
    feeLabel: "Free (0%)",
    isFree: true,
    note: "PhonePe, GPay, BHIM etc.",
    color: "bg-green-50 border-green-200",
    badgeClass: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "qr",
    name: "QR Code",
    emoji: "🔲",
    feeLabel: "Free (0%)",
    isFree: true,
    note: "Scan with any UPI app",
    color: "bg-emerald-50 border-emerald-200",
    badgeClass: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "paypal",
    name: "PayPal",
    emoji: "🅿️",
    feeLabel: "3% fee",
    isFree: false,
    note: "For overseas payments",
    color: "bg-indigo-50 border-indigo-200",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200",
  },
];

export default function FeeStructurePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <div className="text-center">
        <Badge variant="outline" className="mb-3">
          Transparent Pricing
        </Badge>
        <h1 className="font-display text-4xl font-bold mb-2">Fee Structure</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Affordable pricing for quality education. No hidden charges. All fees
          are one-time course fees in Indian Rupees.
        </p>
      </div>

      <div className="space-y-6">
        {SEED_COURSES.map((course) => {
          const meta = CATEGORY_META[course.category];
          return (
            <Card key={course.id} className="overflow-hidden">
              <div className="px-6 py-4 bg-muted/50 border-b flex items-center gap-3">
                <span className="text-2xl">{meta.icon}</span>
                <h2 className="font-display font-semibold text-lg">
                  {course.title}
                </h2>
                <Badge variant="outline" className="capitalize ml-auto">
                  {course.mode}
                </Badge>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Duration</TableHead>
                    <TableHead>Fee (INR)</TableHead>
                    <TableHead>What&apos;s Included</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {course.durationOptions.map((d) => (
                    <TableRow key={d.months.toString()}>
                      <TableCell className="font-medium">
                        {formatDuration(d.months)}
                      </TableCell>
                      <TableCell className="font-bold text-primary text-lg">
                        {formatFee(d.feeInr)}
                      </TableCell>
                      <TableCell>
                        <ul className="space-y-1">
                          {[
                            "Study materials",
                            "Live classes",
                            "Certificate",
                          ].map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-1 text-xs text-muted-foreground"
                            >
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" asChild>
                          <Link to={`/student/enroll/${course.id}`}>
                            Enroll
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          );
        })}
      </div>

      {/* Accepted Payment Methods Section */}
      <div className="space-y-5" data-ocid="payment.methods.section">
        <div className="text-center">
          <Badge variant="outline" className="mb-2">
            No Surprises
          </Badge>
          <h2 className="font-display text-2xl font-bold mb-1">
            Accepted Payment Methods &amp; Charges
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            All UPI payments are instant and completely free. PayPal fee applies
            for international transactions only.
          </p>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          data-ocid="payment.methods.list"
        >
          {PAYMENT_METHODS.map((method, idx) => (
            <div
              key={method.id}
              data-ocid={`payment.methods.item.${idx + 1}`}
              className={`rounded-xl border p-4 flex flex-col items-center gap-2 text-center transition-shadow hover:shadow-md ${method.color}`}
            >
              <span className="text-3xl">{method.emoji}</span>
              <span className="font-semibold text-sm leading-tight">
                {method.name}
              </span>
              <Badge
                variant="outline"
                className={`text-xs font-semibold ${method.badgeClass}`}
              >
                {method.feeLabel}
              </Badge>
              <span className="text-xs text-muted-foreground leading-tight">
                {method.note}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Note:</strong> All UPI payments (PhonePe, Google Pay, Paytm,
            Amazon Pay, BHIM, QR Code) are instant and completely free of
            charge. PayPal incurs a 3% international transaction fee. Card
            payments include a 2% processing fee. Net Banking and Wallets have a
            1% processing fee.
          </span>
        </div>
      </div>
    </div>
  );
}
