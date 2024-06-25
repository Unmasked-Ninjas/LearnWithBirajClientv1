import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const FormSubmission = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    try {
      const sendingData = {
        email: localStorage.getItem("email"),
        query,
      };
      const response = await axios.post(
        "https://walrus-app-bdiru.ondigitalocean.app/api/v1/query/postquery",
        sendingData
      );
      if (response.status === 201) {
        setQuery("");
        localStorage.removeItem("email");
        navigate("/final-submission");
      }
    } catch (error) {
      console.log("Error submitting query", error);
    }
  };
  return (
    <div className="max-w-7xl mx-auto mt-10 text-center sm:p-4 p-8">
      <div>
        <p className="text-white text-4xl">Thank you for connecting with me</p>
      </div>
      <div className="mt-5">
        <div className="xl:max-w-2xl md:max-w-md max-w-sm  mx-auto border-2 border-white p-4 text-xl">
          <p className="text-white">
            Our classes will begin before the exams, giving us six days in
            total: five preparation days and the exam day. We have seven
            chapters to cover. On the first day, we will finish the first two
            chapters, and we'll cover the remaining five chapters over the next
            five days. Each day, we will have a 2-hour class where we will focus
            on writing code, understanding concepts, and solving problems. This
            duration might extend based on the session's needs, ensuring we
            address all your doubts, questions, and teach more effectively with
            analogies. If you have any queries you can fill the table below.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <form
          className="p-4 flex items-center justify-center w-full flex-col gap-5"
          onSubmit={handleQuerySubmit}
        >
          <div className="w-full ">
            <input
              type="text"
              placeholder="Your Query"
              required
              className="placeholder:text-slate-400 p-3 rounded-md w-full "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
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

export default FormSubmission;
