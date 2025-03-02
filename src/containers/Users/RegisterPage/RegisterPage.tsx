import React, {useState} from "react";
import {Avatar, Box, Button, Container, Grid, Link, TextField, Typography,} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {Link as RouterLink} from "react-router-dom";

const RegisterPage = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Зарегистрироваться
                </Typography>
                <Box component="form" sx={{mt: 3}} onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                name="username"
                                id="username"
                                required
                                autoComplete="username"
                                onChange={inputChangeHandler}
                                value={form.username}
                                sx={{
                                    '& .MuiInputBase-input': { color: '#FFFFFF' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#FFFFFF',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#FFFFFF',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#FFFFFF',
                                        },
                                    },
                                    '& .MuiInputLabel-root': { color: '#FFFFFF' },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#FFFFFF',
                                    },
                                    width: '100%',
                                    marginBottom: '15px'
                                }}
                            />
                            <TextField
                                label="E-Mail"
                                name="email"
                                required
                                autoComplete="current-email"
                                onChange={inputChangeHandler}
                                value={form.email}
                                id="email"
                                sx={{
                                    '& .MuiInputBase-input': { color: '#FFFFFF' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#FFFFFF',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#FFFFFF',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#FFFFFF',
                                        },
                                    },
                                    '& .MuiInputLabel-root': { color: '#FFFFFF' },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#FFFFFF',
                                    },
                                    width: '100%'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="password"
                                required
                                label="Password"
                                type="password"
                                onChange={inputChangeHandler}
                                value={form.password}
                                id="password"
                                autoComplete="current-password"
                                sx={{
                                    '& .MuiInputBase-input': { color: '#FFFFFF' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#FFFFFF',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#FFFFFF',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#FFFFFF',
                                        },
                                    },
                                    '& .MuiInputLabel-root': { color: '#FFFFFF' },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#FFFFFF',
                                    },
                                    width: '100%'
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, backgroundColor: 'black'}}
                    >
                        Register
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link sx={{color: '#FFFFFF'}} component={RouterLink} to="/login" variant="body2">
                                Забыли свой пароль?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;
