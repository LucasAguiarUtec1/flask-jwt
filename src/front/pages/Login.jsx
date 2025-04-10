import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlerLogin = (e) => {
        e.preventDefault()
        fetch('https://redesigned-tribble-qj6v6jj6xpx3x9jw-3001.app.github.dev/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        })
            .then(response => {
                return response.json().then(data => {
                    if (!response.ok) {
                        throw new Error(data.msg || 'Error desconocido');
                    }
                    return data;
                })
            })
            .then(data => {
                localStorage.setItem('apiToken', data.token)
                console.log(`Token ${data.token}`);
                navigate('/protected')
            })
            .catch(error => {
                alert(error.message);
            })
    }

    return (
        <div className="container-fluid d-flex flex-column align-items-center mt-4">
            <h1 className="mb-5">Este es el login</h1>
            <form>
                <div className="mb-3">
                    <label className="me-1">Correo electronico</label>
                    <input onChange={(e) => setEmail(e.target.value)} id="email" type="email"></input>
                </div>
                <div>
                    <label className="me-1">Contraseña</label>
                    <input onChange={(e) => setPassword(e.target.value)} id="pass" type="password"></input>
                </div>

                <div className="d-flex mt-3">
                    <button className="mx-auto" onClick={handlerLogin}>Login</button>
                </div>
            </form>
        </div>
    )
}