'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
// import Link from 'next/link';
import Loader from '@/components/(landingPage)/loading';

type Order = {
  id: string;
  user: {
    name: string;
    email: string;
  };
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  createdAt: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/orders')
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Error fetching orders:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      console.error('Failed to delete order:', err);
      alert('Error deleting order.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Orders</h1>
      </div>

      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <p className="text-black">No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white">
          <table className="min-w-full border border-gray-300 rounded bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left border-b">Order ID</th>
                <th className="px-4 py-2 text-left border-b">Customer</th>
                <th className="px-4 py-2 text-left border-b">Status</th>
                <th className="px-4 py-2 text-left border-b">Total</th>
                <th className="px-4 py-2 text-left border-b">Date</th>
                <th className="px-4 py-2 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">
                    <div>
                      <div className="font-medium">{order.user?.name || 'Unknown'}</div>
                      <div className="text-sm text-gray-500">{order.user?.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-2 capitalize">{order.status}</td>
                  <td className="px-4 py-2">${Number(order.total).toFixed(2)}</td>
                  <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(order.id)}
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
