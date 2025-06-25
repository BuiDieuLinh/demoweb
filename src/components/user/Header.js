import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./header.css";

// Mock user data
const MOCK_USER = {
  user_id: "12345",
  username: "johndoe",
};

export const Header = () => {
  const [user, setUser] = useState(MOCK_USER);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulate logout by resetting user to null
    setUser(null);
    navigate("/auth");
  };

  const [navbarBg, setNavbarBg] = useState("bg dark");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavbarBg("rgba(255, 255, 255, 0.15)");
      } else {
        setNavbarBg("bg dark");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Navbar
        collapseOnSelect
        className="navbar-blur"
        expand="lg"
        variant="dark"
        fixed="top"
        style={{
          backgroundColor: navbarBg,
          transition: "background-color 0.3s ease-in-out",
          backdropFilter: "blur(50px)",
        }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/logo-removebg-preview.png"
              style={{ width: "80px", height: "40px", objectFit: "cover" }}
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav text-white">
            <Nav className="me-auto gap-4">
              <Nav.Link as={Link} to="/movie">
                Phim
              </Nav.Link>
              <Nav.Link as={Link} to="/showtime">
                Lịch chiếu
              </Nav.Link>
              <Nav.Link as={Link} to="/info-cinemas">
                Rạp chiếu phim
              </Nav.Link>
              <Nav.Link as={Link} to="/promotions">
                Ưu đãi
              </Nav.Link>
            </Nav>
            <Nav className="gap-4">
              <Nav.Link as={Link} to="/my-ticket">
                <img src="/ticket_2.png" alt="ticket" width={20} /> Vé của tôi
              </Nav.Link>
              <NavDropdown
                title={
                  <>
                    <i className="fa-regular fa-user"></i>{" "}
                    {user ? user.username : "Guest"}
                  </>
                }
                id="collapsible-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="#action/3.1">
                  Chế độ tối
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#action/3.2">
                  Ngôn ngữ
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/account">
                  Tài khoản
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/auth" onClick={handleLogout}>
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;