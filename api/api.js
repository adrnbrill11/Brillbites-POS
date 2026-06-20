import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
})

//add token 

api.interceptors.request.use((config) => {
    const savedUser = localStorage.getItem("user")
    const user = savedUser ? JSON.parse(savedUser) : null
    if(user?.token){
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
})

export default api
