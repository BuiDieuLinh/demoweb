import React, { useEffect, useRef, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Spinner,
  Button,
} from "react-bootstrap";
import Swal from "sweetalert2";
import "./payment.css";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [title, setTitle] = useState("");
  const [seats, setSeats] = useState("");
  const [screeningDate, setScreeningDate] = useState("");
  const [time, setTime] = useState("");
  const [screeningFormat, setScreeningFormat] = useState("");
  const [roomName, setRoomName] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const processedRef = useRef(false);

  const checkPayment = useCallback(() => {
    const resultCode = searchParams.get("resultCode") || "0";
    const orderIdParam = searchParams.get("orderId") || "mock-order-123";
    const amountParam = parseInt(searchParams.get("amount") || "0");
    const paymentMethodParam = searchParams.get("payment_method") || "momo";
    const titleParam = decodeURIComponent(searchParams.get("title") || "");
    const seatsParam = decodeURIComponent(searchParams.get("seats") || "");
    const screeningDateParam = decodeURIComponent(searchParams.get("screening_date") || "");
    const timeParam = decodeURIComponent(searchParams.get("time") || "");
    const screeningFormatParam = decodeURIComponent(searchParams.get("screening_format") || "");
    const roomNameParam = decodeURIComponent(searchParams.get("room_name") || "");
    const totalPriceParam = parseInt(searchParams.get("totalPrice") || "0");

    console.log("Received params:", {
      orderId: orderIdParam,
      amount: amountParam,
      paymentMethod: paymentMethodParam,
      title: titleParam,
      seats: seatsParam,
      screeningDate: screeningDateParam,
      time: timeParam,
      screeningFormat: screeningFormatParam,
      roomName: roomNameParam,
      totalPrice: totalPriceParam,
    });

    setOrderId(orderIdParam);
    setAmount(amountParam);
    setPaymentMethod(paymentMethodParam);
    setTitle(titleParam);
    setSeats(seatsParam);
    setScreeningDate(screeningDateParam);
    setTime(timeParam);
    setScreeningFormat(screeningFormatParam);
    setRoomName(roomNameParam);
    setTotalPrice(totalPriceParam);

    if (resultCode === "0") {
      setStatus("success");
    } else {
      setStatus("fail");
    }
  }, [searchParams]);

  useEffect(() => {
    if (processedRef.current) {
      console.log("Đã xử lý, bỏ qua checkPayment");
      return;
    }
    processedRef.current = true;
    checkPayment();
  }, [checkPayment]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="payment-card shadow-lg">
        <CardBody className="text-center">
          {status === "loading" && (
            <div className="loading-container">
              <Spinner animation="border" variant="primary" />
              <CardText className="mt-3 text-muted">
                Đang xử lý kết quả thanh toán...
              </CardText>
            </div>
          )}

          {status === "success" && (
            <div className="success-container">
              <CardTitle as="h4" className="text-success fw-bold">
                Thanh toán thành công!
              </CardTitle>
              <CardText className="text-muted">
                Cảm ơn bạn đã đặt vé cho <strong>{title}</strong>.<br />
                Mã đơn hàng: <strong>{orderId}</strong><br />
                Ghế: <strong>{seats}</strong><br />
                Ngày chiếu: <strong>{screeningDate}</strong>, {time}<br />
                Phòng: <strong>{roomName}</strong> ({screeningFormat})<br />
                Số tiền thanh toán: <strong>{amount.toLocaleString("vi-VN")} đ</strong><br />
                Tổng tiền: <strong>{totalPrice.toLocaleString("vi-VN")} đ</strong>
              </CardText>
              <Button
                variant="outline-danger"
                href="/my-ticket"
                className="mt-3"
                onClick={() =>
                  Swal.fire({
                    icon: "success",
                    title: "Đặt vé thành công!",
                    text: `Thanh toán qua ${paymentMethod.toUpperCase()} đã hoàn tất.`,
                    confirmButtonText: "OK",
                    confirmButtonColor: "#dc3545",
                  })
                }
              >
                Vé của tôi
              </Button>
            </div>
          )}

          {status === "fail" && (
            <div className="fail-container">
              <CardTitle as="h4" className="text-danger">
                Thanh toán thất bại
              </CardTitle>
              <CardText className="text-muted">
                Mã đơn hàng: <strong>{orderId}</strong><br />
                Vui lòng thử lại hoặc kiểm tra phương thức thanh toán.
              </CardText>
              <Button variant="outline-danger" href="/movie" className="mt-3">
                Thử lại
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </Container>
  );
};

export default PaymentPage;