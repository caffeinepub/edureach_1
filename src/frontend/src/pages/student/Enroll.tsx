import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import type { CourseMode } from "../../backend";
import PaymentMethodModal from "../../components/PaymentMethodModal";
import {
  CATEGORY_META,
  SEED_COURSES,
  formatDuration,
  formatFee,
} from "../../data/courses";
import { useActor } from "../../hooks/useActor";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

export default function EnrollPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();

  const { data: allCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => actor!.getAllCourses(),
    enabled: !!actor,
  });

  const courses =
    allCourses && allCourses.length > 0 ? allCourses : SEED_COURSES;
  const course = courses.find((c) => c.id === courseId);

  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [selectedMode, setSelectedMode] = useState<string>("online");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!course)
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Course not found.</p>
        <Button onClick={() => navigate("/courses")} className="mt-4">
          Back to Courses
        </Button>
      </div>
    );

  const meta = CATEGORY_META[course.category] ?? {
    icon: "📚",
    bg: "bg-blue-50",
  };
  const selectedOption = course.durationOptions.find(
    (d) => d.months.toString() === selectedDuration,
  );

  const handleEnrollClick = () => {
    if (!selectedDuration) {
      toast.error("Please select a duration");
      return;
    }
    if (!identity || identity.getPrincipal().isAnonymous()) {
      toast.error("Please login first");
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSelect = async (
    method: string,
    _data?: Record<string, string>,
  ) => {
    if (!actor || !identity || identity.getPrincipal().isAnonymous()) {
      toast.error("Please login first");
      return;
    }

    setIsProcessing(true);
    try {
      const option = course.durationOptions.find(
        (d) => d.months.toString() === selectedDuration,
      )!;

      if (method === "card") {
        // Try Stripe checkout
        try {
          const amountInCents = Number(option.feeInr) * 100;
          const successUrl = `${window.location.origin}/student/dashboard`;
          const cancelUrl = window.location.href;

          const sessionId = await actor.createCheckoutSession(
            [
              {
                productName: course.title,
                productDescription: `${formatDuration(option.months)} - ${selectedMode} mode`,
                quantity: 1n,
                priceInCents: BigInt(amountInCents),
                currency: "inr",
              },
            ],
            successUrl,
            cancelUrl,
          );

          await actor.enroll({
            id: uuidv4(),
            studentId: identity.getPrincipal(),
            courseId: course.id,
            durationMonths: option.months,
            mode: selectedMode as CourseMode,
            status: "pending" as any,
            enrolledAt: BigInt(Date.now() * 1000000),
            paymentId: sessionId,
          });

          window.location.href = sessionId.startsWith("http")
            ? sessionId
            : `https://checkout.stripe.com/pay/${sessionId}`;
          return;
        } catch {
          // Stripe not configured, fall through to demo enrollment
        }
      }

      // For UPI, QR, PayPal, net banking, wallets — record enrollment and show success
      const paymentLabels: Record<string, string> = {
        upi: "UPI",
        qr: "QR Code / UPI",
        paypal: "PayPal",
        netbanking: "Net Banking",
        wallet: "Mobile Wallet",
        card: "Card",
      };

      await actor.enroll({
        id: uuidv4(),
        studentId: identity.getPrincipal(),
        courseId: course.id,
        durationMonths: option.months,
        mode: selectedMode as CourseMode,
        status: "pending" as any,
        enrolledAt: BigInt(Date.now() * 1000000),
        paymentId: `${method}_${Date.now()}`,
      });

      setShowPaymentModal(false);
      toast.success(
        `Enrolled via ${paymentLabels[method] ?? method}! Your enrollment is pending payment confirmation.`,
      );
      navigate("/student/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Enrollment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Enroll in Course</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Complete your enrollment and pay to get started.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl ${meta.bg} flex items-center justify-center text-2xl`}
            >
              {meta.icon}
            </div>
            <div>
              <CardTitle>{course.title}</CardTitle>
              <Badge variant="outline" className="mt-1 capitalize">
                {course.mode}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Duration Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Select Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedDuration}
            onValueChange={setSelectedDuration}
            data-ocid="enrollment.duration.select"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {course.durationOptions.map((d) => (
                <Label
                  key={d.months.toString()}
                  htmlFor={`duration-${d.months}`}
                  className={`border rounded-lg p-4 cursor-pointer transition-all block ${
                    selectedDuration === d.months.toString()
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/40"
                  }`}
                >
                  <RadioGroupItem
                    value={d.months.toString()}
                    id={`duration-${d.months}`}
                    className="sr-only"
                  />
                  <div className="font-semibold">
                    {formatDuration(d.months)}
                  </div>
                  <div className="text-primary font-bold text-lg mt-1">
                    {formatFee(d.feeInr)}
                  </div>
                </Label>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Learning Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedMode}
            onValueChange={setSelectedMode}
            className="flex gap-4"
            data-ocid="enrollment.mode.select"
          >
            {["online", "offline", "hybrid"].map((mode) => (
              <div key={mode} className="flex items-center gap-2">
                <RadioGroupItem value={mode} id={`mode-${mode}`} />
                <Label
                  htmlFor={`mode-${mode}`}
                  className="capitalize cursor-pointer"
                >
                  {mode}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Summary */}
      {selectedOption && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{course.title}</div>
                <div className="text-sm text-muted-foreground">
                  {formatDuration(selectedOption.months)} &bull; {selectedMode}{" "}
                  mode
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-primary">
                  {formatFee(selectedOption.feeInr)}
                </div>
                <div className="text-xs text-muted-foreground">
                  One-time fee
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        className="w-full"
        size="lg"
        onClick={handleEnrollClick}
        disabled={isProcessing || !selectedDuration}
        data-ocid="enrollment.pay_button"
      >
        {isProcessing ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <CheckCircle className="w-4 h-4 mr-2" />
        )}
        {isProcessing
          ? "Processing..."
          : `Pay & Enroll${selectedOption ? ` - ${formatFee(selectedOption.feeInr)}` : ""}`}
      </Button>

      {/* Payment Method Modal */}
      {selectedOption && (
        <PaymentMethodModal
          open={showPaymentModal}
          onOpenChange={setShowPaymentModal}
          amount={Number(selectedOption.feeInr)}
          courseName={course.title}
          onPaymentSelect={handlePaymentSelect}
        />
      )}
    </div>
  );
}
