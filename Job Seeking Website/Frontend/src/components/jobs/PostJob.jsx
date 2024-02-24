import { useContext, useRef, useState } from "react";
import { Context } from "../../store/Contexts.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
function PostJob() {
    const titleRef = useRef("");
    const descriptionRef = useRef("");
    const categoryRef = useRef("");
    const countryRef = useRef("");
    const cityRef = useRef("");
    const locationRef = useRef("");
    const [salary, setSalary] = useState("");

    const { isAuthorized, user } = useContext(Context);

    const handleJobPost = async (e) => {

        await axios
            .post(
                "http://localhost:5000/api/jobs/post",
                {
                    title: titleRef.current.value,
                    description: descriptionRef.current.value,
                    category: categoryRef.current.value,
                    country: countryRef.current.value,
                    city: cityRef.current.value,
                    location: locationRef.current.value,
                    salary,
                },


                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                toast.success(res.data.message);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };

    const navigateTo = useNavigate();
    if (!isAuthorized || (user && user.role !== "for hiring")) {
        navigateTo("/");
    }

    return <>
        <div className="form-container">
            <center><h1>POST NEW JOB</h1></center>
            <form onSubmit={handleJobPost}>
                <div className="rows">
                    <div class="mb-3">
                        <input type="text" class="form-control" ref={titleRef} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Job Title" />
                    </div>
                    <div class="mb-3">
                        <select
                            class="form-control"
                            ref={categoryRef}
                        >
                            <option value="">Select Category</option>
                            <option value="Graphics & Design">Graphics & Design</option>
                            <option value="Mobile App Development">
                                Mobile App Development
                            </option>
                            <option value="Frontend Web Development">
                                Frontend Web Development
                            </option>
                            <option value="MERN Stack Development">
                                MERN STACK Development
                            </option>
                            <option value="Account & Finance">Account & Finance</option>
                            <option value="Artificial Intelligence">
                                Artificial Intelligence
                            </option>
                            <option value="Video Animation">Video Animation</option>
                            <option value="MEAN Stack Development">
                                MEAN STACK Development
                            </option>
                            <option value="MEVN Stack Development">
                                MEVN STACK Development
                            </option>
                            <option value="Data Entry Operator">Data Entry Operator</option>
                        </select>
                    </div>
                </div>
                <div className="rows">
                    <div class="mb-3">
                        <input
                            type="text"
                            class="form-control"
                            ref={countryRef}
                            placeholder="Country"
                        />
                    </div>
                    <div class="mb-3">
                        <input
                            type="text"
                            class="form-control"
                            ref={cityRef}
                            placeholder="City"
                        />
                    </div>
                </div>
                <div className="rows">
                    <div class="mb-3">
                        <input
                            type="text"
                            class="form-control"
                            ref={locationRef}
                            placeholder="Location"
                        />
                    </div>
                    <div class="mb-3">
                        <input
                            type="number"
                            class="form-control"
                            placeholder="Salary"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>
                </div>
                <div className="rows">
                    <textarea
                        rows="10"
                        class="form-control"
                        ref={descriptionRef}
                        placeholder="Job Description"
                    />
                </div>
                <button class="form-control form-button" type="submit">Create Job</button>
            </form>
        </div>
    </>
}
export default PostJob;