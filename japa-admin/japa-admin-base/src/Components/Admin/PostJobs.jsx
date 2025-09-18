import { useState } from "react";
import Select from "react-select"
import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { deleteJobs, fetchCourses, fetchjobs, postCourse, postJobs } from "../../api calls/api";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Rating from "@mui/material/Rating";
import TablePagination from '@mui/material/TablePagination';
import TableRowsLoader from "../ReUsableTable";
import { Skeleton, Table, TableCell } from "@mui/material";
import { 
    ArrowLeft3, 
    Trash, 
    Briefcase, 
    Building, 
    Calendar, 
    Location, 
    Star1, 
    SearchNormal1, 
    Filter, 
    More, 
    Eye,
    Edit,
    ExportSquare,
    InfoCircle
} from "iconsax-react";
import { FourSquare } from "react-loading-indicators";



const JobsTable = ({ data, deleteData, isLoading, error, mutateState }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLocation, setFilterLocation] = useState('all');

    const jobs = data?.jobs || [];
    
    // Filter jobs based on search and location
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.location?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = filterLocation === 'all' || job.location?.toLowerCase().includes(filterLocation.toLowerCase());
        return matchesSearch && matchesLocation;
    });

    const getJobTypeBadge = (location) => {
        if (location?.toLowerCase().includes('remote')) return 'bg-green-100 text-green-800 border-green-200';
        if (location?.toLowerCase().includes('hybrid')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        if (location?.toLowerCase().includes('onsite')) return 'bg-blue-100 text-blue-800 border-blue-200';
        return 'bg-gray-100 text-gray-800 border-gray-200';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="animate-pulse space-y-4">
                            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-medium text-gray-900 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                                    <Briefcase className="text-white" size={18} />
                                </div>
                                Job Management
                            </h1>
                            <p className="text-gray-600 mt-2 text-sm">Manage job postings and applications</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button 
                                onClick={() => mutateState(2)}
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Post New Job
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
                                <ExportSquare size={16} />
                                Export Data
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-normal">Total Jobs</p>
                                <p className="text-xl font-medium text-gray-900 mt-1">{jobs.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <Briefcase className="text-emerald-600" size={24} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-normal">Companies</p>
                                <p className="text-xl font-medium text-gray-900 mt-1">
                                    {new Set(jobs.map(job => job.company_name)).size}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Building className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-normal">Remote Jobs</p>
                                <p className="text-xl font-medium text-gray-900 mt-1">
                                    {jobs.filter(job => job.location?.toLowerCase().includes('remote')).length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Location className="text-green-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-normal">This Month</p>
                                <p className="text-xl font-medium text-gray-900 mt-1">
                                    {jobs.filter(job => {
                                        const jobDate = new Date(job.date_posted);
                                        const now = new Date();
                                        return jobDate.getMonth() === now.getMonth() && jobDate.getFullYear() === now.getFullYear();
                                    }).length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Calendar className="text-purple-600" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <SearchNormal1 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search jobs by title, company, or location..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select 
                                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none appearance-none bg-white min-w-40"
                                value={filterLocation}
                                onChange={(e) => setFilterLocation(e.target.value)}
                            >
                                <option value="all">All Locations</option>
                                <option value="remote">Remote</option>
                                <option value="hybrid">Hybrid</option>
                                <option value="onsite">On-site</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Jobs Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-3 px-6 font-normal text-gray-900 text-xs">Job Title</th>
                                    <th className="text-left py-3 px-6 font-normal text-gray-900 text-xs">Company</th>
                                    <th className="text-left py-3 px-6 font-normal text-gray-900 text-xs">Location</th>
                                    <th className="text-left py-3 px-6 font-normal text-gray-900 text-xs">Date Published</th>
                                    <th className="text-left py-3 px-6 font-normal text-gray-900 text-xs">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredJobs.map((job) => (
                                    <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-normal text-xs">
                                                    {job.job_title?.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-normal text-gray-900 text-sm">{job.job_title}</p>
                                                    <p className="text-xs text-gray-600">ID: {job._id?.substring(0, 8)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                <Building className="text-gray-400" size={16} />
                                                <span className="font-normal text-gray-900 text-sm">{job.company_name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getJobTypeBadge(job.location)}`}>
                                                {job.location || 'Not specified'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-gray-900 font-medium">
                                                {job.date_posted?.split("T")[0] || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                                                    <Edit size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => deleteData(job._id)} 
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                                                    title="Delete"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="More">
                                                    <More size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {filteredJobs.length === 0 && (
                        <div className="text-center py-12">
                            <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-base font-normal text-gray-900 mb-2">No jobs found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const JobForm = ({ mutateState, setJobTitle,
    job_title,
    city,
    setCity,

    location,
    setLocation,
    job_type,
    setJobType,
    company_name,
    setCompanyName,
    technology,
    payment_type, setPaymentType,
    setTechnology,
    min_salary,
    setMinSalary,
    max_salary,
    setMaxSalary,
    experience,
    setExperience,
    about,
    setAbout,
    what_you_will_be_doing,
    setWhatYouWillBeDoing,
    what_we_are_lookin_for,
    setWhatWeAreLookingFor,
    nice_to_have,
    setNiceToHave,
    category,
    setCategory,
    ideal_candidate,
    setIdealCandidate,
    link,
    setLink,
    skills,
    setSkills, }) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    console.log("holle", job_type, job_title, category)
    return (
        <>
            <div className="flex items-center space-x-5 flex-row mb-6">
                <ArrowLeft3 onClick={() => mutateState(1)} size="32" color="#000000" className="cursor-pointer hover:opacity-70 transition-opacity" />
                <h1 className="text-lg font-medium text-gray-900">Post New Job</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <label className="block text-xs font-normal text-gray-700 mb-2">Job title</label>
                    <input 
                        type="text" 
                        value={job_title} 
                        onChange={(e) => setJobTitle(e.target.value)} 
                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        placeholder="Enter job title"
                    />
                </div>
                <div>
                    <label className="block text-xs font-normal text-gray-700 mb-2">Job category</label>
                    <input 
                        type="text" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        placeholder="Enter job category"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <label className="block text-xs font-normal text-gray-700 mb-3">Job type</label>
                    <div className="space-y-3">
                        {[{ id: 1, type: "remote" },
                        { id: 2, type: "Full Time" },
                        { id: 3, type: "Part Time" },
                        { id: 4, type: "Intern" },
                        { id: 5, type: "Volunteer" },
                        { id: 6, type: "others" }].map((x) => (
                            <div key={x.id} className="flex items-center space-x-3">
                                <input 
                                    onChange={(e) => setJobType(e.target.value)} 
                                    checked={job_type === x.type} 
                                    className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                                    type="radio" 
                                    value={x.type} 
                                    name="job" 
                                />
                                <label className="text-sm font-medium text-gray-700">{x.type}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-normal text-gray-700 mb-2">Company name</label>
                        <input 
                            onChange={(e) => setCompanyName(e.target.value)} 
                            value={company_name} 
                            type="text" 
                            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" 
                            placeholder="Company name" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-normal text-gray-700 mb-2">Location</label>
                        <input 
                            type="text" 
                            onChange={(e) => setLocation(e.target.value)} 
                            value={location} 
                            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" 
                            placeholder="Location" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                        <input 
                            type="text" 
                            onChange={(e) => setCity(e.target.value)} 
                            value={city} 
                            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" 
                            placeholder="City" 
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Type</label>
                    <input 
                        onChange={(e) => setPaymentType(e.target.value)} 
                        value={payment_type} 
                        type="text" 
                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" 
                        placeholder="Payment Type" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
                    <input 
                        onChange={(e) => setExperience(e.target.value)} 
                        value={experience} 
                        type="text" 
                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" 
                        placeholder="1-2 years" 
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">What you will be doing</label>
                    <p className="text-xs text-gray-500 mb-3">Describe the main responsibilities and tasks for this role</p>
                    <textarea 
                        onChange={(e) => setWhatYouWillBeDoing(e.target.value)} 
                        value={what_you_will_be_doing} 
                        className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none" 
                        placeholder="What you will be doing"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">About job</label>
                    <p className="text-xs text-gray-500 mb-3">Provide a brief summary of the job responsibilities and requirements</p>
                    <textarea 
                        onChange={(e) => setAbout(e.target.value)} 
                        value={about} 
                        className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none" 
                        placeholder="About this job"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">What we are looking for</label>
                    <p className="text-xs text-gray-500 mb-3">Indicate key qualities, knowledge and expertise <span className="text-red-500">use "." after each point</span></p>
                    <textarea 
                        onChange={(e) => setWhatWeAreLookingFor(e.target.value)} 
                        value={what_we_are_lookin_for} 
                        className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none" 
                        placeholder="What we are looking for"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Application Link</label>
                    <p className="text-xs text-gray-500 mb-3">Provide the application or external job posting link</p>
                    <input 
                        onChange={(e) => setLink(e.target.value)} 
                        value={link} 
                        type="url" 
                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" 
                        placeholder="https://example.com/apply"
                    />
                </div>
            </div>

            <div className="flex justify-end mt-8">
                <button 
                    onClick={() => mutateState(3)} 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-normal shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
                >
                    Review Job Posting
                </button>
            </div>
        </>
    )
}

const Review = ({ mutateState,
    city,
    payment_type,
    job_title,
    location,
    job_type,
    company_name,
    technology,
    min_salary,
    max_salary,
    experience,
    about,
    what_you_will_be_doing,
    what_we_are_lookin_for,
    nice_to_have,
    category,
    ideal_candidate,
    link,
    skills,
    sendData,
    jobPending
}) => {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
                <ArrowLeft3 
                    onClick={() => mutateState(2)} 
                    size="32" 
                    color="#000000" 
                    className="cursor-pointer hover:opacity-70 transition-opacity" 
                />
                <h1 className="text-2xl font-bold text-gray-900">Preview Job Posting</h1>
            </div>

            {/* Job Header Card */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-8 mb-8 text-white shadow-lg">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{job_title}</h1>
                        <div className="flex items-center space-x-4 text-emerald-100">
                            <div className="flex items-center space-x-2">
                                <Building size={18} />
                                <span>{company_name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Location size={18} />
                                <span>{location}, {city}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Briefcase size={18} />
                                <span>{job_type}</span>
                            </div>
                        </div>
                        {experience && (
                            <div className="mt-3">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                    {experience} experience
                                </span>
                            </div>
                        )}
                    </div>
                    {payment_type && (
                        <div className="text-right">
                            <p className="text-emerald-100 text-sm">Payment Type</p>
                            <p className="text-lg font-normal">{payment_type}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Cards */}
            <div className="space-y-6">
                {about && (
                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                            <InfoCircle size={24} className="text-emerald-600" />
                            <span>About This Job</span>
                        </h2>
                        <p className="text-gray-700 leading-relaxed">{about}</p>
                    </div>
                )}

                {what_you_will_be_doing && (
                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                            <Star1 size={24} className="text-emerald-600" />
                            <span>What You Will Be Doing</span>
                        </h2>
                        <ul className="space-y-2">
                            {what_you_will_be_doing.split(".").filter(item => item.trim()).map((item, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-700 leading-relaxed">{item.trim()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {what_we_are_lookin_for && (
                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                            <SearchNormal1 size={24} className="text-emerald-600" />
                            <span>What We Are Looking For</span>
                        </h2>
                        <ul className="space-y-2">
                            {what_we_are_lookin_for.split(".").filter(item => item.trim()).map((item, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-700 leading-relaxed">{item.trim()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {link && (
                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                            <ExportSquare size={24} className="text-emerald-600" />
                            <span>Application Link</span>
                        </h2>
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700 underline break-all"
                        >
                            {link}
                        </a>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                    onClick={() => mutateState(2)}
                    className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft3 size={20} />
                    <span>Back to Edit</span>
                </button>
                
                <button
                    onClick={sendData}
                    disabled={jobPending}
                    className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-normal shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                >
                    {jobPending ? (
                        <>
                            <FourSquare color="#ffffff" size="small" text="" textColor="" />
                            <span>Publishing...</span>
                        </>
                    ) : (
                        <>
                            <ExportSquare size={20} />
                            <span>Publish Job</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}


const PostJobs = () => {
    const [showState, setShowState] = useState(1)
    const [page, setPage] = useState("")
    const [search, setSearch] = useState("")
    const [limit, setLimit] = useState("")
    const [city, setCity] = useState("")

    const [job_title, setJobTitle] = useState("")
    const [location, setLocation] = useState("")
    const [job_type, setJobType] = useState("")
    const [company_name, setCompanyName] = useState("")
    const [technology, setTechnology] = useState("")
    const [min_salary, setMinSalary] = useState("")
    const [max_salary, setMaxSalary] = useState("")
    const [experience, setExperience] = useState("")
    const [about, setAbout] = useState("")
    const [what_you_will_be_doing, setWhatYouWillBeDoing] = useState("")
    const [what_we_are_lookin_for, setWhatWeAreLookingFor] = useState("")
    const [nice_to_have, setNiceToHave] = useState("")
    const [category, setCategory] = useState("")
    const [ideal_candidate, setIdealCandidate] = useState("")
    const [link, setLink] = useState("")
    const [skills, setSkills] = useState("")
    const [payment_type, setPaymentType] = useState("")
    const queryClient = useQueryClient()

    const [rowsperPage, setRowsPerPage] = useState(10)
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const { data, isLoading, error } = useQuery({
        queryKey: ['jobs', { limit, page, search }],
        queryFn: fetchjobs,
        staleTime: 10000 * 60 * 60 * 24,
        // refetchOnWindowFocus: false
    })

    const mutateState = (num) => {
        setShowState(num)
    }

    const { mutateAsync: renoveJob, isPending: delPending } = useMutation({
        mutationFn: deleteJobs,
        onSuccess: () => {
            queryClient.invalidateQueries(['jobs', 'stats'])
            toast.success("deleted")


        }
    })
    const { mutateAsync: postjob, isPending: jobPending } = useMutation({
        mutationFn: postJobs,
        onSuccess: () => {
            queryClient.invalidateQueries(['jobs', 'stats'])
            toast.success("Job posted successfully!")
            mutateState(1)
        },
        onError: (error) => {
            console.log("Error posting job:", error)
            toast.error("Error: Job not posted. Please try again.")
        }
    })
    const sendData = async () => {
        const data = {
            job_title,
            location: location + "," + city,
            job_type,
            company_name,
            experience,
            what_we_are_lookin_for,
            what_you_will_be_doing,
            category,
            limit,
            payment_type,
            about,
            link
        }
        try {
            await postjob(data)
        } catch (ex) {
            console.error("Error posting job:", ex)
            // Error handling is done in the mutation's onError callback
        }
    }

    const deleteData = async (_id) => {
        // console.log(_id)
        try {
            await renoveJob({ _id: _id })
        } catch (ex) {
            console.log(error)
        }
    }


    const ShowThis = () => {
        if (showState === 1) {
            return (<JobsTable deleteData={deleteData} mutateState={mutateState} data={data} />)
        }
        if (showState === 2) {
            return (<JobForm
                city={city}
                payment_type={payment_type} setPaymentType={setPaymentType}
                setCity={setCity}
                setJobTitle={setJobTitle}
                job_title={job_title}
                location={location}
                setLocation={setLocation}
                job_type={job_type}
                setJobType={setJobType}
                company_name={company_name}
                setCompanyName={setCompanyName}
                technology={technology}
                setTechnology={setTechnology}
                min_salary={min_salary}
                setMinSalary={setMinSalary}
                max_salary={max_salary}
                setMaxSalary={setMaxSalary}
                experience={experience}
                setExperience={setExperience}
                about={about}
                setAbout={setAbout}
                what_you_will_be_doing={what_you_will_be_doing}
                setWhatYouWillBeDoing={setWhatYouWillBeDoing}
                what_we_are_lookin_for={what_we_are_lookin_for}
                setWhatWeAreLookingFor={setWhatWeAreLookingFor}
                nice_to_have={nice_to_have}
                setNiceToHave={setNiceToHave}
                category={category}
                setCategory={setCategory}
                ideal_candidate={ideal_candidate}
                setIdealCandidate={setIdealCandidate}
                link={link}
                setLink={setLink}
                skills={skills}
                setSkills={setSkills}
                mutateState={mutateState} />)
        }
        if (showState === 3) {
            return (<Review
                mutateState={mutateState}
                city={city}
                payment_type={payment_type}
                job_title={job_title}
                location={location}
                job_type={job_type}
                company_name={company_name}
                technology={technology}
                min_salary={min_salary}
                max_salary={max_salary}
                experience={experience}
                about={about}
                what_you_will_be_doing={what_you_will_be_doing}
                what_we_are_lookin_for={what_we_are_lookin_for}
                nice_to_have={nice_to_have}
                category={category}
                ideal_candidate={ideal_candidate}
                link={link}
                skills={skills}
                sendData={sendData}
                jobPending={jobPending}
            />)
        }
    }

    return (
        <>
            <div className="p-8 space-y-8 bg-white">
                {ShowThis()}
            </div>
        </>
    );
}

export default PostJobs;