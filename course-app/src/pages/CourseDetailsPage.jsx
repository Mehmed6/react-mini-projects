import {useLoaderData} from "react-router";

export default function CourseDetailsPage() {

    const course = useLoaderData();
    return (
        <>
            <h1>Course Title: {course.title}</h1>
        </>
    )
}

export async function courseDetailsLoader({params}) {
    const {id} = params;
    const res = await fetch("http://localhost:5000/courses/" + id);
    return res.json();
}