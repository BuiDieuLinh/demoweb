import { Row, Col, Table, Button, Form, Image } from "react-bootstrap";
import "./order.css"

const OrderStatic = () => {
  return (
    <div className="container-order">
      <div className="info-detail">
        <div className="rounded-4 bg-dark p-4">
          <div>
            <h5 className="fw-bold">Thông tin phim</h5>
            <span className="fs-6">Phim</span>
            <p className="fw-bold text-uppercase">Avengers: Endgame</p>
          </div>
          <Row>
            <Col>
              <span>Ngày giờ chiếu:</span>
              <p className="fw-bold">
                <span className="text-warning">14:00 - 17:15</span> - 25/06/2025
              </p>
            </Col>
            <Col>
              <span>Ghế đã chọn:</span>
              <p className="fw-bold">A1, A2</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <span>Định dạng:</span>
              <p className="fw-bold">
                <span className="rounded border p-1">3D</span>
              </p>
            </Col>
            <Col>
              <span>Phòng chiếu:</span>
              <p className="fw-bold">Standard Room 1</p>
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
                <td>Ghế <span>A1, A2</span></td>
                <td>2</td>
                <td>120,000 đ</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      <div className="payment rounded-4 bg-dark p-4">
        <h5 className="fw-bold mb-4">Phương thức thanh toán</h5>
        <div className="payment-method-container">
          <div className="row align-items-center border border-2 rounded-pill p-2 mb-3 border-danger">
            <div className="col-2">
              <Form.Check type="radio" name="paymentMethod" checked readOnly />
            </div>
            <div className="col-4">
              <Image src="/momo.png" alt="MoMo" className="payment-logo" />
            </div>
            <div className="col-6">
              <span className="payment-name">MOMO</span>
            </div>
          </div>
          <div className="row align-items-center border border-2 rounded-pill p-2 border-secondary">
            <div className="col-2">
              <Form.Check type="radio" name="paymentMethod" checked={false} readOnly />
            </div>
            <div className="col-4">
              <Image src="/vnpay.png" alt="VNPay" className="payment-logo" />
            </div>
            <div className="col-6">
              <span className="payment-name">VNPAY</span>
            </div>
          </div>
        </div>

        <h5 className="fw-bold mt-4">Chi phí</h5>
        <div className="d-flex justify-content-between fs-6">
          <span>Thanh toán</span>
          <p><strong>120,000 đ</strong></p>
        </div>
        <div className="d-flex justify-content-between fs-6">
          <span>Phí</span>
          <p><strong>0 đ</strong></p>
        </div>
        <div className="d-flex justify-content-between fs-6">
          <span>Tổng cộng</span>
          <p><strong>120,000 đ</strong></p>
        </div>
        <div className="d-flex justify-content-end">
          <Button variant="dark" className="rounded-pill mx-2 p-2">
            Quay lại
          </Button>
          <Button variant="danger" className="rounded-pill p-2">
            Xác nhận thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatic;