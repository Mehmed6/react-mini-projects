import CourseForm from "./CourseForm.jsx";
import {redirect} from "react-router";

export default function CourseCreatePage() {

    return <CourseForm/>
}

export async function courseAction({request, params}) {
    const data = await request.formData();

    const eventData = {
        title: data.get("title"),
        image: data.get("image"),
        description: data.get("description")
    }

    const response = await fetch("http://localhost:5000/courses", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(eventData)
    });

    if (response.ok)
        return redirect("/courses")
}
