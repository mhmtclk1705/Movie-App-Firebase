import { createContext, useEffect, useState } from "react";
import { userObserver } from "../auth/firebase";

//! Context yapısını oluşturmak için createContext metodunu kullanıyoruz.
//! 

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  //! login durumunu tutmak için currentUser oluşturduk
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    //! login değişikliği durumunu kontrol ediyoruz
    userObserver(setCurrentUser);
  }, []);

  return (
    //! oluşturulan context i sarmallamak için bi provider kullanıyoruz ve currentUser ı kontrol etmek için 
    // ! value olarak gönderiyoruz
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
