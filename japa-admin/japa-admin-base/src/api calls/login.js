import axios from "axios";

export const login_call = async(email, password) => {
    console.log(email, password)
    try {
        //extract to env..
        const data = await axios.post("https://coral-app-9xy6y.ondigitalocean.app/japa/v1/admin/login", { email, password })
        if (data.message !== "Invalid details") {
            console.log(data.data.message)
            sessionStorage.setItem("tokken", JSON.stringify(data.data.message))
            sessionStorage.setItem("details", JSON.stringify(data.data.user_data))
            window.location.href("/admin")
            return data
        } else {
            return ("wrong details")
        }

    } catch (ex) {
        console.log(ex)
    }

}