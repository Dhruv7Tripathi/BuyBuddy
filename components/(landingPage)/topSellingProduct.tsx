'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  description: string | string[];
  price: number;
  category?: string;
}

interface Props {
  params: { params: string[] };
}

export default function TopSellingProducts({ params }: Props) {
  const category = params?.params?.[0];
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/product');
        const filtered = response.data.filter((p: Product) =>
          p.category?.toLowerCase().includes(category?.toLowerCase())
        );
        setProducts(filtered);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  return (
    <section className="bg-white py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Top Selling Products</h2>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/${product.category ? `shop/list/${product.category}` : '#'}`}
              className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition hover:ring-2 hover:ring-gray-100 focus:outline-none"
            >
              <div className="w-full h-48 flex justify-center items-center">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="object-contain h-full"
                />
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-md font-semibold text-gray-900">{product.title}</h3>
                {(Array.isArray(product.description)
                  ? product.description
                  : [product.description]
                ).map((line, i) => (
                  <p key={i} className="text-sm text-gray-500">
                    {line}
                  </p>
                ))}
              </div>
              <div className="mt-4 flex justify-between items-end">
                <p className="text-lg font-semibold text-gray-800">
                  ${Number(product.price).toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
