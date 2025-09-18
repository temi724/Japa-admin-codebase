import { useState } from "react";
import japaLogo from "../../assets/JAPALOGO.png";
import { NavLink, useLocation } from "react-router-dom";
import { 
    Strongbox, 
    ArrowDown2, 
    AddSquare, 
    User, 
    UserCirlceAdd, 
    Setting2, 
    Home2,
    BookSaved,
    Briefcase,
    UserEdit,
    ChartCircle,
    MessageQuestion,
    LogoutCurve
} from "iconsax-react";

const SideBar = () => {
    const [jobmenu, setjobMenu] = useState(false);
    const [coursemenu, setCourseMenu] = useState(false);
    const location = useLocation();

    const menuItems = [
        {
            id: 1,
            label: "Dashboard",
            icon: Home2,
            path: "/admin/home",
            isActive: location.pathname === "/admin/home"
        },
        {
            id: 2,
            label: "Job Posting",
            icon: Briefcase,
            path: "/admin/postjob",
            isActive: location.pathname === "/admin/postjob"
        },
        {
            id: 3,
            label: "Courses",
            icon: BookSaved,
            path: "/admin/courses",
            isActive: location.pathname === "/admin/courses"
        },
        {
            id: 4,
            label: "Users",
            icon: UserCirlceAdd,
            path: "/admin/home",
            isActive: location.pathname === "/admin/users"
        },
        {
            id: 5,
            label: "Coaching",
            icon: UserEdit,
            path: "/admin/talents",
            isActive: location.pathname === "/admin/talents"
        }
    ];

    const bottomMenuItems = [
        {
            id: 1,
            label: "Settings",
            icon: Setting2,
            path: "/admin/settings"
        },
        {
            id: 2,
            label: "Help",
            icon: MessageQuestion,
            path: "/admin/help"
        }
    ];

    return (
        <div className="w-[280px] bg-white border-r border-gray-200 h-screen fixed left-0 top-0 shadow-sm z-50">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-100">
                <NavLink to="/admin/home" className="flex items-center space-x-3">
                    <img src={japaLogo} className="h-10 w-auto" alt="Japa Logo" />
                    <div className="hidden lg:block">
                        <span className="text-xl font-bold text-gray-900">Japa</span>
                        <span className="text-sm text-gray-500 block">Admin Panel</span>
                    </div>
                </NavLink>
            </div>

            {/* Navigation Menu */}
            <div className="flex flex-col h-full justify-between pb-6">
                <nav className="px-4 py-6 space-y-2">
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                                    item.isActive
                                        ? 'bg-gradient-to-r from-[#5922A9] to-[#7B3EC4] text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#5922A9]'
                                }`}
                            >
                                <IconComponent 
                                    size="22" 
                                    color={item.isActive ? "#FFFFFF" : "currentColor"}
                                    variant={item.isActive ? "Bold" : "Outline"}
                                />
                                <span className="ml-3 font-medium">{item.label}</span>
                                
                                {item.isActive && (
                                    <div className="ml-auto">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Bottom Menu */}
                <div className="px-4 space-y-2">
                    {/* Divider */}
                    <div className="border-t border-gray-200 my-4"></div>
                    
                    {bottomMenuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                className="group flex items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-[#5922A9] transition-all duration-200"
                            >
                                <IconComponent 
                                    size="22" 
                                    color="currentColor"
                                    variant="Outline"
                                />
                                <span className="ml-3 font-medium">{item.label}</span>
                            </NavLink>
                        );
                    })}

                    {/* Logout Button */}
                    <button
                        onClick={() => {
                            sessionStorage.clear();
                            window.location.href = "/";
                        }}
                        className="w-full group flex items-center px-4 py-3 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200"
                    >
                        <LogoutCurve 
                            size="22" 
                            color="currentColor"
                            variant="Outline"
                        />
                        <span className="ml-3 font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideBar;