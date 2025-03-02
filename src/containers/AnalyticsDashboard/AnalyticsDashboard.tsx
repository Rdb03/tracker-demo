import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { LineChart, BarChart } from "@mui/x-charts";


interface Stat {
    title: string;
    value: number;
}

interface TaskData {
    month: string;
    completed: number;
    pending: number;
}

const AnalyticsDashboard: React.FC = () => {

    const initialStats: Stat[] = [
        { title: "Всего задач", value: 128 },
        { title: "Выполнено", value: 85 },
        { title: "Просрочено", value: 15 },
        { title: "В процессе", value: 28 },
    ];

    const initialTaskData: TaskData[] = [
        { month: "Янв", completed: 10, pending: 5 },
        { month: "Фев", completed: 15, pending: 7 },
        { month: "Мар", completed: 20, pending: 10 },
        { month: "Апр", completed: 18, pending: 8 },
        { month: "Май", completed: 22, pending: 12 },
    ];


    const [stats, setStats] = useState<Stat[]>(initialStats);
    const [taskCompletionData, setTaskCompletionData] = useState<TaskData[]>(initialTaskData);


    const updateData = () => {

        const newStats = stats.map((stat) => ({
            ...stat,
            value: stat.value + Math.floor(Math.random() * 10 - 5),
        }));

        const newTaskData = taskCompletionData.map((data) => ({
            ...data,
            completed: data.completed + Math.floor(Math.random() * 5),
            pending: data.pending + Math.floor(Math.random() * 5),
        }));

        setStats(newStats);
        setTaskCompletionData(newTaskData);
    };

    return (
        <Box sx={{ padding: 4, marginTop: '100px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Аналитическая Панель
            </Typography>

            <Grid container spacing={3}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h6" align="center">
                                    {stat.title}
                                </Typography>
                                <Typography variant="h4" align="center" color="primary">
                                    {stat.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <Button variant="contained" color="primary" onClick={updateData}>
                    Обновить данные
                </Button>
            </Box>
            <Typography variant="h5" gutterBottom>
                Статистика выполнения задач
            </Typography>
            <Box sx={{ marginTop: 4, backgroundColor: '#FFFFFF' }}>
                <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    <Box sx={{ flex: 1 }}>
                        <LineChart
                            height={300}
                            xAxis={[{ data: taskCompletionData.map((d) => d.month) }]}
                            series={[
                                {
                                    data: taskCompletionData.map((d) => d.completed),
                                    label: "Выполнено",
                                },
                                {
                                    data: taskCompletionData.map((d) => d.pending),
                                    label: "В процессе",
                                },
                            ]}
                        />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <BarChart
                            height={300}
                            xAxis={[
                                {
                                    data: taskCompletionData.map((d) => d.month),
                                    scaleType: "band",
                                },
                            ]}
                            series={[
                                {
                                    data: taskCompletionData.map((d) => d.completed),
                                    label: "Выполнено",
                                },
                            ]}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AnalyticsDashboard;
