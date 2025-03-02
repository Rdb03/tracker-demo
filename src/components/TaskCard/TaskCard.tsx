import React, {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import {DecodedToken, Stage} from "../../type";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {selectTask, tasksError, tasksLoading} from "../../store/taskSlice.ts";
import {fetchTask} from "../../store/taskThunk.ts";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {deleteStage, updateStageStatus} from "../../store/stagesThunk.ts";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

interface Props {
    id: number;
    title: string;
}

const TaskCard: React.FC<Props> = ({ id, title }) => {
    const task = useAppSelector(selectTask);
    const loading = useAppSelector(tasksLoading);
    const error = useAppSelector(tasksError);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const decoded: DecodedToken = jwtDecode(token);
            const roles = decoded.role[0];
            setUserRole(roles);
        } catch (e) {
            console.error("Ошибка при декодировании токена:", e);
            localStorage.clear();
            navigate("/login");
        }
    }, [navigate]);

    const handleCardClick = () => {
        setOpen(true);
    };

    const handleDeleteStage = async (idStage: number) => {
        await dispatch(deleteStage(idStage));
        await dispatch(fetchTask(id));
    };

    const handleStatusChange = async (stageId: number, newStatus: string) => {
        await dispatch(
            updateStageStatus({ id: stageId, status: newStatus as 'not_started' | 'in_progress' | 'completed' })
        );
        // После обновления перезапрашиваем задачу, чтобы отразить изменения в UI
        await dispatch(fetchTask(id));
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!task || task.id !== id) {
            setOpen(true);
            dispatch(fetchTask(id));
        }
    }, [id, task, dispatch]);

    return (
        <>
            <Card
                sx={{
                    maxWidth: "245px",
                    margin: "20px auto",
                    cursor: "pointer",
                }}
                onClick={handleCardClick}
            >
                <CardContent>
                    <Typography
                        gutterBottom
                        component="div"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {title} <CreateIcon sx={{ marginLeft: "auto" }} />
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            display: "flex",
                            alignItems: "center",
                            marginTop: "20px",
                        }}
                    >
                        KAN-{id}
                        <AccountCircleIcon sx={{ marginLeft: "auto", marginRight: "3px" }} />
                    </Typography>
                </CardContent>
            </Card>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>Информация о задаче</DialogTitle>
                <DialogContent>
                    {loading ? (
                        <CircularProgress sx={{ display: "block", margin: "10px auto" }} />
                    ) : task ? (
                        <>
                            <DialogContentText>
                                <strong>Исполнитель:</strong> {task.executor[0]?.username || "Не назначен"}
                                <br />
                                <strong>Назначил:</strong> {task.creator.username || "Неизвестно"}
                                <br />
                                <strong>Дата создания:</strong> {new Date(task.created_at).toLocaleDateString()}
                                <br />
                                <strong>Дедлайн:</strong> {new Date(task.deadline).toLocaleDateString()}
                                <br />
                                <strong>Статус задачи:</strong> {task.status}
                                <br />
                                <strong>Описание:</strong> {task.description}
                            </DialogContentText>

                            <Box
                                sx={{
                                    backgroundColor: "#e1dede",
                                    borderRadius: "5px",
                                    padding: "20px",
                                    marginTop: "20px",
                                }}
                            >
                                <Typography sx={{ marginTop: "20px" }}>
                                    <strong>Этапы задачи:</strong>
                                </Typography>

                                {task.stages.length > 0 && !error ? (
                                    <ul style={{ listStyle: "none", padding: 0 }}>
                                        {task.stages
                                            .slice()
                                            .sort((a: Stage, b: Stage) => {
                                                if (a.order === null) return 1;
                                                if (b.order === null) return -1;
                                                return a.order - b.order;
                                            })
                                            .map((stage: Stage) => (
                                                <li key={stage.id} style={{ borderBottom: "1px solid #ddd", padding: "8px 0" }}>
                                                    <Typography variant="body1">
                                                        <strong>{stage.title}</strong>
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            backgroundColor: "#ffffff",
                                                            padding: "10px",
                                                            margin: "20px 0",
                                                        }}
                                                    >
                                                        <Typography variant="body2" color="textSecondary">
                                                            {stage.description}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Box>
                                                            <Typography variant="body2" sx={{ marginTop: "10px" }}>
                                                                Статус:
                                                            </Typography>
                                                            <Select
                                                                value={stage.status}
                                                                onChange={(e) => handleStatusChange(stage.id, e.target.value)}
                                                                variant="outlined"
                                                                size="small"
                                                                sx={{ margin: "10px 0", minWidth: "150px" }}
                                                            >
                                                                <MenuItem value="not_started">Не начато</MenuItem>
                                                                <MenuItem value="in_progress">В процессе</MenuItem>
                                                                <MenuItem value="completed">Завершен</MenuItem>
                                                            </Select>
                                                            <Typography variant="body2">
                                                                Дата начала: {new Date(stage.start_date).toLocaleDateString()}
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                Дата окончания: {new Date(stage.end_date).toLocaleDateString()}
                                                            </Typography>

                                                        </Box>
                                                        {
                                                            userRole === "director" || userRole === "admin" ? (
                                                                <IconButton color="error" onClick={() => handleDeleteStage(stage.id)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            ) : null
                                                        }
                                                    </Box>
                                                </li>
                                            ))}
                                    </ul>
                                ) : (
                                    <Typography sx={{ color: "#555", fontStyle: "italic" }}>Нет этапов</Typography>
                                )}
                            </Box>
                        </>
                    ) : (
                        <Typography>Ошибка загрузки данных</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: "var(--primary-color)" }} onClick={handleClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TaskCard;
