import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { login } from "../store";

export const Login = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlerLogin = async (e) => {
        e.preventDefault()
        
        const resp = await login(email, password, dispatch);
        if (!resp) {
            if (store.messageError !== '') {
                alert(store.messageError);
            }
            else {
                alert("Ocurrio un error al intentar iniciar sesion");
            }
        }
        else {
            sessionStorage.setItem('token', resp.token)
            navigate('/protected');
        }
    }

    return (
        <div className="container-fluid d-flex flex-column align-items-center mt-4">
            <h1 className="mb-5">Iniciar sesion</h1>
            <form>
                <div className="mb-3">
                    <label className="me-1">Correo electronico</label>
                    <input onChange={(e) => setEmail(e.target.value)} id="email" type="email"></input>
                </div>
                <div>
                    <label className="me-1">Contraseña</label>
                    <input onChange={(e) => setPassword(e.target.value)} id="pass" type="password"></input>
                </div>

                <div className="d-flex mt-4">
                    <button className="mx-3" onClick={handlerLogin}>Login</button>
                    <button onClick={() => navigate('/signup')}>Registrarse</button>
                </div>
            </form>
        </div>
    )
}