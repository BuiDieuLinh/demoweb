import { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./account.css";

const Account = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock cập nhật thông tin (thêm logic thực tế sau)
    const updatedUser = { name, email };
    localStorage.setItem("user", JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), ...updatedUser }));
    alert("Cập nhật thông tin thành công!");
  };

  return (
    <Container className="account-container">
      <h2>Thông tin tài khoản</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Họ tên</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập họ tên"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="me-2">
          Cập nhật
        </Button>
        <Button variant="danger" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Form>
    </Container>
  );
};

export default Account;