import React, {useEffect, useState} from "react";
import {Alert, Button, CircularProgress, Grid, Snackbar, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {createUserThunk} from "../../store/userThunk.ts";
import {selectCreateLoading} from "../../store/userSlice.ts";
import axiosApi from "../../axiosApi.ts";
import {jwtDecode} from "jwt-decode";
import {DecodedToken, ProfileResponse} from "../../type";
import ModalContainer from "../../components/ModalContainer/ModalContainer.tsx";
import UserForm from "../../components/UserForm/UserForm.tsx";
import TaskForm from "../../components/TaskForm/TaskForm.tsx";
import StageForm from "../../components/StageFrom/StageForm.tsx";

const Profile = () => {
    const dispatch = useAppDispatch();
    const createLoading = useAppSelector(selectCreateLoading);
    const [userData, setUserData] = useState<ProfileResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalType, setModalType] = useState<"user" | "task" | "stages" | null>(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

    const defaultUserData = { username: "", email: "", password: "", group: "employee" };
    const [newUserData, setNewUserData] = useState(defaultUserData);

    useEffect(() => {
        const fetchUserData = async () => {
            const token: string | null = localStorage.getItem("accessToken");
            if (!token) return (window.location.href = "/login");

            try {
                const decoded: DecodedToken = jwtDecode(token);
                const response = await axiosApi.get(`/api/v1/users/${decoded.user_id}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(response.data);
            } catch {
                localStorage.clear();
                window.location.href = "/login";
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleSnackbarClose = () => setSnackbar((prev) => ({ ...prev, open: false }));
    const handleModalOpen = (type: "user" | "task" | "stages") => setModalType(type);
    const handleModalClose = () => {
        setModalType(null);
        setNewUserData(defaultUserData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(createUserThunk(newUserData)).unwrap();
            setSnackbar({ open: true, message: "Пользователь успешно создан!", severity: "success" });
            handleModalClose();
        } catch {
            setSnackbar({ open: true, message: "Ошибка при создании пользователя!", severity: "error" });
        }
    };

    const handleTaskSuccess = (message: string) => setSnackbar({ open: true, message, severity: "success" });

    if (loading) return <CircularProgress />;

    return (
        <Grid container direction="column" alignItems="center" sx={{ marginTop: "100px", display: 'flex', flexDirection: 'column' }}>
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <Typography variant="h4">Добро пожаловать, {userData?.username}!</Typography>
            <Typography>Email: {userData?.email}</Typography>

            {(userData?.is_superuser || userData?.group.includes("director")) && (
                <>
                    <Button variant="outlined" sx={{ marginTop: "30px", color: '#ffffff', borderColor: '#ffffff' }} onClick={() => handleModalOpen("user")}>
                        Создать юзера
                    </Button>
                    <Button variant="outlined" sx={{ marginTop: "30px", color: '#ffffff', borderColor: '#ffffff' }} onClick={() => handleModalOpen("task")}>
                        Создать задачу
                    </Button>
                    <Button variant="outlined" sx={{ marginTop: "30px", color: '#ffffff', borderColor: '#ffffff' }} onClick={() => handleModalOpen("stages")}>
                        Создать этап
                    </Button>
                </>
            )}

            <ModalContainer open={modalType === "user"} onClose={handleModalClose} title="Создать нового пользователя">
                <UserForm newUserData={newUserData} handleInputChange={handleInputChange} handleCreateUser={handleCreateUser} createLoading={createLoading} />
            </ModalContainer>

            <ModalContainer open={modalType === "task"} onClose={handleModalClose} title="Создать новую задачу">
                <TaskForm onClose={handleModalClose} onSuccess={handleTaskSuccess} />
            </ModalContainer>

            <ModalContainer open={modalType === "stages"} onClose={handleModalClose} title="Создать новый этап">
                <StageForm onClose={handleModalClose}/>
            </ModalContainer>
        </Grid>
    );
};

export default Profile;
