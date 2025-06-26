'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '@/components/(landingPage)/loading';

type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
};

export default function AdminProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/product')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/product/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Manage Products</h1>
        <Link href="/admin/products/new">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
            + Add Product
          </button>
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <p className="text-black">No products found.</p>
      ) : (
        <div className="overflow-x-auto bg-white">
          <table className="min-w-full border border-gray-300 rounded bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-black border-b border-gray-300">Image</th>
                <th className="px-4 py-2 text-left text-black border-b border-gray-300">Title</th>
                <th className="px-4 py-2 text-left text-black border-b border-gray-300">Category</th>
                <th className="px-4 py-2 text-left text-black border-b border-gray-300">Price</th>
                <th className="px-4 py-2 text-left text-black border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={16}
                      height={16}
                      className="w-16 h-16 object-cover rounded border border-gray-200"
                    />
                  </td>
                  <td className="px-4 py-2 text-black">{product.title}</td>
                  <td className="px-4 py-2 capitalize text-black">{product.category}</td>
                  <td className="px-4 py-2 text-black">
                    ${Number(product.price).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <button className="text-green-600 hover:text-emerald-800 hover:underline transition-colors">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800 hover:underline transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
