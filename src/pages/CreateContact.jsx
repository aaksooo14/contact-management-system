import React, { useState } from 'react'

const CreateContact = () => {
    const [name, setName] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [option, setOption] = useState('')

    const sendData = async () => {
        try {
            const response = await fetch('https://jsnserver-1.onrender.com/users', {
                method: "POST",
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
            const data = await response.json();
            console.log('Response:', data);

        } catch (error) {
            console.log({ message: error.message })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendData()

    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center pt-10 space-y-5 items-center'>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                        className="input" />
                    <input
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        type="text"
                        placeholder="Photo URL/Country flag"
                        className="input" />
                    <input
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        type="text"
                        placeholder="Mobile Number"
                        className="input" />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                        className="input" />
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        placeholder="Description"
                        className="input" />
                    <select
                        value={option}
                        onChange={(e) => setOption(e.target.value)}
                        className="select">
                        <option value="" disabled>Group</option>
                        <option>Family</option>
                        <option>Friend</option>
                        <option>Colleague</option>
                    </select>
                    <div className='flex space-x-5'>
                        <button type='submit' className="btn bg-green-600">Create</button>
                        <button type='button' className="btn bg-red-500">Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateContact
