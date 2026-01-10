import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/help/ContactPage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import HelpLayout from "./layouts/HelpLayput.jsx";
import FaqPage from "./pages/help/FaqPage.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: "home", element: <HomePage/>},
            {path: "about", element: <AboutPage/>},
            {path: "courses", element: <CoursesPage/>},
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
