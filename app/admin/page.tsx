import dynamic from "next/dynamic";

const App = dynamic(() => import("./app"), { ssr: false });

const AdminPage = () => {
  return (
    <div>
      <App />
    </div>
  );
};

export default AdminPage;
