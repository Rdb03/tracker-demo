import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { selectAllTasks, tasksError, tasksLoading } from "../../store/taskSlice.ts";
import { fetchTasks } from "../../store/taskThunk.ts";
import { createStage } from "../../store/stagesThunk.ts";

interface Props {
    onClose: () => void;
}

const StageForm: React.FC<Props> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(selectAllTasks);
    const loading = useAppSelector(tasksLoading);
    const error = useAppSelector(tasksError);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "not_started",
        planned_time: 0,
        actual_time: 0,
        start_date: new Date().toISOString(),
        end_date: "",
        order: 0,
        task: "",
    });

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "date" ? value : value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        setFormData((prev) => ({ ...prev, task: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const startDate = new Date(formData.start_date);
        const endDate = new Date(formData.end_date);

        if (startDate > endDate) {
            alert("Дедлайн не может быть в прошлом времени");
            return;
        }

        if (!formData.task) return;
        await dispatch(createStage(formData));
        setFormData({
            title: "",
            description: "",
            status: "not_started",
            planned_time: 0,
            actual_time: 0,
            start_date: new Date().toISOString(),
            end_date: new Date().toISOString(),
            task: "",
            order: 0,
        });
        onClose();
    };


    return (
        <Box sx={{ width: "100%", maxWidth: 500, padding: 3 }}>
            <Typography variant="h5" gutterBottom>
                Создать этап
            </Typography>

            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}

            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    fullWidth
                    label="Название"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Нумирация"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    required
                    margin="normal"
                    type="number"
                />
                <TextField
                    fullWidth
                    label="Описание"
                    name="description"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Дедлайн"
                    name="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    required
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <Select
                    fullWidth
                    name="task"
                    value={formData.task}
                    onChange={handleSelectChange}
                    displayEmpty
                    required
                    sx={{ marginTop: 2 }}
                >
                    <MenuItem value="" disabled>
                        Выберите задачу
                    </MenuItem>
                    {tasks.map((task) => (
                        <MenuItem key={task.id} value={task.id.toString()}>
                            {task.title}
                        </MenuItem>
                    ))}
                </Select>

                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                    <Button sx={{ color: "black"}} onClick={onClose} color="secondary">
                        Отмена
                    </Button>
                    <Button type="submit" variant="contained" color="success" disabled={!formData.title || !formData.description || !formData.task}>
                        Создать этап
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default StageForm;
