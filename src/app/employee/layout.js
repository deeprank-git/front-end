import { SidebarProvider } from "./SidebarContext";
import EmployeeShell from "./EmployeeShell";

const EmployeeLayout = ({ children }) => (
  <SidebarProvider>
    <EmployeeShell>{children}</EmployeeShell>
  </SidebarProvider>
);

export default EmployeeLayout;
