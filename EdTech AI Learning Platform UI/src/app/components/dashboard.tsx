import { Link } from 'react-router-dom';
import { Brain, Home, FileText, Video, Users, Award, UserCircle, Mic, Languages, Target } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">LearnAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-gray-600 hover:text-indigo-600 transition">
              <UserCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6 hidden md:block">
          <nav className="space-y-2">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-medium">
              <Home className="w-5 h-5" />
              Home
            </Link>
            <Link to="/notes" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition">
              <FileText className="w-5 h-5" />
              My Notes
            </Link>
            <Link to="/videos" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition">
              <Video className="w-5 h-5" />
              Videos
            </Link>
            <Link to="/community" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition">
              <Users className="w-5 h-5" />
              Community
            </Link>
            <Link to="/future-features" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition">
              <Award className="w-5 h-5" />
              Quizzes
            </Link>
            <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition">
              <UserCircle className="w-5 h-5" />
              Profile
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Welcome back, Student! 👋</h1>
              <p className="text-indigo-100">What would you like to learn today?</p>
            </div>

            {/* Topic Input Section */}
            <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Generate Learning Content</h2>

              {/* Topic Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter Topic</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g., Photosynthesis, Quadratic Equations, World War II..."
                    className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
                  />
                  <button className="absolute right-3 top-3.5">
                    <Mic className="w-6 h-6 text-gray-400 hover:text-indigo-600 transition" />
                  </button>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Language Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Languages className="w-4 h-4 inline mr-1" />
                    Language
                  </label>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium">
                      English
                    </button>
                    <button className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition">
                      हिंदी
                    </button>
                  </div>
                </div>

                {/* Level Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Target className="w-4 h-4 inline mr-1" />
                    Level
                  </label>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition">
                      Beginner
                    </button>
                    <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-medium">
                      Exam-Focused
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/notes" className="block">
                  <button className="w-full px-6 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 hover:-translate-y-1 duration-300">
                    <FileText className="w-5 h-5" />
                    Generate Notes
                  </button>
                </Link>
                <Link to="/videos" className="block">
                  <button className="w-full px-6 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 hover:-translate-y-1 duration-300">
                    <Video className="w-5 h-5" />
                    Generate Video
                  </button>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {/* Activity Item 1 */}
                <div className="group flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer hover:-translate-y-1 duration-300 hover:shadow-xl hover:scale-[1.02]">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 transition">
                    <FileText className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Photosynthesis - Biology Notes</p>
                    <p className="text-sm text-gray-500">Generated 2 hours ago</p>
                  </div>
                </div>

                {/* Activity Item 2 */}
                <div className="group flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer hover:-translate-y-1 duration-300 hover:shadow-xl hover:scale-[1.02]">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Quadratic Equations - Math Video</p>
                    <p className="text-sm text-gray-500">Watched yesterday</p>
                  </div>
                </div>

                {/* Activity Item 3 */}
                <div className="group flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer hover:-translate-y-1 duration-300 hover:shadow-xl hover:scale-[1.02]">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Shared notes in Community</p>
                    <p className="text-sm text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
