import {Outlet} from "react-router";

export default function CourseLayout() {
    return (
        <div id="course-layout">
            <h1>Course List</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur
                et expedita fugit illum labore non numquam quae rerum. Accusantium
                earum esse id in laboriosam magnam molestias neque perspiciatis placeat voluptas?
            </p>
            <Outlet/>
        </div>
    )
}