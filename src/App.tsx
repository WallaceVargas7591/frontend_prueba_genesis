import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import TiposMasa from "./pages/TiposMasa/TiposMasa";
import TiposRelleno from "./pages/TiposRelleno/TiposRelleno";
import TiposEnvoltura from "./pages/TiposEnvoltura/TiposEnvoltura";
import NivelesDePicante from "./pages/NivelesPicante/NivelesPicante";
import TiposBebida from "./pages/TiposBebida/TiposBebida";
import TiposEndulzante from "./pages/TiposEndulzante/TiposEndulzante";
import TiposTopping from "./pages/TiposTopping/TiposTopping";
import Productos from "./pages/Productos/Productos";
// import SignUp from "./pages/AuthPages/SignUp";
// import NotFound from "./pages/OtherPage/NotFound";
// import UserProfiles from "./pages/UserProfiles";
// import Videos from "./pages/UiElements/Videos";
// import Images from "./pages/UiElements/Images";
// import Alerts from "./pages/UiElements/Alerts";
// import Badges from "./pages/UiElements/Badges";
// import Avatars from "./pages/UiElements/Avatars";
// import Buttons from "./pages/UiElements/Buttons";
// import LineChart from "./pages/Charts/LineChart";
// import BarChart from "./pages/Charts/BarChart";
// import Calendar from "./pages/Calendar";
// import BasicTables from "./pages/Tables/BasicTables";
// import FormElements from "./pages/Forms/FormElements";
// import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { ReactNode } from "react";


const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return isLoggedIn ? <>{children}</> : <Navigate to="/signin" replace />;
};


export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Dashboard Layout protegido */}
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index path="/" element={<Home />} />
          <Route path="/tipo_masa" element={<TiposMasa />} />
          <Route path="/tipo_relleno" element={<TiposRelleno />} />
          <Route path="/tipo_envoltura" element={<TiposEnvoltura />} />
          <Route path="/niveles_picante" element={<NivelesDePicante />} />
          <Route path="/tipos_bebidas" element={<TiposBebida />} />
          <Route path="/tipos_endulzantes" element={<TiposEndulzante />} />
          <Route path="/tipos_topping" element={<TiposTopping />} />
          <Route path="/productos" element={<Productos />} />
          {/* <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/form-elements" element={<FormElements />} />
          <Route path="/basic-tables" element={<BasicTables />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} /> */}
        </Route>

        {/* Auth */}
        <Route
          path="/signin"
          element={
            localStorage.getItem("user") ? <Navigate to="/" replace /> : <SignIn />
          }
        />
        {/* <Route path="/signup" element={<SignUp />} /> */}

        {/* Not Found */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}
