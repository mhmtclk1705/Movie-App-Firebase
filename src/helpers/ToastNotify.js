import { toast } from "react-toastify";

// ! Toastify react ın uyarıları için güzel efektleri olan bi bildirim kütüphanesi

//! import edip kullanıcı hareketlerine göre uyarıları göstermek için kullanıyoruz

// ! kullanmak istediğimiz sayfalarda import ediyoruz...

export const toastWarnNotify = (msg) => {
  toast.warn(msg, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastSuccessNotify = (msg) => {
  toast.success(msg, {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastErrorNotify = (msg) => {
  toast.error(msg, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
