import React, { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Search,
  Filter,
  DollarSign,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  Star,
  Download,
} from "lucide-react";
import { BookingRequest } from "@/types";

interface CustomerDashboardProps {
  customerName?: string;
  onExploreMore: () => void;
}

const MOCK_CUSTOMER_BOOKINGS: BookingRequest[] = [
  {
    id: "BK-8821",
    providerId: "1",
    providerName: "John Visuals & Co.",
    providerAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    category: "Videography",
    customerName: "Ayomide Adisa",
    customerEmail: "ayo@example.com",
    date: "2026-10-15",
    packageType: "Brand Commercial (Full Day)",
    notes: "Requires RED Camera shoot at Lekki studio location.",
    status: "confirmed",
    totalAmount: "₦180,000",
    escrowStatus: "held",
    createdAt: "2026-09-20",
  },
  {
    id: "BK-7102",
    providerId: "2",
    providerName: "Aura Lens Studios",
    providerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    category: "Photography",
    customerName: "Ayomide Adisa",
    customerEmail: "ayo@example.com",
    date: "2026-09-02",
    packageType: "Standard Headshots",
    notes: "Lookbook portrait session for new product lineup.",
    status: "completed",
    totalAmount: "₦75,000",
    escrowStatus: "released",
    createdAt: "2026-08-25",
  },
];

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  customerName = "Ayomide",
  onExploreMore,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">(
    "all",
  );
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(
    MOCK_CUSTOMER_BOOKINGS[0],
  );

  const filteredBookings = MOCK_CUSTOMER_BOOKINGS.filter((b) => {
    if (activeTab === "active")
      return b.status === "confirmed" || b.status === "pending";
    if (activeTab === "completed") return b.status === "completed";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0D0E11] text-white p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Dashboard Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#16181E] border border-[#282C37] p-6 rounded-3xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
            Client Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Welcome back, {customerName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Track your ongoing creator bookings, manage escrow payments, and
            request deliverables.
          </p>
        </div>
        <button
          onClick={onExploreMore}
          className="px-6 py-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shrink-0 shadow-lg shadow-[#D4AF37]/10"
        >
          + Book New Creator
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#16181E] border border-[#282C37] p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold block">
              Active Bookings
            </span>
            <span className="text-xl font-bold">1 Upcoming</span>
          </div>
        </div>

        <div className="bg-[#16181E] border border-[#282C37] p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold block">
              Protected in Escrow
            </span>
            <span className="text-xl font-bold">₦180,000</span>
          </div>
        </div>

        <div className="bg-[#16181E] border border-[#282C37] p-5 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold block">
              Completed Shoots
            </span>
            <span className="text-xl font-bold">1 Shoot</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bookings List Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">
              Your Requests & Bookings
            </h2>
            <div className="flex gap-1 bg-black/60 p-1 border border-[#282C37] rounded-xl text-xs">
              {(["all", "active", "completed"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "bg-[#D4AF37] text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                onClick={() => setSelectedBooking(booking)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  selectedBooking?.id === booking.id
                    ? "bg-[#16181E] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/5"
                    : "bg-[#16181E]/60 border-[#282C37] hover:border-gray-500"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={booking.providerAvatar}
                    alt={booking.providerName}
                    className="w-12 h-12 rounded-xl object-cover border border-[#282C37]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-base">
                        {booking.providerName}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold border border-[#D4AF37]/20">
                        {booking.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                      <span>Date: {booking.date}</span>
                      <span>•</span>
                      <span className="text-white font-semibold">
                        {booking.totalAmount}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      booking.status === "confirmed"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    {booking.status}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Booking Detail Inspector Drawer */}
        {selectedBooking && (
          <div className="bg-[#16181E] border border-[#282C37] rounded-3xl p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#282C37] pb-4">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    Booking ID
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {selectedBooking.id}
                  </h3>
                </div>
                <span className="px-2.5 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-full text-xs font-bold">
                  Escrow: {selectedBooking.escrowStatus.toUpperCase()}
                </span>
              </div>

              {/* Creator Info */}
              <div className="flex items-center gap-3 bg-black/40 p-3.5 rounded-2xl border border-[#282C37]">
                <img
                  src={selectedBooking.providerAvatar}
                  alt={selectedBooking.providerName}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {selectedBooking.providerName}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {selectedBooking.category}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#282C37]/50">
                  <span className="text-gray-400">Scheduled Date</span>
                  <span className="font-semibold text-white">
                    {selectedBooking.date}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#282C37]/50">
                  <span className="text-gray-400">Package Type</span>
                  <span className="font-semibold text-white">
                    {selectedBooking.packageType}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#282C37]/50">
                  <span className="text-gray-400">Total Price</span>
                  <span className="font-bold text-[#D4AF37]">
                    {selectedBooking.totalAmount}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">
                    Notes & Scope
                  </span>
                  <p className="bg-black/40 p-3 rounded-xl border border-[#282C37] text-gray-300 font-light">
                    {selectedBooking.notes}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-[#282C37]">
              <button
                onClick={() =>
                  alert(
                    `Opening direct chat channel with ${selectedBooking.providerName}...`,
                  )
                }
                className="w-full py-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" /> Message Creator
              </button>
              {selectedBooking.status === "completed" && (
                <button
                  onClick={() =>
                    alert("Downloading receipt and deliverable files zip...")
                  }
                  className="w-full py-2.5 bg-black/60 hover:bg-black text-gray-300 text-xs font-semibold rounded-xl border border-[#282C37] flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Deliverables
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
