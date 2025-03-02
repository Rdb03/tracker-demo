import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    CreateUserPayload,
    DecodedToken, FetchUsersParams,
    GlobalError,
    LoginMutation,
    LoginResponse,
    ProfileResponse, TaskData,
    Users
} from "../type";
import axiosApi from "../axiosApi.ts";
import {isAxiosError} from "axios";
import {RootState} from "./store.ts";
import {jwtDecode} from "jwt-decode";

export const login = createAsyncThunk<LoginResponse, LoginMutation, { rejectValue: GlobalError }>(
    "users/login",
    async (loginMutation, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post<LoginResponse>("api/v1/users/auth/login/", loginMutation);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response && (error.response.status === 400 || error.response.status === 401)) {
                return rejectWithValue({ error: error.response.data.detail } as GlobalError);
            }
            throw error;
        }
    }
);


export const logout = createAsyncThunk<void, void, { state: RootState }>(
    "users/logout",
    async (_, {getState}) => {
        const token = getState().users.user?.access;
        const refresh = getState().users.user?.refresh;

        if (!refresh) {
            throw new Error("Refresh token is missing");
        }

        await axiosApi.post("api/v1/users/auth/logout/", {refresh}, {headers: {Authorization: `Bearer ${token}`},});
    }
);


export const fetchUserData = createAsyncThunk<void, void, { state: RootState }>(
    'user/fetchUserData',
    async (_, thunkAPI) => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            window.location.href = "/login";
            return thunkAPI.rejectWithValue("Нет токена");
        }

        try {
            const decoded: DecodedToken = jwtDecode(token);
            const response = await fetch(`http://77.235.25.19:9000/api/v1/users/${decoded.user_id}/`, {
                headers: {Authorization: `Bearer ${token}`},
            });

            if (!response.ok) {
                throw new Error("Не удалось загрузить данные пользователя");
            }

            return await response.json();
        } catch (error) {
            console.error("Ошибка при загрузке данных пользователя:", error);
        }
    }
);

export const fetchUsers = createAsyncThunk<Users, FetchUsersParams, { state: RootState }>(
    "users/fetchUsers",
    async ({ page, pageSize, role }, thunkAPI) => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            window.location.href = "/login";
            return thunkAPI.rejectWithValue("Нет токена");
        }

        try {
            const response = await axiosApi.get("/api/v1/users/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                params: {
                    "page-size": pageSize,
                    page,
                    ...(role ? { "groups__name": role } : {}),
                },
            });

            return response.data as Users;
        } catch (error) {
            console.error("Ошибка при загрузке пользователей:", error);
            return thunkAPI.rejectWithValue("Ошибка при загрузке пользователей");
        }
    }
);

export const fetchUsersTasks = createAsyncThunk<Users, void, {state: RootState}>(
    "users/fetchUsersTasks",
    async (_, {rejectWithValue}) => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            window.location.href = "/login";
            return rejectWithValue("Нет токена");
        }

        try {
            const response = await axiosApi.get("/api/v1/users/?groups__name=employee&page-size=50", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return response.data as Users;
        } catch (error) {
            console.error("Ошибка при загрузке пользователей:", error);
            return rejectWithValue("Ошибка при загрузке пользователей");
        }
    }
)


export const createUserThunk = createAsyncThunk<ProfileResponse, CreateUserPayload, { rejectValue: GlobalError }>(
    "user/createUser",
    async (userData, {rejectWithValue}) => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            return rejectWithValue({error: "Пользователь не авторизован."});
        }

        try {
            const response = await axiosApi.post("/api/v1/users/", userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data as GlobalError);
            }

            throw error;
        }
    }
);

export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (taskData: TaskData, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post("/api/v1/tasks/", {
                title: taskData.title,
                description: taskData.description,
                executor: [Number(taskData.executor)],
                status: "new",
                deadline: taskData.deadline,
                priority: taskData.priority,
                complexity: "s",
                planned_time: 0,
                attachments: [],
            });

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Ошибка при создании задачи");
        }
    }
);








