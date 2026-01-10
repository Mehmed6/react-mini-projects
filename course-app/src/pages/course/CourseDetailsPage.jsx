import {useLoaderData} from "react-router";
import {CiUser} from "react-icons/ci";
import {FcLike} from "react-icons/fc";
import {FaRegComments} from "react-icons/fa";

export default function CourseDetailsPage() {

    const course = useLoaderData();
    return (
        <div className="course-details">
            <h1>{course.title}</h1>
            <div className="course-desc">
                <img src={`http://localhost:5000/images/${course.image}`} alt=""/>
                <div>
                    <div>{course.description}</div>
                    <div className="icons">
                        <span><CiUser /> {course.users}</span>
                        <span><FcLike /> {course.likes}</span>
                        <span><FaRegComments /> {course.comments}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function courseDetailsLoader({params}) {
    const {id} = params;
    const res = await fetch("http://localhost:5000/courses/" + id);
    return res.json();
}