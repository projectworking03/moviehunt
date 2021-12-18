import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ReviewPage from "./pages/ReviewPage";
import TopMovies from "./pages/TopMovies";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Review Page */}
          <Route path="/review" element={<ReviewPage />}>
            <Route path=":id" element={<ReviewPage />} />
          </Route>

          {/* Error Page */}
          <Route path="/error" element={<ErrorPage />} />

          {/* Top Movies Page */}
          <Route path="/top-movies" element={<TopMovies />} />

          {/* Redirect */}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
