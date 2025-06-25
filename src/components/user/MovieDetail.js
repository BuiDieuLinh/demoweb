import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { format, toZonedTime } from "date-fns-tz";
import vi from "date-fns/locale/vi";
import "./moviedetail.css";

// Mock data
const MOCK_MOVIES = [
  {
    movie_id: "1",
    title: "Avengers: Endgame",
    genre: "Action, Adventure",
    duration: 181,
    release_date: "2025-04-26",
    age_restriction: 0,
    poster_url: "https://m.media-amazon.com/images/I/91-UCbbhoiL._AC_SL1500_.jpg",
    trailer_url: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    director: "Anthony Russo, Joe Russo",
    cast: "Robert Downey Jr., Chris Evans, Scarlett Johansson",
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. The Avengers assemble once more to undo Thanos' actions and restore order.",
    origin: "USA",
  },
  {
    movie_id: "2",
    title: "Spider-Man: No Way Home",
    genre: "Action, Sci-Fi",
    duration: 148,
    release_date: "2025-07-15",
    age_restriction: 16,
    poster_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ3tbO86hfEtvYnmwL9XXLls-egbUYbp1oeQ&s",
    trailer_url: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
    director: "Jon Watts",
    cast: "Tom Holland, Zendaya, Benedict Cumberbatch",
    description: "Peter Parker's identity is revealed, forcing him to seek help from Doctor Strange, leading to a multiverse adventure.",
    origin: "USA",
  },
];

const MOCK_SHOWTIMES = [
  {
    showtime_id: "1",
    movie_id: "1",
    start_time: "2025-06-25T19:30:00",
    end_time: "2025-06-25T22:31:00",
  },
  {
    showtime_id: "2",
    movie_id: "1",
    start_time: "2025-06-25T14:00:00",
    end_time: "2025-06-25T17:15:00",
  },
  {
    showtime_id: "3",
    movie_id: "1",
    start_time: "2025-06-26T12:00:00",
    end_time: "2025-06-26T15:01:00",
  },
  {
    showtime_id: "4",
    movie_id: "2",
    start_time: "2025-07-15T20:00:00",
    end_time: "2025-07-15T22:28:00",
  },
];

const MOCK_SCREENINGS = [
  {
    screening_id: "1",
    showtime_id: "1",
    movie_id: "1",
    movie_title: "Avengers: Endgame",
    screening_date: "2025-06-25",
    start_time: "19:30:00",
    end_time: "22:31:00",
    room_id: "1",
    room_name: "VIP Room 1",
    room_type: "vip",
    screening_format: "2D",
  },
  {
    screening_id: "2",
    showtime_id: "2",
    movie_id: "1",
    movie_title: "Avengers: Endgame",
    screening_date: "2025-06-25",
    start_time: "14:00:00",
    end_time: "17:15:00",
    room_id: "2",
    room_name: "Standard Room 1",
    room_type: "standard",
    screening_format: "3D",
  },
  {
    screening_id: "3",
    showtime_id: "3",
    movie_id: "1",
    movie_title: "Avengers: Endgame",
    screening_date: "2025-06-26",
    start_time: "12:00:00",
    end_time: "15:01:00",
    room_id: "3",
    room_name: "Normal Room 1",
    room_type: "normal",
    screening_format: "2D",
  },
  {
    screening_id: "4",
    showtime_id: "4",
    movie_id: "2",
    movie_title: "Spider-Man: No Way Home",
    screening_date: "2025-07-15",
    start_time: "20:00:00",
    end_time: "22:28:00",
    room_id: "1",
    room_name: "VIP Room 1",
    room_type: "vip",
    screening_format: "2D",
  },
];

// Hàm generateSeats
const generateSeats = (type, room_id) => {
  let totalSeats = type === 1 ? 100 : type === 2 ? 90 : 80;
  let rows = totalSeats / 10;
  let seats = [];
  let seatIdCounter = parseInt(room_id) * 1000 + 1;

  for (let i = 1; i <= rows; i++) {
    if (i < rows) {
      for (let j = 1; j <= 10; j++) {
        let seatId = `${seatIdCounter++}`;
        let seatNumber = `${String.fromCharCode(64 + i)}${j}`;
        let seatType = i <= 4 ? "regular" : "vip";
        seats.push({
          seat_id: seatId,
          room_id,
          seat_number: seatNumber,
          seat_row: String.fromCharCode(64 + i),
          seat_num: j,
          seat_type: seatType,
          seat_status: Math.random() > 0.7 ? "booked" : "available",
        });
      }
    } else {
      for (let j = 1; j <= 5; j++) {
        let seatId = `${seatIdCounter++}`;
        let seatNumber = `${String.fromCharCode(64 + i)}${j * 2 - 1}-${j * 2}`;
        seats.push({
          seat_id: seatId,
          room_id,
          seat_number: seatNumber,
          seat_row: String.fromCharCode(64 + i),
          seat_num: j,
          seat_type: "couple",
          seat_status: Math.random() > 0.7 ? "booked" : "available",
        });
      }
    }
  }
  return seats;
};

const MOCK_SEATS = [
  ...generateSeats(3, "1"),
  ...generateSeats(2, "2"),
  ...generateSeats(1, "3"),
];

const MOCK_PRICES = {
  regular: 60000,
  vip: 75000,
  couple: 130000,
};

export const MovieDetail = () => {
  const [modalShow, setModalShow] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const countdownRef = useRef(null);
  const [movie, setMovie] = useState(null);
  const [dates, setDates] = useState([]);
  const [screenings, setScreenings] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [seatData, setSeatData] = useState([]);
  const [allScreenings, setAllScreenings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedScreening, setSelectedScreening] = useState(null);
  const [prices, setPrices] = useState(MOCK_PRICES);
  const [totalPrice, setTotalPrice] = useState(0);
  const [countdownDisplay, setCountdownDisplay] = useState("10:00");

  const fetchMovie = useCallback(() => {
    const movieData = MOCK_MOVIES.find((m) => m.movie_id === id);
    setMovie(movieData);

    const movieShowtimes = MOCK_SHOWTIMES.filter((st) => st.movie_id === id);
    setShowtimes(movieShowtimes);

    const movieScreenings = MOCK_SCREENINGS.filter((sc) => sc.movie_id === id);
    setAllScreenings(movieScreenings);
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const fetchSeatsByRoom = (room_id, screening_id) => {
    const seats = MOCK_SEATS.filter((seat) => seat.room_id === room_id);
    setSeatData(seats);
  };

  const fetchTicketPrices = async (screeningId, seatTypes) => {
    return MOCK_PRICES;
  };

  const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    currentDate.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    while (currentDate <= end) {
      dates.push(currentDate.toLocaleDateString("sv-SE"));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return "";
  };

  const startCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }

    let countdownValue = 600;
    setCountdownDisplay("10:00");

    countdownRef.current = setInterval(() => {
      countdownValue -= 1;
      if (countdownValue <= 0) {
        clearInterval(countdownRef.current);
        setSelectedScreening(null);
        setSelectedSeats([]);
        setTotalPrice(0);
        setCountdownDisplay("00:00");
        return;
      }

      const minutes = Math.floor(countdownValue / 60);
      const seconds = countdownValue % 60;
      setCountdownDisplay(
        `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
      );
    }, 1000);
  };

  const handleSelectScreening = async (screening) => {
    setSelectedScreening(screening);
    setSelectedSeats([]);
    setTotalPrice(0);
    fetchSeatsByRoom(screening.room_id, screening.screening_id);
    startCountdown();

    const priceMap = await fetchTicketPrices(screening.screening_id, [
      "regular",
      "vip",
      "couple",
    ]);
    setPrices(priceMap);
  };

  const toggleSeat = (seatId) => {
    setSelectedSeats((prevSelected) => {
      let newSelected;
      if (prevSelected.includes(seatId)) {
        newSelected = prevSelected.filter((id) => id !== seatId);
      } else {
        newSelected = [...prevSelected, seatId];
      }

      let total = 0;
      newSelected.forEach((selectedSeatId) => {
        const seat = seatData.find((s) => s.seat_id === selectedSeatId);
        if (seat && prices[seat.seat_type]) {
          total += prices[seat.seat_type];
        }
      });
      setTotalPrice(total);
      return newSelected;
    });
  };

  const handlePayment = () => {
    const user_id = "12345";
    if (!user_id) {
      Swal.fire({
        icon: "warning",
        title: "Cần phải đăng nhập!",
        text: "Bạn chưa đăng nhập. Vui lòng đăng nhập hoặc đăng ký tài khoản để tiếp tục!",
        confirmButtonText: "OK",
        confirmButtonColor: "#dc3545",
      });
      return;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }

    navigate("/checkout", {
      state: {
        screening_id: selectedScreening.screening_id,
        selectedSeats: selectedSeats.map((seatId) => {
          const seat = seatData.find((s) => s.seat_id === seatId);
          let price = prices[seat.seat_type];
          return {
            seat_id: seat.seat_id,
            seat_name: seat.seat_number,
            price: price,
          };
        }),
        totalPrice: totalPrice,
        title: selectedScreening.movie_title,
        screening_date: new Date(
          selectedScreening.screening_date
        ).toLocaleDateString(),
        time: `${formatTime(selectedScreening.start_time)} - ${formatTime(
          selectedScreening.end_time
        )}`,
        screening_format: selectedScreening.screening_format,
        room_name: selectedScreening.room_name,
      },
    });
  };

  const groupedSeats = seatData.reduce((acc, seat) => {
    const row = seat.seat_row;
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(seat);
    return acc;
  }, {});
  const rows = Object.keys(groupedSeats).sort();

  useEffect(() => {
    if (!id || !showtimes) return;

    const now = new Date("2025-06-25T17:11:00+07:00");
    now.setHours(0, 0, 0, 0);

    const upcomingShowtimes = showtimes
      .filter((st) => st.movie_id === id)
      .filter((st) => {
        const endDate = new Date(st.end_time);
        return now <= endDate;
      });

    let allDates = [];
    upcomingShowtimes.forEach((st) => {
      const startDate = new Date(st.start_time);
      const effectiveStartDate = startDate < now ? now : startDate;
      const datesBetween = getDatesBetween(effectiveStartDate, st.end_time);
      allDates = [...allDates, ...datesBetween];
    });

    const uniqueDates = [...new Set(allDates)];

    const formattedDates = uniqueDates.map((date) => {
      const d = new Date(date);
      return {
        date: d.getDate(),
        day: `Th.${d.getMonth() + 1}`,
        weekDay: [
          "Chủ nhật",
          "Thứ hai",
          "Thứ ba",
          "Thứ tư",
          "Thứ năm",
          "Thứ sáu",
          "Thứ bảy",
        ][d.getDay()],
        fullDate: date,
      };
    });

    formattedDates.sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));

    setDates(formattedDates);
    if (formattedDates.length > 0) {
      setSelectedDate(formattedDates[0].fullDate);
    }
  }, [id, showtimes]);

  useEffect(() => {
    if (!selectedDate || !allScreenings || !showtimes) return;

    const now = new Date("2025-06-25T17:11:00+07:00");
    const today = now.toISOString().split("T")[0];
    const movieShowtimeIds = showtimes
      .filter((st) => st.movie_id === id)
      .map((st) => st.showtime_id);

    const filteredScreenings = allScreenings
      .filter((sc) => movieShowtimeIds.includes(sc.showtime_id))
      .filter((sc) => {
        const screeningDate = new Date(sc.screening_date)
          .toISOString()
          .split("T")[0];
        if (screeningDate !== selectedDate) return false;

        if (screeningDate === today) {
          const currentTime =
            now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
          const [hours, minutes] = sc.start_time.split(":");
          const screeningTime = parseInt(hours) * 3600 + parseInt(minutes) * 60;
          return screeningTime >= currentTime;
        }
        return true;
      });

    setScreenings(filteredScreenings);
  }, [selectedDate, allScreenings, showtimes, id]);

  if (!movie) return <p style={{ marginTop: "70px" }}>Đang tải...</p>;

  const screeningsByRoomType = screenings.reduce((acc, screening) => {
    const roomType = screening.room_type;
    if (!acc[roomType]) {
      acc[roomType] = [];
    }
    acc[roomType].push(screening);
    return acc;
  }, {});

  return (
    <div className="container-details">
      <Card className="bg-dark text-light rounded-0 position-relative min-h-auto">
        <Card.Img
          src={movie.poster_url}
          className="rounded-0 object-fit-cover"
          alt={`${movie.title} poster`}
          style={{ opacity: "0.2", height: "400px" }}
        />
        <Card.ImgOverlay className="d-flex flex-column w-75 m-auto p-3">
          <div className="row align-items-start container-overlay">
            <div className="text-center card-logo">
              <img src={movie.poster_url} alt={`${movie.title} poster`} className="rounded-4" />
            </div>
            <div className="info-detail">
              <div className="title-rep">
                <Card.Title className="fs-3 fw-bold text-uppercase">
                  {movie.title}
                  <span className="mx-3">-</span>
                  <span>
                    {movie.age_restriction === 0
                      ? "P"
                      : `T${movie.age_restriction}`}
                  </span>
                </Card.Title>
                <Card.Text className="">
                  {movie.genre} <span className="px-4"> {movie.origin} </span>{" "}
                  <span>{movie.duration} phút</span>
                </Card.Text>
              </div>
              <div className="text-md-start mt-3">
                <Card.Text className="m-0">
                  Đạo diễn: <span>{movie.director}</span>
                </Card.Text>
                <Card.Text className="m-0 text-nowrap;">
                  Diễn viên: <span>{movie.cast}</span>
                </Card.Text>
                <Card.Text className="">
                  Khởi chiếu:{" "}
                  <span>
                    {format(
                      toZonedTime(
                        new Date(movie.release_date),
                        "Asia/Ho_Chi_Minh"
                      ),
                      "dd/MM/yyyy",
                      { locale: vi }
                    )}
                  </span>
                </Card.Text>
                <Card.Text className="text-truncate-multiline">
                  {movie.description}
                </Card.Text>
                <Card.Text className="text-danger">
                  {movie.age_restriction === 0
                    ? "Kiểm duyệt."
                    : `Kiểm duyệt: T${movie.age_restriction} - Phim được phổ biến đến người xem từ đủ ${movie.age_restriction} tuổi trở lên (${movie.age_restriction}+)`}
                </Card.Text>
                <button
                  type="button"
                  className="text-decoration-underline text-light bg-transparent border-0"
                  onClick={() => {
                    setShowTrailer(false);
                    setModalShow(true);
                  }}
                >
                  Chi tiết nội dung
                </button>

                <Button
                  size="sm"
                  className="ms-4 rounded-pill border-2 border-warning px-4 bg-transparent text-warning"
                  onClick={() => {
                    setShowTrailer(true);
                    setModalShow(true);
                  }}
                >
                  Trailer
                </Button>

                <Modal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  centered
                >
                  <Modal.Header closeButton className="bg-dark text-light">
                    <Modal.Title id="contained-modal-title-vcenter">
                      {showTrailer ? "Trailer phim" : "Chi tiết nội dung"}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="bg-dark text-light rounded-bottom">
                    {showTrailer ? (
                      <div className="ratio ratio-16x9">
                        <iframe
                          width="100%"
                          height="315"
                          src={getEmbedUrl(movie.trailer_url)}
                          title="Movie Trailer"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <p>{movie.description}</p>
                    )}
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </Card.ImgOverlay>
      </Card>

      <div className="container-date text-light bg-dark">
        <div className="date-list">
          {dates.map((item) => (
            <div
              key={item.fullDate}
              className={`date ${selectedDate === item.fullDate ? "selected" : ""}`}
              onClick={() => {
                setSelectedDate(item.fullDate);
                setSelectedScreening(null);
                setSelectedSeats([]);
                setTotalPrice(0);
                clearInterval(countdownRef.current);
              }}
            >
              <p>{item.day}</p>
              <p className="fs-5 fw-bold">{item.date}</p>
              <p>{item.weekDay}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container-showtime">
        <p className="text-center text-warning">
          Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và
          Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
        </p>
        <div className="showtime">
          {["vip", "standard", "normal"].map((roomType) => {
            const roomScreenings = screeningsByRoomType[roomType] || [];
            if (roomScreenings.length === 0) return null;
            return (
              <div key={roomType} className="room-type-section">
                <h5 className="text-light text-capitalize">
                  {roomType === "vip"
                    ? "Phòng VIP"
                    : roomType === "standard"
                    ? "Phòng Tiêu Chuẩn"
                    : "Phòng Thường"}
                </h5>
                <div className="showtime-buttons">
                  {roomScreenings.map((screening) => (
                    <button
                      key={screening.screening_id}
                      onClick={() => handleSelectScreening(screening)}
                      className={
                        selectedScreening?.screening_id === screening.screening_id
                          ? "selected"
                          : ""
                      }
                    >
                      {formatTime(screening.start_time)} -{" "}
                      {formatTime(screening.end_time)} ({screening.screening_format})
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          {Object.keys(screeningsByRoomType).length === 0 && (
            <p className="text-light">Không có suất chiếu</p>
          )}
        </div>
      </div>

      {selectedScreening && (
        <div className="w-75 m-auto text-light my-4">
          <div className="d-flex justify-content-between">
            <p>
              Giờ chiếu:{" "}
              <span className="fw-bold">
                {formatTime(selectedScreening.start_time)} -{" "}
                {formatTime(selectedScreening.end_time)}
              </span>
            </p>
            <div className="border border-warning rounded p-2">
              <span>Thời gian chọn ghế: </span>
              <span className="fw-bold">{countdownDisplay}</span>
            </div>
          </div>

          <div className="my-2">
            <img src="/screen.jpg" className="w-100" alt="Cinema Screen" />
            <h5 className="text-center fw-bold">{selectedScreening.room_name}</h5>
          </div>

          {seatData.length > 0 ? (
            rows.map((row) => (
              <div key={row} className="seat-row">
                {groupedSeats[row]
                  .sort((a, b) => a.seat_num - b.seat_num)
                  .map((seat) => (
                    <Button
                      key={seat.seat_id}
                      className={`seat ${seat.seat_type} ${
                        seat.seat_status === "booked" ? "booked" : ""
                      } ${selectedSeats.includes(seat.seat_id) ? "selected" : ""}`}
                      style={
                        seat.seat_status === "booked"
                          ? {
                              backgroundImage: "url(/vietnam.png)",
                              zIndex: "100",
                            }
                          : {}
                      }
                      disabled={seat.seat_status === "booked"}
                      onClick={() => toggleSeat(seat.seat_id)}
                    >
                      {seat.seat_number}
                    </Button>
                  ))}
              </div>
            ))
          ) : (
            <p>Đang tải ghế...</p>
          )}

          <div className="d-flex justify-content-around my-2">
            <div className="d-flex gap-2 align-items-center">
              <button
                style={{ backgroundImage: "url(/vietnam.png)" }}
                className="seat1"
              ></button>{" "}
              <span>Đã đặt</span>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <button
                className="seat1"
                style={{ backgroundColor: "rgb(13, 202, 240)" }}
              ></button>{" "}
              <span>Đang chọn</span>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <button
                className="seat1"
                style={{ backgroundColor: "rgb(36, 36, 36)" }}
              ></button>{" "}
              <span>Ghế thường</span>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <button
                className="seat1"
                style={{ backgroundColor: "rgb(255, 132, 19)" }}
              ></button>{" "}
              <span>Ghế vip</span>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <button
                className="seat1"
                style={{ backgroundColor: "rgb(255, 55, 65)" }}
              ></button>{" "}
              <span>Ghế đôi</span>
            </div>
          </div>

          <div className="d-flex justify-content-between my-4">
            <div className="fs-6">
              <p className="m-0">
                Ghế đã chọn:{" "}
                <span>
                  {selectedSeats.length > 0
                    ? selectedSeats
                        .map((seatId) => {
                          const seat = seatData.find(
                            (s) => s.seat_id === seatId
                          );
                          return seat ? seat.seat_number : seatId;
                        })
                        .join(", ")
                    : " "}
                </span>
              </p>
              <p>
                Tổng tiền: <span>{totalPrice.toLocaleString("vi-VN")} VNĐ</span>
              </p>
            </div>
            <div>
              <Button
                variant="dark"
                className="rounded-pill mx-2 p-2"
                onClick={() => {
                  setSelectedScreening(null);
                  setSelectedSeats([]);
                  setTotalPrice(0);
                  clearInterval(countdownRef.current);
                }}
              >
                Quay lại
              </Button>
              <Button
                variant="danger"
                className="rounded-pill p-2"
                onClick={handlePayment}
                disabled={selectedSeats.length === 0}
              >
                Đặt vé
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;