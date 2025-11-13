import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();

  // Get logged-in student
  const loggedInStudent = JSON.parse(localStorage.getItem("loggedInStudent"));
  const studentName = loggedInStudent
    ? `${loggedInStudent.firstName} ${loggedInStudent.lastName}`
    : "Student";

  const [activeTab, setActiveTab] = useState("overview");
  const [uploads, setUploads] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [attendance, setAttendance] = useState([]);

  // Load mentor updates
  useEffect(() => {
    setFeedbacks(JSON.parse(localStorage.getItem("mentorFeedbacks")) || []);
    setMeetings(JSON.parse(localStorage.getItem("mentorMeetings")) || []);
    setAttendance(JSON.parse(localStorage.getItem("mentorAttendance")) || []);
    setUploads(JSON.parse(localStorage.getItem("studentUploads")) || []);
  }, []);

  // Handle upload
  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("file");

    if (title && description && file.name) {
      const newUpload = {
        id: Date.now(),
        title,
        description,
        fileName: file.name,
        date: new Date().toISOString().split("T")[0],
        studentName,
      };

      const allUploads = JSON.parse(localStorage.getItem("studentUploads")) || [];
      allUploads.push(newUpload);
      localStorage.setItem("studentUploads", JSON.stringify(allUploads));

      setUploads(allUploads);
      alert("✅ Project uploaded successfully!");
      e.target.reset();
    }
  };

  // Attendance percentage
  const totalDays = attendance.filter((a) => a.studentName === studentName).length;
  const presentDays = attendance.filter(
    (a) => a.studentName === studentName && a.status === "Present"
  ).length;
  const attendancePercent = totalDays ? Math.round((presentDays / totalDays) * 100) : 0;

  // Tabs
  const tabs = [
    { id: "overview", label: "🏠 Overview" },
    { id: "upload", label: "📤 Upload Work" },
    { id: "feedback", label: "💬 Mentor Feedback" },
    { id: "meetings", label: "📅 Meetings" },
    { id: "attendance", label: "🕒 Attendance" },
    { id: "performance", label: "📊 Performance" },
  ];

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100">
      {/* Sidebar */}
      <div className="bg-indigo-700 text-white w-full sm:w-64 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6 text-center">🎓 {studentName}</h1>

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
            localStorage.removeItem("loggedInStudent");
            navigate("/");
          }}
          className="mt-auto bg-red-500 hover:bg-red-600 py-2 rounded-lg"
        >
          🚪 Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">
              Welcome, {studentName}! 👋
            </h2>
            <p className="text-gray-600 mb-4">
              Here you can track your project progress, mentor feedback, and attendance.
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>📤 Uploaded Projects: {uploads.filter(u => u.studentName === studentName).length}</li>
              <li>💬 Feedback Received: {feedbacks.filter(f => f.studentName === studentName).length}</li>
              <li>📅 Upcoming Meetings: {meetings.length}</li>
              <li>🕒 Attendance: {attendancePercent}%</li>
            </ul>
          </div>
        )}

        {/* Upload Work */}
        {activeTab === "upload" && (
          <div className="bg-white p-6 rounded-2xl shadow max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">
              📤 Upload Project Work
            </h2>
            <form onSubmit={handleUpload} className="space-y-4 bg-indigo-50 p-4 rounded-xl">
              <input
                name="title"
                placeholder="Project Title"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              />
              <textarea
                name="description"
                placeholder="Project Description"
                rows="3"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="file"
                name="file"
                className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Upload
              </button>
            </form>

            {/* Uploaded Work */}
            <h3 className="text-lg font-semibold text-indigo-700 mt-6 mb-2">
              📁 Your Uploaded Work
            </h3>
            {uploads.filter(u => u.studentName === studentName).length === 0 ? (
              <p className="text-gray-500">No uploads yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm text-center">
                  <thead className="bg-indigo-100 text-indigo-700">
                    <tr>
                      <th className="border px-3 py-2">Date</th>
                      <th className="border px-3 py-2">Title</th>
                      <th className="border px-3 py-2">Description</th>
                      <th className="border px-3 py-2">File</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploads
                      .filter((u) => u.studentName === studentName)
                      .map((u) => (
                        <tr key={u.id} className="even:bg-indigo-50">
                          <td className="border px-3 py-2">{u.date}</td>
                          <td className="border px-3 py-2">{u.title}</td>
                          <td className="border px-3 py-2">{u.description}</td>
                          <td className="border px-3 py-2 text-indigo-600 font-semibold">
                            {u.fileName}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Feedback */}
        {activeTab === "feedback" && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">
              💬 Mentor Feedback
            </h2>
            {feedbacks.filter(f => f.studentName === studentName).length === 0 ? (
              <p className="text-gray-500">No feedback yet.</p>
            ) : (
              <ul className="space-y-2">
                {feedbacks
                  .filter((f) => f.studentName === studentName)
                  .map((f) => (
                    <li key={f.id} className="bg-indigo-50 p-3 rounded">
                      {f.text}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}

        {/* Attendance */}
        {activeTab === "attendance" && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">🕒 Attendance</h2>
            <p className="text-gray-700 mb-4">
              Attendance Percentage: <strong>{attendancePercent}%</strong>
            </p>
            <div className="overflow-x-auto">
              {attendance.filter(a => a.studentName === studentName).length === 0 ? (
                <p className="text-gray-500">No attendance records yet.</p>
              ) : (
                <table className="min-w-full border text-sm text-center">
                  <thead className="bg-indigo-100 text-indigo-700">
                    <tr>
                      <th className="border px-3 py-2">Date</th>
                      <th className="border px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance
                      .filter((a) => a.studentName === studentName)
                      .map((a) => (
                        <tr key={a.id} className="even:bg-indigo-50">
                          <td className="border px-3 py-2">{a.date}</td>
                          <td
                            className={`border px-3 py-2 font-semibold ${
                              a.status === "Present" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {a.status}
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
    </div>
  );
}
