import { useState } from "react";
import { 
    SearchNormal1, 
    Notification, 
    ArrowDown2, 
    Profile,
    Setting2,
    LogoutCurve,
    Moon,
    Sun1
} from "iconsax-react";

const my_data = JSON.parse(sessionStorage.getItem("details"));

const TopNav = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = "/";
    };

    return (
        <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
            {/* Left Section - Search */}
            <div className="flex items-center flex-1 max-w-lg">
                <div className={`relative flex items-center w-full transition-all duration-200 ${
                    searchFocused ? 'transform scale-105' : ''
                }`}>
                    <SearchNormal1 
                        size="20" 
                        color="#6B7280" 
                        className="absolute left-4 z-10"
                    />
                    <input
                        type="text"
                        placeholder="Search users, jobs, courses..."
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className={`w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all duration-200 outline-none ${
                            searchFocused 
                                ? 'border-[#5922A9] ring-4 ring-purple-100 bg-white' 
                                : 'hover:bg-gray-100'
                        }`}
                    />
                </div>
            </div>

            {/* Right Section - Actions & Profile */}
            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 relative">
                        <Notification size="24" color="#6B7280" />
                        {/* Notification Badge */}
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            3
                        </div>
                    </button>
                </div>

                {/* Theme Toggle */}
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                    <Moon size="24" color="#6B7280" />
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#5922A9] to-[#7B3EC4] rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-semibold text-sm">
                                    {my_data?.first_name?.charAt(0) || 'A'}
                                </span>
                            </div>
                            <div className="text-left hidden sm:block">
                                <h3 className="font-semibold text-gray-900 text-sm">
                                    {my_data?.first_name} {my_data?.last_name}
                                </h3>
                                <p className="text-xs text-gray-500 truncate max-w-32">
                                    {my_data?.email}
                                </p>
                            </div>
                        </div>
                        <ArrowDown2 
                            size="16" 
                            color="#6B7280" 
                            className={`transform transition-transform duration-200 ${
                                dropdownOpen ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-fadeIn">
                            {/* Profile Header */}
                            <div className="px-4 py-3 border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[#5922A9] to-[#7B3EC4] rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold">
                                            {my_data?.first_name?.charAt(0) || 'A'}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            {my_data?.first_name} {my_data?.last_name}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {my_data?.email}
                                        </p>
                                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-1">
                                            Admin
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                <button className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                    <Profile size="18" color="currentColor" />
                                    <span className="ml-3 text-sm">View Profile</span>
                                </button>
                                <button className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                    <Setting2 size="18" color="currentColor" />
                                    <span className="ml-3 text-sm">Settings</span>
                                </button>
                            </div>

                            {/* Logout */}
                            <div className="border-t border-gray-100 mt-2 pt-2">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                                >
                                    <LogoutCurve size="18" color="currentColor" />
                                    <span className="ml-3 text-sm">Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay for dropdown */}
            {dropdownOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default TopNav;