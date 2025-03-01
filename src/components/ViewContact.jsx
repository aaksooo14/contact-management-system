import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const ViewContact = () => {

    const [viewCard, setViewCard] = useState({})
    const { id } = useParams()
    console.log(id)
    const fetchViewCard = async () => {
        try {
            const response = await fetch(`https://cmsserver-urhp.onrender.com/users/${id}`)
            const data = await response.json()
            setViewCard(data)
        } catch (error) {
            console.log({ message: error.message })
        }
    }

    useEffect(() => {
        console.log(viewCard);

    })

    useEffect(() => {
        fetchViewCard()
    }, [])

    return (
        <div>
            <div className='md:h-[100vh] border-1 ml-5 mr-5 rounded bg-amber-200 p-5 mt-5 '>
                {/* Image */}
                <div className='md:flex-col md:items-center md:flex md:justify-center space-y-5 md:space-x-10 pt-10'>
                    <div className='flex  justify-center md:flex-col md:justify-normal'>
                        <img
                            className='h-30 w-30 md:h-50 md:w-50 rounded-full'
                            src={viewCard.photoUrl}
                            alt={`${viewCard.photoUrl}image`} />
                    </div>
                    <ul className='space-y-2'>
                        {[viewCard.name, viewCard.mobile, viewCard.email, viewCard.description, viewCard.group].map((item, index) => (

                            <li key={index} className='border-1 bg-white p-3 md:w-[20vw] rounded-sm '>{item}</li>

                        ))
                        }
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default ViewContact
