import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';  // FIXED IMPORT
import ContactCard from './ContactCard';
import { MdOutlineContactPhone } from "react-icons/md";

const Hero = () => {
    const [employee, setEmployee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterEmployeeData, setFilterEmployeeData] = useState([]);

    // Fetch Employee Data
    const fetchContact = async () => {
        try {
            const response = await fetch('https://cmsserver-urhp.onrender.com/users');
            const data = await response.json();
            setEmployee(data);
            setFilterEmployeeData(data); // FIX: Initialize filter data
            setLoading(false);
        } catch (error) {
            console.error("Error fetching contacts:", error.message);
        }
    };

    useEffect(() => {
        fetchContact();
    }, []);

    // Search Filter - Updates in Real-time
    useEffect(() => {
        if (search) {
            const filterData = employee.filter(emp =>
                emp.name?.toLowerCase().includes(search.toLowerCase())
            );
            setFilterEmployeeData(filterData);
        } else {
            setFilterEmployeeData(employee); // Reset if search is empty
        }
    }, [search, employee]);

    return (
        <>
            <div className='h-[100vh]'>
                <div className="hero pt-20 bg-amber-100">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold text-black">CMS</h1>
                            <p className="py-6 text-black">Empower. Manage. Scale. – Your All-in-One CMS Solution</p>
                            <Link to="/create-contact">
                                <button className="btn btn-primary p-5">
                                    Create Contact <span className="text-2xl"><MdOutlineContactPhone /></span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-amber-100">
                    {/* Search Input */}
                    <div className="flex space-x-2 justify-center p-5">
                        <div className="relative">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Search Contacts..."
                                className="input md:w-[20vw] md:h-12"
                            />
                            {/* Search Results Dropdown */}
                            {search && filterEmployeeData.length > 0 && (
                                <ul className="absolute mt-5 rounded-lg flex flex-col space-y-2 bg-red-400 md:w-[40vh]">
                                    {filterEmployeeData.map((item) => (
                                        <Link key={item.id} to={`/view-contact/${item.id}`}>
                                            <li className="p-2 hover:text-white hover:shadow">{item.name}</li>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="pt-10 flex justify-center">
                            <span className="loading loading-dots loading-xl"></span>
                        </div>
                    )}

                    {/* Employee Contact List */}
                    <div className="md:grid md:grid-cols-2 md:gap-5 space-y-5 mt-10 p-10 bg-amber-100">
                        {filterEmployeeData.length > 0 ? (
                            filterEmployeeData.map((list) => (
                                <ContactCard key={list.id} list={list} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No contacts found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
