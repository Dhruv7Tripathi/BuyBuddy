"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export default function WishlistPage() {
  const { status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [wishLists, setWishLists] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
      fetchLists();
    }
  }, [status]);

  const fetchLists = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/wishlist/get");
      setWishLists(response.data?.wishlists || []);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to fetch wishlist");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishLists((prev) => prev.filter((item) => item.id !== productId));
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  const addToCart = (product: WishlistProduct) => {
    if (!product.inStock) {
      toast({
        title: "Out of stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const moveToCart = (product: WishlistProduct) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (loading) {
    return <div className="text-center py-10">Loading your wishlist...</div>;
  }

  if (wishLists.length === 0) {
    return (
      <div className="bg-white container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <Heart className="h-24 w-24 text-muted-foreground mb-6" />
          <h1 className="text-3xl text-black font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-8 max-w-md">
            Save items you love by clicking the heart icon on any product. They'll appear here for easy access later.
          </p>
          <Button asChild
            className="w-full max-w-xs"
            variant="outline"
          >
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground mt-2">
            {wishLists.length} {wishLists.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishLists.map((product) => (
          <Card key={product.id} className="group relative overflow-hidden">
            <div className="relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              {!product.inStock && (
                <Badge variant="secondary" className="absolute top-2 left-2">
                  Out of Stock
                </Badge>
              )}
              {product.originalPrice && (
                <Badge variant="destructive" className="absolute top-2 right-2">
                  Sale
                </Badge>
              )}
              <Button
                size="icon"
                variant="outline"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={() => removeFromWishlist(product.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <CardContent className="p-4">
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>

                <h3 className="font-semibold text-lg line-clamp-2 min-h-[3.5rem]">{product.name}</h3>

                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" onClick={() => addToCart(product)} disabled={!product.inStock}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" onClick={() => moveToCart(product)} disabled={!product.inStock}>
                    Move to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Looking for more?</h2>
        <p className="text-muted-foreground mb-6">Discover more products you might love</p>
        <Button asChild>
          <Link href="/products">Browse All Products</Link>
        </Button>
      </div>
    </div>
  );
}
