import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";

export const fetchTasksByUser = createAsyncThunk(
    "tasks/fetchTasksByUser",
    async (executorId: number, { rejectWithValue }) => {
        try {
            const response = await axiosApi(`/api/v1/tasks/?executor=${executorId}`);
            return response.data.results;
        } catch (error) {
            console.log(error);
            return rejectWithValue("Ошибка загрузки задач");
        }
    }
);

export const fetchTask = createAsyncThunk(
    "tasks/fetchTask",
    async (id: number, {rejectWithValue}) => {
      try {
        const response = await axiosApi.get(`/api/v1/tasks/${id}`);
        return response.data;
      }  catch (error) {
          console.log(error);
          return rejectWithValue("Ошибка загрузки задач");
      }
    }
);

export const fetchTasks = createAsyncThunk("stages/fetchTasks", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosApi.get("/api/v1/tasks");
        return response.data.results
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Ошибка при загрузке задач");
    }
});