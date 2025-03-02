import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import "../../styles/variables.css";

const MainPageUser = () => {
    const [open, setOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [newStage, setNewStage] = useState("");
    const [stages, setStages] = useState(["Этап 1", "Этап 2"]);
    const [newComment, setNewComment] = useState("");
    const [status, setStatus] = useState("К выполнению");
    const [tasks] = useState([
        { id: 1, title: "Задача 1", author: "Автор 1" },
        { id: 2, title: "Задача 2", author: "Автор 2" },
    ]);

    const [completedTasks] = useState([
        { id: 3, title: "Завершённая задача 1", author: "Автор 3" },
        { id: 4, title: "Завершённая задача 2", author: "Автор 4" },
    ]);

    const handleCardClick = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirmationClose = () => setConfirmationOpen(false);

    const handleAddStage = () => {
        setStages([...stages, newStage]);
        setNewStage("");
        handleConfirmationClose();
    };

    return (
        <Grid container spacing={3} sx={{ padding: "100px 20px 0", justifyContent: "center" }}>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Привет, Рамиль!
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Твои задачи:
                </Typography>
            </Grid>

            {tasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={task.id} sx={{ display: "flex", justifyContent: "center" }}>
                    <Card
                        onClick={handleCardClick}
                        sx={{
                            cursor: "pointer",
                            boxShadow: 3,
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            width: "100%",
                            maxWidth: "300px",
                            padding: '20px'
                        }}
                    >
                            <Typography
                                variant="h6"
                                sx={{ textAlign: "center", fontWeight: "bold" }}
                            >
                                {task.title}
                            </Typography>
                    </Card>
                </Grid>
            ))}

            <Grid item xs={12} sx={{ textAlign: "center", marginTop: "40px" }}>
                <Typography variant="h6" gutterBottom>
                    Завершённые задачи:
                </Typography>
            </Grid>

            {completedTasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={task.id} sx={{ display: "flex", justifyContent: "center" }}>
                    <Card
                        onClick={handleCardClick}
                        sx={{
                            cursor: "pointer",
                            boxShadow: 3,
                            backgroundColor: "#e0e0e0",
                            borderRadius: "8px",
                            width: "100%",
                            maxWidth: "300px",
                            padding: '20px'
                        }}
                    >
                            <Typography
                                variant="h6"
                                sx={{ textAlign: "center", fontWeight: "bold" }}
                            >
                                {task.title}
                            </Typography>
                    </Card>
                </Grid>
            ))}

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Информация о задаче</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <strong>Исполнитель:</strong> Иван Иванов<br />
                        <strong>Назначил:</strong> Сергей Петров<br />
                        <strong>Дата создания:</strong> 2024-12-30<br />
                        <strong>Дата обновления:</strong> 2024-12-31<br />
                        <strong>Родитель:</strong> KAN-1<br />
                        <strong>Статус задачи:</strong>
                    </DialogContentText>
                    <FormControl fullWidth sx={{ margin: "20px 0" }}>
                        <Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            sx={{
                                backgroundColor:
                                    status === "К выполнению"
                                        ? "#f0f0f0"
                                        : status === "Готова"
                                            ? "#d4edda"
                                            : status === "В работе"
                                                ? "#cbe2f5"
                                                : "inherit",
                            }}
                        >
                            <MenuItem value="К выполнению">К выполнению</MenuItem>
                            <MenuItem value="В работе">В работе</MenuItem>
                            <MenuItem value="Готова">Готова</MenuItem>
                        </Select>
                    </FormControl>

                    <DialogContentText>
                        <strong>Этапы задачи:</strong>
                    </DialogContentText>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {stages.map((stage, index) => (
                            <li key={index}>{stage}</li>
                        ))}
                    </ul>
                    <Button
                        variant="contained"
                        onClick={() => setConfirmationOpen(true)}
                        sx={{ backgroundColor: "var(--primary-color)", color: "#fff", marginTop: "10px" }}
                    >
                        Добавить этап
                    </Button>

                    <TextField
                        fullWidth
                        label="Добавить комментарий"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        sx={{ marginTop: "10px" }}
                    />
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "var(--primary-color)", color: "#fff", marginTop: "10px" }}
                    >
                        Добавить комментарий
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: "var(--primary-color)" }}>
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmationOpen} onClose={handleConfirmationClose} fullWidth maxWidth="xs">
                <DialogTitle>Добавить этап</DialogTitle>
                <DialogContent>
                    <DialogContentText>Укажите название нового этапа задачи:</DialogContentText>
                    <TextField
                        fullWidth
                        label="Название этапа"
                        value={newStage}
                        onChange={(e) => setNewStage(e.target.value)}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmationClose} sx={{ color: "var(--primary-color)" }}>
                        Отмена
                    </Button>
                    <Button
                        onClick={handleAddStage}
                        sx={{ backgroundColor: "var(--primary-color)", color: "#fff" }}
                        disabled={!newStage.trim()}
                    >
                        Подтвердить
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default MainPageUser;
