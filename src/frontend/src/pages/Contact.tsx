import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We will contact you within 24 hours.");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <div className="text-center">
        <Badge variant="outline" className="mb-3">
          Get in Touch
        </Badge>
        <h1 className="font-display text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Have questions about our courses? We're here to help. Reach out
          through any of the channels below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-semibold">
            Institute Information
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: MapPin,
                label: "Address",
                value:
                  "Village – Hasuwa Balauda, District – BalodaBazar, Near Gidhauri, Chhattisgarh",
              },
              { icon: Phone, label: "Phone", value: "9279120271" },
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: "9279120271",
              },
              {
                icon: Mail,
                label: "Email",
                value: "santoshprasad8891@gmail.com",
              },
              {
                icon: Clock,
                label: "Office Hours",
                value: "Monday – Saturday: 9:00 AM – 7:00 PM",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto"
            asChild
          >
            <a
              href="https://wa.me/919279120271"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </a>
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h2 className="font-display text-xl font-semibold mb-4">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    required
                    data-ocid="contact.name.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+91 XXXXXXXXXX"
                    data-ocid="contact.phone.input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  data-ocid="contact.email.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your interest or questions..."
                  rows={4}
                  required
                  data-ocid="contact.message.textarea"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                data-ocid="contact.submit_button"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
