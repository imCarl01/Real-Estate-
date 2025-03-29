import React, { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { signInFailure,signInSuccess,singInStart } from "../redux/user/userSlice";
const Signin  = () => {
    const [formData, setFormData] = useState({})
    // const [error,setError] = useState()
    // const [isLoading, setIsLoading] = useState(false)
    const {isLoading, error} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.id]: e.target.value})
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Sending data:", formData);
      try {
          // setIsLoading(true); instead of this use dispatch
          dispatch(singInStart())
          const res = await fetch("/api/auth/signin ", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
          });
   
          const data = await res.json();
          console.log("Response", data);
   
          if (!res.ok) {
              throw new Error(data.message || "Something went wrong");
          }

          if(data.success == false){
            // setIsLoading(false);
            // setError(data.message);
            // instead of the set states use the dispatch form redux
            dispatch(signInFailure(data.message))
            return;
          }

          // setIsLoading(false);
          // setError(null);
          // instead of the states us the dispatch
          dispatch(signInSuccess(data))
          navigate("/")

          console.log(data); // Debugging
   
      } catch (error) {
          dispatch(signInFailure(error.message));
      }
    }   

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl mb-5 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3.5">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
          />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit} className="bg-gray-700 hover:bg-gray-600 text-gray-800 font-bold p-3 rounded  text-center">
          {isLoading ? "Loading..." : ""}
          <span className="text-white text-center">Sign In</span>
        </button>
      </form>

        <div>
            I don't have an account? <Link to="/signup" className="text-blue-500">Sign In</Link>
        </div>
        {error && <p className="text-red-500 font-semibold">{error}</p>}
    </div>
  );
};

export default Signin ;
