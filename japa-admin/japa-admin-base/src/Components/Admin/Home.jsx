import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    Strongbox, 
    ArrowDown2, 
    Notepad2, 
    AddSquare, 
    User, 
    UserCirlceAdd, 
    Setting2, 
    Bag2, 
    Airdrop,
    TrendUp,
    SearchNormal1,
    Filter,
    Eye,
    Edit,
    Trash,
    ExportSquare,
    Briefcase
} from "iconsax-react";
import { fetchStats, fetchUsers, fetchjobs, deleteUser } from "../../api calls/api";
import { People, ProfileTick } from "iconsax-react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import { useState } from "react";
import { Skeleton, Table, TableCell } from "@mui/material";
import TableRowsLoader from "../ReUsableTable";
import { toast } from "react-toastify";

const Home = () => {
    const [search, setSearch] = useState("");
    const [emailSearch, setEmailSearch] = useState("");
    const [page, setPage] = useState("");
    const [limit, setLimit] = useState("");
    const [rowsperPage, setRowsPerPage] = useState(10);

    // Use empty search for API to get all users, then filter client-side
    const { data, isLoading, error } = useQuery({
        queryKey: ['getUsers', { limit, page, search: "" }],
        queryFn: fetchUsers,
        staleTime: 10000 * 60 * 60 * 24,
    });

    const { data: stats, isLoading: isLoadingStats, error: errorStats } = useQuery({
        queryKey: ['stats'],
        queryFn: fetchStats,
        staleTime: 10000 * 60 * 60 * 24,
    });

    const { data: jobsData, isLoading: isLoadingJobs, error: errorJobs } = useQuery({
        queryKey: ['jobs'],
        queryFn: fetchjobs,
        staleTime: 10000 * 60 * 60 * 24,
    });

    const queryClient = useQueryClient();

    const deleteUserMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            toast.success("User deleted successfully");
            queryClient.invalidateQueries(['getUsers']);
        },
        onError: (error) => {
            toast.error("Failed to delete user: " + error.message);
        }
    });

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            deleteUserMutation.mutate({ _id: userId });
        }
    };

    const statsCards = [
        {
            id: 1,
            title: "Total Users",
            value: stats?.data || 0,
            icon: People,
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            trend: "+12%",
            trendUp: true
        },
        {
            id: 2,
            title: "Active Jobs",
            value: stats?.jobs || 0,
            icon: Briefcase,
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            trend: "+8%",
            trendUp: true
        },
        {
            id: 3,
            title: "Available Courses",
            value: stats?.courses || 0,
            icon: Notepad2,
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
            trend: "+15%",
            trendUp: true
        },
        {
            id: 4,
            title: "Total Jobs",
            value: jobsData?.total_jobs || jobsData?.jobs?.length || 0,
            icon: Bag2,
            color: "from-orange-500 to-orange-600",
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600",
            trend: "+5%",
            trendUp: true
        }
    ];

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-2xl font-medium text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-600 mt-2 text-sm">Welcome back! Here's what's happening with Japa today.</p>
                </div>
                <div className="mt-4 lg:mt-0">
                    <button className="bg-gradient-to-r from-[#5922A9] to-[#7B3EC4] text-white px-5 py-2 rounded-xl font-normal hover:from-[#4A1D96] hover:to-[#6B35B1] transition-all duration-200 shadow-lg flex items-center space-x-2 text-sm">
                        <ExportSquare size="18" />
                        <span>Export Report</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((card) => {
                    const IconComponent = card.icon;
                    return (
                        <div key={card.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                            <div className="flex items-center justify-between">
                                <div className={`p-3 rounded-xl ${card.bgColor}`}>
                                    <IconComponent size="24" className={card.iconColor} />
                                </div>
                                <div className={`flex items-center space-x-1 text-xs ${
                                    card.trendUp ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    <TrendUp size="14" className={card.trendUp ? 'rotate-0' : 'rotate-180'} />
                                    <span className="font-normal">{card.trend}</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-gray-600 text-xs font-normal">{card.title}</h3>
                                <p className="text-xl font-medium text-gray-900 mt-1">
                                    {isLoadingStats ? (
                                        <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                                    ) : (
                                        card.value
                                    )}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Users Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                {/* Table Header */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-lg font-medium text-gray-900">Recent Users</h2>
                            <p className="text-gray-600 text-xs mt-1">Manage and view user accounts</p>
                        </div>
                        
                        {/* Search and Filters */}
                        <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                            <div className="relative">
                                <SearchNormal1 size="20" color="#6B7280" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search by name"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:border-[#5922A9] focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-200 w-full sm:w-64"
                                />
                            </div>
                            <div className="relative">
                                <SearchNormal1 size="20" color="#6B7280" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search by email"
                                    value={emailSearch}
                                    onChange={(e) => setEmailSearch(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:border-[#5922A9] focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-200 w-full sm:w-64"
                                />
                            </div>
                            <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                <Filter size="20" color="#6B7280" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                                    Registration Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                                    Phone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <TableRowsLoader rowsNum={10} />
                            ) : (
                                (() => {
                                    // Filter users based on search terms
                                    const users = data?.users || [];
                                    const filteredUsers = users.filter(user => {
                                        const matchesName = search === "" || 
                                            user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
                                            user.last_name?.toLowerCase().includes(search.toLowerCase());
                                        const matchesEmail = emailSearch === "" || 
                                            user.email?.toLowerCase().includes(emailSearch.toLowerCase());
                                        return matchesName && matchesEmail;
                                    });
                                    
                                    return filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-gradient-to-r from-[#5922A9] to-[#7B3EC4] rounded-full flex items-center justify-center">
                                                    <span className="text-white font-normal text-xs">
                                                        {user.first_name?.charAt(0) || 'U'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-normal text-gray-900 text-sm">{user.first_name}</p>
                                                    <p className="text-xs text-gray-500">ID: {user._id.slice(-6)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-gray-900 text-sm">{user.email}</td>
                                        <td className="px-6 py-3 text-gray-600 text-sm">
                                            {user.registration_date?.split("T")[0]}
                                        </td>
                                        <td className="px-6 py-3 text-gray-600 text-sm">{user.phone_number || 'N/A'}</td>
                                        <td className="px-6 py-3">
                                            <div className="flex items-center space-x-2">
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                                                    <Eye size="14" />
                                                </button>
                                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                                                    <Edit size="14" />
                                                </button>
                                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200" 
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    disabled={deleteUserMutation.isPending}
                                                    title="Delete User"
                                                >
                                                    <Trash size="14" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ));
                                })()
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100">
                    <TablePagination
                        component="div"
                        count={data?.total_pages || 0}
                        page={data?.current_page || 0}
                        rowsPerPage={rowsperPage}
                        className="text-gray-600"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;