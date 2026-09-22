import DashboardLayout from "@/layouts/DashLayout";
import { Role } from "@/types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("customer");
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // 1. Read stored role and profile from localStorage after login/onboarding
    const savedRole =
      (localStorage.getItem("pixora_role") as Role) || "customer";
    const savedProfileString = localStorage.getItem("pixora_user_profile");

    setRole(savedRole);

    if (savedProfileString) {
      setProfile(JSON.parse(savedProfileString));
    }
  }, []);

  // Extract name and email dynamically based on role data
  const userName =
    role === "provider"
      ? profile?.businessName || profile?.fullName || "Studio Creator"
      : profile?.fullName || "Client User";

  const userEmail = profile?.email || "user@pixora.ng";

  return (
    <DashboardLayout role={role} userName={userName} userEmail={userEmail}>
      {/* 2. Conditionally render the exact dashboard view based on active role */}
      {role === "customer" ? (
        <CustomerDashboardView profile={profile} />
      ) : (
        <ProviderDashboardView profile={profile} />
      )}
    </DashboardLayout>
  );
};

/* ================= CUSTOMER DASHBOARD CONTENT ================= */
export const CustomerDashboardView = ({ profile }: { profile: any }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#16181E] to-black border border-[#282C37] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          Hello, {profile?.fullName || "Valued Client"} ✨
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
          Your base location is set to{" "}
          <span className="text-[#D4AF37] font-semibold">
            {profile?.location || "Lagos, Nigeria"}
          </span>
          . Explore verified cinematographers and book your next shoot.
        </p>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#16181E] border border-[#282C37] p-6 rounded-2xl">
          <p className="text-xs text-gray-400 font-medium">Active Bookings</p>
          <h3 className="text-2xl font-extrabold mt-1 text-[#D4AF37]">1</h3>
        </div>
        <div className="bg-[#16181E] border border-[#282C37] p-6 rounded-2xl">
          <p className="text-xs text-gray-400 font-medium">Completed Shoots</p>
          <h3 className="text-2xl font-extrabold mt-1 text-white">4</h3>
        </div>
        <div className="bg-[#16181E] border border-[#282C37] p-6 rounded-2xl">
          <p className="text-xs text-gray-400 font-medium">Preferred Service</p>
          <h3 className="text-sm font-bold mt-2 text-white truncate">
            {profile?.preferredCategories?.join(", ") || "Videography"}
          </h3>
        </div>
      </div>
    </div>
  );
};

/* ================= PROVIDER DASHBOARD CONTENT ================= */
export const ProviderDashboardView = ({ profile }: { profile: any }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#16181E] to-black border border-[#282C37] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          {profile?.businessName || "Studio Dashboard"} 🎥
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
          Primary Specialization:{" "}
          <span className="text-[#D4AF37] font-semibold">
            {profile?.primaryCategory || "Cinematography"}
          </span>{" "}
          | Operating in {profile?.location || "Lagos"}.
        </p>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#16181E] border border-[#282C37] p-6 rounded-2xl">
          <p className="text-xs text-gray-400 font-medium">
            Pending Gig Requests
          </p>
          <h3 className="text-2xl font-extrabold mt-1 text-[#D4AF37]">3</h3>
        </div>
        <div className="bg-[#16181E] border border-[#282C37] p-6 rounded-2xl">
          <p className="text-xs text-gray-400 font-medium">Hourly Rate</p>
          <h3 className="text-2xl font-extrabold mt-1 text-white">
            ₦{profile?.hourlyRate?.toLocaleString() || "25,000"} / hr
          </h3>
        </div>
        <div className="bg-[#16181E] border border-[#282C37] p-6 rounded-2xl">
          <p className="text-xs text-gray-400 font-medium">
            Verification Badge
          </p>
          <h3 className="text-sm font-bold mt-2 text-emerald-400">
            {profile?.isVerified ? "Verified Creator" : "Pending Review"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
