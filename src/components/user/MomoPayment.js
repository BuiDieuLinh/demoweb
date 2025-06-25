import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { MOCK_TICKETS } from "./mockData";
import "./momo-payment.css";

const MoMoPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");
  const [seats, setSeats] = useState("");
  const [screeningDate, setScreeningDate] = useState("");
  const [time, setTime] = useState("");
  const [screeningFormat, setScreeningFormat] = useState("");
  const [roomName, setRoomName] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const orderIdParam = searchParams.get("orderId") || "mock-order-123";
    const amountParam = parseInt(searchParams.get("amount") || "100000");
    const titleParam = decodeURIComponent(searchParams.get("title") || "");
    const seatsParam = decodeURIComponent(searchParams.get("seats") || "");
    const screeningDateParam = decodeURIComponent(searchParams.get("screening_date") || "");
    const timeParam = decodeURIComponent(searchParams.get("time") || "");
    const screeningFormatParam = decodeURIComponent(searchParams.get("screening_format") || "");
    const roomNameParam = decodeURIComponent(searchParams.get("room_name") || "");
    const totalPriceParam = parseInt(searchParams.get("totalPrice") || "0");

    setOrderId(orderIdParam);
    setAmount(amountParam);
    setTitle(titleParam);
    setSeats(seatsParam);
    setScreeningDate(screeningDateParam);
    setTime(timeParam);
    setScreeningFormat(screeningFormatParam);
    setRoomName(roomNameParam);
    setTotalPrice(totalPriceParam);

    // Mô phỏng thanh toán thành công
    console.log("Mock payment record:", {
      booking_id: orderId,
      amount,
      payment_method: "momo",
      payment_status: "success",
    });

    // Thêm vé vào MOCK_TICKETS
    const bookingData = {
      booking_id: orderId,
      user_id: "12345",
      screening_id: "mock-screening-" + orderId.slice(-4),
      movie_title: title,
      screening_date: screeningDate.split("/").reverse().join("-"),
      time: time.split(" - ")[0] + ":00",
      screening_format: screeningFormat,
      room_name: roomName,
      seats: seats.split(", ").map(seat => ({ seat_name: seat, price: totalPrice / seats.split(", ").length })),
      total_price: totalPrice,
      status: "pending",
      qr_code: `https://via.placeholder.com/150x150?text=QR+Code+${orderId.slice(0, 8)}`,
      movie_image: "https://m.media-amazon.com/images/I/91-UCbbhoiL._AC_SL1500_.jpg",
    };
    MOCK_TICKETS.push(bookingData);
    console.log("New ticket added to MOCK_TICKETS:", bookingData);

    // Chuyển sang trang thanh toán thành công sau 5 giây
    const timer = setTimeout(() => {
      navigate(`/payment-status?orderId=${orderId}&amount=${amount}&payment_method=momo&title=${encodeURIComponent(title)}&seats=${encodeURIComponent(seats)}&totalPrice=${totalPrice}&screening_date=${encodeURIComponent(screeningDate)}&time=${encodeURIComponent(time)}&screening_format=${encodeURIComponent(screeningFormat)}&room_name=${encodeURIComponent(roomName)}`);
    }, 5000);

    // Dọn dẹp timer khi component unmount
    return () => clearTimeout(timer);
  }, [searchParams, navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="momo-payment rounded-4 bg-dark p-4">
        <h5 className="fw-bold mb-4 text-center">Thanh toán qua MoMo</h5>
        <div className="momo-payment-container">
          <Row className="align-items-center mb-4">
            <Col xs={12} md={4} className="text-center">
              <Image
                src="/momo.png"
                alt="MoMo"
                className="payment-logo"
                style={{ width: "100px" }}
              />
            </Col>
            <Col xs={12} md={8}>
              <h6 className="text-light">Hướng dẫn thanh toán</h6>
              <p className="text-light mb-1">
                1. Mở ứng dụng MoMo trên điện thoại của bạn.
              </p>
              <p className="text-light mb-1">
                2. Quét mã QR dưới đây để thực hiện thanh toán.
              </p>
              <p className="text-light">
                3. Thanh toán sẽ tự động hoàn tất trong 5 giây.
              </p>
            </Col>
          </Row>
          <div className="text-center">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEmksBt5Hls2e2VV-eFcs7obhpN8QQQsD-vg&s"
              alt="MoMo QR Code"
              className="qr-code"
              style={{ width: "200px", height: "200px" }}
            />
            <p className="text-light mt-2">
              Tổng số tiền: <strong>{totalPrice.toLocaleString("vi-VN")} đ</strong>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MoMoPayment;