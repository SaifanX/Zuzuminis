"use client";

import React from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { 
  Package, 
  Image as ImageIcon, 
  Settings, 
  AlertCircle, 
  CheckCircle2, 
  Truck, 
  MessageSquare, 
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  FileText,
  LogOut
} from "lucide-react";

export default function AdminDashboardPage() {
  const status = useQuery(api.admin.getSystemStatus);
  const logout = useMutation(api.adminAuth.logout);

  const handleLogout = async () => {
    const savedToken = localStorage.getItem("zuzu_admin_token");
    if (savedToken) {
      try {
        await logout({ token: savedToken });
      } catch (err) {
        console.error("Logout error:", err);
      }
      localStorage.removeItem("zuzu_admin_token");
    }
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-butter via-amber-50/20 to-orange-50/30 selection:bg-zuzu-blue selection:text-white">
      <Navbar />
      <div className="h-[100px]" /> {/* Spacer */}

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-zuzu-blue animate-ping" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Boutique Control Hub</p>
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-gray-900 leading-tight">
              Admin <span className="text-zuzu-blue">Dashboard</span>
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-black/10 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all w-fit"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
            </Link>
            <button 
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-red-500/20 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-red-600 hover:text-white transition-all w-fit cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Log Out
            </button>
          </div>
        </div>

        {!status ? (
          <div className="flex justify-center items-center py-32">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-zuzu-blue border-t-transparent rounded-full animate-spin" />
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Loading System Telemetry...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: "Total Orders", 
                  value: status.totalOrders, 
                  sub: "All placed sales", 
                  color: "bg-zuzu-blue/10 text-zuzu-blue", 
                  icon: FileText 
                },
                { 
                  title: "Pending Fulfillment", 
                  value: status.pendingFulfillments, 
                  sub: "Awaiting packaging / booking", 
                  color: "bg-zuzu-orange/10 text-zuzu-orange", 
                  icon: Package 
                },
                { 
                  title: "Shipped orders", 
                  value: status.shippedOrders, 
                  sub: "In-transit with courier", 
                  color: "bg-zuzu-pink/10 text-zuzu-pink", 
                  icon: Truck 
                },
                { 
                  title: "Delivered Packages", 
                  value: status.deliveredOrders, 
                  sub: "Successfully completed", 
                  color: "bg-green-100 text-green-700", 
                  icon: CheckCircle2 
                },
              ].map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <div key={i} className="bg-white/40 backdrop-blur-xl border border-white/50 p-6 rounded-[2rem] shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">{metric.title}</p>
                      <h3 className="text-3xl font-display text-gray-900 mb-1">{metric.value}</h3>
                      <p className="text-[10px] text-gray-500 font-medium">{metric.sub}</p>
                    </div>
                    <div className={`p-4 rounded-2xl ${metric.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main Navigation Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Deliveries Module */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[3rem] p-8 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                <div>
                  <div className="w-14 h-14 bg-zuzu-blue/10 rounded-2xl flex items-center justify-center mb-6">
                    <Truck className="w-7 h-7 text-zuzu-blue" />
                  </div>
                  <h2 className="text-2xl font-display text-gray-900 mb-2">Fulfillment & Logistics</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 font-body">
                    Manage sales orders, check customer shipping details, and book couriers instantly through Shiprocket. Track generated AWBs and delivery states in real-time.
                  </p>
                </div>
                <Link 
                  href="/admin/deliveries"
                  className="inline-flex items-center justify-center gap-2 w-full py-4 bg-zuzu-blue text-white rounded-full font-bold text-sm tracking-wider uppercase shadow-lg shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-transform"
                >
                  Open Logistics Console <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Media & Product Module */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[3rem] p-8 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                <div>
                  <div className="w-14 h-14 bg-zuzu-pink/10 rounded-2xl flex items-center justify-center mb-6">
                    <ImageIcon className="w-7 h-7 text-zuzu-pink" />
                  </div>
                  <h2 className="text-2xl font-display text-gray-900 mb-2">Media & Products Vault</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 font-body">
                    Upload high-end product photos directly to Cloudinary, edit boutique catalog details (names, prices, inventory counters), and control layout visuals.
                  </p>
                </div>
                <Link 
                  href="/admin/images"
                  className="inline-flex items-center justify-center gap-2 w-full py-4 bg-zuzu-pink text-white rounded-full font-bold text-sm tracking-wider uppercase shadow-lg shadow-pink-100 hover:scale-[1.02] active:scale-95 transition-transform"
                >
                  Open Media Vault <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Integrations & Settings Status */}
            <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-[3rem] p-8 shadow-sm">
              <h3 className="text-xl font-display text-gray-900 mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-400" />
                System Integration Status
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Shiprocket Card */}
                <div className="bg-white/80 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Shiprocket API</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Automated courier fulfillment & label booking</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        status.shiprocketConfigured 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {status.shiprocketConfigured ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Live connected
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5" /> Sandbox mode
                          </>
                        )}
                      </span>
                    </div>
                    
                    {status.shiprocketConfigured ? (
                      <p className="text-xs text-gray-600 leading-relaxed font-body">
                        Using active live Shiprocket account: <span className="font-mono font-bold text-gray-900">{status.shiprocketEmail}</span>. Delivery orders placed will submit labels directly to your real Shiprocket dashboard.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs text-gray-500 leading-relaxed font-body">
                          Currently running in **Simulated Sandbox mode**. You can book test shipments, retrieve fake tracking URLs, and test status transitions.
                        </p>
                        <div className="p-3 bg-amber-50/50 rounded-xl text-[10px] text-amber-800 leading-normal font-mono border border-amber-100">
                          <p className="font-bold mb-1">To connect live Shiprocket API, add to `.env.local`:</p>
                          <p>SHIPROCKET_EMAIL=your_email</p>
                          <p>SHIPROCKET_PASSWORD=your_password</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* WhatsApp Business API Card */}
                <div className="bg-white/80 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">WhatsApp Business API</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Automated order alerts & notifications</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        status.whatsappConfigured 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}>
                        {status.whatsappConfigured ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Configured
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5" /> Credentials missing
                          </>
                        )}
                      </span>
                    </div>

                    {status.whatsappConfigured ? (
                      <p className="text-xs text-gray-600 leading-relaxed font-body">
                        WhatsApp template messages will be dispatched to customer phones using Phone ID <span className="font-mono font-bold text-gray-900">{status.whatsappPhoneId}</span>.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs text-gray-500 leading-relaxed font-body">
                          Notifications are **disabled** because your credentials are empty or expired. 
                        </p>
                        <div className="p-3 bg-red-50/50 rounded-xl text-[10px] text-red-800 leading-normal font-mono border border-red-100">
                          <p className="font-bold mb-1">Add or update in `.env.local`:</p>
                          <p>WHATSAPP_ACCESS_TOKEN=your_token</p>
                          <p>WHATSAPP_PHONE_NUMBER_ID=your_phone_id</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}
