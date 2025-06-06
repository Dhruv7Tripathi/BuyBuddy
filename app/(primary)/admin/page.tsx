"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !description || !price || !imageUrl) {
      setError("Please fill out all fields.");
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    try {
      await axios.post("/api/product", {
        title,
        description,
        price: numericPrice,
        imageUrl,
      });
      router.push("/shop/watches");
    } catch (err) {
      console.error(err);
      setError("Failed to add the product.");
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-black">
        <Sidebar className="w-64 border-r bg-white">
          <SidebarHeader>
            <h1 className="text-lg font-semibold p-4">Admin Panel</h1>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <div className="p-4">
                <nav className="space-y-2">
                  <a href="/admin/products" className="block p-2 hover:bg-gray-600 rounded">
                    Products
                  </a>
                  <a href="/admin/orders" className="block p-2 hover:bg-gray-600 rounded">
                    Orders
                  </a>
                  <a href="/admin/users" className="block p-2 hover:bg-gray-600 rounded">
                    Users
                  </a>
                </nav>
              </div>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 border-t">
              <p className="text-sm text-white">Admin Dashboard</p>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex items-center bg-black ml-20 justify-center p-10">
          <form
            onSubmit={handleSubmit}
            className="bg-black p-6 rounded shadow-md w-full max-w-md"
          >
            <h2 className="text-2xl text-white font-bold mb-4">Add New Product</h2>
            {error && (
              <p className="text-red-500 mb-4">{error}</p>
            )}
            <div className="mb-4">
              <label className="block text-gray-400 font-medium mb-2">Title</label>
              <input
                type="text"
                className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 font-medium mb-2">Description</label>
              <textarea
                className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 font-medium mb-2">Price ($)</label>
              <input
                type="number"
                className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                step="0.01"
                min="0"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-400 font-medium mb-2">Image URL</label>
              <input
                type="url"
                className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </SidebarProvider>
  );
}