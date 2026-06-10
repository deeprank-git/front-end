import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const ManagerLayout = ({ children }) => (
  <div className="min-h-screen bg-slate-50">
    <Navbar />
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  </div>
);

export default ManagerLayout;
