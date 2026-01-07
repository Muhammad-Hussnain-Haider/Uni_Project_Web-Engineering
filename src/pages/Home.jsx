import VeteranDashboard from "./VeteranDashboard";
import OrganizationDashboard from "./OrganizationDashboard";

export default function Home() {
  return (
    <div className="container mt-4">
      <VeteranDashboard />
      <OrganizationDashboard />
    </div>
  );
}
