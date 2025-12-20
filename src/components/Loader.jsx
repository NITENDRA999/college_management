export default function Loader() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40
    }}>
      <div className="loader"></div>

      <style>{`
        .loader {
          border: 5px solid #f3f3f3;
          border-top: 5px solid #333;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 0.9s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
