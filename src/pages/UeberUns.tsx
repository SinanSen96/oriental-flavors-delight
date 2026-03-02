import { motion } from "framer-motion";
import { Leaf, Users, MapPin, Award } from "lucide-react";
import heroImage2 from "@/assets/hero-image-2.png";

const values = [
  { icon: Leaf, title: "100% Bio", desc: "Alle unsere Produkte werden ohne den Einsatz von Pestiziden oder chemischen Düngemitteln angebaut." },
  { icon: Users, title: "Familienbetrieb", desc: "Seit Generationen bewirtschaftet unsere Familie die Felder in der Çukurova-Region rund um Adana." },
  { icon: MapPin, title: "Direkt aus Adana", desc: "Von den sonnenverwöhnten Feldern Südanatoliens direkt zu Ihnen in die Schweiz." },
  { icon: Award, title: "Premium Qualität", desc: "Jedes Produkt wird sorgfältig ausgewählt, geprüft und mit höchstem Qualitätsanspruch verarbeitet." },
];

export default function UeberUns() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-cream py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">Über Uns</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Unsere <span className="text-primary">Geschichte</span>
              </h1>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  OrientalFoods ist mehr als nur ein Online-Shop – es ist eine Brücke zwischen den fruchtbaren Feldern Adanas und den Küchen der Schweiz. Unsere Geschichte beginnt in der sonnenverwöhnten Çukurova-Ebene, wo unsere Familie seit Generationen Olivenbäume pflegt, Gewürze anbaut und Honig erntet.
                </p>
                <p>
                  Jeder Tropfen unseres Olivenöls erzählt von der Liebe zur Natur und dem Respekt vor der Tradition. Die Oliven werden von Hand gepflückt und innerhalb weniger Stunden kaltgepresst – für ein Öl von unvergleichlicher Frische und Reinheit.
                </p>
                <p>
                  Mit OrientalFoods bringen wir diese Tradition in die Schweiz. Alle unsere Produkte sind Bio-zertifiziert, lokal angebaut und zu 100% ein Familienprodukt.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src={heroImage2} alt="Unsere Familie" className="w-full h-[450px] object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">Unsere Werte</p>
            <h2 className="font-display text-4xl font-bold text-foreground">Was uns ausmacht</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">Vom Feld auf den Tisch</p>
            <h2 className="font-display text-4xl font-bold">Unser Prozess</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Anbau", desc: "Bio-Anbau auf familieneigenen Feldern in Adana" },
              { step: "02", title: "Ernte", desc: "Handverlesene Ernte zum optimalen Reifezeitpunkt" },
              { step: "03", title: "Verarbeitung", desc: "Schonende Kaltpressung und Verarbeitung" },
              { step: "04", title: "Lieferung", desc: "Frisch verpackt und direkt in die Schweiz geliefert" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <span className="text-5xl font-display font-bold text-gold/30">{item.step}</span>
                <h3 className="font-display text-xl font-semibold mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-primary-foreground/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
