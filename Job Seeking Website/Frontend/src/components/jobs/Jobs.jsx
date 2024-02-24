import { useContext, useState, useEffect } from "react";
import { Context } from "../../store/Contexts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Jobs() {
    const [jobs, setJobs] = useState({});
    const { isAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();
    useEffect(() => {
        try {
            axios.get("http://localhost:5000/api/jobs/getall", {
                withCredentials: true,
            }).then((res) => {
                setJobs(res.data);
            })
        }
        catch {
            console.log(error);
        };
    }, [])

    if (!isAuthorized) {
        navigateTo("/");
    }

    return <>
        <div class="container px-4 py-5" id="custom-cards">
            <center><h2 class="pb-2 border-bottom">All Jobs</h2></center>
            <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                {jobs.jobs && jobs.jobs.map((job) => (
                    <div class="col">
                        <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" >
                            <div class="d-flex flex-column h-90 p-5 pb-3 text-white text-shadow-1">
                                <h5>{job.title}</h5>
                                <p>{job.category}</p>
                                <p>{job.city} {job.country}</p>
                                <div className="LinkDiv job-link-detail">
                                    <Link to={`/jobs/${job._id}`} class="Link">Job Details</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
}

export default Jobs;