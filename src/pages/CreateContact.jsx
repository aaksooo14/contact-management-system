import React, { useState } from "react";
import { useNavigate } from "react-router";

const CreateContact = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [option, setOption] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const sendData = async () => {
        try {
            const response = await fetch("https://cmsserver-urhp.onrender.com/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify({
                    name,
                    photoUrl,
                    mobile,
                    email,
                    description,
                    group: option,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create contact.");
            }

            const data = await response.json();
            console.log("Response:", data);
            return true; // Success
        } catch (error) {
            console.error("Error:", error.message);
            setErrorMessage("Failed to create contact.");
            return false; // Failure
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Clear previous errors

        const success = await sendData();

        if (success) {
            setName("");
            setPhotoUrl("");
            setMobile("");
            setEmail("");
            setDescription("");
            setOption("");
            setSuccessMessage("Contact Created Successfully");
        }
    };

    return (
        <>
            <div className="bg-amber-50 h-[100vh] pt-20">
                <form onSubmit={handleSubmit} className="flex flex-col justify-center pt-10 space-y-5 items-center">
                    <h1 className="font-bold text-2xl text-black">Create Contact</h1>
                    <input required value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className="input" />
                    <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} type="text" placeholder="Photo URL (optional)" className="input" />
                    <input required value={mobile} onChange={(e) => setMobile(e.target.value)} type="text" placeholder="Mobile Number" className="input" />
                    <input required value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="input" />
                    <input required value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" className="input" />
                    <select required value={option} onChange={(e) => setOption(e.target.value)} className="select">
                        <option value="" disabled>
                            Group
                        </option>
                        <option>Family</option>
                        <option>Friend</option>
                        <option>Colleague</option>
                    </select>
                    <div className="flex space-x-5">
                        <button type="submit" className="btn bg-green-600">
                            Create
                        </button>
                        <button onClick={() => navigate("/")} type="button" className="btn bg-red-500">
                            Home
                        </button>
                    </div>
                    <div>
                        {successMessage && <span className="text-green-600">{successMessage}</span>}
                        {errorMessage && <span className="text-red-600">{errorMessage}</span>}
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateContact;
