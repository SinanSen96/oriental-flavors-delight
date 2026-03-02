import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import categoriesBg from "@/assets/categories-bg.jpg";

const categories = [
  {
    name: "Olivenöl",
    description: "Unser kaltgepresstes Bio-Olivenöl wird von Hand geerntet und schonend verarbeitet. Der intensive, fruchtige Geschmack ist das Ergebnis jahrhundertealter Tradition.",
    emoji: "🫒",
    color: "from-olive/20 to-olive/5",
  },
  {
    name: "Gewürze",
    description: "Authentische Gewürze aus der Çukurova-Region. Von Pul Biber bis Sumach – unsere Gewürze bringen die Aromen Anatoliens in Ihre Küche.",
    emoji: "🌶️",
    color: "from-accent/20 to-accent/5",
  },
  {
    name: "Nüsse & Trockenfrüchte",
    description: "Sonnengetrocknete Früchte und naturbelassene Nüsse direkt aus den Gärten und Plantagen unserer Familie. Knackig, frisch und voller Nährstoffe.",
    emoji: "🥜",
    color: "from-secondary/20 to-secondary/5",
  },
  {
    name: "Honig",
    description: "Reiner Blütenhonig von den Wiesen rund um Adana. Unsere Bienen sammeln Nektar von wilden Blumen und Kräutern – für einen einzigartigen Geschmack.",
    emoji: "🍯",
    color: "from-gold/20 to-gold/5",
  },
];

export default function Kategorien() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0">
          <img src={categoriesBg} alt="Unsere Kategorien" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">Unser Sortiment</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-background">Kategorien</h1>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to="/produkte"
                  className={`block bg-gradient-to-br ${cat.color} border border-border/50 rounded-2xl p-8 md:p-10 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group`}
                >
                  <span className="text-6xl block mb-6">{cat.emoji}</span>
                  <h2 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                    {cat.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{cat.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Produkte ansehen <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
