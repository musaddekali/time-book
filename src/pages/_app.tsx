import { useEffect } from "react";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import { Provider } from "react-redux";
import Layout from "../components/Layout/Layout";
import store from "../redux_store/store";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
