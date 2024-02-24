import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/Contexts";
import toast from "react-hot-toast";
import axios from "axios";

function Navbar() {
    const { isAuthoeized, setAuthorized, user, setUser } = useContext(Context);
    const handleLogout = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/users/logout",
                {
                    withCredentials: true,
                }
            );
            toast.success(response.data.message);
            setUser({});
            setAuthorized(false);
            navigateTo("/login");
        } catch (error) {
            toast.error(error.response.data.message), setAuthorized(true);
        }
    }
    return <>
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom navbar">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <img class="bi ms-3 navbar-logo" src="logo.png" width="80" height="50" alt="" />
                <h1 class="fs-4 ms-3">JOB ZEE</h1>
            </a>

            <ul class="nav nav-pills">
                <li class="nav-item">
                    <Link to={"/"} class="nav-link">
                        Home
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to={"/jobs/getall"} class="nav-link">
                        All Jobs
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to={"/applications/me"} class="nav-link">
                        {(user && user.role === "job seeker" ? "All Applications" : "Applicant's Application")}
                    </Link>
                </li>
                {user && user.role === "for hiring" ? (
                    <>
                        <li class="nav-item">
                            <Link to={"/jobs/post"} class="nav-link">
                                Post New Job
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to={"/jobs/me"} class="nav-link">
                                View Your Jobs
                            </Link>
                        </li>
                    </>
                ) : (
                    <></>
                )}
                <button type="button" onClick={handleLogout} class="btn btn-dark me-3">Logout</button>
            </ul>
        </header>
    </>
}

export default Navbar;