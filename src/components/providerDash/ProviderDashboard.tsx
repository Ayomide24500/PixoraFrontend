import React, { useState } from "react";
import {
  DollarSign,
  Camera,
  CheckCircle,
  XCircle,
  Clock,
  ShieldCheck,
  TrendingUp,
  Sliders,
  Plus,
  Trash2,
  Calendar as CalendarIcon,
  Sparkles,
} from "lucide-react";
import { BookingRequest } from "@/types";

const MOCK_PROVIDER_REQUESTS: BookingRequest[] = [
  {
    id: "BK-9041",
    providerId: "1",
    providerName: "John Visuals & Co.",
    providerAvatar: "",
    category: "Videography",
    customerName: "Chief Tunde Bakare",
    customerEmail: "tunde@company.ng",
    date: "2026-11-04",
    packageType: "Corporate Summit Coverage",
    notes: "Full multi-cam setup required for 3-hour event at Eko Hotel.",
    status: "pending",
    totalAmount: "₦350,000",
    escrowStatus: "held",
    createdAt: "2026-09-21",
  },
];

const ProviderDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "requests" | "gear" | "availability"
  >("requests");
  const [requests, setRequests] = useState<BookingRequest[]>(
    MOCK_PROVIDER_REQUESTS,
  );
  const [gearList, setGearList] = useState<string[]>([
    "Sony A7IV Full-Frame",
    "DJI Ronin RS3 Gimbal",
    "Aperture 300D II Light",
    "Sennheiser Wireless Mic Pack",
  ]);
  const [newGear, setNewGear] = useState("");

  const handleAction = (id: string, action: "confirmed" | "cancelled") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r)),
    );
  };

  const handleAddGear = () => {
    if (newGear.trim()) {
      setGearList([...gearList, newGear.trim()]);
      setNewGear("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0E11] text-white p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#16181E] border border-[#282C37] p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Creator Studio Console
            </span>
            <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" /> VERIFIED CREATOR
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            John Visuals & Co.
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Manage client bookings, maintain your gear roster, and monitor
            earnings payouts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "requests"
                ? "bg-[#D4AF37] text-black"
                : "bg-black/50 text-gray-400 hover:text-white border border-[#282C37]"
            }`}
          >
            Booking Requests ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab("gear")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "gear"
                ? "bg-[#D4AF37] text-black"
                : "bg-black/50 text-gray-400 hover:text-white border border-[#282C37]"
            }`}
          >
            Gear & Studio Setup
          </button>
        </div>
      </div>

      {/* Revenue Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#16181E] border border-[#282C37] p-5 rounded-2xl">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">
            Total Revenue (YTD)
          </span>
          <span className="text-2xl font-black text-white">₦2,450,000</span>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +18% from last month
          </span>
        </div>

        <div className="bg-[#16181E] border border-[#282C37] p-5 rounded-2xl">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">
            Pending Escrow
          </span>
          <span className="text-2xl font-black text-[#D4AF37]">₦530,000</span>
          <span className="text-[11px] text-gray-400 mt-1 block">
            Locked in 2 active projects
          </span>
        </div>

        <div className="bg-[#16181E] border border-[#282C37] p-5 rounded-2xl">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">
            Acceptance Rate
          </span>
          <span className="text-2xl font-black text-white">96%</span>
          <span className="text-[11px] text-gray-400 mt-1 block">
            Avg response: 15 mins
          </span>
        </div>

        <div className="bg-[#16181E] border border-[#282C37] p-5 rounded-2xl">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">
            Overall Rating
          </span>
          <span className="text-2xl font-black text-[#D4AF37]">4.9 / 5.0</span>
          <span className="text-[11px] text-gray-400 mt-1 block">
            From 38 client reviews
          </span>
        </div>
      </div>

      {/* Main Tab Views */}
      {activeTab === "requests" ? (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">
            Incoming Client Requests
          </h2>
          {requests.length === 0 ? (
            <div className="p-12 text-center bg-[#16181E] border border-[#282C37] rounded-3xl text-gray-400 text-sm">
              No pending booking requests right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="bg-[#16181E] border border-[#282C37] p-6 rounded-3xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#282C37] pb-4">
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                        Client Request • {req.id}
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {req.customerName}
                      </h3>
                    </div>
                    <span className="text-xl font-extrabold text-[#D4AF37]">
                      {req.totalAmount}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500 block mb-1">
                        Shoot Package
                      </span>
                      <span className="font-semibold text-white">
                        {req.packageType}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">
                        Requested Date
                      </span>
                      <span className="font-semibold text-white">
                        {req.date}
                      </span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-gray-500 block mb-1">
                        Project Brief / Scope
                      </span>
                      <p className="bg-black/50 p-3 rounded-xl border border-[#282C37] text-gray-300 font-light">
                        {req.notes}
                      </p>
                    </div>
                  </div>

                  {req.status === "pending" ? (
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => handleAction(req.id, "confirmed")}
                        className="flex-1 py-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" /> Accept Project &
                        Lock Escrow
                      </button>
                      <button
                        onClick={() => handleAction(req.id, "cancelled")}
                        className="px-5 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs rounded-xl border border-red-500/20 transition-all cursor-pointer"
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold text-center">
                      ✓ Project Confirmed! Client notified.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* GEAR & STUDIO SETUP TAB */
        <div className="bg-[#16181E] border border-[#282C37] p-6 sm:p-8 rounded-3xl space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white">
              Studio Equipment Roster
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Clients are 3x more likely to book creators who list their exact
              camera, lens, and lighting gear.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Sony FX3 4K Cinema Camera"
              value={newGear}
              onChange={(e) => setNewGear(e.target.value)}
              className="flex-1 bg-black/60 border border-[#282C37] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              onClick={handleAddGear}
              className="px-5 py-2.5 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:bg-[#C5A028] transition-all cursor-pointer"
            >
              Add Equipment
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {gearList.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-black/40 border border-[#282C37] rounded-xl flex items-center justify-between text-xs text-gray-200"
              >
                <span className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#D4AF37]" /> {item}
                </span>
                <button
                  onClick={() =>
                    setGearList(gearList.filter((_, i) => i !== idx))
                  }
                  className="text-gray-500 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ProviderDashboard;
