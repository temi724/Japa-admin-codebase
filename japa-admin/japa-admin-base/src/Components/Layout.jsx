import { Outlet, Navigate, useNavigate } from "react-router-dom";
import TopNav from "./Admin/TopNav";
import SideBar from "./Admin/SideBar";

let tokks = sessionStorage.getItem("tokken")?.toString("");

const Layout = () => {
  const auth = { tokken: tokks };
  const moveTo = useNavigate();

  return auth.tokken ? (
    <div className="bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50">
        <SideBar />
      </div>
      
      {/* Main Content */}
      <div className="ml-[280px] flex flex-col h-screen">
        {/* Top Navigation */}
        <TopNav />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Layout;
