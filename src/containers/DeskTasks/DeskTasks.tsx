import { CircularProgress, Grid, Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import TaskCard from "../../components/TaskCard/TaskCard.tsx";
import { DecodedToken } from "../../type";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { fetchTasksByUser } from "../../store/taskThunk.ts";
import { selectTasks, tasksError, tasksLoading } from "../../store/taskSlice.ts";

const DeskTasks = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(selectTasks);
    const loading = useAppSelector(tasksLoading);
    const error = useAppSelector(tasksError);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const decoded: DecodedToken = jwtDecode(token);
            console.log(decoded);
            dispatch(fetchTasksByUser(decoded.user_id));
        } catch (e) {
            console.error("Ошибка при декодировании токена:", e);
            localStorage.clear();
            navigate("/login");
        }
    }, [navigate, dispatch]);

    const tasksByStatus = {
        new: tasks.filter((task) => task.status === "new"),
        inProgress: tasks.filter((task) => task.status === "in_progress"),
        done: tasks.filter((task) => task.status === "done"),
    };

    console.log(tasks);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                margin: "100px auto",
            }}
        >
            <Grid
                container
                sx={{
                    maxWidth: "1200px",
                    justifyContent: "center",
                }}
            >
                {[
                    { title: "К выполнению", color: "#f5f5f5", tasks: tasksByStatus.new },
                    { title: "В работе", color: "#e3f2fd", tasks: tasksByStatus.inProgress },
                    { title: "Готово", color: "#c8e6c9", tasks: tasksByStatus.done },
                ].map((column, index) => (
                    <Grid
                        item
                        key={index}
                        xs={12}
                        sm={6}
                        md={3.6}
                        sx={{
                            backgroundColor: column.color,
                            borderRadius: "8px",
                            padding: "16px",
                            minHeight: "350px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            margin: '10px'
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#000",
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                                textAlign: "center",
                                marginBottom: "10px",
                            }}
                        >
                            {column.title} ({column.tasks.length})
                        </Typography>
                        {loading ? (
                            <CircularProgress sx={{ alignSelf: "center" }} />
                        ) : error ? (
                            <Typography color="error">{error}</Typography>
                        ) : column.tasks.length > 0 ? (
                            column.tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                />
                            ))
                        ) : (
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    color: "#555",
                                    fontStyle: "italic",
                                }}
                            >
                                Нет задач
                            </Typography>
                        )}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DeskTasks;
