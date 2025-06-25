import { Card, Button } from "react-bootstrap";
import "./moviedetail.css";

const MovieDetailStatic = () => {
  return (
    <div className="container-details">
      <Card className="bg-dark text-light rounded-0 position-relative min-h-auto">
        <Card.Img
          src="https://m.media-amazon.com/images/I/91-UCbbhoiL._AC_SL1500_.jpg"
          className="rounded-0 object-fit-cover"
          alt="Avengers: Endgame poster"
          style={{ opacity: "0.2", height: "400px" }}
        />
        <Card.ImgOverlay className="d-flex flex-column w-75 m-auto p-3">
          <div className="row align-items-start container-overlay">
            <div className="text-center card-logo">
              <img
                src="https://m.media-amazon.com/images/I/91-UCbbhoiL._AC_SL1500_.jpg"
                alt="Avengers: Endgame poster"
                className="rounded-4"
              />
            </div>
            <div className="info-detail">
              <div className="title-rep">
                <Card.Title className="fs-3 fw-bold text-uppercase">
                  Avengers: Endgame<span className="mx-3">-</span><span>P</span>
                </Card.Title>
                <Card.Text className="">
                  Action, Adventure <span className="px-4">USA</span>{" "}
                  <span>181 phút</span>
                </Card.Text>
              </div>
              <div className="text-md-start mt-3">
                <Card.Text className="m-0">
                  Đạo diễn: <span>Anthony Russo, Joe Russo</span>
                </Card.Text>
                <Card.Text className="m-0 text-nowrap">
                  Diễn viên: <span>Robert Downey Jr., Chris Evans, Scarlett Johansson</span>
                </Card.Text>
                <Card.Text className="">
                  Khởi chiếu: <span>26/04/2025</span>
                </Card.Text>
                <Card.Text className="text-truncate-multiline">
                  After the devastating events of Avengers: Infinity War, the universe is in ruins. The Avengers assemble once more to undo Thanos' actions and restore order.
                </Card.Text>
                <Card.Text className="text-danger">
                  Kiểm duyệt.
                </Card.Text>
                <button
                  type="button"
                  className="text-decoration-underline text-light bg-transparent border-0"
                >
                  Chi tiết nội dung
                </button>
                <Button
                  size="sm"
                  className="ms-4 rounded-pill border-2 border-warning px-4 bg-transparent text-warning"
                >
                  Trailer
                </Button>
              </div>
            </div>
          </div>
        </Card.ImgOverlay>
      </Card>

      <div className="container-date text-light bg-dark">
        <div className="date-list">
          <div className="date selected">
            <p>Th.6</p>
            <p className="fs-5 fw-bold">25</p>
            <p>Thứ tư</p>
          </div>
          <div className="date">
            <p>Th.6</p>
            <p className="fs-5 fw-bold">26</p>
            <p>Thứ năm</p>
          </div>
        </div>
      </div>

      <div className="container-showtime">
        <p className="text-center text-warning">
          Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và
          Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
        </p>
        <div className="showtime">
          <div className="room-type-section">
            <h5 className="text-light text-capitalize">Phòng VIP</h5>
            <div className="showtime-buttons">
              <button className="selected">14:00 - 17:15 (3D)</button>
              <button>19:30 - 22:31 (2D)</button>
            </div>
          </div>
          <div className="room-type-section">
            <h5 className="text-light text-capitalize">Phòng Tiêu Chuẩn</h5>
            <div className="showtime-buttons">
              <button>14:00 - 17:15 (3D)</button>
            </div>
          </div>
          <div className="room-type-section">
            <h5 className="text-light text-capitalize">Phòng Thường</h5>
            <div className="showtime-buttons">
              <button>12:00 - 15:01 (2D)</button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-75 m-auto text-light my-4">
        <div className="d-flex justify-content-between">
          <p>
            Giờ chiếu: <span className="fw-bold">14:00 - 17:15</span>
          </p>
          <div className="border border-warning rounded p-2">
            <span>Thời gian chọn ghế: </span>
            <span className="fw-bold">10:00</span>
          </div>
        </div>

        <div className="my-2">
          <img src="/screen.jpg" className="w-100" alt="Cinema Screen" />
          <h5 className="text-center fw-bold">Standard Room 1</h5>
        </div>

        {/* Danh sách ghế cố định */}
        <div className="seat-row">
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>A1</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>A2</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>A3</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>A4</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>A5</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>A6</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>A7</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>A8</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>A9</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>A10</Button>
        </div>
        <div className="seat-row">
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>B1</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>B2</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>B3</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>B4</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>B5</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>B6</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>B7</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>B8</Button>
          <Button className="seat vip" style={{ backgroundColor: "rgb(255, 132, 19)" }}>B9</Button>
          <Button className="seat vip" style={{ backgroundColor: "rgb(255, 132, 19)" }}>B10</Button>
        </div>
        <div className="seat-row">
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>C1</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>C2</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>C3</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>C4</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>C5</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>C6</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>C7</Button>
          <Button className="seat regular" style={{ backgroundColor: "rgb(36, 36, 36)" }}>C8</Button>
          <Button className="seat vip" style={{ backgroundColor: "rgb(255, 132, 19)" }}>C9</Button>
          <Button className="seat vip" style={{ backgroundColor: "rgb(255, 132, 19)" }}>C10</Button>
        </div>
        <div className="seat-row">
          <Button className="seat vip" style={{ backgroundColor: "rgb(255, 132, 19)" }}>D1</Button>
          <Button className="seat vip" style={{ backgroundColor: "rgb(255, 132, 19)" }}>D2</Button>
          <Button className="seat vip" style={{ backgroundColor: "rgb(255, 132, 19)" }}>D3</Button>
          <Button className="seat vip" style={{ backgroundColor: "rgb(255, 132, 19)" }}>D4</Button>
          <Button className="seat vip" style={{ backgroundColor: "rgb(255, 132, 19)" }}>D5</Button>
          <Button className="seat booked" style={{ backgroundImage: "url(/vietnam.png)", zIndex: "100" }}>D6</Button>
          <Button className="seat booked" style={{ backgroundImage: "url(/vietnam.png)", zIndex: "100" }}>D7</Button>
          <Button className="seat booked" style={{ backgroundImage: "url(/vietnam.png)", zIndex: "100" }}>D8</Button>
          <Button className="seat booked" style={{ backgroundImage: "url(/vietnam.png)", zIndex: "100" }}>D9</Button>
          <Button className="seat booked" style={{ backgroundImage: "url(/vietnam.png)", zIndex: "100" }}>D10</Button>
        </div>
        <div className="seat-row">
          <Button className="seat couple" style={{ backgroundColor: "rgb(255, 55, 65)" }}>E1-2</Button>
          <Button className="seat couple" style={{ backgroundColor: "rgb(255, 55, 65)" }}>E3-4</Button>
          <Button className="seat couple" style={{ backgroundColor: "rgb(255, 55, 65)" }}>E5-6</Button>
          <Button className="seat couple" style={{ backgroundColor: "rgb(255, 55, 65)" }}>E7-8</Button>
          <Button className="seat couple booked" style={{ backgroundImage: "url(/vietnam.png)", zIndex: "100" }}>E9-10</Button>
        </div>

        <div className="d-flex justify-content-around my-2">
          <div className="d-flex gap-2 align-items-center">
            <button style={{ backgroundImage: "url(/vietnam.png)" }} className="seat1"></button> <span>Đã đặt</span>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <button className="seat1" style={{ backgroundColor: "rgb(13, 202, 240)" }}></button> <span>Đang chọn</span>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <button className="seat1" style={{ backgroundColor: "rgb(36, 36, 36)" }}></button> <span>Ghế thường</span>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <button className="seat1" style={{ backgroundColor: "rgb(255, 132, 19)" }}></button> <span>Ghế vip</span>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <button className="seat1" style={{ backgroundColor: "rgb(255, 55, 65)" }}></button> <span>Ghế đôi</span>
          </div>
        </div>

        <div className="d-flex justify-content-between my-4">
          <div className="fs-6">
            <p className="m-0">Ghế đã chọn: <span>A1, B1</span></p>
            <p>Tổng tiền: <span>135,000 VNĐ</span></p>
          </div>
          <div>
            <Button variant="dark" className="rounded-pill mx-2 p-2">Quay lại</Button>
            <Button variant="danger" className="rounded-pill p-2">Đặt vé</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailStatic;