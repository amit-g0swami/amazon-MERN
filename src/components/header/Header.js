import React from 'react'
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search"
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from "../StateProvider";
import { auth } from "../../firebase";

function Header() {
    const [{ basket, user }] = useStateValue();
    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    };
    return (
        <div className="header">
            <Link to="/">
                <img className='header__logo' src="https://i2.wp.com/www.jitsvinger.co.za/wp-content/uploads/2018/04/Amazon-Logo-1024x373.png" alt="" />
            </Link>
            <div className="header__search">
                <input className='header__searchInput' type="text" />
                <SearchIcon className="header__searchIcon" />
            </div>
            <div className="header__nav">
                <Link className='link' to={!user && "/login"}>
                    <div onClick={handleAuthentication} className="header__option">
                        <span className="header__optionLineOne">
                            {user ? <h3>Hello, {user?.email}</h3> : "Hello Guest"}
                        </span>
                        <span className="header__optionLineTwo">
                            {user ? "Sign Out" : "Sign In"}
                        </span>
                    </div>
                </Link>
                <div className="header__option">
                    <span className="header__optionLineOne">Returns</span>
                    <span className="header__optionLineTwo">& Orders</span>
                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">Your</span>
                    <span className="header__optionLineTwo">Prime</span>
                </div>
                <Link className='link' to="/checkout">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header