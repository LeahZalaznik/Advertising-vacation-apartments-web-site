import { NavLink } from "react-router"
import '../style/Style.css';
export const Nav=()=>{


return <>
        <div className="nav">
            <NavLink to="/Home" className="link">בית</NavLink>
            <NavLink to="/Cards" className="link">תצוגה</NavLink>
            <NavLink to="/Login" className="link">התחברות</NavLink>
            <NavLink to="/Register" className="link">הרשמה</NavLink>
        </div>
    </>
}