import { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Modules/Auth/AuthSlice";
import { auth, provider } from "../../firebase/firebase_config";
import { useRouter } from "next/router";

const Navbar = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth_user);
  const router = useRouter()

  async function googleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const { displayName, email, photoURL } = result.user;
      const user = { displayName, email, photoURL, token };
      dispatch(setUser(user));
      localStorage.setItem("book_time_user", JSON.stringify(user));
      router.push('/dashboard');
    } catch (error) {
      console.log("Error from auth -> ", error.message);
    }
  }

  function logout() {
    const user = JSON.parse(localStorage.getItem("book_time_user"));
    if (!user) {
      return;
    }

    if (window.confirm("Do want to log out?")) {
      localStorage.removeItem("book_time_user");
      dispatch(setUser({}));
      router.push('/');
    }
  }

  // get user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("book_time_user"));
    if (!user) {
      return;
    }
    dispatch(setUser(user));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light _nav_menu">
      <div className="container">
        <Link href="/">
          <span className="navbar-brand">Time Book</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
            {!user?.token ? (
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
                  <div className="dropdown-toggle position-relative" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="rounded rounded-circle overflow-hidden">
                      <img style={{ width: "40px", height: "40px", objectFit: "cover" }} src={user?.user_image} alt={user?.user_name} />
                    </div>
                  </div>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
