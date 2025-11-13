import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("");
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const name = localStorage.getItem("adminName");
    if (name) {
      setAdminName(name);
    }

    
    setMentors([
      {
        id: 1,
        name: "Vishal Gadekar",
        email: "vishalgadekar@mentor.com",
        expertise: "Java",
        students: 5,
      },
      {
        id: 2,
        name: "Kalpesh Bhange",
        email: "kalpeshbhange@mentor.com",
        expertise: "Micro-controller",
        students: 3,
      },
      {
        id: 3,
        name: "Arjun Mehta",
        email: "arjun@mentor.com",
        expertise: "Java & Spring Boot",
        students: 4,
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          👋 Welcome,{" "}
          {adminName
            ? adminName.charAt(0).toUpperCase() + adminName.slice(1)
            : "Admin"}
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("adminName");
            window.location.href = "/login/admin";
          }}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
        >
          Logout
        </button>
      </header>

      {/* Mentor Details Section */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-xl font-bold text-indigo-600 mb-4">
          👨‍🏫 Mentor Details
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-indigo-100 text-indigo-700">
                <th className="py-2 px-4 text-left border">ID</th>
                <th className="py-2 px-4 text-left border">Name</th>
                <th className="py-2 px-4 text-left border">Email</th>
                <th className="py-2 px-4 text-left border">Expertise</th>
                <th className="py-2 px-4 text-left border">Students</th>
                <th className="py-2 px-4 text-left border">Assign</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map((mentor) => (
                <tr
                  key={mentor.id}
                  className="hover:bg-gray-50 transition border-b"
                >
                  <td className="py-2 px-4 border">{mentor.id}</td>
                  <td className="py-2 px-4 border">{mentor.name}</td>
                  <td className="py-2 px-4 border">{mentor.email}</td>
                  <td className="py-2 px-4 border">{mentor.expertise}</td>
                  <td className="py-2 px-4 border text-center">
                    {mentor.students}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm">
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Other dashboard cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold text-indigo-600 mb-2">
            Manage Projects
          </h2>
          <p className="text-gray-700">
            Track student project submissions and progress.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold text-indigo-600 mb-2">
            Student List
          </h2>
          <p className="text-gray-700">
            View student details and mentor assignments.
          </p>
        </div>
      </div>
    </div>
  );
}
