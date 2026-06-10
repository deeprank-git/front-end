import Navbar from "../../components/Navbar";

const EmployeeLayout = ({ children }) => (
  <div className="min-h-screen bg-slate-100">
    <Navbar />
    <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
  </div>
);

export default EmployeeLayout;
