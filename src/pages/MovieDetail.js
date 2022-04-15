import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoSection from "../components/VideoSection";

//! movieDetail içerisinde video ve detayları apiden çekmek için axios u import ediyoruz
//! iframe ile göstermek için oluşturduğumuz VideoSection ı import ediyoruz
//! girilen detay sayfasında geriye dönme işlemi için Link ve id yi details/id şeklinde kullanmak için useParams ı router dan import ettik


const MovieDetail = () => {
  //! useParams ile id yi kullanıyoruz
  const { id } = useParams();
  //! detayları tutmak için state ile movieDetails ı oluşturuyoruz
  const [movieDetails, setMovieDetails] = useState();
  //!videoKey i state ile oluşturuyoruz
  const [videoKey, setVideoKey] = useState();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  // const API_KEY = "d6278b3dc3e6f8f8376a89851c3f8c8f";
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

      //! apiden veri çekme işlemini video ve film url lerine bağlı olarak yapıyoruz
  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetails(res.data))
      .catch((err) => console.log(err));
    axios
      .get(videoUrl)
      .then((res) => setVideoKey(res.data.results[0].key))
      .catch((err) => console.log(err));
  }, [movieDetailBaseUrl, videoUrl]);

  return (
    //! HTML YAPISI
    <div className="container py-5">
      <h1 className="text-center">{movieDetails?.title}</h1>
      {videoKey && <VideoSection videoKey={videoKey} />}
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={
                //! poster_path var ise resmi göster
                movieDetails?.poster_path
                  ? baseImageUrl + movieDetails?.poster_path
                  //! yoksa default image i göster 
                  : defaultImage
              }
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8 d-flex flex-column ">
            <div className="card-body">
              <h5 className="card-title">Overview</h5>
              <p className="card-text">{movieDetails?.overview}</p>
            </div>
            <ul className="list-group ">
              <li className="list-group-item">
                {"Release Date : " + movieDetails?.release_date}
              </li>
              <li className="list-group-item">
                {"Rate : " + movieDetails?.vote_average}
              </li>
              <li className="list-group-item">
                {"Total Vote : " + movieDetails?.vote_count}
              </li>
              <li className="list-group-item">
                {/* //! Link to{-1} bir önceki sayfaya yönlendiriyor */}
                <Link to={-1} className="card-link">
                  Go Back
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
