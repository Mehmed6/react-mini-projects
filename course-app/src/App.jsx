import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/help/ContactPage.jsx";
import CoursesPage, {courseDeleteAction, coursesLoader} from "./pages/course/CoursesPage.jsx";
import HelpLayout from "./layouts/HelpLayput.jsx";
import FaqPage from "./pages/help/FaqPage.jsx";
import CourseDetailsPage, {courseDetailsLoader} from "./pages/course/CourseDetailsPage.jsx";
import CourseLayout from "./layouts/CourseLayout.jsx";
import CourseEditPage from "./pages/course/CourseEditPage.jsx";
import CourseCreatePage from "./pages/course/CourseCreatePage.jsx";
import {courseAction} from "./pages/course/CourseForm.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: "home", element: <HomePage/>},
            {path: "about", element: <AboutPage/>},
            {
                path: "courses",
                element: <CourseLayout/>,
                children: [
                    {index: true, element: <CoursesPage/>, loader:coursesLoader},
                    {
                        id: "course-details",
                        path: ":id",
                        loader: courseDetailsLoader,
                        children: [
                            {index: true, element: <CourseDetailsPage/>},
                            {path: "edit", element: <CourseEditPage/>, action:courseAction},
                            {path: "delete", action:courseDeleteAction}
                        ]
                    },
                    {path: "create", element: <CourseCreatePage/>, action:courseAction},
                ]
            },
            {
                path: "help",
                element: <HelpLayout/>,
                children: [
                    {path: "contact", element: <ContactPage/>},
                    {path: "faq", element: <FaqPage/>},
                ]
            }
        ]
    }
])
function App() {

  return <RouterProvider router={router} />
}

export default App
