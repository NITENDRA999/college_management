export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 40,
        background: "#222",
        color: "white",
        padding: "15px 20px",
        textAlign: "center",
        fontSize: "14px",
        opacity: 0.9
      }}
    >
      © {new Date().getFullYear()} Event Management System — All Rights Reserved.
    </footer>
  );
}
