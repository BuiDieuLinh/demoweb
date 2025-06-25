import "./footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark py-4 text-light w-100">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <img
              src="/logo-removebg-preview.png"
              alt="Star Cinemas"
              className="mb-3"
              width="100"
              height="60"
              style={{ objectFit: "cover" }}
            />
            <ul className="list-unstyled">
              <li>
                <a href="/about">
                  <i className="fa-solid fa-angle-right"></i> Giới thiệu
                </a>
              </li>
              <li>
                <a href="/careers">
                  <i className="fa-solid fa-angle-right"></i> Tuyển dụng
                </a>
              </li>
              <li>
                <a href="/contact">
                  <i className="fa-solid fa-angle-right"></i> Liên hệ
                </a>
              </li>
              <li>
                <a href="/faq">
                  <i className="fa-solid fa-angle-right"></i> F.A.Q
                </a>
              </li>
              <li>
                <a href="/terms">
                  <i className="fa-solid fa-angle-right"></i> Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="/refund-policy">
                  <i className="fa-solid fa-angle-right"></i> Chính sách hoàn vé
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold d-inline-block border-bottom border-3 pb-1 border-danger">
              RẠP STAR
            </h5>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14905.02472937689!2d106.04970306158066!3d20.942224794537392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a30555555555%3A0x39a8acd006ab8e69!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgUGjhuqFtIEvhu7kgVGh14bqtdCBIxrBuZyBZw6puLCBDxqEgc-G7nyAy!5e0!3m2!1svi!2s!4v1744220909456!5m2!1svi!2s"
              style={{ border: "0", margin: "5px 0px" }}
              width="100%"
              height="250"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ vị trí Rạp Star"
            ></iframe>
          </div>

          <div className="col-md-3">
            <h5 className="fw-bold d-inline-block border-bottom border-3 pb-1 border-danger text-nowrap">
              KẾT NỐI VỚI CHÚNG TÔI
            </h5>
            <div className="d-flex gap-2">
              <a href="https://facebook.com/starcinemas">
                <img src="/facebook.png" alt="Facebook" />
              </a>
              <a href="https://tiktok.com/@starcinemas">
                <img src="/tiktok.png" alt="Tiktok" />
              </a>
              <a href="https://instagram.com/starcinemas">
                <img src="/instagram.png" alt="Instagram" />
              </a>
            </div>
            <img
              src="/dathongbao.png"
              className="mt-3"
              width="120"
              alt="Bộ Công Thương"
            />
          </div>

          <div className="col-md-3">
            <h5 className="fw-bold d-inline-block border-bottom border-3 pb-1 border-danger">
              LIÊN HỆ
            </h5>
            <p className="mb-1">CÔNG TY CỔ PHẦN STAR MEDIA</p>
            <p className="mb-1">
              Hotline: <strong>1900 6368xx / 0934632382</strong>
            </p>
            <p>
              Email: <a href="mailto:mkt@starcinemas.vn">mkt@starcinemas.vn</a>
            </p>
            <h6 className="fw-bold mt-3">Liên hệ hợp tác kinh doanh:</h6>
            <p>
              Hotline: <strong>1800 646 410</strong>
            </p>
            <p>
              Email: <a href="mailto:linh@stargroup.vn">linh@stargroup.vn</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;