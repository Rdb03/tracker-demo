import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTask, fetchTasks, fetchTasksByUser} from "./taskThunk.ts";
import {RootState} from "./store.ts";
import {Task} from "../type";

export interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    task: Task | null;
    allTasks: Task[];
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
    task: null,
    allTasks: []
};

export const selectTasks = (state: RootState) => state.tasks.tasks
export const tasksLoading = (state: RootState) => state.tasks.loading;
export const tasksError = (state: RootState) => state.tasks.error;
export const selectTask = (state: RootState) => state.tasks.task;
export const selectAllTasks = (state: RootState) => state.tasks.allTasks;

export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasksByUser.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasksByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.loading = false;
                state.task = action.payload;
                state.error = null;
            })
            .addCase(fetchTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.allTasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

    },
});

export const taskReducer = taskSlice.reducer;
