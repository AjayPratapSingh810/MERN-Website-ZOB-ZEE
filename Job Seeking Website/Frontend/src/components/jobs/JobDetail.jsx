import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../store/Contexts";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function JobDetail() {
    const { isAuthorized, user } = useContext(Context);
    const [job, setjob] = useState({});
    const { id } = useParams();
    const navigateTo = useNavigate();
    useEffect(() => {

        axios.get(`http://localhost:5000/api/jobs/${id}`, {
            withCredentials: true,
        })
            .then((res) => {
                setjob(res.data.job);
            })
            .catch((error) => {
                // navigateTo("/notfound");
                console.log(error);
            })


    }, []);

    if (!isAuthorized) {
        navigateTo("/login");
    }

    return <>
        <div className="jobDetail-container">
            <div className="heading">
                <h1>Job Detail</h1>
            </div>
            <div className="detail">
                <span><h5>Title:   </h5> <p className="detail-p">{job.title}</p></span>
            </div>
            <div className="detail">
                <span><h5>Category:   </h5> <p className="detail-p">{job.description}</p></span>
            </div>
            <div className="detail">
                <span><h5>Country:   </h5> <p className="detail-p">{job.country}</p></span>
            </div>
            <div className="detail">
                <span><h5>City:   </h5> <p className="detail-p">{job.city}</p></span>
            </div>
            <div className="detail">
                <span><h5>Location:   </h5> <p className="detail-p">{job.location}</p></span>
            </div>
            <div className="detail">
                <span><h5>Description:  </h5> <p className="detail-p">{job.description}</p></span>
            </div>
            <div className="detail">
                <span><h5>Job Posted On:    </h5> <p className="detail-p">{job.jobPostedOn}</p></span>
            </div>
            <div className="detail">
                <span><h5>Salary:   </h5> <p className="detail-p">{job.salary}</p></span>
            </div>
            <div className="applyButton">
                {(user && user.role === "job seeker") ?
                    <Link to={`/application/${job._id}`} className="Link">Apply Now</Link> : <></>
                }
            </div>
        </div>
    </>
}
export default JobDetail;