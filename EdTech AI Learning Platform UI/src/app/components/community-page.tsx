import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed
import { Brain, ArrowLeft, Upload, Heart, MessageCircle, Share2, Filter, Search, TrendingUp, X } from 'lucide-react';

export function CommunityPage() {
  // State for Modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for Notes List
  const [notes, setNotes] = useState([]);

  // State for Form Data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: 'Mathematics',
    classLevel: 'Class 10',
    authorName: 'Student'
  });

  // Load Notes from Backend on Page Load
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/community');
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  // Handle Form Submit
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/community/upload', formData);
      alert("🎉 Note Uploaded Successfully!");
      setIsModalOpen(false); // Close Modal
      fetchNotes(); // Refresh List
      // Reset Form
      setFormData({ title: '', description: '', subject: 'Mathematics', classLevel: 'Class 10', authorName: 'Student' });
    } catch (err) {
      alert("❌ Upload Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>

      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-semibold text-gray-900">LearnAI Community</span>
            </div>
          </div>

          {/* ✅ FIXED BUTTON with onClick */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Upload className="w-4 h-4" />
            Upload Notes
          </button>
        </div>
      </header>

      {/* --- UPLOAD POPUP MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800">Upload Your Notes</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Upload Form */}
            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Newton's Laws"
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>History</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <select
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                    value={formData.classLevel}
                    onChange={(e) => setFormData({ ...formData, classLevel: e.target.value })}
                  >
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Describe your notes..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>

              {/* File Upload UI */}
              <div
                onClick={() => document.getElementById('fileInput')?.click()}
                className="border-2 border-dashed border-indigo-100 bg-indigo-50 rounded-xl p-6 text-center cursor-pointer hover:bg-indigo-100 transition relative"
              >
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) alert(`File selected: ${file.name} (Ready to publish!)`);
                  }}
                />
                <Upload className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                <p className="text-sm text-indigo-700 font-medium">Click to attach PDF</p>
                <p className="text-xs text-indigo-400 mt-1">(Supports PDF, DOCX)</p>
              </div>

              <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg">
                Publish Note
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Search className="w-5 h-5" /> Search
              </h3>
              <input type="text" placeholder="Search notes..." className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 outline-none" />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold mb-4 flex gap-2"><Filter className="w-5 h-5" /> Filter</h3>
              {/* Filters UI same as before */}
              <div className="space-y-2">
                {['Mathematics', 'Science', 'English'].map(sub => (
                  <label key={sub} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
                    <span className="text-gray-700">{sub}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Notes Feed */}
          <div className="lg:col-span-3 space-y-6">

            {/* Banner */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Community Hub</h2>
              </div>
              <p className="text-purple-100">Explore notes shared by other students</p>
            </div>

            {/* DYNAMIC NOTES LIST (Backend Data) */}
            {notes.length > 0 ? (
              notes.map((note) => (
                <div key={note.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl">
                        {note.authorName ? note.authorName[0] : "S"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{note.authorName}</p>
                        <p className="text-sm text-gray-500">{note.classLevel} • Just now</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">{note.subject}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{note.title}</h3>
                  <p className="text-gray-600 mb-4">{note.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex gap-6 text-gray-500">
                      <button className="flex gap-2 hover:text-red-500"><Heart className="w-5 h-5" /> {note.likes}</button>
                      <button className="flex gap-2 hover:text-blue-500"><MessageCircle className="w-5 h-5" /> 0</button>
                    </div>
                    <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition">
                      View PDF
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                <p className="text-gray-500">No notes found. Be the first to upload! 🚀</p>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
