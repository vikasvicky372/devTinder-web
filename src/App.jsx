import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Requests from "./components/Requests";
function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
