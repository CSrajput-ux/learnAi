import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, ArrowLeft, Play, Pause, Volume2, Settings, Maximize, Languages, Sparkles, X, Clock, BookOpen, Loader2 } from 'lucide-react';

export function VideoPage() {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Current Video Data (State mein rakha taki update ho sake)
  const [currentVideo, setCurrentVideo] = useState({
    title: "Quadratic Equations - Complete Guide",
    subject: "Mathematics",
    duration: "5 min 23 sec",
    description: "Learn everything about quadratic equations including standard form, solving methods, and practical applications."
  });

  // Form Data State
  const [formData, setFormData] = useState({
    topic: '',
    subject: 'Mathematics',
    duration: '5'
  });

  const [videoUrl, setVideoUrl] = useState("");

  // --- HANDLERS ---
  const handleGenerateClick = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const userId = currentUser.id || 1; // Fallback to 1 if no user

      // Call Backend API
      const response = await fetch('http://localhost:5000/api/generate/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: formData.topic,
          duration: formData.duration,
          userId: userId // Sending dynamic userId
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsGenerating(false);
        setIsModalOpen(false); // Close Modal

        // Update the UI with the ACTUAL generated video
        setCurrentVideo({
          title: data.data.topic,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          subject: (data.data as any).subject || formData.subject, // Backend doesn't return subject yet, so fallback or update model
          duration: data.data.duration,
          description: `AI-generated explanation on ${data.data.topic}. Generated in ${data.data.duration}.`,
        });

        // Set Video Source (Assumes global window.videoSrc or similar logic, but for now we might need to modify the video player src)
        // Since the current Video Player code uses a hardcoded IMG overlay, we need to inject the video URL.
        // Let's create a state for video URL.
        setVideoUrl(`http://localhost:5000${data.data.videoUrl}`);

        alert("🎉 Video Generated Successfully!");
        setFormData({ topic: '', subject: 'Mathematics', duration: '5' }); // Reset form
      } else {
        alert("Failed to generate video: " + data.error);
        setIsGenerating(false);
      }

    } catch (error) {
      console.error("Error generating video:", error);
      alert("Something went wrong! Is the backend running?");
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>

      {/*Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-semibold text-gray-900">LearnAI</span>
            </div>
          </div>

          {/* ✨ NEW: Generate Video Button */}
          <button
            onClick={handleGenerateClick}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-lg shadow-indigo-200 hover:-translate-y-1 duration-300"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
            Generate New Video
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center relative group">
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    controls
                    className="w-full h-full object-contain"
                    autoPlay
                  />
                ) : (
                  <>
                    {/* Thumbnail */}
                    <img
                      src="https://images.unsplash.com/photo-1652127691413-6cb8c0304aba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHRlY2hub2xvZ3klMjBlZHVjYXRpb258ZW58MXx8fHwxNzY5NzkyNDE1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Video Content"
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-30 transition"
                    />

                    {/* Play Button Overlay */}
                    <button className="absolute inset-0 flex items-center justify-center group/btn">
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover/btn:bg-white group-hover/btn:scale-110 transition-all shadow-lg">
                        <Play className="w-10 h-10 text-indigo-600 ml-1" />
                      </div>
                    </button>

                    {/* Slide Indicator */}
                    <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm">
                      Slide 1 of 8
                    </div>
                  </>
                )}
              </div>

              {/* Video Controls */}
              <div className="bg-gray-800 p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-white text-sm">0:00</span>
                  <div className="flex-1 bg-gray-700 h-1 rounded-full cursor-pointer">
                    <div className="bg-indigo-500 h-1 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <span className="text-white text-sm">{currentVideo.duration}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="text-white hover:text-indigo-400 transition"><Play className="w-6 h-6" /></button>
                    <button className="text-white hover:text-indigo-400 transition"><Volume2 className="w-6 h-6" /></button>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-white hover:text-indigo-400 transition"><Settings className="w-6 h-6" /></button>
                    <button className="text-white hover:text-indigo-400 transition"><Maximize className="w-6 h-6" /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info (Updated from State) */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">{currentVideo.subject}</span>
                <span>•</span>
                <span>Class 10</span>
                <span>•</span>
                <span>{currentVideo.duration}</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900">{currentVideo.title}</h1>
              <p className="text-gray-600 leading-relaxed">
                {currentVideo.description}
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <Languages className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Language:</span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium">English</button>
                  <button className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition">हिंदी</button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Topics Covered</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">1</div>
                  <span className="text-gray-700">Introduction to {currentVideo.subject}</span>
                </li>
                <li className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-sm flex-shrink-0">2</div>
                  <span className="text-gray-700">Key Concepts & Formulas</span>
                </li>
                <li className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-sm flex-shrink-0">3</div>
                  <span className="text-gray-700">Practical Examples</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* --- GENERATE VIDEO MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

            {/* Modal Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Generate AI Video
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-6">

              {/* Topic Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Topic</label>
                <input
                  type="text"
                  placeholder="e.g., Photosynthesis, Newton's Laws..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:ring-0 outline-none transition"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Subject Select */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Subject
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-600 outline-none appearance-none bg-white"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>Biology</option>
                      <option>History</option>
                    </select>
                    {/* Custom Arrow could go here */}
                  </div>
                </div>

                {/* Duration Select */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Duration
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-600 outline-none appearance-none bg-white"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  >
                    <option value="2">Short (2 min)</option>
                    <option value="5">Medium (5 min)</option>
                    <option value="10">Long (10 min)</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Create Video
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}