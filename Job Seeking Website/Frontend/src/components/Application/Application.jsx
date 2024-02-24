import { useState, useContext } from "react";
import { Context } from "../../store/Contexts";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function Application() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [resume, setResume] = useState({});

    const { isAuthorized, user } = useContext(Context);

    const navigateTo = useNavigate();

    // Function to handle file input changes
    const handleFileChange = (event) => {
        const resume1 = event.target.files[0];
        setResume(resume1);
    };

    const { id } = useParams();

    const handleApplication = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("coverLetter", coverLetter);
        formData.append("resume", resume);
        formData.append("jobId", id);
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/application/post",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setName("");
            setEmail("");
            setCoverLetter("");
            setPhone("");
            setAddress("");
            setResume("");
            toast.success(data.message);
            navigateTo("/jobs/getall");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (!isAuthorized || (user && user.role === "for hiring")) {
        navigateTo("/");
    }

    return <>
        <div className="application-form">
            <h1>Application Form</h1>
            <form onSubmit={handleApplication}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Your Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Your Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="CoverLetter..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label
                        style={{ textAlign: "start", display: "block", fontSize: "20px" }}
                    >
                        Select Resume
                    </label>
                    <input
                        type="file"
                        name="resume"
                        className="form-control"
                        accept=".pdf, .jpg, .png"
                        onChange={handleFileChange}
                        style={{ width: "100%" }}
                    />
                </div>
                <button type="submit">Send Application</button>
            </form>
        </div>
    </>
}

export default Application;