import { Link } from "react-router-dom"
import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
const LISTMOVIE_URL = "/Movie/getMoviePage";

const ListMovie = () => {

  const [listMovie, setListMovie] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 5;
  useEffect(() => {
    async function getMoviePage() {
      await axios.get(`${LISTMOVIE_URL}?currentPage=${currentPage}`).then(response => {
        setListMovie(response.data)
      }).catch(error => {
        console.log(error);
      });
    }
    getMoviePage()
  }, [])





  return (
    <section>
      <h1>The List Movie</h1>
      <br />
      <p>Admins and Editors can hang out here.</p>

      {
        listMovie ? (

          listMovie.map(item => (
            <div class="hero-container" key={item.movieId}>
              <div class="main-container">
                <div class="poster-container">
                  <a href="#">
                    <img src={item.url_Image} class="poster" />
                  </a>
                </div>
                <div class="ticket-container">
                  <div class="ticket__content">
                    <h4 class="ticket__movie-title">{item.title}</h4>
                    <button class="ticket__buy-btn">See now</button>
                  </div>
                </div>
              </div>
            </div>
          ))


        ) : (
          <p>Loading...</p>)
      }

      <div class="center">
        <div class="pagination">
          <a href="#">&laquo;</a>
          <a href="#" class="active">1</a>
          <a href="#">2</a>
          <a href="#">&raquo;</a>
        </div>
      </div>

      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  )
}

export default ListMovie
