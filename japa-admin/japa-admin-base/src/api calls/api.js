import axios from "axios";

export const fetchUsers = async () => {
    const response = await fetch("https://coral-app-9xy6y.ondigitalocean.app/japa/v1/admin/users");
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Destructure data
    const { message, users } = data;
    return { message, users }; // Return destructured data
};