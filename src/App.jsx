import './App.css'
import Form from './Component/Form'
import Header from './Component/Header'
import FormSubmission from './Component/FormSubmission'
import FinalSubmission from './Component/FinalSubmission'
import {BrowserRouter, Routes, Route} from "react-router-dom"
function App() {


  return (
    <>
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path="/" element= {<Form/>} />
    <Route path="/form-submission" element= {<FormSubmission/>} />
    <Route path="/final-submission" element= {<FinalSubmission/>} />
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
