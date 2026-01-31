import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Brain, ArrowLeft, Download, Share2, Bookmark, CheckCircle } from 'lucide-react';
import api from '../../api/axiosConfig';

export function NotesPage() {
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const response = await api.post('/notes', { topic });
      // backend might return { data: ... } or direct payload
      const payload = response.data?.data ?? response.data;
      setNotes(payload);
    } catch (error) {
      console.error('Connection Error:', error);
      alert('Backend se connect nahi ho pa raha!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Title Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">Biology</span>
              <span>•</span>
              <span>Class 10</span>
              <span>•</span>
              <span>Generated just now</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Photosynthesis</h1>
            <p className="text-lg text-gray-600">Complete guide to the process of photosynthesis in plants</p>

            {/* Input to generate notes from backend */}
            <div className="flex gap-3 mt-4">
              <input
                className="px-4 py-2 border rounded-lg w-full"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter topic to generate notes..."
              />
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                {loading ? 'Generating...' : 'Get AI Notes'}
              </button>
            </div>

            {/* Display backend result if present */}
            {notes && (
              <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
                <h3 className="text-xl font-semibold">{notes.topic ?? topic}</h3>
                <div className="mt-2 text-gray-700">
                  {typeof notes === 'string' && <p>{notes}</p>}
                  {typeof notes === 'object' && (
                    // If backend returns structured content
                    <pre className="whitespace-pre-wrap">{JSON.stringify(notes, null, 2)}</pre>
                  )}
                </div>
              </div>
            )}
          </div>

          <hr className="border-gray-200" />

          {/* Notes Content */}
          {/* Dynamic Notes Content */}
          {notes ? (
            <div className="prose prose-lg max-w-none space-y-6">

              {/* Introduction */}
              {notes.intro && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">📖 Introduction</h2>
                  <p className="text-gray-700 leading-relaxed">{notes.intro}</p>
                </section>
              )}

              {/* Definition */}
              {notes.definition && (
                <section className="bg-indigo-50 p-6 rounded-2xl border-l-4 border-indigo-600">
                  <h3 className="text-xl font-semibold text-indigo-900 mb-2">💡 Definition</h3>
                  <p className="text-gray-800">{notes.definition}</p>
                </section>
              )}

              {/* Chemical Equation (Optional) */}
              {notes.chemicalEquation && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">⚗️ Equation / Formula</h2>
                  <div className="bg-gray-100 p-6 rounded-xl text-center">
                    <p className="text-xl font-mono text-gray-800">{notes.chemicalEquation}</p>
                  </div>
                </section>
              )}

              {/* Key Points */}
              {notes.keyPoints && notes.keyPoints.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">🔑 Key Points</h2>
                  <ul className="space-y-3">
                    {notes.keyPoints.map((point: any, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">
                          <strong className="text-gray-900">{point.title}:</strong> {point.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Main Stages */}
              {notes.mainStages && notes.mainStages.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">🌓 Main Stages</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {notes.mainStages.map((stage: any, index: number) => (
                      <div key={index} className={`p-6 rounded-2xl border-2 ${index % 2 === 0 ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'}`}>
                        <h3 className={`text-xl font-semibold mb-3 ${index % 2 === 0 ? 'text-orange-900' : 'text-green-900'}`}>{stage.title}</h3>
                        <ul className="space-y-2 text-gray-700">
                          {stage.points.map((pt: string, i: number) => (
                            <li key={i} className="flex gap-2">
                              <span>•</span><span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Real World Examples */}
              {notes.realWorldExamples && notes.realWorldExamples.length > 0 && (
                <section className="bg-purple-50 p-6 rounded-2xl">
                  <h2 className="text-2xl font-bold text-purple-900 mb-3">📝 Real-World Examples</h2>
                  <ul className="space-y-2 text-gray-700">
                    {notes.realWorldExamples.map((ex: any, index: number) => (
                      <li key={index}>
                        <strong>{ex.title}</strong> - {ex.text}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Exam Tips */}
              {notes.examTips && notes.examTips.length > 0 && (
                <section className="bg-amber-50 p-6 rounded-2xl border-l-4 border-amber-500">
                  <h2 className="text-2xl font-bold text-amber-900 mb-3">🎯 Exam Tips</h2>
                  <ul className="space-y-2 text-gray-700">
                    {notes.examTips.map((tip: string, index: number) => (
                      <li key={index}>✓ {tip}</li>
                    ))}
                  </ul>
                </section>
              )}

            </div>
          ) : (
            // Placeholder content shown before generation
            <div className="text-center py-20 opacity-50">
              <Brain className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-400">Enter a topic to generate AI notes</h2>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-6 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Generated by AI • Verified content • Last updated: Today
            </p>
            <Link to="/dashboard">
              <button className="px-6 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition">
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
