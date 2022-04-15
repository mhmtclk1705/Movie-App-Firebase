import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MovieDetail from "../pages/MovieDetail";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

//! router ı import ediyoruz.
//! router içerisinde kullanılacak sayfaları import ediyoruz
//! Context i kullanmak için AuthContext ve useContext leri import ediyoruz

const AppRouter = () => {
  //! Context ile tanımladığımız AuthContext'i kullanıyoruz.
  //! currentUser ı yakalıyoruz
  const { currentUser } = useContext(AuthContext);
  function PrivateRouter() {
    let location = useLocation();
    // ! currentUser boş ise details/id yönlendirmesini yapmayıp direkt login sayfasına yönlendiriyoruz.

    if (!currentUser) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Navbar sürekli görünsün istediğimiz için Router içerisinde tanımladık 
        Routes içinde Route larla yönlendirmek istediğimiz sayfaları belirliyoruz
        */}
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Movie Detail sayfasını Private roouter içerisinde handle ederek yönlendirmeyi login olan kullanıcılara özel
        hale getiriyoruz */}
        <Route element={<PrivateRouter />}>
          <Route path="/details/:id" element={<MovieDetail />} />
        </Route>
        {/* <Route path="/details/:id" element={<MovieDetail />} /> */}
        {/* <Route
          path="/details/:id"
          element={currentUser ? <MovieDetail /> : <Navigate to="/login" />}
        /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
