import React from "react";
import { useNavigate } from "react-router-dom";
import OnboardingScreen from "./OnboardingScreen";
import { CustomerProfile, ProviderProfile, Role } from "@/types";

export const OnboardingPage = () => {
  const navigate = useNavigate();

  // Retrieve the role saved during the registration/auth step
  const initialRole =
    (localStorage.getItem("pixora_role") as Role) || "customer";

  const handleComplete = (data: {
    role: Role;
    profile: CustomerProfile | ProviderProfile;
  }) => {
    console.log("Onboarding Data Saved:", data);

    // Save profile and final role to localStorage so the dashboard layout can load them
    localStorage.setItem("pixora_user_profile", JSON.stringify(data.profile));
    localStorage.setItem("pixora_role", data.role);

    // Route straight to the unified dashboard layout
    navigate("/dashboard");
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <OnboardingScreen
      initialRole={initialRole}
      onComplete={handleComplete}
      onSkip={handleSkip}
    />
  );
};

export default OnboardingPage;
