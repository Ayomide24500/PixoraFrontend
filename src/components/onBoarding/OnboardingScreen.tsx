import React, { useState } from "react";
import {
  User,
  Briefcase,
  Camera,
  CheckCircle2,
  Upload,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  Phone,
  DollarSign,
  FileText,
} from "lucide-react";
import { Role, CustomerProfile, ProviderProfile } from "../../types";

interface OnboardingScreenProps {
  initialRole: Role;
  onComplete: (data: {
    role: Role;
    profile: CustomerProfile | ProviderProfile;
  }) => void;
  onSkip?: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  initialRole,
  onComplete,
  onSkip,
}) => {
  const [role, setRole] = useState<Role>(
    initialRole === "admin" ? "customer" : initialRole,
  );
  const [step, setStep] = useState<number>(1);

  // Customer Form State
  const [customerData, setCustomerData] = useState<CustomerProfile>({
    fullName: "",
    email: "",
    phone: "",
    location: "Lagos, Nigeria",
    preferredCategories: ["Photography"],
    budgetPreference: "Standard (₦50k - ₦200k)",
  });

  // Provider Form State
  const [providerData, setProviderData] = useState<ProviderProfile>({
    businessName: "",
    email: "",
    phone: "",
    location: "Lagos, Nigeria",
    primaryCategory: "Videography",
    hourlyRate: 25000,
    bio: "",
    equipment: ["Sony A7IV", "DJI Ronin RS3"],
    idType: "National ID (NIN)",
    isVerified: false,
  });

  const [equipmentInput, setEquipmentInput] = useState("");
  const [providerTermsAccepted, setProviderTermsAccepted] = useState(false);

  const handleAddEquipment = () => {
    if (equipmentInput.trim()) {
      setProviderData((prev) => ({
        ...prev,
        equipment: [...prev.equipment, equipmentInput.trim()],
      }));
      setEquipmentInput("");
    }
  };

  const handleRemoveEquipment = (index: number) => {
    setProviderData((prev) => ({
      ...prev,
      equipment: prev.equipment.filter((_, i) => i !== index),
    }));
  };

  const handleCategoryToggle = (cat: string) => {
    setCustomerData((prev) => {
      const exists = prev.preferredCategories.includes(cat);
      return {
        ...prev,
        preferredCategories: exists
          ? prev.preferredCategories.filter((c) => c !== cat)
          : [...prev.preferredCategories, cat],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "customer") {
      onComplete({ role, profile: customerData });
    } else {
      if (!providerTermsAccepted) return;
      onComplete({
        role,
        profile: {
          ...providerData,
          providerTermsAccepted: true,
          providerTermsVersion: "v1.0",
          providerTermsAcceptedAt: new Date().toISOString(),
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0E11] text-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl bg-[#16181E] border border-[#282C37] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header Setup */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Welcome to Pixora Setup
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Configure Your Account Profile
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Step {step} of 2 — Tell us how you plan to use Pixora
          </p>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <label className="block text-xs uppercase font-bold text-gray-400 tracking-wider text-center">
              Select Account Account Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`p-6 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  role === "customer"
                    ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg shadow-[#D4AF37]/5"
                    : "border-[#282C37] bg-black/40 hover:border-gray-500"
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-4">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold">I Want to Hire Talent</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Book verified photographers, videographers, and editors for
                    events & brands.
                  </p>
                </div>
                {role === "customer" && (
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-4 self-end" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setRole("provider")}
                className={`p-6 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  role === "provider"
                    ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg shadow-[#D4AF37]/5"
                    : "border-[#282C37] bg-black/40 hover:border-gray-500"
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-4">
                    <Camera className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold">
                    I am a Creative Provider
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Showcase your portfolio, receive client booking requests,
                    and get paid securely.
                  </p>
                </div>
                {role === "provider" && (
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-4 self-end" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-6"
            >
              <span>Continue to Profile Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Specific Form */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {role === "customer" ? (
              /* CUSTOMER FORM FIELDS */
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Folake Adeleke"
                      value={customerData.fullName}
                      onChange={(e) =>
                        setCustomerData({
                          ...customerData,
                          fullName: e.target.value,
                        })
                      }
                      className="w-full bg-black/60 border border-[#282C37] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 800 000 0000"
                      value={customerData.phone}
                      onChange={(e) =>
                        setCustomerData({
                          ...customerData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full bg-black/60 border border-[#282C37] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Primary Location / City
                  </label>
                  <input
                    type="text"
                    required
                    value={customerData.location}
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        location: e.target.value,
                      })
                    }
                    className="w-full bg-black/60 border border-[#282C37] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2">
                    What creative services do you usually hire for?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Photography",
                      "Videography",
                      "Cinematography",
                      "Drone & Aerial",
                    ].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleCategoryToggle(cat)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                          customerData.preferredCategories.includes(cat)
                            ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                            : "bg-black/40 text-gray-400 border-[#282C37] hover:border-gray-500"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* PROVIDER FORM FIELDS */
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">
                      Studio / Business Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Visuals Studios"
                      value={providerData.businessName}
                      onChange={(e) =>
                        setProviderData({
                          ...providerData,
                          businessName: e.target.value,
                        })
                      }
                      className="w-full bg-black/60 border border-[#282C37] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">
                      Primary Service Category
                    </label>
                    <select
                      value={providerData.primaryCategory}
                      onChange={(e) =>
                        setProviderData({
                          ...providerData,
                          primaryCategory: e.target.value,
                        })
                      }
                      className="w-full bg-black/60 border border-[#282C37] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Videography">Videography</option>
                      <option value="Photography">Photography</option>
                      <option value="Cinematography">Cinematography</option>
                      <option value="Drone & Aerial">Drone & Aerial</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">
                      Base Rate (NGN / hour)
                    </label>
                    <input
                      type="number"
                      required
                      value={providerData.hourlyRate}
                      onChange={(e) =>
                        setProviderData({
                          ...providerData,
                          hourlyRate: Number(e.target.value),
                        })
                      }
                      className="w-full bg-black/60 border border-[#282C37] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">
                      Operating Base / Location
                    </label>
                    <input
                      type="text"
                      required
                      value={providerData.location}
                      onChange={(e) =>
                        setProviderData({
                          ...providerData,
                          location: e.target.value,
                        })
                      }
                      className="w-full bg-black/60 border border-[#282C37] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Professional Bio
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Describe your creative experience, notable clients, and shoot style..."
                    value={providerData.bio}
                    onChange={(e) =>
                      setProviderData({ ...providerData, bio: e.target.value })
                    }
                    className="w-full bg-black/60 border border-[#282C37] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Equipment List Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Primary Gear & Equipment
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add gear e.g. RED Komodo 6K, Aperture 300d"
                      value={equipmentInput}
                      onChange={(e) => setEquipmentInput(e.target.value)}
                      className="flex-1 bg-black/60 border border-[#282C37] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="button"
                      onClick={handleAddEquipment}
                      className="px-4 py-2 bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 rounded-xl text-xs font-bold hover:bg-[#D4AF37]/30"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {providerData.equipment.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/50 border border-[#282C37] rounded-md text-[11px] text-gray-300"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => handleRemoveEquipment(idx)}
                          className="text-gray-500 hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verification ID upload section */}
                <div className="p-4 bg-black/40 border border-[#282C37] rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Provider Identity
                      Verification
                    </span>
                    <span className="text-[10px] text-gray-500">
                      Fast 24-hr badge review
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Upload Government ID (NIN, Driver's License, or Voters Card)
                    to qualify for the Verified Badge.
                  </p>
                  <div className="border-2 border-dashed border-[#282C37] hover:border-[#D4AF37]/50 rounded-xl p-4 text-center cursor-pointer transition-colors bg-black/20">
                    <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <span className="text-xs text-gray-300">
                      Click to attach ID document
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/[0.04] p-4">
                  <p className="text-xs font-bold text-[#D4AF37]">
                    Provider Agreement · v1.0 draft
                  </p>
                  <p className="mt-2 text-[11px] leading-5 text-gray-400">
                    Pixora connects you with customers. You set service prices
                    and agree to a 10% commission on your service amount;
                    customers separately pay a 10% Pixora fee. Accepted
                    bookings, availability, cancellations, disputes, and
                    payouts follow Pixora&apos;s platform rules. Do not move
                    Pixora-generated bookings off-platform to avoid applicable
                    fees.
                  </p>
                  <label className="mt-3 flex cursor-pointer items-start gap-3 border-t border-white/[0.08] pt-3 text-xs leading-5 text-gray-300">
                    <input
                      type="checkbox"
                      required
                      checked={providerTermsAccepted}
                      onChange={(event) =>
                        setProviderTermsAccepted(event.target.checked)
                      }
                      className="mt-1 h-4 w-4 accent-[#D4AF37]"
                    />
                    <span>
                      I have read and agree to Pixora&apos;s Provider Agreement
                      and 10% commission terms.
                    </span>
                  </label>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#282C37]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 bg-black/50 hover:bg-black text-gray-400 hover:text-white text-xs font-semibold rounded-xl border border-[#282C37]"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={role === "provider" && !providerTermsAccepted}
                className="px-8 py-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#D4AF37]/10"
              >
                Complete Registration & Launch
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default OnboardingScreen;
