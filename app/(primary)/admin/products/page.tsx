'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Link href="/admin/products/new">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Add Product
          </button>
        </Link>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-black rounded">
            <thead className="text-black bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Price (€)</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="px-4 py-2">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={16}
                      height={16}
                      className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2 capitalize">{product.category}</td>
                  <td className="px-4 py-2">€{product.price.toFixed(2)}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <button className="text-blue-600 hover:underline">Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:underline"
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
