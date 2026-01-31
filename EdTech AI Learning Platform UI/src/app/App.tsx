import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/app/components/landing-page';
import { SignupPage } from '@/app/components/signup-page';
import { LoginPage } from '@/app/components/login-page';
import { Dashboard } from '@/app/components/dashboard';
import { NotesPage } from '@/app/components/notes-page';
import { VideoPage } from '@/app/components/video-page';
import { CommunityPage } from '@/app/components/community-page';
import { FutureFeatures } from '@/app/components/future-features';
import { Profile } from '@/app/components/profile';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/videos" element={<VideoPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/future-features" element={<FutureFeatures />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
