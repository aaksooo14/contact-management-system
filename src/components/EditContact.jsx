import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const EditContact = () => {

    const navigate = useNavigate()

    const { id } = useParams()
    const [name, setName] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [option, setOption] = useState('')
    const [successMessage, setSuccessMessage] = useState('');

    const fectchExistingData = async () => {
        try {
            const response = await fetch(`https://cmsserver-urhp.onrender.com/users/${id}`)
            if (!response.ok) {
                throw new Error('Failed to fetch contact details');
            }
            const data = await response.json()
            setName(data.name || '');
            setPhotoUrl(data.photoUrl || '');
            setMobile(data.mobile || '');
            setEmail(data.email || '');
            setDescription(data.description || '');
            setOption(data.group || '');
        } catch (error) {
            console.log({ message: error.message })
        }
    }

    useEffect(() => {
        fectchExistingData()
    }, [])


    const sendData = async () => {
        try {
            const response = await fetch(`https://cmsserver-urhp.onrender.com/users/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    name,
                    photoUrl,
                    mobile,
                    email,
                    description,
                    group: option
                })
            })

            if (!response.ok) {
                throw new Error('Failed to update contact')
            }

            const data = await response.json();
            setSuccessMessage('contact updated susscessfully')
            console.log('Response:', data);

        } catch (error) {
            console.log({ message: error.message })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendData()
        sendData()
        setName('')
        setPhotoUrl('')
        setMobile('')
        setEmail('')
        setDescription('')
        setOption('')

    }

    return (
        <>
            <div className='bg-amber-50 h-[100vh]'>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center pt-10 space-y-5 items-center'>
                    <h1 className='font-bold text-2xl'>Update Contact </h1>
                    <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                        className="input" />
                    <input

                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        type="text"
                        placeholder="Photo URL (optional)"
                        className="input" />
                    <input
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        type="text"
                        placeholder="Mobile Number"
                        className="input" />
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                        className="input" />
                    <input
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        placeholder="Description"
                        className="input" />
                    <select
                        required
                        value={option}
                        onChange={(e) => setOption(e.target.value)}
                        className="select">
                        <option value="" disabled>Group</option>
                        <option>Family</option>
                        <option>Friend</option>
                        <option>Colleague</option>
                    </select>
                    <div className='flex space-x-5 pt-20'>
                        <button type='submit' className="btn bg-green-600">Update</button>
                        <button onClick={() => navigate('/')} type='button' className="btn bg-red-500">Home</button>
                    </div>
                    <div>
                        {successMessage}
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditContact
