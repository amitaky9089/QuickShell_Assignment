import { useState } from "react";
import Dropdown from "../../icons_FEtask/Display.svg";
import Downarror from "../../icons_FEtask/down.svg";
import './Header.css'; 

//Navbar → HeaderBar
const Header = ({ setOrderFunc, setGroupFunc, group, order }) => {

    //for button toggling
    const [toggle, setToggle] = useState(false);
    
    //fxn for toggle
    const Dropdownfxntoggle = () => {
        setToggle(!toggle);
    };
    
    //fxn for grouping
    const GrouponChange = (e) => {
        setGroupFunc(e.target.value);
        Dropdownfxntoggle();
    };
    
    //fxn for odering
    const OrderonChange = (e) => {
        setOrderFunc(e.target.value);
        Dropdownfxntoggle();
    };
    
    return (
        <nav id="navbar">
            <div className="nav-container">
                <button onClick={Dropdownfxntoggle} className="nav-button">
                    <div className="nav-button-content">
                        <img src={Dropdown} alt="Dropdown" /> Display <img src={Downarror} alt="Arrow" />
                    </div>
                </button>

                {toggle && (
                    <div className="dropdown-content">

                        {/* dropdown-for grouping  */}
                        <div className="dropdown-header">
                            <label htmlFor="grouping" className="dropdown-label">Grouping</label>
                            <select name="grouping" id="grouping" value={group} onChange={GrouponChange}>
                                <option value="priority">Priority</option>
                                <option value="user">Users</option>
                                <option value="status">Status</option>
                            </select>
                        </div>
                        
                        {/* dropdown for ordering  */}
                        <div>
                            <div className="dropdown-header">
                                <label htmlFor="ordering" className="dropdown-label">Ordering</label>
                                <select name="ordering" id="ordering" value={order} onChange={OrderonChange}>
                                    <option value="priority">Priority</option>
                                    <option value="title">Title</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
