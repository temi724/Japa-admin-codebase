import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { fetchCourses, postCourse, deleteCourse } from "../../api calls/api";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Rating from "@mui/material/Rating";
import TablePagination from '@mui/material/TablePagination';
import { useState } from "react"
import { Skeleton, Table, TableCell } from "@mui/material";
import { 
    ArrowLeft3, 
    Trash, 
    InfoCircle, 
    Book1, 
    Calendar, 
    Clock, 
    Star1, 
    SearchNormal1, 
    Filter, 
    More, 
    Eye,
    Edit,
    ExportSquare
} from "iconsax-react";
import { toast } from "react-toastify";
import { FourSquare } from "react-loading-indicators";
import TableRowsLoader from "../ReUsableTable";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

// const BasicModal = ({ open, setOpen, handleOpen, handleClose }) => {


//     return (
//         <div>
//             <Button onClick={handleOpen}>Open modal</Button>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style}>
//                     <div className="flex items-center justify-center">
//                         <InfoCircle size="32" color="#FF8A65" />
//                     </div>

//                     <h1 className="text-center">Are you sure you want to delete item?</h1>
//                     <div className="flex  mt-5">
//                         <div className="h-10 flex bg-red-500 items-center justify-center rounded-md w-full">
//                             <p className="text-white hover:cursor-pointer ">YES</p>
//                         </div>
//                     </div>
//                 </Box>
//             </Modal>
//         </div>
//     );
// }

const CourseTable = ({ data, isLoading, error, manipulateState, remove }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLevel, setFilterLevel] = useState('all');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const courses = data?.courses || [];
    
    // Filter courses based on search and level
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.about?.level?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevel = filterLevel === 'all' || course.about?.level?.toLowerCase() === filterLevel;
        return matchesSearch && matchesLevel;
    });

    const getLevelBadge = (level) => {
        const levelColors = {
            'beginner': 'bg-green-100 text-green-800 border-green-200',
            'intermediate': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'advanced': 'bg-red-100 text-red-800 border-red-200',
            'expert': 'bg-purple-100 text-purple-800 border-purple-200'
        };
        return levelColors[level?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
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
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                    <Book1 className="text-white" size={18} />
                                </div>
                                Course Management
                            </h1>
                            <p className="text-gray-600 mt-2 text-sm">Manage courses and their content</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button 
                                onClick={() => manipulateState(2)}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-normal shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
                            >
                                Post New Course
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors font-normal flex items-center gap-2 text-sm">
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
                                <p className="text-gray-600 text-sm font-normal">Total Courses</p>
                                <p className="text-xl font-medium text-gray-900 mt-1">{courses.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Book1 className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-normal">Published</p>
                                <p className="text-xl font-medium text-gray-900 mt-1">{courses.filter(c => c.published).length}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Calendar className="text-green-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-normal">Beginner Level</p>
                                <p className="text-xl font-medium text-gray-900 mt-1">
                                    {courses.filter(c => c.about?.level?.toLowerCase() === 'beginner').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Clock className="text-yellow-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-normal">Avg Rating</p>
                                <p className="text-xl font-medium text-gray-900 mt-1">4.8</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Star1 className="text-purple-600" size={24} />
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
                                placeholder="Search courses by title or level..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select 
                                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white min-w-40"
                                value={filterLevel}
                                onChange={(e) => setFilterLevel(e.target.value)}
                            >
                                <option value="all">All Levels</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                <option value="expert">Expert</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Courses Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-3 px-6 font-normal text-gray-900 text-xs">Course</th>
                                    <th className="text-left py-3 px-6 font-normal text-gray-900 text-xs">Level</th>
                                    <th className="text-left py-3 px-6 font-normal text-gray-900 text-xs">Date Created</th>
                                    <th className="text-left py-3 px-6 font-normal text-gray-900 text-xs">Schedule</th>
                                    <th className="text-left py-3 px-6 font-normal text-gray-900 text-xs">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredCourses.map((course) => (
                                    <tr key={course._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-normal text-xs">
                                                    {course.title?.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-normal text-gray-900 text-sm">{course.title}</p>
                                                    <p className="text-xs text-gray-600">Course ID: {course._id?.substring(0, 8)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-normal border ${getLevelBadge(course.about?.level)}`}>
                                                {course.about?.level || 'Not Set'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-gray-900 font-normal text-sm">
                                                {course.date_posted?.split("T")[0] || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-gray-600 text-sm">{course.about?.schedule || 'Flexible'}</span>
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
                                                    onClick={() => remove(course._id)} 
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
                    
                    {filteredCourses.length === 0 && (
                        <div className="text-center py-12">
                            <Book1 className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-base font-normal text-gray-900 mb-2">No courses found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-100">
                        <TablePagination
                            component="div"
                            count={Number(data?.total_pages) || 0}
                            page={Number(data?.current_page) || 0}
                            rowsPerPage={rowsPerPage}
                            className="text-gray-600"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
const Review = ({ manipulateState, title,
    details,
    ratings,
    level,
    schedule,
    courseOutline,
    whocan,
    how,
    lessoncount,
    platform,
    link,
    post,
    isPending,
    requirement, }) => {
    return (
        <>
            <div className="mx-5 p-5">
                <div className="flex items-center  space-x-5 flex-row">
                    <ArrowLeft3 onClick={() => manipulateState(2)} size="32" color="#000000" />
                    <h1>Preview Course Posting</h1>
                </div>
                <div className="my-10 mx-5">
                    <h1 className="font-extrabold text-[27px]">{title}</h1>
                    <p className="text-sm font-light leading-6 max-w-[770px]">{details}</p>

                    <div className="flex p-2 items-center justify-between text-sm font-light flex-row h-20 w-[770px] mt-10 shadow-md">
                        <div className="flex items-center mt-2"><Rating
                            name="simple-controlled"
                            value={ratings}

                        /></div>
                        <div><p>{level}</p></div>
                        <div><p>{schedule}</p></div>
                    </div>
                    <h1 className="mt-10">Requirements:</h1>
                    {requirement.split(".").map((x, index) => (
                        <p className="text-sm font-light leading-6" key={index}>{x}</p>
                    ))}
                    <h1 className="mt-10 ">Course Outline:</h1>
                    {courseOutline.split(".").map((x, index) => (
                        <p className="text-sm font-light max-w-[770px] leading-6" key={index}>{x}</p>
                    ))}

                </div>
                <div onClick={post} className="h-10 p-2  flex-row mx-2 flex cursor-pointer items-center text-white justify-center rounded-3xl w-40 bg-purple-800">
                    <p>submit</p>
                    {isPending ? <FourSquare color="#ffffff" size="small" text="" textColor="" /> : ""}
                </div>
            </div></>
    )
}

const Forms = ({
    manipulateState, setTitle,
    setDetails,
    setRatings,
    setLevel,
    setSchedule,
    setCourseOutline,
    setWhoCan,
    setHow,
    setLessonCount,
    setPlatform,
    setLink,
    setRequirement,
    title,
    details,
    ratings,
    level,
    schedule,
    courseOutline,
    whocan,
    how,
    lessoncount,
    platform,
    link,
    requirement, }) => {
    return (
        <>
            <div className="mx-5 p-5">
                <div className="flex items-center  space-x-5 flex-row">
                    <ArrowLeft3 onClick={() => manipulateState(1)} size="32" color="#000000" />
                    <h1>Post A New Course</h1>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Course Title</label>
                        <input value={title} type="text" onChange={(e) => setTitle(e.target.value)} className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder=" Title" />
                    </div>
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Picture: feature coming soon</label>
                        <input type="text" disabled className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="picture" />   </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Ratings</label>
                        <input type="text" value={ratings} onChange={(e) => setRatings(e.target.value)} className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="4.5" />
                    </div>
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Level</label>
                        <input type="text" value={level} onChange={(e) => setLevel(e.target.value)} className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="Beginer" />  </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Who can take this course</label>
                        <input type="text" value={whocan} onChange={(e) => setWhoCan(e.target.value)} className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="Anyone that likes data" />
                    </div>
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Delievery method (How)</label>
                        <input type="text" value={how} onChange={(e) => setHow(e.target.value)} className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="Online lectures, assignments, and quizzes" />  </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Lesson count</label>
                        <input value={lessoncount} onChange={(e) => setLessonCount(e.target.value)} type="number" className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="15" />
                    </div>
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Platform</label>
                        <input type="text" value={platform} onChange={(e) => setPlatform(e.target.value)} className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="Zoom, udemy" />  </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Course Description</label>
                        <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows="5" cols="50" className="h-[100px] rounded-md border-2 mt-5  w-[478px] p-2" placeholder="Course Description" />
                    </div>

                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Requirements: <span className="text-red-500">Please enter "." after every requirement</span></label>
                        <textarea rows="5" value={requirement} cols="50" onChange={(e) => setRequirement(e.target.value)} className="h-[100px] rounded-md border-2 mt-5  w-[478px] p-2" placeholder="Requirements" />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Course Outline: <span className="text-red-500">Please enter "." after every point</span></label>
                        <textarea rows="5" value={courseOutline} onChange={(e) => setCourseOutline(e.target.value)} cols="50" className="h-[100px] rounded-md border-2 mt-5  w-[478px] p-2" placeholder="Outline" />
                    </div>
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Link</label>
                        <input value={link} onChange={(e) => setLink(e.target.value)} type="text" className="h-[50px] rounded-md border-2 mt-5  w-[478px] p-2" placeholder="https://www.link.com" />
                    </div>


                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Schedule</label>
                        <input value={schedule} onChange={(e) => setSchedule(e.target.value)} className="h-[50px] rounded-md border-2 mt-5  w-[478px] p-2" placeholder="Self-paced" />
                    </div>



                </div>
                {title !== "" && ratings !== "" && lessoncount !== "" ?
                    <div onClick={() => manipulateState(3)} className="h-10  mt-5 cursor-pointer w-[20%] flex items-center justify-center bg-purple-900 rounded-md">
                        <p className="text-white">Review</p>
                    </div> : <p className="mt-2 text-red-500">please fill in course details!</p>}

            </div>




        </>
    )
}



const Courses = () => {
    const [limit, setLimit] = useState()
    const [actionState, setActionState] = useState(1)
    const [page, setPage] = useState()
    const [title, setTitle] = useState("")
    const [detais, setDetails] = useState("")
    const [rating, setRatings] = useState("")
    const [level, setLevel] = useState("")
    const [schedule, setSchedule] = useState("")
    const [course_outline, setCourseOutline] = useState("")
    const [whocan, setWhoCan] = useState("")
    const [how, setHow] = useState("")
    const [lesson_count, setLessonCount] = useState("")
    const [certification, setCertification] = useState("")
    const [platform, setPlatform] = useState("")
    const [link, setLink] = useState("")
    const [requirement, setRequirement] = useState("")
    const queryClient = useQueryClient()
    const { data, isLoading, error } = useQuery({
        queryKey: ['courses', { limit, page, title }],
        queryFn: fetchCourses,
        // staleTime: 10000 * 60 * 60 * 24,
        refetchOnWindowFocus: true
    })

    const { mutateAsync: addCourse, isPending } = useMutation({
        mutationFn: postCourse,
        onSuccess: () => {
            queryClient.invalidateQueries(['courses', 'stats'])
            toast.success("Course saved")

        }
    })
    const { mutateAsync: removeCourse, isPending: delPending } = useMutation({
        mutationFn: deleteCourse,
        onSuccess: () => {
            queryClient.invalidateQueries(['courses', 'stats'])
            toast.success("deleted")

        }
    })



    const manipulateState = (num) => {
        setActionState(num)
    }
    // console.log("yee", actionState)

    const sendData = async () => {
        console.log("no shit")
        const data = {
            title,
            about: {
                detais,
                ratings: rating,
                level,
                schedule
            },
            course_outline,
            over_view: {
                whocan,
                how,
                lesson_count,
                certification: "Completion Certificate",
                platform
            },
            link,
            requirements: requirement
        }
        try {
            await addCourse(data)
        } catch (ex) {
            console.log(error)
        }

    }

    const deleteData = async (_id) => {
        try {
            await removeCourse({ _id: _id })
        } catch (ex) {
            console.log(error)
        }
    }





    const ShowItem = () => {
        if (actionState === 1) {
            return (
                <CourseTable
                    isLoading={isLoading} data={data}
                    remove={deleteData}
                    error={error} manipulateState={manipulateState} />
            )
        }
        if (actionState === 2) {
            return (
                <Forms actionState={actionState}
                    manipulateState={manipulateState}
                    setTitle={setTitle}
                    setDetails={setDetails}
                    setRatings={setRatings}
                    setLevel={setLevel}
                    setSchedule={setSchedule}
                    setCourseOutline={setCourseOutline}
                    setWhoCan={setWhoCan}
                    setHow={setHow}
                    setLessonCount={setLessonCount}
                    setCertification={setCertification}
                    setPlatform={setPlatform}
                    setLink={setLink}
                    setRequirement={setRequirement}
                    title={title}
                    details={detais}
                    ratings={rating}
                    level={level}
                    schedule={schedule}
                    courseOutline={course_outline}
                    whocan={whocan}
                    how={how}
                    lessoncount={lesson_count}
                    platform={platform}
                    link={link}
                    requirement={requirement}

                />
            )
        }
        if (actionState === 3) {
            return (
                <Review manipulateState={manipulateState}
                    title={title}
                    details={detais}
                    ratings={rating}
                    level={level}
                    schedule={schedule}
                    courseOutline={course_outline}
                    whocan={whocan}
                    how={how}
                    lessoncount={lesson_count}
                    platform={platform}
                    link={link}
                    requirement={requirement}
                    post={sendData}
                    isPending={isPending}
                />
            )
        }



    }


    return (
        <>
            <div className="p-8 space-y-8 bg-white">
                {ShowItem()}
            </div>
        </>
    );
}

export default Courses;