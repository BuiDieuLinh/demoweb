import "./App.css";
import {
  Routes,
  Route,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/index";
import Movie from "./pages/movie";
import MovieDetail from "./pages/moviedetail";
import Cinemas from "./pages/cinemas";
import Header from "./components/user/Header";
import Showtimepage from "./pages/showtime";
import Promotions from "./pages/promotions";
import Account from "./pages/account";
import Footer from "./components/user/Footer";
import CinemaAuth from "./components/user/Login";
import Order from "./components/user/Order";
import PaymentPageStatic from "./components/user/Payment";
import MyTickets from "./components/user/Myticket";
import MoMoPayment from "./components/user/MomoPayment";
function Layout() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/auth"; 

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/showtime" element={<Showtimepage />} />
        <Route path="/info-cinemas" element={<Cinemas />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/account" element={<Account />} />
        <Route path="/my-ticket" element={<MyTickets />} />
        <Route path="/auth" element={<CinemaAuth />} />
        <Route path="/checkout" element={<Order />} />
        <Route path="/momo-payment" element={<MoMoPayment />} />
        <Route path="/payment-status" element={<PaymentPageStatic />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
