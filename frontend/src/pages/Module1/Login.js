import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    CssBaseline,
} from "@mui/material";
import bg1 from "./images/bg1.webp";
import { useNavigate,Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = () => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch(`${BACKEND_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email:formData.email,
                    password:formData.password
                })
            })

            if (response.ok) {
                toast.success("Logged in Successfully");
                navigate('/dashboard');
            }
            else
                toast.error("Invalid email or password");

        }
        catch (err) {
            console.error(err);
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                backgroundImage: `url(${bg1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.7)", 
                    zIndex: -1,
                }}
            />
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    zIndex: 1,
                    padding: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: 2,
                }}
            >
                <CssBaseline />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                        Login
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            fullWidth
                            required
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            margin="normal"
                            size="small"
                        />
                        <TextField
                            fullWidth
                            required
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            margin="normal"
                            size="small"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Typography variant="body2" align="center">
                            <Link to="/register" underline="hover" sx={{ marginRight: 1 }}>
                                Create Account
                            </Link>
                            |{" "}
                            <Link to="/forget-password" underline="hover" sx={{ marginLeft: 1 }}>
                                Forgot Password?
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
