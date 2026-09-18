import React, { useState } from "react";
import {
  Camera,
  Menu,
  X,
  Shield,
  User,
  Briefcase,
  PlusCircle,
  Search,
} from "lucide-react";

interface NavbarProps {
  activeRole: "customer" | "provider" | "admin";
  onRoleChange: (role: "customer" | "provider" | "admin") => void;
  onOpenAuth: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  activeRole,
  onRoleChange,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-pixora-dark/90 backdrop-blur-md border-b border-pixora-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pixora-gold to-yellow-600 flex items-center justify-center shadow-lg shadow-pixora-gold/10">
            <Camera className="w-5 h-5 text-black" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-wider text-white">
              PIXORA
            </span>
            <span className="block text-[9px] tracking-widest text-pixora-gold font-medium uppercase">
              Where Vision Becomes Visual
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a
            href="#explore"
            className="hover:text-pixora-gold transition-colors"
          >
            Explore Talent
          </a>
          <a
            href="#equipment"
            className="hover:text-pixora-gold transition-colors"
          >
            Equipment Gear
          </a>
          <a
            href="#how-it-works"
            className="hover:text-pixora-gold transition-colors"
          >
            How it Works
          </a>
        </nav>

        {/* Right Side Actions & Role Switcher (MVP Utility) */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Quick role toggle for previewing experiences */}
          <div className="bg-pixora-card border border-pixora-border p-1 rounded-xl flex items-center text-xs">
            <button
              onClick={() => onRoleChange("customer")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeRole === "customer"
                  ? "bg-pixora-gold text-black font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => onRoleChange("provider")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeRole === "provider"
                  ? "bg-pixora-gold text-black font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Provider
            </button>
            <button
              onClick={() => onRoleChange("admin")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeRole === "admin"
                  ? "bg-pixora-gold text-black font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Admin
            </button>
          </div>

          <button
            onClick={onOpenAuth}
            className="px-5 py-2.5 rounded-xl bg-pixora-card border border-pixora-border hover:border-pixora-gold text-white text-sm font-medium transition-colors flex items-center gap-2"
          >
            <User className="w-4 h-4 text-pixora-gold" />
            <span>Sign In</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onOpenAuth}
            className="px-3 py-1.5 rounded-lg bg-pixora-gold text-black font-semibold text-xs"
          >
            Sign In
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-white p-1 focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-pixora-card border-b border-pixora-border px-4 pt-4 pb-6 space-y-4 animate-fade-in">
          <div className="flex flex-col space-y-3 text-sm text-gray-300">
            <a
              href="#explore"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-pixora-gold"
            >
              Explore Talent
            </a>
            <a
              href="#equipment"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-pixora-gold"
            >
              Equipment Gear
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-pixora-gold"
            >
              How it Works
            </a>
          </div>

          <div className="pt-3 border-t border-pixora-border">
            <p className="text-[10px] uppercase text-gray-500 font-semibold mb-2">
              Switch View Mode:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  onRoleChange("customer");
                  setMobileMenuOpen(false);
                }}
                className={`py-2 rounded-lg text-xs font-medium text-center ${
                  activeRole === "customer"
                    ? "bg-pixora-gold text-black"
                    : "bg-black/40 text-gray-400"
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => {
                  onRoleChange("provider");
                  setMobileMenuOpen(false);
                }}
                className={`py-2 rounded-lg text-xs font-medium text-center ${
                  activeRole === "provider"
                    ? "bg-pixora-gold text-black"
                    : "bg-black/40 text-gray-400"
                }`}
              >
                Provider
              </button>
              <button
                onClick={() => {
                  onRoleChange("admin");
                  setMobileMenuOpen(false);
                }}
                className={`py-2 rounded-lg text-xs font-medium text-center ${
                  activeRole === "admin"
                    ? "bg-pixora-gold text-black"
                    : "bg-black/40 text-gray-400"
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
