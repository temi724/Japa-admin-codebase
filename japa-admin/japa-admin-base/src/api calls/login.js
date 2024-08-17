import axios from "axios";

export const login_call = async(email, password) => {
    console.log(email, password)
    try {
        //extract to env..
        const data = await axios.post("https://coral-app-9xy6y.ondigitalocean.app/japa/v1/admin/login", { email, password })
        if (data.message !== "Invalid details") {
            return data
        } else {
            return ("wrong details")
        }

    } catch (ex) {
        console.log(ex)
    }

}