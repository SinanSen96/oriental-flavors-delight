import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const p = product.node;
  const variant = p.variants.edges[0]?.node;
  const image = p.images.edges[0]?.node;
  const price = parseFloat(p.priceRange.minVariantPrice.amount).toFixed(2);
  const currency = p.priceRange.minVariantPrice.currencyCode;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`${p.title} wurde hinzugefügt`, { position: "top-center" });
  };

  return (
    <Link to={`/product/${p.handle}`} className="group block">
      <div className="bg-card rounded-lg overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <div className="aspect-square overflow-hidden bg-muted">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || p.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Kein Bild
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-display font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
            {p.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-bold text-primary">
              {currency === 'CHF' ? 'CHF' : currency} {price}
            </span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isLoading || !variant?.availableForSale}
              className="bg-primary hover:bg-olive-dark text-primary-foreground"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
