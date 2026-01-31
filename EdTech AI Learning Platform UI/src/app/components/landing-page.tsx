import { Link } from 'react-router-dom';
import { Sparkles, FileText, Video, Languages, Download, Users, BookOpen, Brain } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">LearnAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-indigo-600 transition">Testimonials</a>
            <a href="#about" className="text-gray-600 hover:text-indigo-600 transition">About</a>
            <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition">Login</Link>
            <Link to="/signup" className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Learning Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Enter Any Topic, Get AI Video + Notes Instantly
            </h1>
            <p className="text-xl text-gray-600">
              Transform your learning experience with AI-generated notes and explainer videos. Study smarter, not harder.
            </p>
            
            {/* Topic Input Box */}
            <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
              <input
                type="text"
                placeholder="Enter any topic (e.g., Photosynthesis, Calculus...)"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
              />
              <div className="flex gap-3">
                <button className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-medium">
                  Generate Notes
                </button>
                <button className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-medium">
                  Watch Video
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1758874385197-07d99c183a6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBvbmxpbmV8ZW58MXx8fHwxNzY5NzM4ODc3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Student Learning"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">AI Powered</p>
                <p className="font-semibold">Instant Learning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features for Modern Learning</h2>
            <p className="text-xl text-gray-600">Everything you need to excel in your studies</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Generated Notes</h3>
              <p className="text-gray-600">Easy, exam-oriented notes tailored to your learning level</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Video className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Explainer Videos</h3>
              <p className="text-gray-600">Animated videos with voice narration for better understanding</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Languages className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hindi / English Support</h3>
              <p className="text-gray-600">Learn in your preferred language for better comprehension</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                <Download className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Download PDF</h3>
              <p className="text-gray-600">Save notes as PDF for offline studying anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Students Say</h2>
            <p className="text-xl text-gray-600">Join thousands of happy learners</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1631128869897-68e78bf4fb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudCUyMHNtaWxpbmd8ZW58MXx8fHwxNzY5NzkyNDE1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Student"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">Priya Sharma</p>
                  <p className="text-sm text-gray-500">Class 12, CBSE</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"This app helped me score 95% in my board exams! The AI notes are exactly what I needed."</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1729824186568-be656d0eecf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRlZW5hZ2VyJTIwc3R1ZHlpbmd8ZW58MXx8fHwxNzY5NzA4MjE1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Student"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">Arjun Patel</p>
                  <p className="text-sm text-gray-500">College, Engineering</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"The video explanations are amazing! Complex topics become so easy to understand."</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1758270704025-0e1a1793e1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3Njk3OTI0MTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Student"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">Sneha Reddy</p>
                  <p className="text-sm text-gray-500">Class 10, ICSE</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"I love the Hindi support! Now I can learn in my comfortable language."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-8 h-8 text-indigo-400" />
                <span className="text-xl font-semibold">LearnAI</span>
              </div>
              <p className="text-gray-400">Making education accessible and engaging for every student.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/community" className="hover:text-white transition">Community</Link></li>
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 LearnAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
