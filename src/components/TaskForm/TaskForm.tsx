import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { createTask, fetchUsersTasks } from "../../store/userThunk.ts";
import { selectUsersTasks } from "../../store/userSlice.ts";

interface TaskFormProps {
    onClose: () => void;
    onSuccess: (message: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, onSuccess }) => {
    const dispatch = useAppDispatch();
    const tasksUsers = useAppSelector(selectUsersTasks);

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        executor: [] as number[],
        deadline: "",
        priority: "medium",
    });

    const [error, setError] = useState<string>("");

    useEffect(() => {
        dispatch(fetchUsersTasks());
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    };

    const handleExecutorChange = (e: SelectChangeEvent<number>) => {
        setTaskData({ ...taskData, executor: [Number(e.target.value)] });
    };

    const handleTaskSelectChange = (e: SelectChangeEvent<string>) => {
        setTaskData({ ...taskData, priority: e.target.value });
    };

    const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDeadline = e.target.value + ":00.000Z";
        if (newDeadline < getMinDateTime()) {
            setError("Дедлайн не может быть в прошлом");
        } else {
            setError("");
        }
        setTaskData({ ...taskData, deadline: newDeadline });
    };

    const getMinDateTime = () => {
        const now = new Date();
        return now.toISOString().slice(0, 16);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!error && taskData.title.trim() !== "" && taskData.description.trim() !== "") {
            try {
                await dispatch(
                    createTask({
                        ...taskData,
                        status: "new",
                        planned_time: 0,
                        attachments: [],
                        complexity: "s",
                    })
                ).unwrap();

                onSuccess("Задача успешно создана!");
                onClose();
            } catch {
                onSuccess("Ошибка при создании задачи!");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    required
                    label="Название"
                    name="title"
                    value={taskData.title}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    required
                    label="Описание"
                    name="description"
                    value={taskData.description}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={3}
                />
                <Select
                    value={taskData.executor[0] || ""}
                    onChange={handleExecutorChange}
                    fullWidth
                    displayEmpty
                >
                    <MenuItem value="" disabled>Выберите исполнителя</MenuItem>
                    {tasksUsers?.results?.length ? (
                        tasksUsers.results.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.email}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>Нет доступных пользователей</MenuItem>
                    )}
                </Select>
                <TextField
                    required
                    label="Дедлайн"
                    name="deadline"
                    type="datetime-local"
                    value={taskData.deadline.replace(".000Z", "")}
                    onChange={handleDeadlineChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!error}
                    helperText={error}
                />
                <Select
                    value={taskData.priority}
                    onChange={handleTaskSelectChange}
                    fullWidth
                >
                    <MenuItem value="highest">Самый высокий</MenuItem>
                    <MenuItem value="high">Высокий</MenuItem>
                    <MenuItem value="medium">Средний</MenuItem>
                    <MenuItem value="low">Низкий</MenuItem>
                </Select>
                <Button type="submit" variant="contained" color="success" fullWidth disabled={!!error}>
                    Создать
                </Button>
            </Stack>
        </form>
    );
};

export default TaskForm;
