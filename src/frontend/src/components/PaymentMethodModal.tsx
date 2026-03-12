import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  CheckCircle,
  Copy,
  CreditCard,
  ExternalLink,
  Loader2,
  QrCode,
  Smartphone,
  Tag,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  courseName: string;
  onPaymentSelect: (
    method: string,
    data?: Record<string, string>,
  ) => Promise<void>;
}

const UPI_ID = "edureach@upi";
const MERCHANT_NAME = "EduReach Institute";

// Processing fee percentages per tab
const TAB_FEES: Record<
  string,
  { pct: number; label: string; isFreed: boolean }
> = {
  upi: { pct: 0, label: "0% — Free", isFreed: true },
  qr: { pct: 0, label: "0% — Free", isFreed: true },
  card: { pct: 2, label: "2% processing fee", isFreed: false },
  more: { pct: 3, label: "Up to 3% applies", isFreed: false },
};

const UPI_APPS = [
  {
    id: "phonepe",
    name: "PhonePe",
    color: "bg-purple-600",
    textColor: "text-white",
    emoji: "📱",
    deepLink: (amount: number, upiId: string, name: string) =>
      `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=Course+Enrollment`,
  },
  {
    id: "googlepay",
    name: "Google Pay",
    color: "bg-white border border-gray-200",
    textColor: "text-gray-800",
    emoji: "🔵",
    deepLink: (amount: number, upiId: string, name: string) =>
      `tez://upi/pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=Course+Enrollment`,
  },
  {
    id: "paytm",
    name: "Paytm",
    color: "bg-sky-500",
    textColor: "text-white",
    emoji: "💸",
    deepLink: (amount: number, upiId: string, name: string) =>
      `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`,
  },
  {
    id: "bhim",
    name: "BHIM UPI",
    color: "bg-orange-600",
    textColor: "text-white",
    emoji: "🇮🇳",
    deepLink: (amount: number, upiId: string, name: string) =>
      `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=Course+Enrollment`,
  },
  {
    id: "amazonpay",
    name: "Amazon Pay",
    color: "bg-yellow-400",
    textColor: "text-gray-900",
    emoji: "📦",
    deepLink: (amount: number, upiId: string, name: string) =>
      `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`,
  },
  {
    id: "cred",
    name: "CRED Pay",
    color: "bg-gray-900",
    textColor: "text-white",
    emoji: "💳",
    deepLink: (amount: number, upiId: string, name: string) =>
      `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`,
  },
];

export default function PaymentMethodModal({
  open,
  onOpenChange,
  amount,
  courseName,
  onPaymentSelect,
}: PaymentMethodModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [activeTab, setActiveTab] = useState("upi");

  const feeInfo = TAB_FEES[activeTab] ?? TAB_FEES.upi;
  const feeAmount = Math.round((amount * feeInfo.pct) / 100);
  const totalAmount = amount + feeAmount;

  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  const amountDisplay = fmt(amount);

  const qrData = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Course: ${courseName}`)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

  const handleUpiAppPay = (app: (typeof UPI_APPS)[0]) => {
    const link = app.deepLink(amount, UPI_ID, MERCHANT_NAME);
    window.location.href = link;
    setTimeout(() => {
      toast.info(
        `Opening ${app.name}... If it didn't open, use UPI ID: ${UPI_ID}`,
      );
    }, 1000);
  };

  const handleManualUpi = async () => {
    if (!upiId.includes("@")) {
      toast.error("Enter a valid UPI ID (e.g. yourname@bank)");
      return;
    }
    setIsProcessing(true);
    await onPaymentSelect("upi", { upiId });
    setIsProcessing(false);
  };

  const handleCard = async () => {
    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
      toast.error("Please fill all card details");
      return;
    }
    setIsProcessing(true);
    await onPaymentSelect("card", { cardName });
    setIsProcessing(false);
  };

  const handlePayPal = async () => {
    setIsProcessing(true);
    await onPaymentSelect("paypal");
    setIsProcessing(false);
  };

  const handleNetBanking = async () => {
    if (!selectedBank) {
      toast.error("Please select your bank");
      return;
    }
    setIsProcessing(true);
    await onPaymentSelect("netbanking", { bank: selectedBank });
    setIsProcessing(false);
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast.success("UPI ID copied!");
  };

  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Bank of Baroda",
    "Punjab National Bank",
    "Canara Bank",
    "Union Bank of India",
    "Yes Bank",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="payment.modal"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Choose Payment Method
          </DialogTitle>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-muted-foreground">{courseName}</p>
            <Badge className="bg-green-100 text-green-800 border-green-200 text-base font-bold px-3 py-1">
              {amountDisplay}
            </Badge>
          </div>
        </DialogHeader>

        {/* Fee Breakdown Banner */}
        <div
          className={`rounded-lg px-4 py-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${
            feeInfo.isFreed
              ? "bg-green-50 border border-green-200"
              : "bg-amber-50 border border-amber-200"
          }`}
          data-ocid="payment.fee_breakdown.panel"
        >
          <Tag
            className={`w-4 h-4 flex-shrink-0 ${feeInfo.isFreed ? "text-green-600" : "text-amber-600"}`}
          />
          <span className="text-muted-foreground">
            Course fee:{" "}
            <span className="font-semibold text-foreground">{fmt(amount)}</span>
          </span>
          <span className="text-muted-foreground">+</span>
          <span
            className={
              feeInfo.isFreed
                ? "text-green-700 font-medium"
                : "text-amber-700 font-medium"
            }
          >
            {feeInfo.isFreed
              ? "No processing charges"
              : `Processing: ${fmt(feeAmount)} (${feeInfo.pct}%)`}
          </span>
          <span className="text-muted-foreground">=</span>
          <span className="font-bold text-foreground">
            Total: {fmt(totalAmount)}
          </span>
        </div>

        <Tabs
          defaultValue="upi"
          className="mt-2"
          data-ocid="payment.tab"
          onValueChange={(v) => setActiveTab(v)}
        >
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="upi" data-ocid="payment.upi.tab">
              <Smartphone className="w-3.5 h-3.5 mr-1" /> UPI
            </TabsTrigger>
            <TabsTrigger value="qr" data-ocid="payment.qr.tab">
              <QrCode className="w-3.5 h-3.5 mr-1" /> QR
            </TabsTrigger>
            <TabsTrigger value="card" data-ocid="payment.card.tab">
              <CreditCard className="w-3.5 h-3.5 mr-1" /> Card
            </TabsTrigger>
            <TabsTrigger value="more" data-ocid="payment.more.tab">
              <Building2 className="w-3.5 h-3.5 mr-1" /> More
            </TabsTrigger>
          </TabsList>

          {/* UPI Apps Tab */}
          <TabsContent value="upi" className="space-y-4 mt-4">
            <p className="text-sm font-medium text-muted-foreground">
              Pay instantly using your UPI app &mdash;{" "}
              <span className="text-green-600 font-semibold">Zero charges</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              {UPI_APPS.map((app) => (
                <button
                  type="button"
                  key={app.id}
                  onClick={() => handleUpiAppPay(app)}
                  data-ocid={`payment.${app.id}.button`}
                  className={`${app.color} ${app.textColor} rounded-xl p-3 flex flex-col items-center gap-1 text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm`}
                >
                  <span className="text-2xl">{app.emoji}</span>
                  <span className="text-xs leading-tight text-center">
                    {app.name}
                  </span>
                  <span className="text-[10px] opacity-80 font-normal">
                    Free (0%)
                  </span>
                </button>
              ))}
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-2">Enter UPI ID manually</p>
              <div className="flex gap-2">
                <Input
                  placeholder="yourname@bank"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  data-ocid="payment.upi.input"
                />
                <Button
                  onClick={handleManualUpi}
                  disabled={isProcessing}
                  data-ocid="payment.upi.submit_button"
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Pay"
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* QR Code Tab */}
          <TabsContent value="qr" className="mt-4">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-4 rounded-xl border shadow-inner">
                <img
                  src={qrUrl}
                  alt="UPI Payment QR Code"
                  className="w-48 h-48"
                  data-ocid="payment.qr.canvas_target"
                />
              </div>
              <div className="text-center space-y-1">
                <p className="font-semibold text-lg">{amountDisplay}</p>
                <p className="text-sm text-muted-foreground">
                  Scan with any UPI app to pay
                </p>
                <p className="text-xs text-green-600 font-medium">
                  ✓ No extra charges — Free (0%)
                </p>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 mt-2">
                  <span className="text-sm font-mono text-gray-700">
                    {UPI_ID}
                  </span>
                  <button
                    type="button"
                    onClick={copyUpiId}
                    data-ocid="payment.qr.copy_button"
                    className="text-primary hover:text-primary/70"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {["PhonePe", "Google Pay", "Paytm", "BHIM", "Amazon Pay"].map(
                  (app) => (
                    <Badge key={app} variant="outline" className="text-xs">
                      {app}
                    </Badge>
                  ),
                )}
              </div>
              <Button
                className="w-full"
                onClick={() => onPaymentSelect("qr")}
                disabled={isProcessing}
                data-ocid="payment.qr.submit_button"
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4 mr-2" />
                )}
                I have completed the payment
              </Button>
            </div>
          </TabsContent>

          {/* Card Tab */}
          <TabsContent value="card" className="space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Credit / Debit Card
              </p>
              <Badge
                variant="outline"
                className="text-xs border-amber-300 text-amber-700 bg-amber-50"
              >
                2% processing fee applies
              </Badge>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input
                  id="card-name"
                  placeholder="Name on card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  data-ocid="payment.card.name_input"
                />
              </div>
              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 16);
                    setCardNumber(val.replace(/(\d{4})/g, "$1 ").trim());
                  }}
                  data-ocid="payment.card.number_input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="card-expiry">Expiry</Label>
                  <Input
                    id="card-expiry"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setCardExpiry(
                        val.length > 2
                          ? `${val.slice(0, 2)}/${val.slice(2)}`
                          : val,
                      );
                    }}
                    data-ocid="payment.card.expiry_input"
                  />
                </div>
                <div>
                  <Label htmlFor="card-cvv">CVV</Label>
                  <Input
                    id="card-cvv"
                    placeholder="123"
                    maxLength={4}
                    type="password"
                    value={cardCvv}
                    onChange={(e) =>
                      setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    data-ocid="payment.card.cvv_input"
                  />
                </div>
              </div>
              <Button
                className="w-full"
                onClick={handleCard}
                disabled={isProcessing}
                data-ocid="payment.card.submit_button"
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CreditCard className="w-4 h-4 mr-2" />
                )}
                Pay {fmt(totalAmount)} Securely
              </Button>
              {feeAmount > 0 && (
                <p className="text-xs text-center text-amber-600">
                  Includes {fmt(feeAmount)} processing fee (2%)
                </p>
              )}
            </div>
            <p className="text-xs text-center text-muted-foreground">
              🔒 256-bit SSL encrypted
            </p>
          </TabsContent>

          {/* More Options Tab */}
          <TabsContent value="more" className="space-y-4 mt-4">
            {/* PayPal */}
            <div className="border rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🅿️</span>
                <span className="font-semibold">PayPal</span>
                <Badge variant="outline" className="text-xs ml-auto">
                  International
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs border-amber-300 text-amber-700 bg-amber-50"
                >
                  3% fee
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Pay securely using your PayPal account. 3% international fee
                applies.
              </p>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handlePayPal}
                disabled={isProcessing}
                data-ocid="payment.paypal.button"
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ExternalLink className="w-4 h-4 mr-2" />
                )}
                Continue with PayPal ({fmt(Math.round(amount * 1.03))})
              </Button>
            </div>

            {/* Net Banking */}
            <div className="border rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="font-semibold">Net Banking</span>
                <Badge
                  variant="outline"
                  className="text-xs ml-auto border-amber-300 text-amber-700 bg-amber-50"
                >
                  1% fee
                </Badge>
              </div>
              <div>
                <Label htmlFor="bank-select">Select Your Bank</Label>
                <select
                  id="bank-select"
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  data-ocid="payment.netbanking.select"
                  className="w-full mt-1 border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">-- Select bank --</option>
                  {banks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                className="w-full"
                variant="outline"
                onClick={handleNetBanking}
                disabled={isProcessing}
                data-ocid="payment.netbanking.submit_button"
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Building2 className="w-4 h-4 mr-2" />
                )}
                Pay via Net Banking ({fmt(Math.round(amount * 1.01))})
              </Button>
            </div>

            {/* Wallets */}
            <div className="border rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">Mobile Wallets</p>
                <Badge
                  variant="outline"
                  className="text-xs border-amber-300 text-amber-700 bg-amber-50"
                >
                  1% fee
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "Paytm Wallet", emoji: "💸", id: "paytm_wallet" },
                  { name: "Mobikwik", emoji: "🔷", id: "mobikwik" },
                  { name: "Freecharge", emoji: "⚡", id: "freecharge" },
                ].map((wallet) => (
                  <button
                    type="button"
                    key={wallet.id}
                    data-ocid={`payment.${wallet.id}.button`}
                    onClick={() =>
                      onPaymentSelect("wallet", { wallet: wallet.name })
                    }
                    className="border rounded-lg p-2 flex flex-col items-center gap-1 hover:border-primary hover:bg-primary/5 transition-all text-xs font-medium"
                  >
                    <span className="text-xl">{wallet.emoji}</span>
                    {wallet.name}
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-center gap-4 pt-2 border-t mt-2">
          <span className="text-xs text-muted-foreground">Secured by</span>
          {["Razorpay", "Stripe", "PayU"].map((gw) => (
            <span
              key={gw}
              className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
            >
              {gw}
            </span>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
