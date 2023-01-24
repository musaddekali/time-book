import { useEffect } from "react";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import { Provider } from "react-redux";
import Layout from "../components/Layout/Layout";
import { wrapper } from "../redux_store/store";
import { setUser, setUserLoading } from "../Modules/Auth/AuthSlice";
import { auth } from "../firebase/firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();
  const {user} = store.getState().auth_user

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    
    // const user = JSON.parse(localStorage.getItem("book_time_user"));
    // if (!user) {
    //   return;
    // }
    // store.dispatch(setUser(user));
  }, []);

  // useEffect(() => {
  //   if(!user?.uid) {
  //     router.push('/');
  //     return;
  //   }
  //   console.log("dispatch from _app", store.getState().auth_user.user.uid);
  // }, [user])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch(setUser(user));
      } else {
        store.dispatch(setUser({}));
      }
    });

    return () => unsub();
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}

export default App;
