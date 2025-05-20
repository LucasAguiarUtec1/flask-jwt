import React, { useState } from "react";
import { signup } from "../store";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlerRegister = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('Las Contraseñas Deben Coincidir')
        }
        else {
            const resp = await signup(email, password, dispatch);
            if (!resp) {
                if (store.messageError !== '') {
                    alert(store.messageError);
                }
                else {
                    alert('Ocurrio un problema al intentar registrarte');
                }
            }
            else {
                alert("Se ha registrado con exito, ahora podra iniciar sesion");
                navigate('/login');
            }
        }
    }

    return (
        <div className="container-fluid d-flex flex-column align-items-center mt-4">
            <h1 className="mb-5">Resgitro</h1>
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