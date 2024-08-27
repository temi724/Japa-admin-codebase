import Select from "react-select"
const PostJobs = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    return (
        <>
            <div className="mx-5 mt-5 bg-white  p-5">
                <h1>Post a New Job</h1>
                {/* 1 */}
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
                <div className="flex flex-row space-x-10  mt-5">
                    <div>
                        <label className="font-light">Payment Type</label> <br />
                        <input type="text" className="h-[50px] rounded-md mt-2 w-[478px] p-2 border-2" placeholder="company name" />

                    </div>
                    <div className="">
                        <label className="font-light">Salary Type</label> <br />
                        <input type="text" className="h-[50px] rounded-md mt-2 w-[478px] p-2 border-2" placeholder="company name" />
                        {/* <input type="text" className="h-[50px] mt-7 rounded-md w-[478px] p-2 border-2" placeholder="Location" />
                        <input type="text" className="h-[50px] mt-7 rounded-md w-[478px] p-2 border-2" placeholder="city" /> */}
                    </div>
                </div>

            </div>
        </>
    );
}

export default PostJobs;