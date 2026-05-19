"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";


export default function DeliveriesAdminPage() {
  const orders = useQuery(api.orders.listAllOrders);
  const updateStatus = useMutation(api.orders.updateOrderStatus);
  const bookShipmentAction = useAction(api.shipping.bookShipment);
  
  const [updating, setUpdating] = useState<string | null>(null);

  const handleStatusChange = async (orderId: Id<"orders">, newStatus: string) => {
    setUpdating(orderId);
    try {
      await updateStatus({ orderId, status: newStatus });
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  const handleBookShipment = async (orderId: Id<"orders">) => {
    setUpdating(orderId);
    try {
      const result = await bookShipmentAction({ orderId });
      if (result.success) {
        alert(`Shipment booked successfully via ${result.courierName}!\nAWB: ${result.awbCode}`);
      } else {
        alert("Failed to book shipment");
      }
    } catch (err: any) {
      console.error("Fulfillment error:", err);
      alert(`Fulfillment Error: ${err.message || err}`);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <main className="min-h-screen bg-butter">
      <Navbar />
      <div className="h-[100px]" /> {/* Spacer */}

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="font-display text-4xl text-zuzu-blue mb-2">Delivery & Logistics</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Zuzu Minis Fulfillment Console</p>
          </div>
          <Link 
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 border border-black/10 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all"
          >
            ← Admin Dashboard
          </Link>
        </div>

        {!orders ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zuzu-blue" />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm">
            <p className="text-gray-500 font-medium">No orders found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-500">
                  <tr>
                    <th className="px-6 py-4 font-bold">Order ID</th>
                    <th className="px-6 py-4 font-bold">Customer & Address</th>
                    <th className="px-6 py-4 font-bold">Items & Total</th>
                    <th className="px-6 py-4 font-bold">Fulfillment Status</th>
                    <th className="px-6 py-4 font-bold">Courier & Tracking</th>
                    <th className="px-6 py-4 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-[10px] text-gray-400">
                        {order._id.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{order.customerInfo.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{order.customerInfo.phone}</p>
                        <p className="text-gray-400 text-xs mt-0.5 max-w-[220px] truncate" title={order.customerInfo.address}>
                          {order.customerInfo.address}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900 font-medium">
                          {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">₹{order.total}</p>
                        <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                          order.paymentMethod === 'ONLINE' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === 'pending' || order.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-700' :
                          order.status === 'paid' ? 'bg-green-100 text-green-700' :
                          order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                          order.status === 'delivered' ? 'bg-zuzu-blue/10 text-zuzu-blue' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        {order.awbCode ? (
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900">{order.courierName}</p>
                            <p className="text-gray-400 text-[10px] font-mono">AWB: {order.awbCode}</p>
                            <a 
                              href={order.trackingUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-zuzu-blue hover:underline text-[10px] font-bold uppercase tracking-wider block"
                            >
                              Track Shipment →
                            </a>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Not Shipped Yet</span>
                        )}
                      </td>
                      <td className="px-6 py-4 space-y-2">
                        <div className="flex gap-2">
                          <select 
                            className="bg-white border border-gray-200 rounded-lg text-xs px-2 py-1.5 outline-none focus:border-zuzu-blue cursor-pointer disabled:opacity-50"
                            value={order.status}
                            disabled={updating === order._id}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="pending_payment">Pending Payment</option>
                            <option value="paid">Paid</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>

                          {!order.awbCode && (
                            <button
                              onClick={() => handleBookShipment(order._id)}
                              disabled={updating === order._id}
                              className="bg-zuzu-blue text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-opacity whitespace-nowrap"
                            >
                              Book Shiprocket
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
