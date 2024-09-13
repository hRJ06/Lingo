import { isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const App = dynamic(() => import("./app"), { ssr: false });

const AdminPage = async () => {
  if (!isAdmin()) {
    redirect("/");
  }
  return (
    <div>
      <App />
    </div>
  );
};

export default AdminPage;
