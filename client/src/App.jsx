import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import MovieReviewsPage from "./pages/MovieReviewsPage";
import ReviewDetailPage from "./pages/ReviewDetailPage";
import PostDetailPage from "./pages/PostDetailPage";
import TrailerBreakdownPage from "./pages/TrailerBreakdownPage";
import TopListsPage from "./pages/TopListsPage";
import NewsPage from "./pages/NewsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/reviews" element={<MovieReviewsPage />} />
        <Route path="/reviews/:slug" element={<ReviewDetailPage />} />
        <Route path="/trailers" element={<TrailerBreakdownPage />} />
        <Route path="/trailers/:slug" element={<PostDetailPage />} />
        <Route path="/top-lists" element={<TopListsPage />} />
        <Route path="/top-lists/:slug" element={<PostDetailPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<PostDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Route>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
