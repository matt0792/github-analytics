import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import UserPage from "./pages/UserPage";
import RepoPage from "./pages/RepoPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="spacer"></div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/repo/:username/:repo" element={<RepoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
