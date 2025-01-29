import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Container,
    CssBaseline,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import bg1 from "./images/bg1.webp";
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
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
            if (formData.password === formData.confirmPassword) {

                const response = await fetch(`${BACKEND_URL}/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name:formData.name,
                        email:formData.email,
                        password:formData.password,
                        role:formData.role
                    })
                })
                const data = await response.json();
                if (response.ok) {
                    toast.success("Registered Successfully");
                    navigate("/login");
                }
                else
                    toast.error(data.message);
            }
            else
                toast.error("Passwords do not match");
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
            {/* Background Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay
                    pointerEvents: "none", // Prevent overlay from blocking clicks
                }}
            />

            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    zIndex: 1,
                    padding: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
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
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <FormControl fullWidth margin="normal" size="small">
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="" disabled>
                                    Select your role
                                </MenuItem>
                                <MenuItem value="Inventory Manager">Inventory Manager</MenuItem>
                                <MenuItem value="Customer">Customer</MenuItem>
                                <MenuItem value="Supplier">Supplier</MenuItem>
                                <MenuItem value="Courier Service">Courier Service</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            required
                            id="name"
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            margin="normal"
                            size="small"
                        />
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
                        <TextField
                            fullWidth
                            required
                            id="confirmPassword"
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            margin="normal"
                            size="small"
                        />

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
                            Create Account
                        </Button>
                        <Typography variant="body2" align="center">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                style={{ textDecoration: "none", color: "#1976d2" }}
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Register;
