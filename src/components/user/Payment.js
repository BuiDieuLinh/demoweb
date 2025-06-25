import { Container, Card, CardText, CardBody, CardTitle, Button } from "react-bootstrap";

const PaymentPageStatic = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="payment-details shadow-lg">
        <CardBody className="text-center">
          <div className="success-container">
            <CardTitle as="h4" className="text-success fw-bold">
              Thanh toán thành công!
            </CardTitle>
            <CardText className="text-muted">
              Cảm ơn bạn đã đặt vé cho <strong>Avengers: Endgame</strong>.<br />
              Mã đơn hàng: <strong>mock-order-123</strong><br />
              Ghế: <strong>A1, A2</strong><br />
              Ngày chiếu: <strong>25/06/2025</strong>, 14:00 - 17:15<br />
              Phòng: <strong>Standard Room 1</strong> (3D)<br />
              Số tiền thanh toán: <strong>120,000 đ</strong><br />
              Tổng tiền: <strong>120,000 đ</strong>
            </CardText>
            <Button
              variant="outline-danger"
              href="/my-ticket"
              className="mt-3"
            >
              Vé của tôi
            </Button>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
};

export default PaymentPageStatic;