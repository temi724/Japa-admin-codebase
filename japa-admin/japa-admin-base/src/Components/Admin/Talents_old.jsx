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
    SearchNormal1,
    Filter,
    Eye,
    Edit,
    Trash,
    ExportSquare
} from "iconsax-react";
import { fetchStats, fetchTalents, fetchUsers } from "../../api calls/api";
import { People } from "iconsax-react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import { useState } from "react";
import { Skeleton, Table, TableCell } from "@mui/material";
import TableRowsLoader from "../ReUsableTable";
import { useQuery } from "@tanstack/react-query";

const Talents = () => {
    const [page, setPage] = useState("");
    const [limit, setLimit] = useState("");
    const [rowsperPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState("");

    const { data, isLoading, error } = useQuery({
        queryKey: ['talents'],
        queryFn: fetchTalents,
        staleTime: 10000 * 60 * 60 * 24,
    });

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Coaching Management</h1>
                    <p className="text-gray-600 mt-2">Manage talents and their coaching preferences</p>
                </div>
                <div className="mt-4 lg:mt-0">
                    <button className="bg-gradient-to-r from-[#5922A9] to-[#7B3EC4] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#4A1D96] hover:to-[#6B35B1] transition-all duration-200 shadow-lg flex items-center space-x-2">
                        <ExportSquare size="20" />
                        <span>Export Talents</span>
                    </button>
                </div>
            </div>

            {/* Talents Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                {/* Table Header */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Talent Directory</h2>
                            <p className="text-gray-600 text-sm mt-1">View and manage talent profiles and preferences</p>
                        </div>
                        
                        {/* Search and Filters */}
                        <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                            <div className="relative">
                                <SearchNormal1 size="20" color="#6B7280" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search by name or skill"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
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
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Talent
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Current Skills
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Course Preference
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <TableRowsLoader rowsNum={10} />
                            ) : (
                                data?.talents?.map((talent) => (
                                    <tr key={talent._id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-[#5922A9] to-[#7B3EC4] rounded-full flex items-center justify-center">
                                                    <span className="text-white font-semibold text-sm">
                                                        {talent.full_name?.charAt(0) || 'T'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{talent.full_name}</p>
                                                    <p className="text-sm text-gray-500">ID: {talent._id.slice(-6)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {talent.current_skills?.split(',').slice(0, 2).map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                                    >
                                                        {skill.trim()}
                                                    </span>
                                                )) || (
                                                    <span className="text-gray-500 text-sm">No skills listed</span>
                                                )}
                                                {talent.current_skills?.split(',').length > 2 && (
                                                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                        +{talent.current_skills.split(',').length - 2} more
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">
                                                {talent.course_of_choice || 'Not specified'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                                                    <Eye size="16" />
                                                </button>
                                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                                                    <Edit size="16" />
                                                </button>
                                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                                                    <Trash size="16" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
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

export default Talents;

                                </tr>
                            ))}

                        </tbody>

                    </table>
                    <TablePagination
                        component="div"
                        count={data?.total_pages}
                        page={data?.current_page}
                        // onPageChange={handleChangePage}
                        rowsPerPage={rowsperPage}
                    // onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </>
    )

}
export default Talents