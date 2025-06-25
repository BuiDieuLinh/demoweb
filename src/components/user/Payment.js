import React, { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Card,
  CardText,
  CardBody,
  CardTitle,
  Spinner,
  Button,
} from "react-bootstrap";
import Swal from "sweetalert2";
import "./payment.css";

const PaymentPage = () => {
  const { state } = useLocation();
  const [status, setStatus] = React.useState("loading");
  const [orderId, setOrderId] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [seats, setSeats] = React.useState("");
  const [screeningDate, setScreeningDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [screeningFormat, setScreeningFormat] = React.useState("");
  const [roomName, setRoomName] = React.useState("");
  const [totalPrice, setTotalPrice] = React.useState(0);

  const checkPayment = useCallback(() => {
    const {
      orderId: orderIdParam,
      amount: amountParam,
      payment_method: paymentMethodParam,
      title: titleParam,
      seats: seatsParam,
      screening_date: screeningDateParam,
      time: timeParam,
      screening_format: screeningFormatParam,
      room_name: roomNameParam,
      totalPrice: totalPriceParam,
      resultCode,
    } = state || {};

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

    setOrderId(orderIdParam || "mock-order-123");
    setAmount(amountParam || 0);
    setPaymentMethod(paymentMethodParam || "momo");
    setTitle(titleParam || "");
    setSeats(seatsParam || "");
    setScreeningDate(screeningDateParam || "");
    setTime(timeParam || "");
    setScreeningFormat(screeningFormatParam || "");
    setRoomName(roomNameParam || "");
    setTotalPrice(totalPriceParam || 0);

    if (resultCode === "0") {
      setStatus("success");
    } else {
      setStatus("fail");
    }
  }, [state]);

  useEffect(() => {
    checkPayment();
  }, [checkPayment]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="payment-details shadow-lg">
        <CardBody className="text-center">
          {status === "loading" && (
            <div className="loading-container">
              <Spinner/>
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
                Mã đơn hàng: <strong>{orderId}</strong>
                <br />
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
  )
}
export default PaymentPage;