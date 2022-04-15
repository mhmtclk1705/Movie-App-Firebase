import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../auth/firebase";
import { AuthContext } from "../context/AuthContext";

//! Contxt ile current user ı almak için import ediyoruz
//! navbar da kullanmak için Link ve navigate i import ediyoruz
//! giriş yapılması durumunda aktifleşmesi için logOut ı firebase den import ediyoruz 

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  // const currentUser = { displayName: "felix franko" };
  // const currentUser = false;
  return (
    <div>
      {/* //! KLASİK HTML NAVBAR YAPISI */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          
          <Link to={"/"} className="navbar-brand text-white">
            <h4>React Movie App</h4>
          </Link>
          <div className="d-flex text-white align-items-center">
            {currentUser ? (
              <h5 className="mb-0 text-capitalize">
                {currentUser?.displayName}
              </h5>
            ) : (
              <button
                className="ms-2 btn btn-outline-light"
                //! navigate ile login e yönlendirme
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}

            {currentUser ? (
              //! Login olma durumunda LogOut botunun gösterilmesi için
              // ! tam tersi durumda yani varsayılan olarak Login ve Register butonlarının gösterilmesi için 

              <button
                className="ms-2 btn btn-outline-light"
                //! logOut ile çıkış yapma işlemi
                onClick={() => logOut()}
              >
                Logout
              </button>
            ) : (
              <button
                className="ms-2 btn btn-outline-light"
                //! navigate ile register a yönlendirme
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
