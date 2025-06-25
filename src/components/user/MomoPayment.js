import { Container, Row, Col, Image } from "react-bootstrap";

const MoMoPaymentStatic = () => {
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
              <p className="text-light mb-1">1. Mở ứng dụng MoMo trên điện thoại của bạn.</p>
              <p className="text-light mb-1">2. Quét mã QR dưới đây để thực hiện thanh toán.</p>
              <p className="text-light">3. Thanh toán sẽ tự động hoàn tất trong 5 giây.</p>
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
            <p className="text-light">Mã đơn hàng: <strong>mock-order-123</strong></p>
            <p className="text-light">Phim: <strong>Avengers: Endgame</strong></p>
            <p className="text-light">Ghế: <strong>A1, A2</strong></p>
            <p className="text-light">Ngày chiếu: <strong>25/06/2025</strong>, 14:00 - 17:15</p>
            <p className="text-light">Phòng: <strong>Standard Room 1</strong> (3D)</p>
            <p className="text-light">Số tiền: <strong>100,000 đ</strong></p>
            <p className="text-light">Tổng tiền: <strong>120,000 đ</strong></p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MoMoPaymentStatic;