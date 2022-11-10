import { Outlet } from "react-router-dom";
import MyNavbar from "./Navbar";
import Footer from './Footer'
export default function PageLayout() {
  return (
    <div style={{ fontFamily: "monospace" }}>
      <MyNavbar />
      <div
        style={{
          width: "100%",
          height: "100%",
          fontFamily: "monospace",
          backgroundColor: "rgba(10,10,10,0.2)",
        }}
      >
        <Outlet />
      <Footer />
      </div>
    </div>
  );
}
