import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../../styles/global.css';
import '../../styles/variables.css';

interface Ticket {
    id: string;
    title: string;
    description: string;
    assignee: string;
    reporter: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    stages: string[];
    comments: { author: string; text: string }[];
}

const TicketPage: React.FC = () => {
    const [ticket, setTicket] = useState<Ticket>({
        id: 'KAN-1',
        title: 'Задача: создать страницу тикета',
        description: 'Создать функциональную страницу тикета с возможностью добавления комментариев и изменения этапов.',
        assignee: 'Иван Иванов',
        reporter: 'Сергей Петров',
        createdAt: '2024-12-30',
        updatedAt: '2024-12-31',
        status: 'К выполнению',
        stages: ['Этап 1', 'Этап 2'],
        comments: [
            {author: 'Сергей Петров', text: 'Добавь обработку статусов.'},
            {author: 'Иван Иванов', text: 'Готово.'},
        ],
    });

    const [newComment, setNewComment] = useState('');
    const [newStage, setNewStage] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            setTicket((prevTicket) => ({
                ...prevTicket,
                comments: [...prevTicket.comments, {author: 'Иван Иванов', text: newComment}],
            }));
            setNewComment('');
        }
    };

    const handleAddStage = () => {
        if (newStage.trim()) {
            setTicket((prevTicket) => ({
                ...prevTicket,
                stages: [...prevTicket.stages, newStage],
            }));
            setNewStage('');
        }
    };

    const handleChangeStatus = (status: string) => {
        setTicket((prevTicket) => ({
            ...prevTicket,
            status,
        }));
    };

    return (
        <div style={{maxWidth: '800px', margin: '100px auto 0', padding: '20px'}}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {ticket.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {ticket.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Исполнитель:</strong> {ticket.assignee} <br/>
                        <strong>Назначил:</strong> {ticket.reporter} <br/>
                        <strong>Дата создания:</strong> {ticket.createdAt} <br/>
                        <strong>Дата обновления:</strong> {ticket.updatedAt} <br/>
                    </Typography>
                    <Typography variant="body2" sx={{marginTop: '20px'}}>
                        <strong>Статус:</strong>
                    </Typography>
                    <FormControl fullWidth sx={{marginTop: '10px'}}>
                        <Select
                            value={ticket.status}
                            onChange={(e) => handleChangeStatus(e.target.value)}
                            sx={{
                                backgroundColor: ticket.status === 'К выполнению' ? '#f0f0f0' : ticket.status === 'Готова' ? '#d4edda' : '#cbe2f5',
                            }}
                        >
                            <MenuItem value="К выполнению">К выполнению</MenuItem>
                            <MenuItem value="В работе">В работе</MenuItem>
                            <MenuItem value="Готова">Завершить</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography variant="body2" sx={{marginTop: '20px'}}>
                        <strong>Этапы:</strong>
                    </Typography>
                    <ul>
                        {ticket.stages.map((stage, index) => (
                            <li key={index}>{stage}</li>
                        ))}
                    </ul>
                    <TextField
                        label="Добавить этап"
                        value={newStage}
                        onChange={(e) => setNewStage(e.target.value)}
                        fullWidth
                        sx={{marginTop: '10px'}}
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddStage}
                        sx={{marginTop: '10px'}}
                        disabled={!newStage.trim()}
                    >
                        Добавить этап
                    </Button>
                    <Typography variant="body2" sx={{marginTop: '20px'}}>
                        <strong>Комментарии:</strong>
                    </Typography>
                    <ul>
                        {ticket.comments.map((comment, index) => (
                            <li key={index}>
                                <strong>{comment.author}:</strong> {comment.text}
                            </li>
                        ))}
                    </ul>
                    <TextField
                        label="Добавить комментарий"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        fullWidth
                        sx={{marginTop: '10px'}}
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddComment}
                        sx={{marginTop: '10px'}}
                        disabled={!newComment.trim()}
                    >
                        Добавить комментарий
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default TicketPage;
