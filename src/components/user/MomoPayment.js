import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { MOCK_TICKETS } from "./mockData";
import "./momo-payment.css";

const MoMoPayment = () => {
  const { state } = useLocation();
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

  const processPayment = useCallback(() => {
    const {
      orderId: orderIdParam,
      amount: amountParam,
      title: titleParam,
      seats: seatsParam,
      screening_date: screeningDateParam,
      time: timeParam,
      screening_format: screeningFormatParam,
      room_name: roomNameParam,
      totalPrice: totalPriceParam,
    } = state || {};

    setOrderId(orderIdParam || "mock-order-123");
    setAmount(amountParam || 100000);
    setTitle(titleParam || "");
    setSeats(seatsParam || "");
    setScreeningDate(screeningDateParam || "");
    setTime(timeParam || "");
    setScreeningFormat(screeningFormatParam || "");
    setRoomName(roomNameParam || "");
    setTotalPrice(totalPriceParam || 0);

    console.log("Mock payment record:", {
      booking_id: orderIdParam,
      amount: amountParam,
      payment_method: "momo",
      payment_status: "success",
    });

    const bookingData = {
      booking_id: orderIdParam || "mock-order-123",
      user_id: "12345",
      screening_id: "mock-screening-" + (orderIdParam || "mock-order-123").slice(-4),
      movie_title: titleParam || "",
      screening_date: (screeningDateParam || "").split("/").reverse().join("-"),
      time: (timeParam || "").split(" - ")[0] + ":00",
      screening_format: screeningFormatParam || "",
      room_name: roomNameParam || "",
      seats: (seatsParam || "").split(", ").map((seat) => ({
        seat_name: seat,
        price: (totalPriceParam || 0) / (seatsParam || "").split(", ").length || 1,
      })),
      total_price: totalPriceParam || 0,
      status: "pending",
      qr_code: `https://via.placeholder.com/150x150?text=QR+Code+${(orderIdParam || "mock-order-123").slice(0, 8)}`,
      movie_image: "https://m.media-amazon.com/images/I/91-UCbbhoiL._AC_SL1500_.jpg",
    };
    MOCK_TICKETS.push(bookingData);
    console.log("New ticket added to MOCK_TICKETS:", bookingData);

    const timer = setTimeout(() => {
      navigate("/payment-status", {
        state: {
          orderId: orderIdParam,
          amount: amountParam,
          payment_method: "momo",
          title: titleParam,
          seats: seatsParam,
          screening_date: screeningDateParam,
          time: timeParam,
          screening_format: screeningFormatParam,
          room_name: roomNameParam,
          totalPrice: totalPriceParam,
          resultCode: "0",
        },
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [state, navigate]);

  useEffect(() => {
    const cleanup = processPayment();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processPayment]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="momo-payment rounded-4 bg-dark p-4">
        <h5 className="fw-bold mb-4 text-center">Thanh toán qua MoMo</h5>
        <div className="momo-payment-container">
          <Row className="align-items-center mb-4">
            <Col xs={12} md={4} className="text-center">
              <Image
                src="/momo.png"
                alt="MoMo Logo"
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
            <h6 className="text-light mt-3">Chi tiết thanh toán</h6>
            <p className="text-light">
              Mã đơn hàng: <strong>{orderId}</strong>
            </p>
            <p className="text-light">
              Phim: <strong>{title}</strong>
            </p>
            <p className="text-light">
              Ghế: <strong>{seats}</strong>
            </p>
            <p className="text-light">
              Ngày chiếu: <strong>{screeningDate}</strong>, {time}
            </p>
            <p className="text-light">
              Phòng: <strong>{roomName}</strong> ({screeningFormat})
            </p>
            <p className="text-light">
              Số tiền: <strong>{amount.toLocaleString("vi-VN")} đ</strong>
            </p>
            <p className="text-light">
              Tổng tiền: <strong>{totalPrice.toLocaleString("vi-VN")} đ</strong>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MoMoPayment;