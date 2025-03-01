import React from 'react'
import { GrFormView } from "react-icons/gr";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router';  // ✅ Correct import

const ContactCard = ({ list }) => {

    const DeleteContact = async (id) => {
        try {
            const response = await fetch(`https://cmsserver-urhp.onrender.com/users/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete contact");
            }

            const data = await response.json();
            console.log("Deleted contact:", data);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <div className='md:h-[30vh]  border p-2 rounded-lg bg-amber-200'>
            {/* Image and details */}
            <div className='md:flex md:justify-center space-y-5 md:space-x-5 pt-5'>
                {/* Profile Image */}
                <div className='flex justify-center md:flex-col md:pt-4 md:justify-normal'>
                    {list.photoUrl ? (
                        <img
                            className='h-24 w-24 rounded-full'  // ✅ Fixed image size
                            src={list.photoUrl}
                            alt="Contact"
                        />
                    ) : (
                        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Default Avatar" className="contact-img rounded-full" />
                    )}




                </div>

                {/* Contact Details */}
                <ul className='md:space-y-2 space-y-2'>
                    {[list.name, list.mobile, list.email].map((item, index) => (
                        <li key={index} className='border-black text-black b rounded-sm p-2  md:w-[20vw]'>{item}</li>
                    ))}
                </ul>

                {/* Action Buttons */}
                <ul className='flex md:flex-col md:space-y-2 justify-between md:justify-normal'>
                    <li className='text-4xl rounded-sm text-yellow-600 hover:shadow'>
                        <Link to={`/view-contact/${list.id}`}><GrFormView /></Link>
                    </li>
                    <li className='text-4xl rounded-sm text-green-600 hover:shadow'>
                        <Link to={`/edit-contact/${list.id}`}><MdOutlineEdit /></Link>
                    </li>
                    <li className='text-4xl cursor-pointer  rounded-sm text-red-800 hover:shadow' onClick={() => DeleteContact(list.id)}>
                        <MdDelete />
                    </li>
                </ul>
            </div>
        </div >
    );
}

export default ContactCard;
