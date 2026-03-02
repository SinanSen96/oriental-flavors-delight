import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Heart, Sun, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-olive-oil.jpg";
import heroImage2 from "@/assets/hero-image.png";

const features = [
  { icon: Leaf, title: "100% Bio", desc: "Natürlich angebaut ohne Pestizide" },
  { icon: Heart, title: "Familiär", desc: "Seit Generationen in Familienhand" },
  { icon: Sun, title: "Sonnenreif", desc: "Unter der Sonne Adanas gereift" },
  { icon: Droplets, title: "Kaltgepresst", desc: "Schonende Verarbeitung" },
];

const categories = [
  { name: "Olivenöl", desc: "Premium kaltgepresstes Olivenöl", emoji: "🫒" },
  { name: "Gewürze", desc: "Authentische orientalische Gewürze", emoji: "🌶️" },
  { name: "Nüsse & Trockenfrüchte", desc: "Naturbelassen & knackig", emoji: "🥜" },
  { name: "Honig", desc: "Reiner Blütenhonig aus der Region", emoji: "🍯" },
];

export default function Index() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Premium Olivenöl" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gold font-medium tracking-widest uppercase text-sm mb-4"
            >
              Premium Bio-Produkte aus Adana
            </motion.p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-background leading-tight mb-6">
              Das flüssige{" "}
              <span className="text-gold">Gold</span>{" "}
              der Türkei
            </h1>
            <p className="text-background/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg font-light">
              Entdecken Sie unser kaltgepresstes Bio-Olivenöl und regionale Spezialitäten – direkt von unserer Familie zu Ihnen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-gold text-accent-foreground font-semibold px-8">
                <Link to="/produkte">Jetzt entdecken <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-background/30 text-background hover:bg-background/10">
                <Link to="/ueber-uns">Unsere Geschichte</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 text-primary-foreground"
              >
                <f.icon className="h-5 w-5 text-gold shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{f.title}</p>
                  <p className="text-xs text-primary-foreground/70">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image showcase */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">Direkt vom Feld</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Natur pur aus <span className="text-primary">Adana</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Unsere Produkte werden auf den fruchtbaren Böden Adanas angebaut, von Hand geerntet und mit grösster Sorgfalt verarbeitet. Jedes Produkt erzählt eine Geschichte von Tradition und Qualität.
              </p>
              <Button asChild className="bg-primary hover:bg-olive-dark text-primary-foreground">
                <Link to="/ueber-uns">Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src={heroImage2} alt="Orientalische Produkte" className="w-full h-[400px] object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">Unser Sortiment</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Unsere Kategorien
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to="/kategorien"
                  className="block bg-card border border-border/50 rounded-xl p-8 text-center hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
                >
                  <span className="text-5xl block mb-4">{cat.emoji}</span>
                  <h3 className="font-display font-semibold text-card-foreground group-hover:text-primary transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{cat.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/produkte">Alle Produkte ansehen <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Bereit für echte <span className="text-gold">Qualität</span>?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg mx-auto">
              Entdecken Sie den Geschmack des Mittelmeers. Bio, familiär und direkt zu Ihnen nach Hause.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-gold text-accent-foreground font-semibold px-8">
              <Link to="/produkte">Jetzt einkaufen <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
