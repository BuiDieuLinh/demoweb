import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Alert,
  Modal,
  Image,
  Button,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { format, toZonedTime } from "date-fns-tz";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { MOCK_TICKETS } from "./mockData";
import "./mytickets.css";

// Mock data for tickets is now imported from mockData.js

const MyTickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const user_id = "12345";

  useEffect(() => {
    if (!user_id) {
      setError("Bạn cần đăng nhập để xem vé của mình.");
      setLoading(false);
      return;
    }

    const fetchTickets = () => {
      const userTickets = MOCK_TICKETS.filter((t) => t.user_id === user_id);
      setTickets(userTickets);
      setLoading(false);
      console.log("Mock tickets:", userTickets);
    };

    fetchTickets();
  }, [user_id]);

  const formatDateTime = (date, time) => {
    return `${time.split(":").slice(0, 2).join(":")} - ${new Date(date).toLocaleDateString("vi-VN")}`;
  };

  const getTicketStatus = (ticket) => {
    if (!ticket || !ticket.screening_date || !ticket.time) {
      return { label: "Không xác định", isExpired: true };
    }

    const newdate = new Date(ticket.screening_date).toLocaleDateString("vi-VN");
    const today = new Date("2025-06-25T17:26:00+07:00"); // Current date and time
    const [day, month, year] = newdate.split("/");
    const [startHour, startMinute, startSecond] = ticket.time.split(":");
    const screeningDateTime = new Date(
      year,
      month - 1,
      day,
      startHour,
      startMinute,
      startSecond
    );

    if (ticket.status === "canceled") {
      return { label: "Đã hủy", isExpired: true };
    }
    if (today > screeningDateTime) {
      return { label: "Hết hạn", isExpired: true };
    }
    return { label: "Được sử dụng", isExpired: false };
  };

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTicket(null);
  };

  const handleCancelBooking = () => {
    if (!selectedTicket) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Bạn chưa chọn vé. Vui lòng chọn vé muốn hủy!",
        confirmButtonText: "OK",
        confirmButtonColor: "#dc3545",
      });
      return;
    }

    Swal.fire({
      title: "Bạn có chắc chắn muốn hủy vé?",
      text: "Sau khi hủy, bạn sẽ không thể khôi phục lại vé này.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, hủy vé",
      cancelButtonText: "Không, giữ lại",
    }).then((result) => {
      if (result.isConfirmed) {
        const today = new Date("2025-06-25T17:26:00+07:00");
        const [year, month, day] = selectedTicket.screening_date.split("-");
        const [startHour, startMinute, startSecond] = selectedTicket.time.split(":");
        const start = new Date(year, month - 1, day, startHour, startMinute, startSecond);

        if (today < start) {
          const updatedTickets = MOCK_TICKETS.map((t) =>
            t.booking_id === selectedTicket.booking_id
              ? { ...t, status: "canceled" }
              : t
          );
          setTickets(updatedTickets.filter(t => t.user_id === user_id));
          setSelectedTicket({ ...selectedTicket, status: "canceled" });
          Swal.fire({
            title: "Thành công!",
            text: "Hủy vé thành công.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#dc3545",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Không thể hủy vé vì thời gian chiếu đã qua.",
            confirmButtonText: "OK",
            confirmButtonColor: "#dc3545",
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <Container style={{ margin: "70px auto" }}>
        <h4 className="text-light">Đang tải vé...</h4>
      </Container>
    );
  }

  if (error) {
    return (
      <div style={{ margin: "100px auto", textAlign: "center", width: "70%" }}>
        <Alert variant="danger">{error}</Alert>
        <Button variant="dark" onClick={() => navigate("/auth")}>
          Đăng nhập
        </Button>
      </div>
    );
  }

  return (
    <Container fluid className="mytickets-container py-5">
      <h4 className="text-danger mb-4 fw-bold">Danh sách vé của tôi</h4>
      {tickets.length === 0 ? (
        <Alert variant="info" className="text-center custom-alert">
          Bạn chưa có vé nào. Hãy đặt vé ngay!
          <Button
            variant="primary"
            className="ms-3 rounded-pill custom-button"
            onClick={() => navigate("/")}
          >
            Đặt vé
          </Button>
        </Alert>
      ) : (
        <>
          <Table hover variant="dark" className="custom-ticket-table rounded-4">
            <thead>
              <tr>
                <th>Ngày giao dịch</th>
                <th>Tên phim</th>
                <th>Số vé</th>
                <th>Số tiền</th>
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
                      toZonedTime(new Date(ticket.screening_date), "Asia/Ho_Chi_Minh"),
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
            <Modal.Body className="bg-dark text-light py-0">
              {selectedTicket && (
                <div className="ticket-details">
                  <Row>
                    <Col md="4">
                      <Image
                        src={selectedTicket.movie_image}
                        width={150}
                        height={180}
                        className="rounded"
                      />
                    </Col>
                    <Col className="d-flex flex-column">
                      <h4 className="text-uppercase mb-3 text-danger fw-bold">
                        {selectedTicket.movie_title}
                      </h4>
                      <p className="text-light m-0">
                        {formatDateTime(selectedTicket.screening_date, selectedTicket.time)} (
                        {selectedTicket.screening_format})
                      </p>
                      <p className="m-0">
                        <strong>Phòng chiếu:</strong> {selectedTicket.room_name}
                      </p>
                      <p className="m-0">
                        <strong>Ghế:</strong>{" "}
                        {selectedTicket.seats.map((seat) => seat.seat_name).join(", ")}
                      </p>
                      <p className="d-flex gap-2 m-0 align-items-center">
                        <strong>Trạng thái:</strong>
                        <Badge pill bg="warning" text="dark" className="px-3">
                          {getTicketStatus(selectedTicket).label}
                        </Badge>
                      </p>
                    </Col>
                  </Row>
                  <div className="barcode-section text-center mt-4">
                    <Image
                      src={selectedTicket.qr_code}
                      alt="Barcode"
                      fluid
                      className="barcode-image"
                      hidden={getTicketStatus(selectedTicket).isExpired}
                    />
                  </div>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer className="bg-dark border-0">
              {selectedTicket && !getTicketStatus(selectedTicket).isExpired && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleCancelBooking}
                >
                  Hủy vé
                </Button>
              )}
              <Button variant="success" size="sm" onClick={handleCloseModal}>
                Đóng
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default MyTickets;