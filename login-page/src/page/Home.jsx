import {Button} from "@/components/ui/button.jsx";
import requests from "@/api/apiClient.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import {useAuthContext} from "@/context/AuthContext.jsx";

export default function Home() {

    const {user, setUser} = useAuthContext();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await requests.account.logout();
            toast.success("Logout successful");
            setUser(null);
            navigate("/login")

        } catch (error) {
            toast.error(error.message);
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div>
                <h1 className="text-4xl font-bold mb-10">
                    Welcome to the Home Page <span className="text-red-600">{user?.email}</span>
                </h1>

            <br/>

            <div>
                <Button onClick={handleLogout}>Logout Button</Button>
            </div>
            </div>
        </div>
    )
}