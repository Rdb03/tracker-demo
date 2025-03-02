import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createStage, deleteStage, updateStageStatus} from "./stagesThunk.ts";
import {Stage} from "../type";

interface StageState {
    loading: boolean;
    error: string | null;
    stages: Stage[];
}

const initialState: StageState = {
    loading: false,
    error: null,
    stages: [],
};

const stagesSlice = createSlice({
    name: "stages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createStage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createStage.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createStage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteStage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteStage.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.stages = state.stages.filter(stage => stage.id !== action.payload);
            })
            .addCase(deleteStage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateStageStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStageStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.stages.findIndex((stage) => stage.id === action.payload.id);
                if (index !== -1) {
                    state.stages[index] = action.payload;
                }
            })
            .addCase(updateStageStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const stagesReducer = stagesSlice.reducer;
