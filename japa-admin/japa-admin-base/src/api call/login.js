import axios from "axios";

export const login_call = async(email, password) => {
    console.log(email, password)
    try {
        const data = await axios.post("https://coral-app-9xy6y.ondigitalocean.app/japa/v1/admin/login", { email, password })
        if (data.message) {
            return data
        }

    } catch (ex) {
        console.log(ex)
    }

}