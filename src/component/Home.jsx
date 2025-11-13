export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-8">🎓 Student-Mentor System</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <a
          href="/login/admin"
          className="px-6 py-3 bg-indigo-700 rounded-xl shadow hover:bg-indigo-800 transition"
        >
          Admin Login
        </a>
        <a
          href="/login/mentor"
          className="px-6 py-3 bg-green-600 rounded-xl shadow hover:bg-green-700 transition"
        >
          Mentor Login
        </a>
        <a
          href="/login/student"
          className="px-6 py-3 bg-yellow-500 text-black rounded-xl shadow hover:bg-yellow-600 transition"
        >
          Student Login
        </a>
      </div>
    </div>
  );
}
