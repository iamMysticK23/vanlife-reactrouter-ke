// external imports
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./server"

// internal imports
import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login"
import Vans from "./components/Vans/Vans"
import VanDetail from "./components/Vans/VanDetail"
import Layout from "./sharedComponents/Layout"
import HostLayout from "./components/Host/HostLayout"
import Dashboard from "./components/Host/Dashboard"
import Income from "./components/Host/Income"
import Reviews from "./components/Host/Reviews"
import HostVans from "./components/Host/HostVans"
import HostVanDetail from "./components/Host/HostVanDetail"
import HostVanPhotos from "./components/Host/HostVanPhotos"
import HostVanPricing from "./components/Host/HostVanPricing"
import HostVanInfo from "./components/Host/HostVanInfo"
import PageNotFound from "./components/PageNotFound"
import AuthRequired from "./components/AuthRequired"


import "./index.css"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
 <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />
          <Route
            path="login"
            element={<Login />}
          />

          <Route element={<AuthRequired />}>
            <Route path="/host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id" element={<HostVanDetail />}>
                <Route index element={<HostVanInfo />} />
                <Route path="pricing" element={<HostVanPricing />} />
                <Route path="photos" element={<HostVanPhotos />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
