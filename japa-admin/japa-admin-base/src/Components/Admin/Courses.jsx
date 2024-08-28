import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchCourses } from "../../api calls/api";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import { useState } from "react"
import { Skeleton, Table, TableCell } from "@mui/material";
import { ArrowLeft3 } from "iconsax-react";

const TableRowsLoader = ({ rowsNum }) => {
    return [...Array(rowsNum)].map((row, index) => (
        <table key={index}>
            <tr >
                <td className="px-5 w-52 py-4 ">   <Skeleton animation="wave" variant="text" /></td>
                <td className="px-5 w-52 py-4">   <Skeleton animation="wave" variant="text" /></td>
                <td className="px-5 w-52 py-4">   <Skeleton animation="wave" variant="text" /></td>
                <td className="px-5 w-52 py-4">   <Skeleton animation="wave" variant="text" /></td>
                <td className="px-5 w-52 py-4">   <Skeleton animation="wave" variant="text" /></td>
            </tr>

        </table>
    ));
};
const CourseTable = ({ data, isLoading, error, manipulateState }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10)
    return (

        <>
            <div className="flex flex-row justify-between p-5 mx-5">
                <h1 className="">Courses</h1>
                <div className="bg-purple-900 h-10 w-40 flex items-center justify-center rounded-3xl " onClick={() => manipulateState(2)}>
                    <p className="text-white text-sm">Post New Course</p>
                </div>
            </div>

            <div className="flex flex-col mx-5 p-5">
                <div className="flex flex-row space-x-2">
                    <input type="text" className="p-2 border-2 h-10 w-[200px] rounded-md" placeholder="title" />
                    {/* <input type="text" className="border-2 p-2 h-10 w-[200px] rounded-md" placeholder="email" /> */}
                </div>

                <table className="table my-6  w-full  bg-white rounded-md text-sm text-left">
                    <thead className="text-xs text-white uppercase bg-purple-300">
                        <tr>
                            <th scope="col" class="px-6 py-4">Title</th>
                            <th scope="col" class="px-6 py-4">Level</th>
                            <th scope="col" class="px-6 py-4">Date Registered</th>
                            <th scope="col" class="px-6 py-4">Schedule</th>
                            <th scope="col" class="px-6 py-4">Actions</th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {isLoading ? <TableRowsLoader rowsNum={10} /> : ""}
                        {data?.courses.map((x) => (
                            <tr className="font-light text-sm" key={x._id}>
                                <td className="px-5 py-4 ">{x.title}</td>
                                <td className="px-5 py-4 ">{x.about.level}</td>
                                <td className="px-5 py-4">{x.date_posted?.split("T")[0]}</td>
                                <td className="px-5 py-4">{x.about.schedule}</td>
                            </tr>
                        ))}

                    </tbody>

                </table>
                <TablePagination
                    component="div"
                    count={Number(data?.total_pages)}
                    page={Number(data?.current_page)}
                    // onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </>
    )
}

const Forms = ({ manipulateState }) => {

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
    return (
        <>
            <div className="mx-5 p-5">
                <div className="flex items-center  space-x-5 flex-row">
                    <ArrowLeft3 onClick={() => manipulateState(1)} size="32" color="#000000" />
                    <h1>Post A New Course</h1>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Job Title</label>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="job title" />
                    </div>
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Picture: feature coming soon</label>
                        <input type="text" disabled className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="picture" />   </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Ratings</label>
                        <input type="text" className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="4.5" />
                    </div>
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Level</label>
                        <input type="text" className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="Beginer" />  </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Who can take this course</label>
                        <input type="text" className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="Anyone that likes data" />
                    </div>
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Delievery method (How)</label>
                        <input type="text" className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="Online lectures, assignments, and quizzes" />  </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Lesson count</label>
                        <input type="number" className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="15" />
                    </div>
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Platform</label>
                        <input type="text" className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="Zoom, udemy" />  </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Course Description</label>
                        <textarea rows="5" cols="50" className="h-[100px] rounded-md border-2 mt-5  w-[478px] p-2" placeholder="Course Description" />
                    </div>

                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Requirements: <span className="text-red-500">Please enter "." after every requirement</span></label>
                        <textarea rows="5" cols="50" className="h-[100px] rounded-md border-2 mt-5  w-[478px] p-2" placeholder="Requirements" />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Course Outline: <span className="text-red-500">Please enter "." after every point</span></label>
                        <textarea rows="5" cols="50" className="h-[100px] rounded-md border-2 mt-5  w-[478px] p-2" placeholder="Outline" />
                    </div>
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Link</label>
                        <input type="text" className="h-[50px] rounded-md border-2 mt-5  w-[478px] p-2" placeholder="https://www.link.com" />
                    </div>


                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Schedule</label>
                        <input className="h-[50px] rounded-md border-2 mt-5  w-[478px] p-2" placeholder="Self-paced" />
                    </div>



                </div>
                <div className="h-10 mt-5 w-[20%] flex items-center justify-center bg-purple-900 rounded-md">
                    <p className="text-white">Review</p>
                </div>
            </div>
        </>
    )
}



const Courses = () => {
    const [limit, setLimit] = useState()
    const [actionState, setActionState] = useState(1)
    const [page, setPage] = useState()
    const [title, setTitle] = useState()
    const { data, isLoading, error } = useQuery({
        queryKey: ['getUsers', { limit, page, title }],
        queryFn: fetchCourses,
        staleTime: 10000 * 60 * 60 * 24,
        refetchOnWindowFocus: false
    })

    const manipulateState = (num) => {
        setActionState(num)
    }
    console.log("yee", actionState)

    const ShowItem = () => {
        if (actionState === 1) {
            return (
                <CourseTable
                    isLoading={isLoading} data={data}
                    error={error} manipulateState={manipulateState} />
            )
        }
        if (actionState === 2) {
            return (
                <Forms manipulateState={manipulateState} />
            )
        }

    }


    return (
        <>
            <div className="mx-20 mr-5  mt-5 bg-white ">
                {ShowItem()}



            </div>
        </>
    );
}

export default Courses;