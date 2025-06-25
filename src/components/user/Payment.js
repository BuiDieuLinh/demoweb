import React, { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
  const [status, setStatus] = React.useState("loading");
  const [orderId, setOrderId] = React.useState("");
  const [_amount, setAmount] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [_title, setTitle] = React.useState("");
  const [_seats, setSeats] = React.useState("");
  const [_screeningDate, setScreeningDate] = React.useState("");
  const [_time, setTime] = React.useState("");
  const [_screeningFormat, setScreeningFormat] = React.useState("");
  const [_roomName, setRoomName] = React.useState("");
  const [_totalPrice, setTotalPrice] = React.useState(0);
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) {
      console.log("Đã xử lý, bỏ qua checkPayment");
      return;
    }
    processedRef.current = true;
    checkPayment();
  }, []);

  const checkPayment = () => {
    const resultCode = searchParams.get("resultCode") || "0"; // Default to success for mock
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

    // Debug log to check received params
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
  };

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
                Cảm ơn bạn đã đặt vé.
              </CardText>
              <Button
                variant="outline-danger"
                href="/my-ticket"
                className="mt-3"
                onClick={() => Swal.fire({
                  icon: "success",
                  title: "Đặt vé thành công!",
                  text: `Thanh toán qua ${paymentMethod.toUpperCase()} đã hoàn tất.`,
                  confirmButtonText: "OK",
                  confirmButtonColor: "#dc3545",
                })}
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
                Mã đơn hàng: <strong>{orderId}</strong> <br />
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