import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">
              Oriental<span className="text-gold">Foods</span>
            </h3>
            <p className="text-background/70 text-sm leading-relaxed">
              Premium Bio-Produkte direkt aus Adana, Türkei. 100% familiär, lokal angebaut und mit Liebe geerntet.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Home", path: "/" },
                { label: "Kategorien", path: "/kategorien" },
                { label: "Produkte", path: "/produkte" },
                { label: "Über Uns", path: "/ueber-uns" },
                { label: "Kontakt", path: "/kontakt" },
              ].map((item) => (
                <Link key={item.path} to={item.path} className="text-sm text-background/70 hover:text-gold transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Kontakt</h4>
            <p className="text-sm text-background/70">info@orientalfoods.ch</p>
            <p className="text-sm text-background/70 mt-2">orientalfoods.ch</p>
          </div>
        </div>
        <div className="border-t border-background/10 mt-12 pt-8 text-center">
          <p className="text-xs text-background/50">© {new Date().getFullYear()} OrientalFoods. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
