import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import Homepage from "@/pages/HomePage";
import OnboardingWizard from "@/components/onBoarding/OnboardingWizard";
import OnboardingPage from "@/components/onBoarding/OnboardPage";
import DashboardPage from "@/pages/DashboardPage/DashboardPage";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
  {
    path: "/onboarding",
    element: <OnboardingPage />,
  },

  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);
