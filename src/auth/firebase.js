import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/ToastNotify";


//? https://firebase.google.com/docs/auth/web/start
//? https://console.firebase.google.com/ => project settings
//? firebase console settings bölümünden firebaseconfig ayarlarını al
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//! üstteki yapıyı olduğu gibi firebase den aldık ilk önce build >> web >> get Started dan 
//! varsayılan yapımızı kopyalıyoruz üstteki firebaseConfig hariç hepsi ordan alındı
// ! daha sonra firebase içerisinde oluşturduğumuz proje içerisinden settingsden  alt kısımdan 
// ! config kısmını alıp const ile oluşturulan firebaseConfig içerisine yapıştırıyoruz

//* daha sonra yeni kullanıcı oluşturma işlemini async await ile(then ile yapmak daha uzun) oluşturup içerisine
//* register dan aldığımız email, password ve başarılı olma durumunda yönlendirmesi için navigate i yolluyoruz


export const createUser = async (email, password, displayName, navigate) => {
  try {
    //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    //? kullanıcı profilini güncellemek için kullanılan firebase metodu
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });

    //* navigate ile yönlendirmesini istediğimiz yeri belirtiyoruz
    navigate("/");
    //* toast mesajını göstermek için kullanılan metod
    toastSuccessNotify("Registered successfully!");
    console.log(userCredential);

    // error durumunda hatayı alert ettiriyoruz
  } catch (err) {
    //* toast mesajını göstermek için kullanılan metod
    toastErrorNotify(err.message);
    // alert(err.message);
  }
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Email/password
//! Email/password ile girişi enable yap

//* create user ın aynısı signIn içinde geçerli bu sefer kayıtlı olan kullanıcıyla başarılı giriş yaptığımız
//* durumu ele alıyoruz
export const signIn = async (email, password, navigate) => {
  try {
    //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/");
    //* toast login succesfull mesajını göstermek için kullanılan metod
    toastSuccessNotify("Logged in successfully!");
    console.log(userCredential);
  } catch (err) {
    //* toast mesajını göstermek için kullanılan metod
    toastErrorNotify(err.message);
    // alert(err.message);
  }
};

//* logOut da yapılan tek şey signOut olma durumu onun da syntax ı bu şekilde 
export const logOut = () => {
  signOut(auth);
  //* toast mesajını göstermek için kullanılan metod
  toastSuccessNotify("Logged out successfully!");
};

export const userObserver = (setCurrentUser) => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu

  onAuthStateChanged(auth, (currentUser) => {
    //* kullanıcı değiştiğinde setCurrentUser ın içerisine currentUser değerini yolluyoruz
    if (currentUser) {
      setCurrentUser(currentUser);
    } 
    //* login yapılmadığı durumda setCurrentUser ile curretUser içerisine false değerini yolluyoruz
    else {
      // User is signed out
      setCurrentUser(false);
    }
  });
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Google
//! Google ile girişi enable yap


export const signUpProvider = (navigate) => {
  //? Google ile giriş yapılması için kullanılan firebase metodu
  const provider = new GoogleAuthProvider();
  //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
  
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
};

export const forgotPassword = (email) => {
  //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      toastWarnNotify("Please check your mail box!");
      // alert("Please check your mail box!");
    })
    .catch((err) => {
      toastErrorNotify(err.message);
      // alert(err.message);
      // ..
    });
};
