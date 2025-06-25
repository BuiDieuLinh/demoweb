import React, { useState, useCallback } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./login.css";

// Mock data cho người dùng
const MOCK_USERS = [
  {
    user_id: "1",
    username: "testuser",
    password: "password123", // Lưu ý: Trong thực tế, password nên được hash
    email: "testuser@example.com",
    name: "Test User",
    role: "user",
  },
  {
    user_id: "2",
    username: "admin",
    password: "admin123",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
  },
];

const CinemaAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setUsername("");
    setPassword("");
    setEmail("");
  };

  // Mock fetchUserInfo
  const fetchUserInfo = useCallback(
    (user_id) => {
      const user = MOCK_USERS.find((u) => u.user_id === user_id);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("token", `fake-token-${user_id}`);
        navigate("/");
      } else {
        setErrors({ general: "Không tìm thấy thông tin người dùng!" });
      }
    },
    [navigate]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!username || !password) {
      setErrors({ general: "Vui lòng nhập đầy đủ username và password!" });
      return;
    }

    if (!isLogin) {
      // Mock đăng ký
      if (!email) {
        setErrors({ email: "Vui lòng nhập email!" });
        return;
      }
      if (MOCK_USERS.find((u) => u.username === username)) {
        setErrors({ username: "Username đã tồn tại!" });
        return;
      }
      if (MOCK_USERS.find((u) => u.email === email)) {
        setErrors({ email: "Email đã được sử dụng!" });
        return;
      }

      const newUser = {
        user_id: String(MOCK_USERS.length + 1),
        username,
        password, // Lưu ý: Trong thực tế, cần hash password
        email,
        name: username,
        role: "user",
      };
      MOCK_USERS.push(newUser); // Thêm vào mock data
      Swal.fire({
        title: "Đăng ký thành công!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      setIsLogin(true);
      return;
    }

    // Mock đăng nhập
    const user = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      Swal.fire({
        icon: "success",
        title: "Đăng nhập thành công!",
        showConfirmButton: false,
        timer: 2000,
      });
      fetchUserInfo(user.user_id);
    } else {
      setErrors({
        general: "Đăng nhập thất bại! Username hoặc password không đúng.",
      });
    }
  };

  const handleLoginWithGoogle = () => {
    // Mock Google Login
    const mockGoogleUser = {
      user_id: "1001",
      username: "googleuser",
      email: "googleuser@example.com",
      name: "Google User",
      role: "user",
    };
    try {
      Swal.fire({
        icon: "success",
        title: "Đăng nhập Google thành công!",
        showConfirmButton: false,
        timer: 2000,
      });
      fetchUserInfo(mockGoogleUser.user_id);
      MOCK_USERS.push(mockGoogleUser); // Thêm vào mock data
    } catch (error) {
      setErrors({ general: "Đăng nhập Google thất bại!" });
    }
  };

  return (
    <div className="cinema-auth-bg">
      <Container className="h-100">
        <Row className="justify-content-center flex-column align-items-center h-100">
          <Col
            xs={11}
            sm={10}
            md={8}
            lg={6}
            className="d-flex justify-content-center text-center mb-5"
          >
            <img
              src="logo-removebg-preview.png"
              width={100}
              height="40"
              style={{ objectFit: "cover" }}
              alt="Star Cinema Logo"
            />
          </Col>

          <Col xs={11} sm={10} md={8} lg={6}>
            <div className="auth-card animate-fade-in">
              <div className="auth-header">
                <h2 className="auth-title animate-title">
                  {isLogin ? "Welcome Back!" : "Welcome New Guest!"}
                </h2>
                <p className="auth-subtitle">
                  {isLogin ? "Sign in to continue" : "Register now, it’s free!"}
                </p>
              </div>

              <div className="auth-form">
                <Form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <Form.Group className="mb-3 animate-slide-in">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={!!errors.email}
                        className="auth-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      className="auth-input"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      className="auth-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {errors.general && (
                    <p className="text-danger text-center">{errors.general}</p>
                  )}

                  <Button
                    type="submit"
                    variant="danger"
                    className="w-100 auth-button animate-button"
                  >
                    {isLogin ? "Login" : "Get Started"}
                  </Button>

                  <div className="d-flex align-items-center my-3">
                    <div className="flex-grow-1 border-top"></div>
                    <span
                      style={{ color: "#fff", margin: "0 10px", width: "fit-content" }}
                    >
                      hoặc
                    </span>
                    <div className="flex-grow-1 border-top"></div>
                  </div>
                  <GoogleLogin
                    onSuccess={handleLoginWithGoogle}
                    onError={() => {
                      setErrors({ general: "Lỗi xác thực Google! Vui lòng thử lại." });
                    }}
                    text="signin_with"
                    width="100%"
                  />
                </Form>

                <div className="text-center mt-3">
                  <p className="auth-switch-text">
                    {isLogin
                      ? "Don't have an account? "
                      : "Already have an account? "}
                    <span
                      className="switch-text animate-switch"
                      onClick={handleSwitch}
                    >
                      {isLogin ? "Register" : "Login"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CinemaAuth;