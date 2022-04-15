import React from "react";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./context/AuthContext";
import AppRouter from "./router/AppRouter";

//! Context içinde tanımladıklarımızı kullanmak için AuthContextProvider'ı import ettik.
//! AppRouter ile router a bağlı olarak çalıştırıyoruz.
// ! ToastContainer ı toastify dan import ediyoruz.
const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <AppRouter />
        <ToastContainer />
      </AuthContextProvider>
    </div>
  );
};

export default App;
