import {useRouteLoaderData} from "react-router";
import CourseForm from "./CourseForm.jsx";


export default function CourseEditPage() {
    const course = useRouteLoaderData("course-details");
    return <CourseForm data={course} method={"PUT"}/>;
}

