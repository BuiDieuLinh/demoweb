import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { format, toZonedTime } from "date-fns-tz";
import "./showtimes.css";

// Mock data
const MOCK_SHOWTIMES = [
  {
    showtime_id: "1",
    movie_id: "1",
    title: "Avengers: Endgame",
    screening_date: "2025-06-25",
    start_time: "19:30:00",
    end_time: "22:31:00",
    screening_format: "2D",
    genre: "Action, Adventure",
    duration: 181,
    release_date: "2025-04-26",
    age_restriction: 0,
    poster_url: "https://m.media-amazon.com/images/I/91-UCbbhoiL._AC_SL1500_.jpg",
    origin: "USA",
  },
  {
    showtime_id: "2",
    movie_id: "1",
    title: "Avengers: Endgame",
    screening_date: "2025-06-25",
    start_time: "14:00:00",
    end_time: "17:01:00",
    screening_format: "3D",
    genre: "Action, Adventure",
    duration: 181,
    release_date: "2025-04-26",
    age_restriction: 0,
    poster_url: "https://m.media-amazon.com/images/I/91-UCbbhoiL._AC_SL1500_.jpg",
    origin: "USA",
  },
  {
    showtime_id: "3",
    movie_id: "1",
    title: "Avengers: Endgame",
    screening_date: "2025-06-26",
    start_time: "12:00:00",
    end_time: "15:01:00",
    screening_format: "2D",
    genre: "Action, Adventure",
    duration: 181,
    release_date: "2025-04-26",
    age_restriction: 0,
    poster_url: "https://m.media-amazon.com/images/I/91-UCbbhoiL._AC_SL1500_.jpg",
    origin: "USA",
  },
  {
    showtime_id: "4",
    movie_id: "2",
    title: "Spider-Man: No Way Home",
    screening_date: "2025-07-15",
    start_time: "20:00:00",
    end_time: "22:28:00",
    screening_format: "2D",
    genre: "Action, Sci-Fi",
    duration: 148,
    release_date: "2025-07-15",
    age_restriction: 16,
    poster_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ3tbO86hfEtvYnmwL9XXLls-egbUYbp1oeQ&s",
    origin: "USA",
  },
];

export const Showtimes = () => {
  // Sử dụng useMemo để memoize today
  const today = useMemo(() => new Date("2025-06-25T16:45:00+07:00"), []);
  const navigate = useNavigate();
  const todayFormatted = format(toZonedTime(today, "Asia/Ho_Chi_Minh"), "yyyy-MM-dd");
  const [showtimes, setShowtimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(todayFormatted);

  // Tạo danh sách 5 ngày từ hôm nay
  const dates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const zonedDate = toZonedTime(date, "Asia/Ho_Chi_Minh");
    return {
      fullDate: format(zonedDate, "yyyy-MM-dd"),
      displayButton: format(zonedDate, "dd-MM-yyyy"),
    };
  });

  // Khai báo fetchShowTimes với useCallback
  const fetchShowTimes = useCallback(() => {
    const filteredShowtimes = MOCK_SHOWTIMES.filter((st) => {
      const zonedDate = toZonedTime(new Date(st.screening_date), "Asia/Ho_Chi_Minh");
      const formattedReleaseDate = format(zonedDate, "yyyy-MM-dd");
      const screeningTime = new Date(`${st.screening_date}T${st.start_time}`);
      const currentTime = today;

      if (formattedReleaseDate === todayFormatted) {
        return screeningTime >= currentTime;
      }
      return true;
    });
    setShowtimes(filteredShowtimes);
  }, [today, todayFormatted]);

  // useEffect gọi fetchShowTimes
  useEffect(() => {
    fetchShowTimes();
  }, [fetchShowTimes]);

  // Lọc lịch chiếu theo ngày được chọn
  const filteredShowtimes = showtimes.filter((st) => {
    const zonedDate = toZonedTime(new Date(st.screening_date), "Asia/Ho_Chi_Minh");
    const formattedReleaseDate = format(zonedDate, "yyyy-MM-dd");
    return formattedReleaseDate === selectedDate;
  });

  // Nhóm phim theo title
  const groupMovieByShowtime = filteredShowtimes.reduce((acc, curr) => {
    const isExists = acc.find((movie) => movie.title === curr.title);
    if (isExists) {
      isExists.screenings.push(curr);
    } else {
      acc.push({
        ...curr,
        screenings: [curr],
      });
    }
    return acc;
  }, []);

  // Xử lý click vào lịch chiếu
  const handleTimeClick = (e, showtime) => {
    e.stopPropagation();
    navigate(`/booking/${showtime.showtime_id}`);
  };

  return (
    <div className="showtime-container">
      <div className="d-flex align-items-center gap-2 text-white flex-row justify-content-center">
        <div
          className="rounded-circle bg-danger bg-gradient"
          style={{ width: "16px", height: "16px" }}
        ></div>
        <h5 className="fw-bold my-4">Phim đang chiếu</h5>
      </div>

      {/* Ngày chiếu */}
      <div className="container-date">
        <div className="showtime">
          {dates.map((item) => (
            <button
              key={item.fullDate}
              className={`date ${selectedDate === item.fullDate ? "selected" : ""}`}
              onClick={() => setSelectedDate(item.fullDate)}
            >
              {item.displayButton}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-warning mt-3">
        Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và
        Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
      </p>

      {/* Danh sách phim */}
      <div className="container-listmovie">
        {groupMovieByShowtime.length > 0 ? (
          groupMovieByShowtime.map((st) => (
            <div
              key={st.movie_id}
              className="detail-movie"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/movie/${st.movie_id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate(`/movie/${st.movie_id}`);
                }
              }}
            >
              <div className="movie-img">
                <img
                  src={st.poster_url}
                  alt={`${st.title} poster`}
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="movie-info">
                <div className="genre-duration">
                  <p>{st.genre}</p>
                  <p>{st.duration} phút</p>
                </div>
                <p className="fs-5 fw-bold text-white text-uppercase">
                  {st.title} - T{st.age_restriction}
                </p>
                <p className="text-white">
                  Xuất xứ: <span>{st.origin}</span>
                </p>
                <p className="text-white">
                  Khởi chiếu: <span>
                    {new Date(st.release_date)
                      .toISOString()
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                  </span>
                </p>
                <p className="text-danger">
                  T{st.age_restriction} - Phim được phổ biến đến người xem từ đủ {st.age_restriction} tuổi trở lên
                </p>
                <div>
                  <p className="fw-bold text-light">Lịch chiếu</p>
                  <div className="container-hour">
                    {st.screenings.map((screening, index) => (
                      <button
                        key={index}
                        onClick={(e) => handleTimeClick(e, screening)}
                      >
                        {screening.start_time.split(":").slice(0, 2).join(":")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="standard-format">{st.screening_format}</div>
            </div>
          ))
        ) : (
          <p className="text-light">Không có lịch chiếu nào ...</p>
        )}
      </div>
    </div>
  );
};

export default Showtimes;