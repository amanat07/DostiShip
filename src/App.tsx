import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Features from "./pages/Features";
import LearnMore from "./pages/LearnMore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Inbox from "./pages/Inbox";
import Map from "./pages/Map";
import Hangout from "./pages/Hangout";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import HelpCenter from "./pages/HelpCenter";
import FAQ from "./pages/FAQ";
import Feedback from "./pages/Feedback";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import HowItWorks from "./pages/HowItWorks";
import Safety from "./pages/Safety";
import Community from "./pages/Community";
import CookiePolicy from "./pages/CookiePolicy";
import Guidelines from "./pages/Guidelines";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import CreatingYourProfile from "./pages/help/CreatingYourProfile";
import FindingFriends from "./pages/help/FindingFriends";
import SafetyTips from "./pages/help/SafetyTips";
import CommunityGuidelines from "./pages/help/CommunityGuidelines";
import SendingMessages from "./pages/help/SendingMessages";
import VoiceVideoCalls from "./pages/help/VoiceVideoCalls";
import AccountDeletion from "./pages/help/AccountDeletion";
import PasswordReset from "./pages/help/PasswordReset";
import FileSharing from "./pages/help/FileSharing";
import GroupConversations from "./pages/help/GroupConversations";
import CreatingHangoutRooms from "./pages/help/CreatingHangoutRooms";
import JoiningEvents from "./pages/help/JoiningEvents";
import StudyGroups from "./pages/help/StudyGroups";
import VirtualActivities from "./pages/help/VirtualActivities";
import PrivacySettings from "./pages/help/PrivacySettings";
import BlockingUsers from "./pages/help/BlockingUsers";
import ReportingIssues from "./pages/help/ReportingIssues";
import AccountSecurity from "./pages/help/AccountSecurity";
import ProfileSettings from "./pages/help/ProfileSettings";
import NotificationPreferences from "./pages/help/NotificationPreferences";
import FriendFinder from "./pages/FriendFinder";
import FriendSuggestions from "./pages/FriendSuggestions";
import FriendProfile from "./pages/FriendProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/community" element={<Community />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help/creating-your-profile" element={<CreatingYourProfile />} />
          <Route path="/help/finding-friends" element={<FindingFriends />} />
          <Route path="/help/safety-tips" element={<SafetyTips />} />
          <Route path="/help/community-guidelines" element={<CommunityGuidelines />} />
          <Route path="/help/sending-messages" element={<SendingMessages />} />
          <Route path="/help/voice-and-video-calls" element={<VoiceVideoCalls />} />
          <Route path="/help/account-deletion" element={<AccountDeletion />} />
          <Route path="/help/password-reset" element={<PasswordReset />} />
          <Route path="/help/file-sharing" element={<FileSharing />} />
          <Route path="/help/group-conversations" element={<GroupConversations />} />
          <Route path="/help/creating-hangout-rooms" element={<CreatingHangoutRooms />} />
          <Route path="/help/joining-events" element={<JoiningEvents />} />
          <Route path="/help/study-groups" element={<StudyGroups />} />
          <Route path="/help/virtual-activities" element={<VirtualActivities />} />
          <Route path="/help/privacy-settings" element={<PrivacySettings />} />
          <Route path="/help/blocking-users" element={<BlockingUsers />} />
          <Route path="/help/reporting-issues" element={<ReportingIssues />} />
          <Route path="/help/account-security" element={<AccountSecurity />} />
          <Route path="/help/profile-settings" element={<ProfileSettings />} />
          <Route path="/help/notification-preferences" element={<NotificationPreferences />} />
          <Route path="/friend-finder" element={<FriendFinder />} />
          <Route path="/friend-suggestions" element={<FriendSuggestions />} />
          <Route path="/profile/:id" element={<FriendProfile />} />
          {/* TODO: Add routes for sidebar navigation */}
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/hangout" element={<Hangout />} />
          <Route path="/map" element={<Map />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
