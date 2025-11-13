import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    rollNumber: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { firstName, lastName, rollNumber, contact, email, password, confirmPassword } = formData;

    // 🔍 Validation checks
    if (!firstName || !lastName || !rollNumber || !contact || !email || !password || !confirmPassword) {
      alert("⚠️ Please fill all fields.");
      return;
    }
    if (!email.includes("@")) {
      alert("⚠️ Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      alert("⚠️ Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      alert("⚠️ Passwords do not match.");
      return;
    }

    // 🧠 Get existing accounts
    const existingAccounts = JSON.parse(localStorage.getItem("studentAccounts")) || [];
    const accountExists = existingAccounts.some((acc) => acc.email === email);

    if (accountExists) {
      alert("⚠️ Account already exists. Please login instead.");
      navigate("/student/login");
      return;
    }

    // ✅ Save new student
    const newStudent = { firstName, lastName, rollNumber, contact, email, password };
    localStorage.setItem("studentAccounts", JSON.stringify([...existingAccounts, newStudent]));
    localStorage.setItem("loggedInStudent", JSON.stringify(newStudent));

    alert(`🎉 Welcome, ${firstName}! Your account has been created.`);
    navigate("/student/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          🧑‍🎓 Create Student Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:space-x-2">
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full mb-3 sm:mb-0 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <input
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
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
            onClick={() => navigate("/student/login")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}
