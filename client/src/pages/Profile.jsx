import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) {
    return <h2>Not Logged In</h2>;
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#020617",
      color: "white"
    }}>

      <div style={{
        width: "350px",
        padding: "25px",
        borderRadius: "10px",
        background: "#0f172a",
        textAlign: "center"
      }}>

        <h2>👤 User Profile</h2>

        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "15px",
            padding: "10px",
            width: "100%",
            background: "#ef4444",
            border: "none",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;