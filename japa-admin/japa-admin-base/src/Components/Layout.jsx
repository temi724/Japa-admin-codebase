import { Outlet, Navigate, useNavigate } from "react-router-dom";
import TopNav from "./Admin/TopNav";
import SideBar from "./Admin/SideBar";


let tokks = sessionStorage.getItem("tokken")?.toString("")
const Layout = () => {
    const auth = { tokken: tokks }
    const moveTo = useNavigate()
    return auth.tokken ? (
        <div className="flex flex-row">
            {/* Sidebar */}
            <div className="">
                <SideBar className="fixed" />
            </div>
            {/* Top */}
            <div className="flex flex-col bg-gray-100 w-full  border-t-2 border-b-2 ">
                <TopNav className="fixed" />
                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to="/" />
    )

}
export default Layout
