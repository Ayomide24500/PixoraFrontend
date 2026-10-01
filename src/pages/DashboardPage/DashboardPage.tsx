import MarketplaceWorkspace from "@/pages/MarketplaceWorkspace";
import type { Role } from "@/types";

const DashboardPage = () => {
  const savedRole = localStorage.getItem("pixora_role");
  const role: Role =
    savedRole === "provider" || savedRole === "admin" ? savedRole : "customer";
  return <MarketplaceWorkspace initialRole={role} />;
};

export default DashboardPage;
