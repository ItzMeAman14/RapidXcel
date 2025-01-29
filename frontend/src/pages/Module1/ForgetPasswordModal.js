import React, { useState } from 'react';
import './css/Home.css';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const ForgetPasswordModal = () => {
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);


    function switchtoLogin() {
        navigate("/login");
    }

    const sendResetLink = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            const res = await fetch(`${BACKEND_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email }),
                credentials: 'include'
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                navigate("/login");
            }
            else {
                toast.error(data.error);
                setSending(false);
            }
        }
        catch (err) {
            console.log(err);
            setSending(false);
        }

    }
    return (
        <div>
            <div className={"modal"} id="modal">
                <div className={"modal_content"} id="modalContent">
                    <h3>Forget Password ?</h3>
                    <form onSubmit={sendResetLink}>
                        <div className={"input_box"}>
                            <input type="text" placeholder="Enter your email" onChange={(event) => { setEmail(event.target.value) }} required />
                        </div>
                        <button type="submit" className={"manualbtn"} disabled={sending}>{sending ? "Sending..." : "Send reset link"}</button>
                        <div className={"register_link"}>
                            <button onClick={switchtoLogin} id="switchToRegister" className={"switchToLogin"}>Back to login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgetPasswordModal;
