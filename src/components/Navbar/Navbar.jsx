import Link from "next/link";
import { useSelector } from "react-redux";
import { selectAuth } from "../../Modules/Auth/AuthSlice";
import useNavbar from "./useNavbar";

const Navbar = () => {
  const { user } = useSelector(selectAuth);
  const { googleLogin, logout } = useNavbar();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light _nav_menu">
      <div className="container">
        <Link href="/">
          <span className="navbar-brand">Time Book</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav  ms-auto">
            <li className="nav-item me-3">
              <Link href="/">
                <span className="nav-link active" aria-current="page">
                  Home
                </span>
              </Link>
            </li>

            {!user?.uid ? (
              <li className="nav-item">
                <button onClick={googleLogin} className="btn btn-outline-info">
                  Login
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item me-3">
                  <button onClick={logout} className="btn btn-outline-info">
                    LogOut
                  </button>
                </li>
                <li className="nav-item dropdown _cursor_pointer">
                  <div
                    className="dropdown-toggle position-relative"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <img
                        className="rounded rounded-circle overflow-hidden"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                        src={user?.user_image}
                        alt={user?.user_name}
                      />
                      <span>{user?.user_name}</span>
                    </div>
                  </div>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link href="/dashboard">
                        <span className="dropdown-item">Dashboard</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
