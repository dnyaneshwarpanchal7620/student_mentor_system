import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MentorDashboard() {
  const navigate = useNavigate();
  const loggedInMentor = JSON.parse(localStorage.getItem("loggedInMentor"));
  const mentorName = loggedInMentor
    ? `${loggedInMentor.firstName} ${loggedInMentor.lastName}`
    : "Mentor";

  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // Load all data
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const storedUploads = JSON.parse(localStorage.getItem("studentUploads")) || [];
    const storedAttendance = JSON.parse(localStorage.getItem("mentorAttendance")) || [];
    const storedFeedbacks = JSON.parse(localStorage.getItem("mentorFeedbacks")) || [];

    setStudents(storedStudents);
    setUploads(storedUploads);
    setAttendance(storedAttendance);
    setFeedbacks(storedFeedbacks);
  }, []);

  const tabs = [
    { id: "overview", label: "🏠 Overview" },
    { id: "students", label: "👨‍🎓 Students" },
    { id: "uploads", label: "📤 Student Uploads" },
    { id: "attendance", label: "🕒 Attendance" },
    { id: "feedback", label: "💬 Give Feedback" },
  ];

  // ✅ Add Student
  const handleAddStudent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const firstName = formData.get("firstName").trim();
    const lastName = formData.get("lastName").trim();
    const email = formData.get("email").trim();

    if (!firstName || !lastName || !email) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    const newStudent = {
      id: Date.now(),
      firstName,
      lastName,
      email,
    };

    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    e.target.reset();
    alert("✅ Student added successfully!");
  };

  // ❌ Remove Student
  const handleRemoveStudent = (id) => {
    const updatedStudents = students.filter((s) => s.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  // ✅ Mark Attendance
  const markAttendance = (studentName, status) => {
    const newRecord = {
      id: Date.now(),
      studentName,
      date: new Date().toISOString().split("T")[0],
      status,
    };
    const updatedAttendance = [...attendance, newRecord];
    setAttendance(updatedAttendance);
    localStorage.setItem("mentorAttendance", JSON.stringify(updatedAttendance));
  };

  // ✅ Give Feedback
  const giveFeedback = (studentName, text) => {
    const newFeedback = { id: Date.now(), studentName, text };
    const updatedFeedbacks = [...feedbacks, newFeedback];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem("mentorFeedbacks", JSON.stringify(updatedFeedbacks));
    alert(`✅ Feedback added for ${studentName}`);
  };

  // Remove students attendece
  const removeAttendanceRecord = (indexToRemove) => {
  const updatedAttendance = attendance.filter((_, i) => i !== indexToRemove);
  setAttendance(updatedAttendance);
  localStorage.setItem("attendanceRecords", JSON.stringify(updatedAttendance));
  alert("🗑️ Attendance record removed successfully!");
};


  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100">
      {/* Sidebar */}
      <div className="bg-indigo-700 text-white w-full sm:w-64 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6 text-center">🧑‍🏫 {mentorName}</h1>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left py-2 px-4 rounded-lg mb-2 transition ${
              activeTab === tab.id ? "bg-indigo-500" : "hover:bg-indigo-600"
            }`}
          >
            {tab.label}
          </button>
        ))}

        <button
          onClick={() => {
            localStorage.removeItem("loggedInMentor");
            navigate("/");
          }}
          className="mt-auto bg-red-500 hover:bg-red-600 py-2 rounded-lg"
        >
          🚪 Logout
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        {/* 🏠 Overview */}
        {activeTab === "overview" && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">
              Welcome, {mentorName}! 👋
            </h2>
            <ul className="text-gray-700 space-y-2">
              <li>👨‍🎓 Total Students: {students.length}</li>
              <li>📁 Uploaded Projects: {uploads.length}</li>
              <li>💬 Feedbacks Given: {feedbacks.length}</li>
              <li>🕒 Attendance Records: {attendance.length}</li>
            </ul>
          </div>
        )}

        {/* 👨‍🎓 Students */}
        {activeTab === "students" && (
          <div className="bg-white p-6 rounded-2xl shadow space-y-6">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">
              👨‍🎓 Manage Students
            </h2>

            {/* ➕ Add Student Form */}
            <form
              onSubmit={handleAddStudent}
              className="flex flex-col sm:flex-row gap-3 items-center"
            >
              <input
                name="firstName"
                placeholder="First Name"
                className="border px-3 py-2 rounded-lg w-full sm:w-auto"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                className="border px-3 py-2 rounded-lg w-full sm:w-auto"
              />
              <input
                name="email"
                placeholder="Email"
                className="border px-3 py-2 rounded-lg w-full sm:w-auto"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Add Student
              </button>
            </form>

            {/* 📋 Student List */}
            {students.length === 0 ? (
              <p className="text-gray-500 mt-4">No students added yet.</p>
            ) : (
              <ul className="space-y-3 mt-4">
                {students.map((s) => (
                  <li
                    key={s.id}
                    className="flex justify-between items-center bg-indigo-50 p-3 rounded-lg border"
                  >
                    <div>
                      <p className="font-semibold">
                        {s.firstName} {s.lastName}
                      </p>
                      <p className="text-gray-600 text-sm">{s.email}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveStudent(s.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* 📤 Student Uploads */}
       {/* 📤 Student Uploads */}
       {activeTab === "uploads" && (
         <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
           <h2 className="text-xl font-semibold text-indigo-700 mb-4">
             📤 Uploaded Work by Students
           </h2>

           {uploads.length === 0 ? (
      <p className="text-gray-500">No project uploads yet.</p>
           ) : (
             <table className="min-w-full border text-sm text-center">
               <thead className="bg-indigo-100 text-indigo-700">
                 <tr>
                   <th className="border px-3 py-2">Student</th>
                   <th className="border px-3 py-2">Date</th>
                   <th className="border px-3 py-2">Title</th>
                   <th className="border px-3 py-2">Description</th>
                   <th className="border px-3 py-2">File</th>
                   <th className="border px-3 py-2">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {uploads.map((u) => (
                   <tr key={u.id} className="even:bg-indigo-50">
                     <td className="border px-3 py-2">{u.studentName}</td>
                     <td className="border px-3 py-2">{u.date}</td>
                     <td className="border px-3 py-2">{u.title}</td>
                     <td className="border px-3 py-2">{u.description}</td>
                     <td className="border px-3 py-2 text-indigo-600 font-semibold">
                       {u.fileName}
                     </td>
                     <td className="border px-3 py-2">
                       <button
                         onClick={() => {
                           if (window.confirm(`Remove ${u.title} uploaded by ${u.studentName}?`)) {
                             const updatedUploads = uploads.filter((x) => x.id !== u.id);
                             setUploads(updatedUploads);
                             localStorage.setItem("studentUploads", JSON.stringify(updatedUploads));
                             alert("🗑️ Upload removed successfully!");
                           }
                         }}
                         className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                       >
                         Remove
                       </button>
                     </td>
                   </tr>
                        )       )}
               </tbody>
             </table>
           )}
        </div>
     )} 

        {/* 🕒 Attendance */}
{/* 🕒 Attendance */}
{activeTab === "attendance" && (
  <div className="bg-white p-6 rounded-2xl shadow">
    <h2 className="text-xl font-semibold text-indigo-700 mb-4">
      🕒 Manage Student Attendance
    </h2>

    {students.length === 0 ? (
      <p className="text-gray-500">No students available.</p>
    ) : (
      <div className="space-y-4">
        {/* Mark Attendance for Today */}
        <div className="bg-indigo-50 p-4 rounded-xl border">
          <h3 className="text-lg font-semibold mb-3 text-indigo-700">
            Mark Attendance ({new Date().toLocaleDateString()})
          </h3>
          {students.map((student, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-2 bg-white p-3 rounded-lg shadow-sm"
            >
              <p className="font-medium">
                {student.firstName} {student.lastName}
              </p>
              <div>
                <button
                  onClick={() =>
                    markAttendance(
                      `${student.firstName} ${student.lastName}`,
                      "Present"
                    )
                  }
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg mr-2"
                >
                  Present
                </button>
                <button
                  onClick={() =>
                    markAttendance(
                      `${student.firstName} ${student.lastName}`,
                      "Absent"
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View & Manage Attendance Records */}
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-indigo-700">
            📋 Attendance History
          </h3>
          {attendance.length === 0 ? (
            <p className="text-gray-500">No attendance records yet.</p>
          ) : (
            <table className="min-w-full border text-sm text-center">
              <thead className="bg-indigo-100 text-indigo-700">
                <tr>
                  <th className="border px-3 py-2">Date</th>
                  <th className="border px-3 py-2">Student</th>
                  <th className="border px-3 py-2">Status</th>
                  <th className="border px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record, index) => (
                  <tr key={index} className="even:bg-indigo-50">
                    <td className="border px-3 py-2">{record.date}</td>
                    <td className="border px-3 py-2">{record.studentName}</td>
                    <td
                      className={`border px-3 py-2 font-semibold ${
                        record.status === "Present"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {record.status}
                    </td>
                    <td className="border px-3 py-2">
                      <button
                        onClick={() => removeAttendanceRecord(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )}
  </div>
)}



      </div>
    </div>
  );
}
