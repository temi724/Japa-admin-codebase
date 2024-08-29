import { useState } from "react";
import Select from "react-select"
import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { fetchCourses, fetchjobs, postCourse } from "../../api calls/api";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Rating from "@mui/material/Rating";
import TablePagination from '@mui/material/TablePagination';
import TableRowsLoader from "../ReUsableTable";

import { Skeleton, Table, TableCell } from "@mui/material";
import { ArrowLeft3, Trash } from "iconsax-react";



const JobsTable = ({ data, isLoading, error, mutateState }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10)
    return (

        <>
            <div className="flex flex-row justify-between p-5 mx-5">
                <h1 className="">Jobs</h1>
                <div className="bg-purple-900 h-10 w-40 flex items-center justify-center rounded-3xl " onClick={() => mutateState(2)}>
                    <p className="text-white text-sm">Post New Job</p>
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
                            <th scope="col" class="px-6 py-4">Company</th>
                            <th scope="col" class="px-6 py-4">Category</th>
                            <th scope="col" class="px-6 py-4">Date published</th>
                            <th scope="col" class="px-6 py-4">Actions</th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {isLoading ? <TableRowsLoader rowsNum={10} /> : ""}
                        {data?.jobs.map((x) => (
                            <tr className="font-light text-sm" key={x._id}>
                                <td className="px-5 py-4 ">{x.job_title}</td>
                                <td className="px-5 py-4 ">{x.company_name}</td>
                                <td className="px-5 py-4 ">{x.location}</td>
                                <td className="px-5 py-4">{x.date_posted?.split("T")[0]}</td>
                                {/* <td className="px-5 py-4">{x.about.schedule}</td> */}
                                <td>
                                    <div className="flex flex-row cusor-pointer">
                                        <div>
                                            <Trash size="22" color="#FF8A65" />
                                        </div>
                                    </div>
                                </td>
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

const JobForm = ({ mutateState }) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    return (
        <>
            <div className="flex items-center  space-x-5 flex-row">
                <ArrowLeft3 onClick={() => mutateState(1)} size="32" color="#000000" />
                <h1>Post New Job</h1>
            </div>

            <div className="flex flex-row space-x-10  mt-5">
                <div>
                    <label className="font-light">Job title</label> <br />
                    <input type="text" className="h-[50px] rounded-md w-[478px] border-2" />
                </div>
                <div>
                    <label className="font-light">Job category</label> <br />
                    <Select isMulti options={options}
                        className="h-[53px] w-[478px] " />
                </div>
            </div>
            <div className="flex flex-row space-x-10  mt-5">
                <div>
                    <label className="font-light">Job type</label> <br />
                    {[{ id: 1, type: "remote" },
                    { id: 2, type: "Full Time" },
                    { id: 3, type: "Part Time" },
                    { id: 4, type: "Intern" },
                    { id: 5, type: "Volunteer" },
                    { id: 6, type: "others" }].map((x) => (
                        <div className="flex space-x-2 w-[478px]">
                            <input className="w-6 border-purple-950 text-purple-500 focus:ring-purple-500 mt-5 h-6"
                                type="radio" value={x.type} name="job" />
                            <label className="mt-5">{x.type}</label><br /></div>

                    ))}
                </div>
                <div className="flex flex-col">
                    <label className="font-light"></label> <br />
                    <input type="text" className="h-[50px] rounded-md w-[478px] p-2 border-2" placeholder="company name" />
                    <input type="text" className="h-[50px] mt-7 rounded-md w-[478px] p-2 border-2" placeholder="Location" />
                    <input type="text" className="h-[50px] mt-7 rounded-md w-[478px] p-2 border-2" placeholder="city" />
                </div>
            </div>
            <div className="flex space-x-10 flex-row mt-5">
                <div>
                    <label className="font-light">Payment Type</label> <br />
                    <input type="text" className="h-[50px] mt-5 rounded-md w-[478px] p-2 border-2" placeholder="Location" />
                </div>
                <div>
                    <label className="font-light">Currency</label> <br />
                    <input type="text" className="h-[50px] mt-5 rounded-md w-[478px] p-2 border-2" placeholder="Location" />
                </div>
            </div>
            <div className="flex space-x-10 flex-row mt-5">
                <div>
                    <label className="font-light">Minimum</label> <br />
                    <input type="text" className="h-[50px] mt-5 rounded-md w-[478px] p-2 border-2" placeholder="Location" />
                </div>
                <div>
                    <label className="font-light">Maximun</label> <br />
                    <input type="text" className="h-[50px] mt-5 rounded-md w-[478px] p-2 border-2" placeholder="Location" />
                </div>
            </div>
            <div className="flex space-x-10 flex-row mt-5">
                <div>
                    <label className="font-light">About job</label>
                    <p className="text-xs text-gray-500 font-light">Provide a brief summary of the job responsibilities and requirements</p>
                    <br />
                    <textarea type="text" className="h-[100px]  mt-3 rounded-md w-[478px] p-2 border-2" placeholder="Location" />
                </div>
                <div>
                    <label className="font-light">What we are looking for</label>
                    <p className="text-xs text-gray-500 font-light">Indicate key qualities, knowldge and expertise that you are <br />
                        seeking in a candidate </p>
                    <br />
                    <textarea type="text" className="h-[100px]   rounded-md w-[478px] p-2 border-2" placeholder="Location" />
                </div>
            </div>
            <div className="flex space-x-10 flex-row mt-5">
                <div>
                    <label className="font-light">About job</label>
                    <p className="text-xs text-gray-500 font-light">Provide a brief summary of the job responsibilities and requirements</p>
                    <br />
                    <textarea type="text" className="h-[100px]  mt-3 rounded-md w-[478px] p-2 border-2" placeholder="Location" />
                </div>
                <div>
                    <label className="font-light">What we are looking for</label>
                    <p className="text-xs text-gray-500 font-light">Indicate key qualities, knowldge and expertise that you are <br />
                        seeking in a candidate </p>
                    <br />
                    <textarea type="text" className="h-[100px]   rounded-md w-[478px] p-2 border-2" placeholder="Location" />
                </div>
            </div>
        </>
    )


}

const PostJobs = () => {
    const [showState, setShowState] = useState(1)
    const [page, setPage] = useState("")
    const [search, setSearch] = useState("")
    const [limit, setLimit] = useState("")
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
        console.log("helo", num)
        setShowState(num)
    }
    const ShowThis = () => {
        if (showState === 1) {
            return (<JobsTable mutateState={mutateState} data={data} />)


        }
        if (showState === 2) {
            return (<JobForm mutateState={mutateState} />)


        }
    }


    return (
        <>
            <div className="mx-20 mr-5    mt-5 p-5 bg-white">
                {ShowThis()}


            </div>
        </>
    );
}

export default PostJobs;