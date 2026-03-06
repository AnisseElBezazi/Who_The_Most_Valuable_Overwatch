import LeftPanel from "@/components/leftpanel";
import CenterPanel from "@/components/centerpanel";
import RightPanel from "@/components/rightpanel";

export default function Page() {
  return (
    <div
      className="d-flex justify-content-center align-items-center w-100 vh-100 overflow-hidden"
      style={{ gap: "0px", padding: "2vh 2vw" }}
    >
      <LeftPanel />
      <CenterPanel />
      <RightPanel />
    </div>
  );
}
