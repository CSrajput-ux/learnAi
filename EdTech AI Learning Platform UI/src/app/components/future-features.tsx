import { Link } from 'react-router-dom';
import { useState } from "react";
import { Brain, ArrowLeft, Award, HelpCircle, Shield, Sparkles } from 'lucide-react';

export function FutureFeatures() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState<any[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const generateQuiz = () => {
    if (!subject || !topic) {
      alert("Enter subject and topic");
      return;
    }

    const questionBank = [
      {
        question: `What is the definition of ${topic} in ${subject}?`,
        options: [
          `Basic explanation of ${topic}`,
          `Incorrect concept of ${topic}`,
          `Unrelated to ${subject}`,
          `Opposite of ${topic}`
        ],
        correctIndex: 0,
      },
      {
        question: `Which formula is related to ${topic}?`,
        options: [
          `Formula related to ${topic}`,
          `Random formula`,
          `Unrelated equation`,
          `Wrong concept`
        ],
        correctIndex: 0,
      },
      {
        question: `Why is ${topic} important in ${subject}?`,
        options: [
          `It explains core principles`,
          `It has no importance`,
          `It is outdated`,
          `It is optional`
        ],
        correctIndex: 0,
      },
      {
        question: `Which of the following is true about ${topic}?`,
        options: [
          `Correct fact about ${topic}`,
          `Incorrect statement`,
          `False explanation`,
          `Misleading idea`
        ],
        correctIndex: 0,
      }
    ];

    const generated = Array.from({ length: 10 }, (_, i) => {
      const base = questionBank[i % questionBank.length];
      return {
        ...base,
        question: `Q${i + 1}. ${base.question}`
      };
    });

    setQuiz(generated);
    setAnswers(Array(10).fill(-1));
    setShowResult(false);
  };

  const handleSelect = (qIndex: number, optionIndex: number) => {
    const updated = [...answers];
    updated[qIndex] = optionIndex;
    setAnswers(updated);
  };

  const submitTest = () => {
    let score = 0;

    quiz.forEach((q, i) => {
      if (answers[i] === q.correctIndex) {
        score++;
      }
    });

    const quizHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]");

    quizHistory.push({
      subject,
      topic,
      score,
      total: 10,
      date: new Date().toLocaleDateString(),
    });

    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));

    setShowResult(true);
    alert(`Test Completed 🎉\nYour Score: ${score}/10`);
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
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Coming Soon</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Exciting Features on the Way</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're constantly working to improve your learning experience. Here's what we're building next!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Feature 1: Quiz/MCQs */}
          <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-indigo-200">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Interactive Quizzes</h3>
            <p className="text-gray-600 mb-6">
              Test your knowledge with AI-generated quizzes and MCQs. Get instant feedback and track your progress over time.
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                Multiple choice questions
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                Instant score calculation
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                Topic-wise practice tests
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                Performance analytics
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                In Development
              </div>
            </div>
          </div>

          {/* Feature 2: Doubt Solving */}
          <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-purple-200">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Doubt Solving</h3>
            <p className="text-gray-600 mb-6">
              Get instant answers to your doubts with our AI-powered doubt solving system. Available 24/7 to help you learn.
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                Ask questions anytime
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                Step-by-step explanations
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                Image upload support
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                Multiple solution methods
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                In Development
              </div>
            </div>
          </div>

          {/* Feature 3: Teacher Verified */}
          <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-green-200">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Teacher Verified Content</h3>
            <p className="text-gray-600 mb-6">
              All AI-generated content will be reviewed and verified by experienced teachers to ensure accuracy and quality.
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Expert teacher review
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Quality assurance badge
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Syllabus-aligned content
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Regular content updates
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                Coming Soon
              </div>
            </div>
          </div>
        </div>

        {/* Mockup Section */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-white mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Want to be the first to try?</h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join our early access program and get exclusive access to new features before everyone else!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 rounded-xl text-gray-900 flex-1 max-w-md outline-none"
              />
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Development Roadmap</h2>
          <div className="space-y-6">
            {/* Q1 2026 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <div className="w-1 flex-1 bg-green-300"></div>
              </div>
              <div className="flex-1 pb-8">
                <div className="bg-green-50 rounded-xl p-6">
                  <p className="text-sm text-green-700 font-semibold mb-2">Q1 2026 - Completed</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Core Platform Launch</h3>
                  <p className="text-gray-600">AI-generated notes and videos with Hindi/English support</p>
                </div>
              </div>
            </div>

            {/* Q2 2026 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold animate-pulse">
                  2
                </div>
                <div className="w-1 flex-1 bg-purple-300"></div>
              </div>
              <div className="flex-1 pb-8">
                <div className="bg-purple-50 rounded-xl p-6">
                  <p className="text-sm text-purple-700 font-semibold mb-2">Q2 2026 - In Progress</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Features</h3>
                  <p className="text-gray-600">Quizzes, MCQs, and community enhancements</p>
                </div>
              </div>
            </div>

            {/* Q3 2026 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                  3
                </div>
                <div className="w-1 flex-1 bg-indigo-200"></div>
              </div>
              <div className="flex-1 pb-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-sm text-gray-500 font-semibold mb-2">Q3 2026 - Planned</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">AI Doubt Solving</h3>
                  <p className="text-gray-600">24/7 doubt solving with advanced AI technology</p>
                </div>
              </div>
            </div>

            {/* Q4 2026 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                  4
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-sm text-gray-500 font-semibold mb-2">Q4 2026 - Planned</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Teacher Verification</h3>
                  <p className="text-gray-600">Expert teacher review and content certification</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-12">
          <h2 className="text-3xl font-bold mb-6">AI Test Generator 🤖</h2>

          <input
            type="text"
            placeholder="Enter Subject (e.g. Physics)"
            className="border p-3 rounded w-full mb-4"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Topic (e.g. Laws of Motion)"
            className="border p-3 rounded w-full mb-4"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <button
            onClick={generateQuiz}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg mb-6"
          >
            Generate Test (10 Questions)
          </button>

          {quiz.length > 0 && (
            <div>
              {quiz.map((q, qIndex) => (
                <div key={qIndex} className="mb-6">
                  <h3 className="font-bold mb-3">{q.question}</h3>

                  {q.options.map((opt: string, optIndex: number) => (
                    <label key={optIndex} className="block mb-2">
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        checked={answers[qIndex] === optIndex}
                        onChange={() => handleSelect(qIndex, optIndex)}
                      />{" "}
                      {opt}
                    </label>
                  ))}
                </div>
              ))}

              {!showResult && (
                <button
                  onClick={submitTest}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                  Submit Test
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}