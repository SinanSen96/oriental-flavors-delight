import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    if (!handle) return;
    fetchProductByHandle(handle)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Produkt nicht gefunden</h1>
          <Button asChild variant="outline">
            <Link to="/produkte"><ArrowLeft className="h-4 w-4 mr-2" /> Zurück zu Produkte</Link>
          </Button>
        </div>
      </main>
    );
  }

  const variant = product.variants.edges[selectedVariantIdx]?.node;
  const images = product.images.edges;

  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`${product.title} wurde hinzugefügt`, { position: "top-center" });
  };

  return (
    <main className="pt-16">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <Button asChild variant="ghost" className="mb-6 text-muted-foreground">
          <Link to="/produkte"><ArrowLeft className="h-4 w-4 mr-2" /> Zurück</Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
              {images[selectedImage]?.node ? (
                <img
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">Kein Bild</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      i === selectedImage ? "border-primary" : "border-border"
                    }`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{product.title}</h1>
              <p className="text-3xl font-bold text-primary">
                CHF {parseFloat(variant?.price.amount || "0").toFixed(2)}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Variants */}
            {product.options?.length > 0 && product.options[0].name !== "Title" && (
              <div className="space-y-3">
                {product.options.map((option: any, oi: number) => (
                  <div key={option.name}>
                    <label className="text-sm font-medium text-foreground mb-2 block">{option.name}</label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((val: string) => {
                        const isSelected = variant?.selectedOptions?.[oi]?.value === val;
                        return (
                          <button
                            key={val}
                            onClick={() => {
                              const idx = product.variants.edges.findIndex((v: any) =>
                                v.node.selectedOptions[oi]?.value === val
                              );
                              if (idx >= 0) setSelectedVariantIdx(idx);
                            }}
                            className={`px-4 py-2 rounded-md text-sm border transition-colors ${
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary text-foreground"
                            }`}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-primary" /> Bio-zertifiziert
              <Check className="h-4 w-4 text-primary ml-4" /> Schweizweiter Versand
            </div>

            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={isLoading || !variant?.availableForSale}
              className="w-full bg-primary hover:bg-olive-dark text-primary-foreground text-lg py-6"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  In den Warenkorb
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
