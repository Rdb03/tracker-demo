import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";

export const createStage = createAsyncThunk("stages/createStage", async (stageData: any, { rejectWithValue }) => {
    try {
        const response = await axiosApi.post("/api/v1/stages/", stageData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Ошибка при создании этапа");
    }
});

export const deleteStage = createAsyncThunk(
    "stages/deleteStage",
    async (stageId: number, { rejectWithValue }) => {
        try {
            await axiosApi.delete(`/api/v1/stages/${stageId}/`);
            return stageId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Ошибка при удалении этапа");
        }
    }
);

export const updateStageStatus = createAsyncThunk(
    'stages/updateStageStatus',
    async (
        { id, status }: { id: number; status: 'not_started' | 'in_progress' | 'completed' },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosApi.patch(`/api/v1/stages/${id}/`, { status });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Ошибка обновления статуса этапа');
        }
    }
);