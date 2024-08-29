export const fetchUsers = async () => {
    const response = await fetch("https://coral-app-9xy6y.ondigitalocean.app/japa/v1/admin/users");
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Destructure data
    const {
        message,
        users,
        total_pages,
        current_page
    } = data;
    return {
        message,
        users,
        total_pages,
        current_page
    }; // Return destructured data
};

export const fetchStats = async () => {
    const response = await fetch("https://coral-app-9xy6y.ondigitalocean.app/japa/v1/admin/stats")
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data

}

export const fetchCourses = async () => {
    const response = await fetch("https://coral-app-9xy6y.ondigitalocean.app/japa/v1/admin/courses")
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const {
        courses,
        total_pages,
        current_page
    } = data
    return {
        courses,
        total_pages,
        current_page
    }

}
export const fetchjobs = async () => {
    const response = await fetch("https://coral-app-9xy6y.ondigitalocean.app/japa/v1/admin/jobs")
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const {
        jobs,
        total_pages,
        current_page
    } = data
    return {
        jobs,
        total_pages,
        current_page
    }

}


export const postCourse = async (data) => {
    let tokks = JSON.parse(sessionStorage.getItem("tokken")).split(" ")[1]
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokks}`
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch("https://q969qj2z-2000.uks1.devtunnels.ms//japa/v1/admin/postcourse", options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        console.log('Success:', responseData); // Handle the response data
        return responseData;
    } catch (error) {
        console.error('Error:', error); // Handle any errors
    }

}