import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending data:", formData);
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response", data);

      if (data.success == false) {
        setIsLoading(false);
        setError(data.message);
        return;
      }

      setIsLoading(false);
      setError(null);
      Navigate("/");

      console.log(data);

      console.log(data); 
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl mb-5 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3.5">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="name"
          onChange={handleChange}
        />
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
        <button
          onClick={handleSubmit}
          className="bg-gray-700 hover:bg-gray-600 text-gray-800 font-bold p-3 rounded  text-center"
        >
          {isLoading ? "Loading..." : ""}
          <span className="text-white text-center">Sign Up</span>
        </button>
      </form>

      <div>
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-500">
          Sign In
        </Link>
      </div>
      {error && <p className="text-red-500 font-semibold">{error}</p>}
    </div>
  );
};

export default Signup;
