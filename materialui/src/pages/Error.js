import { Link } from "react-router-dom";
import meals from "../assets/AboutUs/meals3.png";

function ErrorPage() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100vw",
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          height: "100vh",
          opacity: "0.9",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100vw",
            backgroundImage: `url(${meals})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100%",
            opacity: "0.5",
            zIndex: "-1",
          }}
        ></div>
        <h1 style={{ color: "beige", fontSize: "10vw" }}>An error occurred!</h1>
        <p style={{ fontSize: "5vw", color: "#f6e7b1" }}>
          Could not find this page!
        </p>
        <Link style={{ color: "#ffc800", fontSize: "10vw" }} to="/">
          Go Back
        </Link>
      </div>
    </>
  );
}

export default ErrorPage;
