import React, { useState } from "react";

export const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlerRegister = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('Las Contraseñas Deben Coincidir')
        }
        else {
            fetch('https://redesigned-tribble-qj6v6jj6xpx3x9jw-3001.app.github.dev/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': email,
                    'password': password
                })
            })
                .then(async response => {
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.msg || 'Error desconocido');
                    }
                    return data;
                })
                .then(data => {
                    alert('Usuario creado con exito');
                    setConfirmPassword('');
                    setEmail('');
                    setPassword('');
                })
                .catch(error => {
                    alert(error.message)
                })

        }
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
                    <label className="me-1 mb-3">Contraseña</label>
                    <input onChange={(e) => setPassword(e.target.value)} id="pass" type="password"></input>
                </div>
                <label className="me-1">Confirmar Contraseña</label>
                <input onChange={(e) => setConfirmPassword(e.target.value)} id="pass" type="password"></input>
                <div>

                </div>

                <div className="d-flex mt-3">
                    <button className="mx-auto" onClick={handlerRegister}>Registrarme</button>
                </div>
            </form>
        </div>
    )

}