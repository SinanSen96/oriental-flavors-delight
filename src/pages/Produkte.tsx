import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, PackageX } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

export default function Produkte() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(50)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="pt-16">
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">Shop</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">Unsere Produkte</h1>
            <p className="text-muted-foreground mt-3 max-w-lg">Bio-Qualität direkt aus Adana – von unserer Familie für Ihre Küche.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <PackageX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">Keine Produkte gefunden</h2>
              <p className="text-muted-foreground">Wir arbeiten daran, unser Sortiment aufzubauen. Schauen Sie bald wieder vorbei!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <motion.div
                  key={product.node.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
