import React, { useState, useEffect } from 'react';

function AutoFillForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('formData'));
        if (storedData) {
            setFormData(storedData);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    const clearAutoFill = () =>{
        localStorage.removeItem('formData');
        setFormData({
            username: '',
            password: '',
            email: '',
        });
    }

    console.log("formdata",formData)
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(formData)
    }

    // console.log("form")

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                // autoComplete="username"
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                // autoComplete="current-password"
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                // autoComplete="email"
            />
            <button type="submit">Submit</button>
            <button onClick={clearAutoFill}>Clear Auto-fill</button>
        </form>
    );
}

export default AutoFillForm;
