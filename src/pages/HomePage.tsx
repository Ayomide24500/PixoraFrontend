import HeroPage from "@/components/HeroPage";
import Navbar from "@/components/Navbar";
import { Provider, ProviderGrid } from "@/components/ProviderCard";
import ProviderModal from "@/components/ProviderModal";
import React, { useState } from "react";

const Homepage = () => {
  const [activeRole, setActiveRole] = useState<
    "customer" | "provider" | "admin"
  >("customer");
  const [searchCategory, setSearchCategory] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );

  const handleSearchSubmit = (params: {
    category: string;
    location: string;
  }) => {
    setSearchCategory(params.category);
    setSearchLocation(params.location);

    // Smooth scroll down to the explore section when search is submitted
    setTimeout(() => {
      const exploreSection = document.getElementById("explore");
      if (exploreSection) {
        exploreSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const handleSelectProvider = (provider: Provider) => {
    if (activeRole === "customer") {
      // 2. Open the full profile & booking modal instead of an alert
      setSelectedProvider(provider);
    } else {
      alert(`Viewing details as ${activeRole}.`);
    }
  };

  return (
    <div className=" bg-pixora-dark text-white font-sans selection:bg-pixora-gold selection:text-black">
      {/* 1. Professional Navigation Header */}
      <Navbar
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main View Router based on role (For MVP demonstration) */}
      {activeRole === "provider" ? (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-pixora-gold mb-4">
            Provider Dashboard View
          </h1>
          <p className="text-gray-400">
            Here creators manage their portfolio, incoming requests, and
            earnings.
          </p>
        </div>
      ) : activeRole === "admin" ? (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-pixora-gold mb-4">
            Admin Control Center
          </h1>
          <p className="text-gray-400">
            Here platform admins oversee user verification, reports, and system
            analytics.
          </p>
        </div>
      ) : (
        <>
          {/* 2. Cinematic Hero Section */}
          <HeroPage onSearchSubmit={handleSearchSubmit} />

          {/* 3. Verified Provider Discovery Grid */}
          <ProviderGrid
            categoryFilter={searchCategory}
            locationFilter={searchLocation}
            onSelectProvider={handleSelectProvider}
          />
        </>
      )}

      {/* 4. Interactive Provider Profile & Booking Modal */}
      <ProviderModal
        provider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
        onBookSubmit={(bookingData) => {
          console.log("Booking requested:", bookingData);
          alert("Booking request successfully submitted to creator!");
          setSelectedProvider(null);
        }}
      />

      {/* Simple Auth Modal Placeholder */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-pixora-card border border-pixora-border p-6 rounded-2xl max-w-md w-full relative">
            <h3 className="text-xl font-bold text-white mb-2">
              Welcome to Pixora
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Sign in to your account to request providers or manage your
              creative business.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-black/50 border border-pixora-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-pixora-gold"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-pixora-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-pixora-gold"
                />
              </div>

              <button
                onClick={() => setAuthModalOpen(false)}
                className="w-full py-3 bg-pixora-gold text-black font-semibold rounded-xl text-sm transition-colors hover:bg-pixora-goldHover"
              >
                Sign In to Pixora
              </button>
            </div>

            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Homepage;
