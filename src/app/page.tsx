import LeftPanel from "@/components/leftpanel";
import CenterPanel from "@/components/centerpanel";
import RightPanel from "@/components/rightpanel";

export default function Page() {
  return (
    <div
      className="d-flex justify-content-center align-items-stretch w-100 min-vh-100"
      style={{ gap: "0px", padding: "2vh 2vw" }}
    >
      <LeftPanel />
      <CenterPanel />
      <RightPanel />
    </div>
  );
}