import React, { useState } from "react";
import {
  Camera,
  MapPin,
  Briefcase,
  DollarSign,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

interface OnboardingWizardProps {
  isOpen: boolean;
  role: "customer" | "provider";
  onComplete: (profileData: any) => void;
}

const NIGERIAN_LOCATIONS = [
  "Victoria Island, Lagos",
  "Lekki Phase 1, Lagos",
  "Ikoyi, Lagos",
  "Ikeja GRA, Lagos",
  "Surulere, Lagos",
  "Abuja (FCT)",
  "Port Harcourt, Rivers",
];

const EVENT_TYPES = [
  "Weddings & Trad",
  "Corporate Events",
  "Fashion & Editorial",
  "Music Videos",
  "Commercial & Ads",
  "Private Birthdays",
];

const GEAR_OPTIONS = [
  "Sony FX3 / A7S III",
  "Canon EOS R5 / R6",
  "DJI Ronin Gimbal",
  "Aputure Lighting Kit",
  "DJI Mavic 3 Drone",
  "RED / Blackmagic Cinema",
];

const OnboardingWizard = ({
  isOpen,
  role,
  onComplete,
}: OnboardingWizardProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = role === "provider" ? 3 : 2;

  // Form States
  const [formData, setFormData] = useState({
    // Customer fields
    phoneNumber: "",
    location: NIGERIAN_LOCATIONS[0],
    preferredEvents: [] as string[],
    companyName: "",

    // Provider fields
    primaryCategory: "Cinematographer",
    tagline: "",
    bio: "",
    baseRate: "",
    gearList: [] as string[],
    instagramHandle: "",
  });

  if (!isOpen) return null;

  const handleToggleSelection = (
    field: "preferredEvents" | "gearList",
    value: string,
  ) => {
    const current = formData[field];
    if (current.includes(value)) {
      setFormData({
        ...formData,
        [field]: current.filter((item) => item !== value),
      });
    } else {
      setFormData({ ...formData, [field]: [...current, value] });
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-pixora-card border border-pixora-border p-6 sm:p-10 rounded-2xl max-w-xl w-full relative shadow-2xl shadow-pixora-gold/10">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
            <span>
              Profile Setup: {role === "provider" ? "Visual Creator" : "Client"}
            </span>
            <span className="text-pixora-gold font-semibold">
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-pixora-gold transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* ================= CUSTOMER ONBOARDING ================= */}
        {role === "customer" && (
          <div>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-white">
                  Tell us about yourself
                </h3>
                <p className="text-xs text-gray-400">
                  We use this to connect you with local visual creators in your
                  area.
                </p>

                <div>
                  <label className="block text-xs text-gray-400 mb-1 font-medium">
                    Phone Number (WhatsApp preferred)
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="w-full bg-black/60 border border-pixora-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-pixora-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1 font-medium">
                    Primary Base Location
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full bg-black/60 border border-pixora-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-pixora-gold"
                  >
                    {NIGERIAN_LOCATIONS.map((loc) => (
                      <option
                        key={loc}
                        value={loc}
                        className="bg-pixora-dark text-white"
                      >
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-white">
                  What events do you usually host?
                </h3>
                <p className="text-xs text-gray-400">
                  Select all that apply to tailor your creator recommendations.
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  {EVENT_TYPES.map((evt) => {
                    const isSelected = formData.preferredEvents.includes(evt);
                    return (
                      <button
                        type="button"
                        key={evt}
                        onClick={() =>
                          handleToggleSelection("preferredEvents", evt)
                        }
                        className={`p-3 rounded-xl border text-xs font-medium text-left transition-all flex justify-between items-center ${
                          isSelected
                            ? "bg-pixora-gold/15 border-pixora-gold text-pixora-gold"
                            : "bg-black/40 border-pixora-border text-gray-300 hover:border-gray-600"
                        }`}
                      >
                        <span>{evt}</span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-pixora-gold" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= PROVIDER ONBOARDING ================= */}
        {role === "provider" && (
          <div>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-white">
                  Professional Identity
                </h3>
                <p className="text-xs text-gray-400">
                  Set up your creative specialty and base operating hub.
                </p>

                <div>
                  <label className="block text-xs text-gray-400 mb-1 font-medium">
                    Primary Creative Specialization
                  </label>
                  <select
                    value={formData.primaryCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        primaryCategory: e.target.value,
                      })
                    }
                    className="w-full bg-black/60 border border-pixora-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-pixora-gold"
                  >
                    <option
                      value="Cinematographer"
                      className="bg-pixora-dark text-white"
                    >
                      Cinematographer
                    </option>
                    <option
                      value="Event Photographer"
                      className="bg-pixora-dark text-white"
                    >
                      Event Photographer
                    </option>
                    <option
                      value="Commercial Videographer"
                      className="bg-pixora-dark text-white"
                    >
                      Commercial Videographer
                    </option>
                    <option
                      value="Drone Pilot"
                      className="bg-pixora-dark text-white"
                    >
                      Drone Pilot / Aerial Specialist
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1 font-medium">
                    Professional Tagline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Capturing cinematic stories across Lagos"
                    value={formData.tagline}
                    onChange={(e) =>
                      setFormData({ ...formData, tagline: e.target.value })
                    }
                    className="w-full bg-black/60 border border-pixora-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-pixora-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1 font-medium">
                    Operating Base Location
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full bg-black/60 border border-pixora-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-pixora-gold"
                  >
                    {NIGERIAN_LOCATIONS.map((loc) => (
                      <option
                        key={loc}
                        value={loc}
                        className="bg-pixora-dark text-white"
                      >
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-white">
                  Rates & Portfolio
                </h3>
                <p className="text-xs text-gray-400">
                  Let clients know your baseline pricing and portfolio link.
                </p>

                <div>
                  <label className="block text-xs text-gray-400 mb-1 font-medium">
                    Base Daily Rate (₦)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="e.g., 150,000 / day"
                      value={formData.baseRate}
                      onChange={(e) =>
                        setFormData({ ...formData, baseRate: e.target.value })
                      }
                      className="w-full bg-black/60 border border-pixora-border rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-pixora-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1 font-medium">
                    Instagram Handle or Portfolio URL
                  </label>
                  <input
                    type="text"
                    placeholder="@yourhandle or https://behance.net/..."
                    value={formData.instagramHandle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        instagramHandle: e.target.value,
                      })
                    }
                    className="w-full bg-black/60 border border-pixora-border rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-pixora-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1 font-medium">
                    Short Bio
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe your experience and creative approach..."
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    className="w-full bg-black/60 border border-pixora-border rounded-xl p-3 text-sm text-white focus:outline-none focus:border-pixora-gold resize-none"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-white">
                  Equipment & Gear Arsenal
                </h3>
                <p className="text-xs text-gray-400">
                  Select the primary equipment you bring to productions.
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  {GEAR_OPTIONS.map((gear) => {
                    const isSelected = formData.gearList.includes(gear);
                    return (
                      <button
                        type="button"
                        key={gear}
                        onClick={() => handleToggleSelection("gearList", gear)}
                        className={`p-3 rounded-xl border text-xs font-medium text-left transition-all flex justify-between items-center ${
                          isSelected
                            ? "bg-pixora-gold/15 border-pixora-gold text-pixora-gold"
                            : "bg-black/40 border-pixora-border text-gray-300 hover:border-gray-600"
                        }`}
                      >
                        <span>{gear}</span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-pixora-gold" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-pixora-border/60">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl bg-black/40 border border-pixora-border text-gray-300 text-xs font-semibold flex items-center gap-2 hover:bg-black/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-pixora-gold text-black text-xs font-bold flex items-center gap-2 hover:bg-pixora-goldHover transition-colors shadow-lg shadow-pixora-gold/10"
          >
            <span>
              {step === totalSteps ? "Complete & Go to Dashboard" : "Continue"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
