import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Table, Button, Form, Image } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { MOCK_TICKETS } from "./mockData";
import "./order.css";

// Mock data for payment response
const MOCK_PAYMENT_RESPONSE = {
  payUrl: "http://localhost:3005/payment",
  success: true,
  message: "Payment processed successfully",
};

const Order = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("momo");

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  const {
    screening_id,
    selectedSeats,
    totalPrice,
    title,
    screening_date,
    time,
    screening_format,
    room_name,
  } = state || {};

  const user_id = "12345";

  useEffect(() => {
    if (!screening_id || !selectedSeats || !totalPrice || !user_id) {
      setError(
        "Thiếu thông tin để thực hiện thanh toán. Vui lòng quay lại và thử lại."
      );
    }
  }, [screening_id, selectedSeats, totalPrice, user_id]);

  const handlePayment = async () => {
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

    setIsProcessing(true);
    setError(null);
    const booking_id = uuidv4();

    try {
      const bookingData = {
        booking_id,
        user_id,
        screening_id,
        movie_title: title,
        screening_date: screening_date.split("/").reverse().join("-"),
        time: time.split(" - ")[0] + ":00",
        screening_format,
        room_name,
        seats: selectedSeats,
        total_price: totalPrice,
        status: "pending",
        qr_code: `https://via.placeholder.com/150x150?text=QR+Code+${booking_id.slice(0, 8)}`,
        movie_image: "https://m.media-amazon.com/images/I/91-UCbbhoiL._AC_SL1500_.jpg",
      };

      // Chuyển hướng đến PaymentPage với tham số
      const paymentUrl = `/payment?orderId=${booking_id}&amount=${totalPrice}&payment_method=${selectedMethod}&title=${encodeURIComponent(title)}&seats=${encodeURIComponent(selectedSeats.map(s => s.seat_name).join(", "))}&totalPrice=${totalPrice}&screening_date=${encodeURIComponent(screening_date)}&time=${encodeURIComponent(time)}&screening_format=${encodeURIComponent(screening_format)}&room_name=${encodeURIComponent(room_name)}`;
      window.location.href = paymentUrl;
    } catch (err) {
      setError("Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.");
      console.error("Payment error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (error) {
    return (
      <div className="text-light text-center my-4">
        <p>{error}</p>
        <Button variant="dark" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </div>
    );
  }

  return (
    <div className="container-order">
      <div className="info-detail">
        <div className="rounded-4 bg-dark p-4">
          <div>
            <h5 className="fw-bold">Thông tin phim</h5>
            <span className="fs-6">Phim</span>
            <p className="fw-bold text-uppercase">{title}</p>
          </div>
          <Row>
            <Col>
              <span>Ngày giờ chiếu:</span>
              <p className="fw-bold">
                <span className="text-warning">{time}</span> - {screening_date}
              </p>
            </Col>
            <Col>
              <span>Ghế đã chọn:</span>
              <p className="fw-bold">
                {selectedSeats?.map((seat) => seat.seat_name).join(", ")}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <span>Định dạng:</span>
              <p className="fw-bold">
                <span className="rounded border p-1">{screening_format}</span>
              </p>
            </Col>
            <Col>
              <span>Phòng chiếu:</span>
              <p className="fw-bold">{room_name}</p>
            </Col>
          </Row>
        </div>

        <div className="rounded-4 bg-dark p-4 my-4">
          <h5 className="fw-bold">Thông tin thanh toán</h5>
          <Table bordered hover variant="dark" className="rounded-4">
            <thead>
              <tr>
                <th>Danh mục</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Ghế{" "}
                  <span>
                    {selectedSeats?.map((seat) => seat.seat_name).join(", ")}
                  </span>
                </td>
                <td>{selectedSeats?.length}</td>
                <td>{totalPrice?.toLocaleString("vi-VN")} đ</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      <div className="payment rounded-4 bg-dark p-4">
        <h5 className="fw-bold mb-4">Phương thức thanh toán</h5>
        <div className="payment-method-container">
          <div
            className={`row align-items-center border border-2 rounded-pill p-2 mb-3 ${
              selectedMethod === "momo" ? "border-danger" : "border-secondary"
            }`}
          >
            <div className="col-2">
              <Form.Check
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === "momo"}
                onChange={() => handleSelect("momo")}
              />
            </div>
            <div className="col-4">
              <Image
                src="/momo.png"
                alt="MoMo"
                className="payment-logo"
              />
            </div>
            <div className="col-6">
              <span className="payment-name">MOMO</span>
            </div>
          </div>
          <div
            className={`row align-items-center border border-2 rounded-pill p-2 ${
              selectedMethod === "vnpay" ? "border-danger" : "border-secondary"
            }`}
          >
            <div className="col-2">
              <Form.Check
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === "vnpay"}
                onChange={() => handleSelect("vnpay")}
              />
            </div>
            <div className="col-4">
              <Image
                src="/vnpay.png"
                alt="VNPay"
                className="payment-logo"
              />
            </div>
            <div className="col-6">
              <span className="payment-name">VNPAY</span>
            </div>
          </div>
        </div>

        <h5 className="fw-bold mt-4">Chi phí</h5>
        <div className="d-flex justify-content-between fs-6">
          <span>Thanh toán</span>
          <p>
            <strong>{totalPrice?.toLocaleString("vi-VN")} đ</strong>
          </p>
        </div>
        <div className="d-flex justify-content-between fs-6">
          <span>Phí</span>
          <p>
            <strong>0 đ</strong>
          </p>
        </div>
        <div className="d-flex justify-content-between fs-6">
          <span>Tổng cộng</span>
          <p>
            <strong>{totalPrice?.toLocaleString("vi-VN")} đ</strong>
          </p>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            variant="dark"
            className="rounded-pill mx-2 p-2"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </Button>
          <Button
            variant="danger"
            className="rounded-pill p-2"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? "Đang xử lý..." : "Xác nhận thanh toán"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Order;