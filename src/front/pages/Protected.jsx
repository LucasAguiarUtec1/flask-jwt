import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Protected = () => {
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const apiToken = localStorage.getItem('apiToken');
        if (!apiToken || apiToken === '') {
            navigate('/login');
            return;
        }

        fetch('https://redesigned-tribble-qj6v6jj6xpx3x9jw-3001.app.github.dev/api/protected', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiToken}`
            }
        })
        .then(response => {
            return response.json().then(data => {
                if (!response.ok) {
                    throw new Error('Token invalido');
                }
                setMsg(data.msg);
            });
        })
        .catch(error => {
            alert(error.message);
            navigate('/login');
        });
    }, [navigate]);

    return (
        <div className="fluid-container">
            <h1>{msg}</h1>
        </div>
    );
};
