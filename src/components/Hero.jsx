import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { useState } from 'react'
import ContactCard from './ContactCard'
import { MdOutlineContactPhone } from "react-icons/md";


const Hero = () => {
    const [employee, setEmployee] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchContact = async () => {
        try {
            const response = await fetch('https://cmsserver-urhp.onrender.com/users')
            const data = await response.json()
            setEmployee(data)
            setLoading(false)
        } catch (error) {
            console.log({ message: error.message })
        }
    }

    useEffect(() => {
        fetchContact()
    }, [])




    return (
        <>
            <div className="hero bg-base-200 min-h-[50vh] ">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <Link to={'/create-contact'} ><button className="btn btn-primary p-5">Create Contact<span className='text-2xl'><MdOutlineContactPhone />
                        </span></button></Link>
                    </div>
                </div>

            </div>
            <div className=''>
                <div className='flex space-x-2 justify-center pl-2 pr-2'>
                    <input type="text" placeholder="Search" className="input md:h-12" />
                    <button className="btn btn-secondary md:h-12">Search</button>
                </div>
                {/* //loading */}
                {loading &&
                    <div className='pt-10 flex justify-center'>
                        <span className="loading loading-dots loading-xl"></span>
                    </div>}
                {/* Get Contact */}
                <div className='md:grid md:grid-cols-2 md:gap-5 space-y-5 mt-20 pl-10 pr-10'>
                    {employee && employee.map((list) => (
                        <ContactCard key={list.id} list={list} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Hero
