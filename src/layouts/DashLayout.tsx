import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Compass,
  MessageSquare,
  Bookmark,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Sparkles,
  Camera,
  DollarSign,
  Briefcase,
  User,
} from "lucide-react";
import { Role } from "../types";

interface DashboardLayoutProps {
  role: Role;
  userName: string;
  userEmail: string;
  children: React.ReactNode;
}

export default function DashboardLayout({
  role,
  userName,
  userEmail,
  children,
}: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define navigation items based on user role
  const customerNavItems = [
    { label: "Overview", icon: LayoutDashboard, path: "/dashboard/customer" },
    {
      label: "Explore Creators",
      icon: Compass,
      path: "/dashboard/customer/explore",
    },
    {
      label: "My Bookings",
      icon: Calendar,
      path: "/dashboard/customer/bookings",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      path: "/dashboard/customer/messages",
    },
    {
      label: "Saved Favorites",
      icon: Bookmark,
      path: "/dashboard/customer/saved",
    },
    {
      label: "Account Settings",
      icon: Settings,
      path: "/dashboard/customer/settings",
    },
  ];

  const providerNavItems = [
    {
      label: "Studio Overview",
      icon: LayoutDashboard,
      path: "/dashboard/provider",
    },
    {
      label: "Gig Bookings",
      icon: Briefcase,
      path: "/dashboard/provider/bookings",
    },
    {
      label: "Portfolio & Media",
      icon: Camera,
      path: "/dashboard/provider/portfolio",
    },
    {
      label: "Earnings & Payouts",
      icon: DollarSign,
      path: "/dashboard/provider/earnings",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      path: "/dashboard/provider/messages",
    },
    {
      label: "Studio Settings",
      icon: Settings,
      path: "/dashboard/provider/settings",
    },
  ];

  const navItems = role === "provider" ? providerNavItems : customerNavItems;

  const handleLogout = () => {
    localStorage.removeItem("pixora_role");
    localStorage.removeItem("pixora_user_profile");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0D0E11] text-white flex">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#16181E] border-r border-[#282C37] fixed inset-y-0 z-30">
        {/* Brand Header */}
        <div className="h-20 flex items-center px-6 border-b border-[#282C37]">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-lg font-extrabold tracking-wider bg-gradient-to-r from-white via-gray-200 to-[#D4AF37] bg-clip-text text-transparent">
              PIXORA
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-3">
            {role === "provider" ? "Provider Portal" : "Client Portal"}
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/10"
                    : "text-gray-400 hover:text-white hover:bg-black/40"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? "text-black" : "text-gray-400"}`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* User Profile Footer Card */}
        <div className="p-4 border-t border-[#282C37] bg-black/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-bold text-sm">
              {userName ? userName.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="overflow-hidden flex-1">
              <h4 className="text-xs font-bold truncate text-white">
                {userName || "User"}
              </h4>
              <p className="text-[10px] text-gray-400 truncate">
                {userEmail || "user@pixora.ng"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/25 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ================= MOBILE DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden flex">
          <div className="w-72 bg-[#16181E] border-r border-[#282C37] h-full flex flex-col p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-extrabold text-[#D4AF37]">
                PIXORA
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold ${
                      isActive
                        ? "bg-[#D4AF37] text-black"
                        : "text-gray-400 hover:bg-black/40"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-400 text-xs font-semibold"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <header className="h-20 bg-[#16181E]/80 backdrop-blur-md border-b border-[#282C37] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-black/40 border border-[#282C37] text-gray-300"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold text-white">
                Welcome back,{" "}
                {userName || (role === "provider" ? "Creator" : "Client")} 👋
              </h1>
              <p className="text-[11px] text-gray-400">
                {role === "provider"
                  ? "Manage your studio shoots and client revenue"
                  : "Hire verified cinematographers & photographers in Nigeria"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl bg-black/40 border border-[#282C37] text-gray-300 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D4AF37]" />
            </button>

            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-[#282C37]">
              <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-bold text-xs">
                {userName ? userName.charAt(0).toUpperCase() : "U"}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
