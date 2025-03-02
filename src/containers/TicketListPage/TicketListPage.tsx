import React, {useState} from 'react';
import {
    Box,
    Button,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogActions,
    Collapse,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const staticItems = [
    {
        id: 1,
        title: 'Создать компонент Header',
        type: 'Тикет',
        assignee: 'Иван Иванов',
        status: 'Открыт',
        tasks: [
            {id: 101, title: 'Добавить кнопку "Создать"', status: 'Открыта'},
            {id: 102, title: 'Реализовать адаптивность', status: 'Закрыта'},
        ],
    },
    {
        id: 2,
        title: 'Реализовать модальное окно',
        type: 'Задача',
        assignee: 'Петр Петров',
        status: 'Открыт',
        tasks: [], // У задачи нет дочерних элементов
    },
    {
        id: 3,
        title: 'Добавить адаптивность',
        type: 'Тикет',
        assignee: 'Сергей Сергеев',
        status: 'Закрыт',
        tasks: [
            {id: 103, title: 'Настроить медиазапросы', status: 'Закрыта'},
        ],
    },
    {
        id: 4,
        title: 'Проверить функционал списка',
        type: 'Задача',
        assignee: 'Анна Ананова',
        status: 'Открыта',
        tasks: [],
    },
];

const TicketListPage: React.FC = () => {
    const [items, setItems] = useState(staticItems);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [expandedTicket, setExpandedTicket] = useState<number | null>(null);

    const handleDelete = (itemId: number) => {
        setItems((prev) => prev.filter((item) => item.id !== itemId));
        setDeleteDialogOpen(false);
    };

    const openDeleteDialog = (itemId: number) => {
        setItemToDelete(itemId);
        setDeleteDialogOpen(true);
    };

    const toggleExpand = (itemId: number) => {
        setExpandedTicket((prev) => (prev === itemId ? null : itemId));
    };

    return (
        <Box sx={{maxWidth: 800, margin: '100px auto 20px', p: 2}}>
            <Typography variant="h4" sx={{mb: 3}}>
                Список тикетов и задач
            </Typography>
            {items.map((item) => (
                <Box
                    key={item.id}
                    sx={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        p: 2,
                        mb: 2,
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box>
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography variant="body2">
                                Тип: {item.type} | Исполнитель: {item.assignee} | Статус: {item.status}
                            </Typography>
                        </Box>
                        <Box>
                            {item.type === 'Тикет' && item.tasks.length > 0 && (
                                <IconButton sx={{color: 'white'}} onClick={() => toggleExpand(item.id)}>
                                    {expandedTicket === item.id ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                                </IconButton>
                            )}
                            <IconButton color="primary">
                                <VisibilityIcon/>
                            </IconButton>
                            <IconButton color="secondary">
                                <CloseIcon/>
                            </IconButton>
                            <IconButton
                                color="error"
                                onClick={() => openDeleteDialog(item.id)}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                    {item.type === 'Тикет' && (
                        <Collapse in={expandedTicket === item.id} timeout="auto" unmountOnExit>
                            {item.tasks.length > 0 ? (
                                <Box sx={{mt: 2}}>
                                    <Typography variant="body1" sx={{mb: 1}}>
                                        Дочерние задачи:
                                    </Typography>
                                    {item.tasks.map((task) => (
                                        <Box
                                            key={task.id}
                                            sx={{
                                                border: '1px solid #ccc',
                                                borderRadius: '8px',
                                                p: 2,
                                                mb: 1,
                                                backgroundColor: '#f9f9f9',
                                            }}
                                        >
                                            <Typography color="text.secondary"
                                                        variant="subtitle1">{task.title}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Статус: {task.status}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
                                    Нет дочерних задач.
                                </Typography>
                            )}
                        </Collapse>
                    )}
                </Box>
            ))}

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Вы уверены, что хотите удалить элемент?</DialogTitle>
                <DialogActions>
                    <Button
                        onClick={() => setDeleteDialogOpen(false)}
                        color="primary"
                    >
                        Отмена
                    </Button>
                    <Button
                        onClick={() => handleDelete(itemToDelete!)}
                        color="error"
                        variant="contained"
                    >
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TicketListPage;
