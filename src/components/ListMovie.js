import { Link } from "react-router-dom"
import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
const LISTMOVIE_URL = "/Movie/getMoviePage";

const PAGE_SIZE = 5;
const ListMovie = () => {

  const [listMovie, setListMovie] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // const itemsPerPage = 5;
  useEffect(() => {
    async function getMoviePage() {

      await axios.get(`${LISTMOVIE_URL}?page=${currentPage}&pageSize=${PAGE_SIZE}`)
        .then(response => {

          response.data.map(item => (
            setListMovie(item.movies),
            setTotalPages(item.totalPage)
          ));

          // setListMovie(response.data)
          // setTotalPages(data.totalPage)
        }).catch(error => {
          console.log(error);
        });

    }
    getMoviePage()
  }, [currentPage])

  // console.log(listMovie);

  const displayedMovie = (
    listMovie ? (
      listMovie.map((item, index) => (
        <div class="hero-container" key={index}>
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
  )

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={i === currentPage ? 'active' : ''}>
          <button onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <section>
      <h1>The List Movie</h1>
      <br />
      {/* <p>Admins and Editors can hang out here.</p> */}

      {displayedMovie}

      <div class="center">
        {/* <div > */}

        <ul class="pagination">
          <li>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&laquo;</button>
          </li>
          {renderPageNumbers()}
          <li>
            <button onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}>&raquo;</button>
          </li>
        </ul>


        {/* <a href="#">&laquo;</a>
          <a href="#" class="active">1</a>
          <a href="#">2</a>
          <a href="#">&raquo;</a> */}
        {/* </div> */}
      </div>

      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  )
}

export default ListMovie
