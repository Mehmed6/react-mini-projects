import {Form, redirect} from "react-router";

export default function CourseForm({data, method}) {
    return (
        <Form method={method}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    defaultValue={data ? data.title : ""}
                />
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="text"
                    name="image"
                    id="image"
                    required
                    defaultValue={data ? data.image : ""}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    name="description"
                    required
                    rows={5}
                    defaultValue={data ? data.description : ""}
                ></textarea>
            </div>
            <button type="submit">Submit</button>
        </Form>
    )
}

export async function courseAction({request, params}) {
    const {id} = params;
    let BASE_URL = "http://localhost:5000/courses";
    const method = request.method;
    const data = await request.formData();

    if (method === "PUT") {
        BASE_URL += "/" + id;
    }

    const eventData = {
        title: data.get("title"),
        image: data.get("image"),
        description: data.get("description")
    }

    const response = await fetch(BASE_URL, {
        method: method,
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(eventData)
    });

    if (response.ok)
        return redirect("/courses")
}