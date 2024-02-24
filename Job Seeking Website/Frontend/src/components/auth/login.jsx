import { useContext, useRef } from "react";
import axios from "axios";
import { Context } from "../../store/Contexts";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
    const { isAuthorized, setAuthorized } = useContext(Context);

    const emailRef = useRef("");
    const roleRef = useRef("");
    const passwordRef = useRef("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/users/login",
                {
                    email: emailRef.current.value,
                    role: roleRef.current.value,
                    password: passwordRef.current.value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                },
            );
            toast.success(data.message);
            emailRef.current.value = "";
            roleRef.current.value = "";
            passwordRef.current.value = "";
            setAuthorized(true);

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    if (isAuthorized) {
        return <Navigate to={"/"} />;
    }
    return <>
        <div className="register-container">
            <div className="register-form">
                <center><h2>Log In</h2></center>
                <form>
                    <div>
                        <label for="email" className="form-label">Email address</label>
                        <input type="email" ref={emailRef} className="form-control" id="email" placeholder="email@example.com" />
                    </div>
                    <div >
                        <select className="form-select" ref={roleRef} aria-label="Default select example">
                            <option defaultValue={"Select Your Role"}>Select Your Role</option>
                            <option value="job seeker">Job Seeker</option>
                            <option value="for hiring">For Hiring</option>
                        </select>
                    </div>
                    <div>
                        <label for="pass" className="form-label">Password</label>
                        <input type="password" className="form-control" ref={passwordRef} id="pass" placeholder="password" />
                    </div>
                    <div className="register-button">
                        <button type="submit" onClick={handleSubmit} className="btn btn-success">Log In</button>
                    </div>

                </form>
                <div className="loginLink">
                    <a href="/register">If not Registerd?</a>
                </div>
            </div>
            <div className="register-image-container">
                <img className="register-image" src="login.png" alt="" />
            </div>
        </div>
    </>
}

export default Login;