import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MentorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const mentorAccounts = JSON.parse(localStorage.getItem("mentorAccounts")) || [];
    const foundMentor = mentorAccounts.find(
      (m) => m.email === email && m.password === password
    );

    if (foundMentor) {
      localStorage.setItem("loggedInMentor", JSON.stringify(foundMentor));
      alert(`✅ Welcome back, ${foundMentor.firstName}!`);
      navigate("/mentor/dashboard");
    } else {
      alert("❌ Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          🔐 Mentor Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/mentor/signup")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign up
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
