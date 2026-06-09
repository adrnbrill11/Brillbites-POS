import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";


export default function autoLogout(minutes = 5){
    const {logout, isLoggedIn} = useAuthStore()
    const navigate = useNavigate()
    const timer = useRef();

    function resetTimer(){
        if (timer.current) clearTimeout(timer.current)

            timer.current = setTimeout(() => {
                logout()
                navigate("/login")
                alert("Session expired - Logged out due to Inactivity!")
                
            }, minutes * 60 * 1000)
    }

    useEffect(() => {
        if(!isLoggedIn) return

        //Actions to reset Timer
        const events = ["mouseclick", "mousemove", "keypress", "scroll", "touchstart"]
        //Add event listener
        events.forEach(event => window.addEventListener(event, resetTimer))
        //Start timer
        resetTimer()
        //Cleanup unmount
        return() => {
            if(timer.current) clearTimeout(timer.current)
            events.forEach(event => window.removeEventListener(event, resetTimer))
        }
    }, [isLoggedIn])
}