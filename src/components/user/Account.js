import React, { useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Table,
  Modal,
  FloatingLabel,
  Container,
  Image,
} from "react-bootstrap";
import { format, toZonedTime } from "date-fns-tz";
import "./account.css";

// Mock data
const MOCK_USER = {
  user_id: "12345",
  username: "johndoe",
  email: "john.doe@example.com",
  phone: "0123456789",
};

const MOCK_TICKETS = [
  {
    booking_id: "1",
    movie_title: "Avengers: Endgame",
    screening_date: "2025-06-20",
    time: "19:30",
    screening_format: "2D",
    room_name: "Room 1",
    seats: [{ seat_name: "A1" }, { seat_name: "A2" }],
    total_price: 180000,
    movie_image: "https://via.placeholder.com/150x180?text=Movie+Poster",
    qr_code: "https://via.placeholder.com/100x100?text=QR+Code",
  },
  {
    booking_id: "2",
    movie_title: "Spider-Man: No Way Home",
    screening_date: "2025-06-22",
    time: "21:00",
    screening_format: "3D",
    room_name: "Room 2",
    seats: [{ seat_name: "B3" }],
    total_price: 100000,
    movie_image: "https://via.placeholder.com/150x180?text=Movie+Poster",
    qr_code: "https://via.placeholder.com/100x100?text=QR+Code",
  },
];

export const Account = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedTab, setSelectedTab] = useState("Tài khoản của tôi");
  const [user, _setUser] = useState(MOCK_USER);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // lsgd
  const [tickets, _setTickets] = useState(MOCK_TICKETS);
  const [loading, _setLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const formatDateTime = (date, time) => {
    return `${time} - ${new Date(date).toLocaleDateString("vi-VN")}`;
  };

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTicket(null);
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <h4 className="text-light">Đang tải vé...</h4>
      </Container>
    );
  }

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và nhập lại không khớp.");
      return;
    }

    // Mock password change logic
    try {
      alert("Đổi mật khẩu thành công!");
      setModalShow(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi đổi mật khẩu.");
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "Tài khoản của tôi":
        return (
          <div className="content-account">
            <Form>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Tên đăng nhập</Form.Label>
                  <Form.Control
                    className="custom-input custom-input-disabled"
                    aria-label="Disabled input example"
                    disabled
                    readOnly
                    value={user?.username || ""}
                  />
                </Col>
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    className="custom-input custom-input-disabled"
                    aria-label="Disabled input example"
                    disabled
                    readOnly
                    value={user?.email || ""}
                  ></Form.Control>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    className="custom-input"
                    value={user?.phone || ""}
                  />
                </Col>
                <Col>
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    className="custom-input"
                    placeholder="Địa chỉ"
                  />
                </Col>
              </Row>
            </Form>
            <div className="d-flex gap-2 justify-content-end mt-5">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setModalShow(true)}
              >
                Đổi mật khẩu
              </Button>
              <Button variant="danger" size="sm">
                Lưu thông tin
              </Button>
            </div>

            <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Đổi mật khẩu</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <FloatingLabel
                    controlId="floatingOldPassword"
                    label="Mật khẩu cũ"
                    className="mb-3 position-relative"
                  >
                    <Form.Control
                      type={showOldPassword ? "text" : "password"}
                      placeholder="Mật khẩu cũ"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <div
                      className="position-absolute top-50 end-0 translate-middle-y pe-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                      {showOldPassword ? (
                        <i className="fas fa-eye"></i>
                      ) : (
                        <i className="fas fa-eye-slash"></i>
                      )}
                    </div>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingNewPassword"
                    label="Mật khẩu mới"
                    className="mb-3 position-relative"
                  >
                    <Form.Control
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Mật khẩu mới"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div
                      className="position-absolute top-50 end-0 translate-middle-y pe-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <i className="fas fa-eye"></i>
                      ) : (
                        <i className="fas fa-eye-slash"></i>
                      )}
                    </div>
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingConfirmPassword"
                    label="Nhập lại mật khẩu mới"
                    className="mb-3 position-relative"
                  >
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu mới"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      isInvalid={
                        confirmPassword && newPassword !== confirmPassword
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Mật khẩu không khớp.
                    </Form.Control.Feedback>
                    <div
                      className="position-absolute top-50 end-0 translate-middle-y pe-3"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <i className="fas fa-eye"></i>
                      ) : (
                        <i className="fas fa-eye-slash"></i>
                      )}
                    </div>
                  </FloatingLabel>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setModalShow(false)}>
                  Đóng
                </Button>
                <Button variant="danger" onClick={handleChangePassword}>
                  Xác nhận
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      case "Lịch sử giao dịch":
        return (
          <div className="content-historyticket">
            <Table hover className="custom-table">
              <thead>
                <tr>
                  <th>Ngày giao dịch</th>
                  <th>Tên phim</th>
                  <th>Số vé</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.booking_id}
                    onClick={() => handleViewDetails(ticket)}
                    className="ticket-row"
                  >
                    <td>
                      {format(
                        toZonedTime(
                          new Date(ticket.screening_date),
                          "Asia/Ho_Chi_Minh"
                        ),
                        "dd-MM-yyyy"
                      )}
                    </td>
                    <td>{ticket.movie_title}</td>
                    <td>{ticket.seats.length}</td>
                    <td>{ticket.total_price.toLocaleString("vi-VN")} đ</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Modal
              show={showModal}
              onHide={handleCloseModal}
              centered
              dialogClassName="custom-ticket-modal"
            >
              <Modal.Header closeButton className="bg-dark text-light border-0">
                <Modal.Title>Thông tin chi tiết vé</Modal.Title>
              </Modal.Header>
              <Modal.Body className="bg-dark text-light">
                {selectedTicket && (
                  <div className="ticket-details">
                    <Row>
                      <Col md="4">
                        <Image
                          src={selectedTicket.movie_image}
                          width={150}
                          height={180}
                          className="rounded"
                        ></Image>
                      </Col>
                      <Col className="d-flex flex-column">
                        <h4 className="text-uppercase mb-3 text-danger fw-bold">
                          {selectedTicket.movie_title}
                        </h4>
                        <p className="text-light">
                          {formatDateTime(
                            selectedTicket.screening_date,
                            selectedTicket.time
                          )}{" "}
                          ({selectedTicket.screening_format})
                        </p>
                        <p>
                          <strong>Phòng chiếu:</strong>{" "}
                          {selectedTicket.room_name}
                        </p>
                        <p>
                          <strong>Ghế:</strong>{" "}
                          {selectedTicket.seats
                            .map((seat) => seat.seat_name)
                            .join(", ")}
                        </p>
                      </Col>
                    </Row>
                    <div className="barcode-section text-center">
                      <p className="text-warning mb-1">Lấy ngay</p>
                      <Image
                        src={selectedTicket.qr_code}
                        alt="Barcode"
                        fluid
                        className="barcode-image"
                      />
                    </div>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer className="bg-dark border-0">
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded custom-button"
                  onClick={handleCloseModal}
                >
                  Đóng
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      case "Quyền lợi":
        return <div className="content-3">🎁 Quyền lợi của bạn</div>;
      default:
        return null;
    }
  };

  return (
    <div style={{ margin: "140px auto 30px", width: "70%" }}>
      <h4 className="fw-bold text-center text-light">Thông tin cá nhân</h4>

      <div className="menu d-flex justify-content-center align-items-center my-4 gap-3">
        {["Tài khoản của tôi", "Lịch sử giao dịch", "Quyền lợi"].map((tab) => (
          <Button
            key={tab}
            variant={selectedTab === tab ? "danger" : "outline-danger"}
            className="rounded-pill"
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="container-content p-3 text-light rounded">
        {renderContent()}
      </div>
    </div>
  );
};

export default Account;