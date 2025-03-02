import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const CreateTicketPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    const [priority, setPriority] = useState('Средний');
    const [status, setStatus] = useState('К выполнению');

    const handleCreateTicket = () => {
        const newTicket = {
            id: `TICKET-${Math.floor(Math.random() * 1000)}`,
            title,
            description,
            assignee,
            priority,
            status,
            createdAt: new Date().toISOString(),
        };

        console.log('Созданный тикет:', newTicket);
        // Здесь вы можете отправить newTicket на сервер или сохранить его в состоянии.
        setTitle('');
        setDescription('');
        setAssignee('');
        setPriority('Средний');
        setStatus('К выполнению');
    };

    return (
        <div style={{maxWidth: '600px', margin: '100px auto', padding: '20px'}}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Создание нового тикета
                    </Typography>
                    <TextField
                        label="Название"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        sx={{marginTop: '10px'}}
                    />
                    <TextField
                        label="Описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                        sx={{marginTop: '10px'}}
                    />
                    <TextField
                        label="Исполнитель"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        fullWidth
                        sx={{marginTop: '10px'}}
                    />
                    <FormControl fullWidth sx={{marginTop: '10px'}}>
                        <Select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <MenuItem value="Низкий">Низкий</MenuItem>
                            <MenuItem value="Средний">Средний</MenuItem>
                            <MenuItem value="Высокий">Высокий</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{marginTop: '10px'}}>
                        <Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="К выполнению">К выполнению</MenuItem>
                            <MenuItem value="В работе">В работе</MenuItem>
                            <MenuItem value="Готова">Готова</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        onClick={handleCreateTicket}
                        fullWidth
                        sx={{marginTop: '20px'}}
                        disabled={!title || !description || !assignee}
                    >
                        Создать тикет
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateTicketPage;
