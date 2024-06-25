import React, { useState } from "react";
import "../styles/form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Form = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subjects, setSubjects] = useState({
    DSA: false,
    OOPS: false,
  });
  const [error, setError] = useState("");
  const handleSubjectChange = (subject) => {
    setSubjects((prevSubjects) => ({
      ...prevSubjects,
      [subject]: !prevSubjects[subject],
    }));
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phoneNumber) {
      setError("Please fill all the fields");
      return;
    }
    if (!subjects.DSA && !subjects.OOPS) {
      setError("Please select at least one subject");
      return;
    }
    const sendingData = {
      name,
      email,
      phone: phoneNumber,
      subjects,
    };
    try {
      const response = await axios.post(
        "https://walrus-app-bdiru.ondigitalocean.app/api/v1/students/register",
        sendingData
      );
      if (response.status === 201) {
        setName("");
        setEmail("");
        setPhoneNumber("");
        setSubjects({
          DSA: false,
          OOPS: false,
        });
        const userEmail = response.data.message.email;
        localStorage.setItem("email", userEmail);
        navigate("/form-submission");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-7xl mx-auto  rounded-xl shadow-sm mt-10">
      <div className="flex justify-center items-center flex-col">
        <p className=" dark:text-white mt-5  font-medium tracking-tight text-2xl relative">
          Fill Up The Form
        </p>
        <form
          onSubmit={handleSubmit}
          className="p-4 flex items-center justify-center w-full flex-col gap-5"
        >
          <div className="w-6/12 xl:w-full ">
            <input
              type="text"
              placeholder="Name"
              required
              className="placeholder:text-slate-400 p-3 rounded-md w-full "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="w-6/12 xl:w-full">
            <input
              type="email"
              placeholder="Email"
              required
              className="placeholder:text-slate-400 p-3 rounded-md w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-6/12 xl:w-full">
            <input
              type="tel"
              placeholder="Number"
              required
              className="placeholder:text-slate-400 p-3 rounded-md w-full"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              minLength="10"
              maxLength="10"
            />
          </div>
          <div>
            <label className="text-white text-xl xl:text-2xl">
              Choose Subjects:
            </label>
            <div className="flex items-center gap-2 ">
              <input
                type="checkbox"
                checked={subjects.DSA}
                onChange={() => handleSubjectChange("DSA")}
              />
              <span className="text-white text-xl xl:text-2xl">DSA</span>
            </div>
            <div className="flex items-center gap-2 ">
              <input
                type="checkbox"
                checked={subjects.OOPS}
                onChange={() => handleSubjectChange("OOPS")}
              />
              <span className="text-white text-xl xl:text-2xl">OOPS</span>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <button
            type="submit"
            className="text-white text-xl xl:text-2xl border-2 border-white py-2 px-5 rounded-xl"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
