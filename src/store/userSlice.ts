import {GlobalError, User, Users} from "../type";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store.ts";
import {createUserThunk, fetchUserData, fetchUsers, fetchUsersTasks, login} from "./userThunk.ts";

interface UserState {
    user: User | null;
    loginLoading: boolean;
    loginError: GlobalError | null;
    loading: boolean;
    error: string | null;
    createError: GlobalError | null;
    createLoading: boolean;
    users: Users | null;
    stateUsersTasks: Users | null,
}

const initialState: UserState = {
    user: null,
    users: null,
    loginLoading: false,
    loginError: null,
    loading: false,
    error: null,
    createError: null,
    createLoading: false,
    stateUsersTasks: null,
};

export const selectUser = (state: RootState) => state.users.user;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectCreateError = (state: RootState) => state.users.createError;
export const selectCreateLoading = (state: RootState) => state.users.createLoading;
export const selectUsers = (state: RootState) => state.users.users;
export const selectLoading = (state: RootState) => state.users.loading;
export const selectError = (state: RootState) => state.users.error;
export const selectUsersTasks = (state: RootState) => state.users.stateUsersTasks

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        unsetUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loginLoading = true;
                state.loginError = null;
            })
            .addCase(login.fulfilled, (state, { payload: user }) => {
                state.user = user;
                state.loginLoading = false;
            })
            .addCase(login.rejected, (state, { payload: error }) => {
                state.loginLoading = false;
                state.loginError = error || null;
            })
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.users = {...payload};
            })
            .addCase(fetchUsers.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
            })
            .addCase(fetchUsersTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersTasks.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.stateUsersTasks = {...payload};
            })
            .addCase(fetchUsersTasks.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as string;
            })
            .addCase(createUserThunk.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createUserThunk.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createUserThunk.rejected, (state, { payload: error }) => {
                state.createLoading = false;
                state.createError = error || null;
            });
    }
});

export const usersReducer = usersSlice.reducer;
export const { unsetUser } = usersSlice.actions;
