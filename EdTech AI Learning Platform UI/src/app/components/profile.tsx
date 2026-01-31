import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';

export function Profile() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    // Load User
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    setUser(currentUser);

    // Load History
    const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
    setQuizHistory(history);
    setTotalQuizzes(history.length);

    if (history.length > 0) {
      const totalScore = history.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (sum: number, q: any) => sum + q.score,
        0
      );

      setAverageScore(Math.round((totalScore / (history.length * 10)) * 100));

      const uniqueSubjects = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...new Set(history.map((q: any) => q.subject)),
      ] as string[];
      setSubjects(uniqueSubjects);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-gray-900">My Learning Profile 📊</h1>

        {/* User Info Card */}
        {user && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
              <p className="text-gray-500 mb-4">{user.email}</p>
              <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                {user.className}th Grade
              </span>
            </div>
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-medium">Total Quizzes</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">{totalQuizzes}</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-medium">Average Score</p>
            <h2 className="text-3xl font-bold text-indigo-600 mt-2">{averageScore}%</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-medium">Subjects Studied</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">{subjects.length}</h2>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-10">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Overall Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-indigo-600 h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${averageScore}%` }}
            ></div>
          </div>
          <p className="mt-3 text-gray-600 font-medium">{averageScore}% Mastery Level</p>
        </div>

        {/* Quiz History Table */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Quiz History</h2>

          {quizHistory.length === 0 ? (
            <p className="text-gray-500 italic">No quizzes attempted yet. Go take some quizzes!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 font-semibold text-gray-600">Subject</th>
                    <th className="py-4 font-semibold text-gray-600">Topic</th>
                    <th className="py-4 font-semibold text-gray-600">Score</th>
                    <th className="py-4 font-semibold text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {quizHistory.map((q: any, i: number) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 text-gray-800">{q.subject}</td>
                      <td className="py-4 text-gray-800">{q.topic}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${q.score >= 7 ? 'bg-green-100 text-green-700' :
                            q.score >= 4 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                          }`}>
                          {q.score}/{q.total}
                        </span>
                      </td>
                      <td className="py-4 text-gray-500">{q.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
