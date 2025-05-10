
import { Route, Routes } from "react-router"
import { CardApartment } from "../component/CardApartment1"
import { Home } from "../component/Home"
import { Login } from "../component/Login"
import { Register } from "../component/Register"
import { Cards } from "../component/Cards"
import { Apartment } from "@mui/icons-material"
import { Aparment } from "../component/Aparment"
import Gallery, { ImageGallery } from "../component/ImageGallery"
import { Advertiser } from "../component/Advertiser"

export const Routing = () => {
    return <>
        <Routes>
            <Route path="Home" element={<Home></Home>}>
                <Route path="Cards" element={<Cards />}>
                    <Route path="CardApartment1" element={<CardApartment />}></Route>
                </Route>
            </Route>
            <Route path="Aparment" element={<Aparment />}>
            </Route>
            <Route path="Login" element={<Login></Login>}></Route>
            <Route path="Advertiser" element={<Advertiser />}></Route>
            <Route path="Register" element={<Register />}></Route>
            <Route path="Cards" element={<Cards />}></Route>
            <Route path="ImageGallery" element={<Gallery />}></Route>
            <Route path="" element={<Home></Home>}></Route>
        </Routes>
    </>
}