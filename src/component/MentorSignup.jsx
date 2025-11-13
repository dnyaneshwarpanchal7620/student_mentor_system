import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MentorSignup() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    department: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const mentorAccounts = JSON.parse(localStorage.getItem("mentorAccounts")) || [];
    const existingMentor = mentorAccounts.find((m) => m.email === formData.email);

    if (existingMentor) {
      alert("⚠️ Account already exists. Please login.");
      navigate("/mentor/login");
      return;
    }

    mentorAccounts.push(formData);
    localStorage.setItem("mentorAccounts", JSON.stringify(mentorAccounts));

    alert("✅ Mentor account created successfully!");
    navigate("/mentor/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          ✍️ Mentor Sign Up
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-1/2 px-3 py-2 border rounded-lg"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              className="w-1/2 px-3 py-2 border rounded-lg"
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full px-3 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />

          <select
            name="department"
            className="w-full px-3 py-2 border rounded-lg"
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="Computer">Computer</option>
            <option value="AIDS">AIDS</option>
            <option value="IT">IT</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
            <option value="E&TC">E&TC</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/mentor/login")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Log in
          </button>
        </p>

        <p
          className="text-center text-sm text-gray-500 mt-2 hover:underline cursor-pointer"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </p>
      </div>
    </div>
  );
}
