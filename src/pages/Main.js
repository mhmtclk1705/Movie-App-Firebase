import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContext";
import { toastWarnNotify } from "../helpers/ToastNotify";

//! apiden veri çekmek için axiosu import ediyoruz
// ! MovieCard a tıklanan veriyi göndermek için import ediyoruz
//! Context içerisinden login olma durumunu almak için AuthContext'i import ediyoruz
//! uyarı mesajları için oluşturduğumuz Toastify ı import ediyoruz 


// const API_KEY = "d6278b3dc3e6f8f8376a89851c3f8c8f";
const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  //! filmleri ve kullanıcının film arama durumunu tutmak için state oluşturuyoruz
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useContext(AuthContext);

  //! sayfanın render olduğunda apiden veri çekme işlemi yapılıyor
  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  //! apiden veri çekme işlemini yapıyoruz
  const getMovies = (API) => {
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  };
  //! kullanıcının film arama işlemini handle ediyoruz
  const handleSubmit = (e) => {
    e.preventDefault();
    //! searchTerm boş değilse ve login yapılmışsa aramayı yapmasını istiyoruz
    if (searchTerm && currentUser) {
      getMovies(SEARCH_API + searchTerm);
    } 
    //! login yapılmamışsa uyarı mesajı veriyoruz
    else if (!currentUser) {
      toastWarnNotify("Please log in to search a movie");
      // alert("Please log in to search a movie");
    }
    //! searchTerm boş ise uyarı mesajı veriyoruz 
    else {
      toastWarnNotify("Please enter a text");
      // alert("Please enter a text");
    }
  };

  return (
    <>
    {/* //! KLASİK HTML SEARCH YAPISI  */}
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="search-input"
          placeholder="Search a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="d-flex justify-content-center flex-wrap">
        {/* //! apilen çekilen verileri MovieCard a gönderiyoruz  */}
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
};

export default Main;
