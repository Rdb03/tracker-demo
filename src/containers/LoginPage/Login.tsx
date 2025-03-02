import {Alert, Avatar, Box, Button, Container, Grid, TextField, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {selectLoginError, selectLoginLoading} from "../../store/userSlice.ts";
import {login} from "../../store/userThunk.ts";
import {LoginMutation} from "../../type";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
    const dispatch = useAppDispatch();
    const loginError = useAppSelector(selectLoginError);
    const navigate = useNavigate();
    const loginLoading = useAppSelector(selectLoginLoading);
    const [form, setForm] = useState<LoginMutation>({
        email: "",
        password: "",
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prevState) => ({...prevState, [name]: value}));
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await dispatch(login(form)).unwrap();

            localStorage.setItem("accessToken", response.access);
            localStorage.setItem("refreshToken", response.refresh);

            navigate("/profile");
        } catch (e: any) {
            console.error("Login failed:", e);
        }
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
                    <LockOpenOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Войти
                </Typography>

                {loginError?.error && (
                    <Alert severity="error">
                        {loginError.error}
                    </Alert>
                )}

                <Box onSubmit={submitHandler} component="form" sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="E-Mail"
                                name="email"
                                id="email"
                                required
                                type="email"
                                onChange={inputChangeHandler}
                                value={form.email}
                                autoComplete="current-email"
                                sx={{
                                    '& .MuiInputBase-input': {color: '#FFFFFF'},
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
                                    '& .MuiInputLabel-root': {color: '#FFFFFF'},
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
                                label="Password"
                                type="password"
                                id="password"
                                required
                                onChange={inputChangeHandler}
                                value={form.password}
                                autoComplete="current-password"
                                sx={{
                                    '& .MuiInputBase-input': {color: '#FFFFFF'},
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
                                    '& .MuiInputLabel-root': {color: '#FFFFFF'},
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
                        disabled={loginLoading}
                        sx={{ mt: 3, mb: 2, backgroundColor: 'black' }}
                    >
                        {loginLoading ? <CircularProgress color="inherit" size={24} /> : 'Sign in'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
