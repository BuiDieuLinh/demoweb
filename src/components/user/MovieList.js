import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./movielist.css";

// Mock movie data
const MOCK_MOVIES = [
  {
    movie_id: "1",
    title: "Avengers: Endgame",
    genre: "Action, Adventure",
    duration: 181,
    release_date: "2025-04-26",
    age_restriction: 0,
    poster_url: "https://m.media-amazon.com/images/I/91-UCbbhoiL._AC_SL1500_.jpg",
  },
  {
    movie_id: "2",
    title: "Spider-Man: No Way Home",
    genre: "Action, Sci-Fi",
    duration: 148,
    release_date: "2025-07-15",
    age_restriction: 16,
    poster_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ3tbO86hfEtvYnmwL9XXLls-egbUYbp1oeQ&s",
  },
  {
    movie_id: "3",
    title: "The Matrix Resurrections",
    genre: "Sci-Fi, Action",
    duration: 148,
    release_date: "2025-06-10",
    age_restriction: 18,
    poster_url: "https://cdn.posteritati.com/posters/000/000/064/374/the-matrix-resurrections-md-web.jpg",
  },
  {
    movie_id: "4",
    title: "Dune: Part Two",
    genre: "Sci-Fi, Drama",
    duration: 166,
    release_date: "2025-03-01",
    age_restriction: 0,
    poster_url: "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
];

export const MovieList = ({ status, page = 1, limit = 10 }) => {
  const [movies, setMoive] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies(page, limit);
  }, [page, limit]);

  const fetchMovies = (page, limit) => {
    try {
      const today = new Date();
      const filterMovies = MOCK_MOVIES.filter((movie) => {
        const releaseDate = new Date(movie.release_date);
        if (status === "now_showing") {
          return releaseDate <= today;
        } else if (status === "coming_soon") {
          return releaseDate > today;
        } else {
          return true;
        }
      });

      // Apply pagination
      const startIndex = (page - 1) * limit;
      const paginatedMovies = filterMovies.slice(startIndex, startIndex + limit);
      setMoive(paginatedMovies);
    } catch (error) {
      console.error("Loi khi lay danh sach phim: ", error);
    }
  };

  return (
    <div>
      <Container fluid className="container">
        <Row className="justify-content-start g-4 d-flex flex-wrap ">
          {movies.map((movie) => (
            <Col
              xs={8}
              sm={6}
              md={4}
              lg={3}
              xl={3}
              key={movie.movie_id}
              className="mb-4 border-0"
            >
              <Card
                className="movie-card bg-black"
                onClick={() => navigate(`/movie/${movie.movie_id}`)}
              >
                <div className="badge-container">
                  <img
                    src={
                      movie.age_restriction === 0
                        ? "c-p.png"
                        : movie.age_restriction === 16
                          ? "c-16.png"
                          : "c-18.png"
                    }
                    alt={movie.age_restriction}
                    className="age_badge"
                  />
                </div>
                <div className="image-container">
                  <Card.Img
                    style={{ maxHeight: "270px" }}
                    variant="top"
                    src={movie.poster_url}
                    alt={movie.title}
                  />
                </div>
                <Card.Body className="card-body">
                  <div className="d-flex justify-content-between my-2">
                    <p>{movie.genre}</p>
                    <p>{movie.duration} phút</p>
                  </div>
                  <Card.Title className="movie-title text-white">
                    {movie.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MovieList;