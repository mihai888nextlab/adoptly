import { useSharedState } from "@/hooks/stateContext";
import { NextPageWithLayout } from "../_app";

const Dashboard: NextPageWithLayout = () => {
  const sharedState = useSharedState();

  return (
    <div>
      <div className="bg-white w-96 p-5 rounded-xl shadow-sm">
        <h1 className="font-bold m-0">46</h1>
        <p className="text-gray-500 font-bold text-xl m-0">Total animals</p>
      </div>

      <h1>{sharedState.user ? sharedState.user.name : "d"}</h1>
    </div>
  );
};

Dashboard.getLayout = "dashboard";

export default Dashboard;
