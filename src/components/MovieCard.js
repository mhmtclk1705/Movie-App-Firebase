import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toastWarnNotify } from "../helpers/ToastNotify";

//! Toast uyarılarını görmek için WarnNotify ı import ettik

//! curretUser ı alabilmek için Context içerisinden AuthContext i import ettik.

//! yönlendirmeyi yapabilmek için useNavigate i import ettik

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

//! MovieCard a yolladığımız props ları destruct ederek alıyoruz 
const MovieCard = ({ title, poster_path, overview, vote_average, id }) => {
  //! currentUser ı destruct ederek context içerisinden alıyoruz
  const { currentUser } = useContext(AuthContext);
  
  let navigate = useNavigate();
  // const setVoteClass = (vote) => {
  //   if (vote >= 8) {
  //     return "green";
  //   } else if (vote >= 6) {
  //     return "orange";
  //   } else {
  //     return "red";
  //   }
  // };

  return (
    <div
      className="movie"
      onClick={
        () =>
        //! eğer curentUser varsa seçilen film detaylarına yönlendiriyoruz
      
          currentUser
            ? navigate("details/" + id)
            //! yoksa toast ile login olması için uyarı mesajını gönderiyoruz 
            : toastWarnNotify("Please log in to see details")
        // : alert("Please log in to see details")
      }
    >
      {/* poster_path i var ise kullanılsın yoksa tanımladığımız defaultImage kullanılsın  */}
      <img src={poster_path ? IMG_API + poster_path : defaultImage} alt="" />
      <div className="d-flex align-items-baseline justify-content-between p-1 text-white">
        <h5>{title}</h5>
        {/* Puanlamanın gösterilmesinin currentUser login olma durumunda çalışmasını istiyoruz */}
        {currentUser && (
          <span
            className={`tag ${
              // puanlamanın renk aralıklarını belirliyoruz
              vote_average >= 8 ? "green" : vote_average >= 6 ? "orange" : "red"
            }`}
          >
            {vote_average}
          </span>
        )}
      </div>
      <div className="movie-over">
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
