import RegisterPage from "./page/RegisterPage.jsx";
import {ToastContainer} from "react-toastify";

function App() {

  return (
      <>
          <ToastContainer  autoClose={2000} />
          <RegisterPage />
      </>

  )
}

export default App
