import { useContext, useEffect } from "react";
//import { Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import AuthContext from "./components/contexts/auth";
import Layout from "./components/layout/Layout";
//import Home from "./components/pages/Home";
import SongBook from "./components/pages/SongBook";

function App() {

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const loginname = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const picture = localStorage.getItem("picture");

    if (accessToken !== null) {
      authCtx.login(accessToken, email, loginname, picture);
    }
  }, [authCtx]);

  return (
    <Layout>
          <SongBook />
    </Layout>
  );
}

export default App;
