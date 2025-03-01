import React from 'react'
import { Link } from 'react-router'
import { IoArrowBackOutline } from "react-icons/io5";


const Header = () => {
    return (
        <div className="navbar fixed z-50 flex md:pl-5 pl-2 md:pr-5 pr-3 justify-between bg-gray-700 text-white text-2xl font-bold shadow-sm">
            <Link to={'/'}> <button className='pt-2'><IoArrowBackOutline />
            </button></Link>
            <div>
                <h1>Net-Sync</h1>
            </div>
        </div>
    )
}

export default Header
