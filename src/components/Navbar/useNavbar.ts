import { signInWithPopup, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { auth, provider } from '../../firebase/firebase_config';
import { selectAuth, setUser } from '../../Modules/Auth/AuthSlice';

const useNavbar = () => {
  const { user } = useSelector(selectAuth);
  const router = useRouter();
  const dispatch = useDispatch();

  async function googleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL, uid } = result.user;
      console.log("user data -> ", result.user);
      const user = { displayName, email, photoURL, uid };
      dispatch(setUser(user));
      localStorage.setItem("book_time_user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (error) {
      console.log("Error from auth -> ", error.message);
    }
  }

  function logout() {
    if (user && window.confirm("Do want to log out?")) {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("book_time_user");
          dispatch(setUser({}));
          router.push("/");
        })
        .catch((e) => {
          console.log("User signout error -> ", e.message);
        });
    }
  }

  return {
    googleLogin,
    logout
  }
}

export default useNavbar