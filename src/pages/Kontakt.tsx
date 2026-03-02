import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name ist erforderlich").max(100),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(255),
  subject: z.string().trim().min(1, "Betreff ist erforderlich").max(200),
  message: z.string().trim().min(1, "Nachricht ist erforderlich").max(2000),
});

export default function Kontakt() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSending(true);
    // Simulate send (would be edge function with real email sending)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSending(false);
    setSent(true);
    toast.success("Nachricht gesendet!", { position: "top-center" });
  };

  return (
    <main className="pt-16">
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">Kontakt</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">Schreiben Sie uns</h1>
            <p className="text-muted-foreground mt-3 max-w-lg">Haben Sie Fragen zu unseren Produkten? Wir freuen uns auf Ihre Nachricht.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">E-Mail</h3>
                  <a href="mailto:info@orientalfoods.ch" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    info@orientalfoods.ch
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Standort</h3>
                  <p className="text-sm text-muted-foreground">Schweiz</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/5 rounded-2xl p-12 text-center"
                >
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">Vielen Dank!</h2>
                  <p className="text-muted-foreground">Ihre Nachricht wurde gesendet. Wir melden uns so bald wie möglich bei Ihnen.</p>
                  <Button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }} variant="outline" className="mt-6">
                    Neue Nachricht
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Ihr Name"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">E-Mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ihre@email.ch"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Betreff</Label>
                    <Input
                      id="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Worum geht es?"
                      className={errors.subject ? "border-destructive" : ""}
                    />
                    {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                  </div>
                  <div>
                    <Label htmlFor="message">Nachricht</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Ihre Nachricht an uns..."
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                  </div>
                  <Button type="submit" size="lg" disabled={sending} className="bg-primary hover:bg-olive-dark text-primary-foreground">
                    {sending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                    Nachricht senden
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
