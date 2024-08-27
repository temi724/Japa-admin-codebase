import axios from "axios";

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