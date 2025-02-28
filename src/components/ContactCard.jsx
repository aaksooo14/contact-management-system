import React from 'react'
import { GrFormView } from "react-icons/gr";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const ContactCard = ({ list }) => {
    return (
        <>
            <div className='md:h-[30vh] border-1 p-5 rounded-lg bg-gray-200  '>
                {/* Image */}
                <div className='md:flex md:justify-center space-y-5 md:space-x-10 pt-5'>
                    <div className='flex justify-center md:flex-col md:justify-normal'>
                        <img
                            src={list.photoUrl}
                            alt={`${list.photoUrl}image`} />
                    </div>
                    <ul>
                        {[list.name, list.mobile, list.email].map((item, index) => (

                            <li key={index} className='border-1 p-2 md:w-[20vw]'>{item}</li>

                        ))
                        }
                    </ul>
                    <ul className='flex md:flex-col md:space-y-2 justify-between md:justify-normal'>
                        {[<GrFormView />, <MdOutlineEdit />, <MdDelete />].map((item, index) => (

                            <li key={index} className='text-4xl '>{item}</li>

                        ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ContactCard
