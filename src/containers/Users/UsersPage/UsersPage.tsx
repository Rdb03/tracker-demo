import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { selectError, selectLoading, selectUsers } from "../../../store/userSlice.ts";
import { Card, CardContent, CircularProgress, Grid, Typography, Button, MenuItem, Select } from "@mui/material";
import { fetchUsers } from "../../../store/userThunk.ts";

const UsersPage = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUsers);
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    const [page, setPage] = useState(1);
    const [role, setRole] = useState<string | undefined>(undefined);
    const pageSize = 10;

    useEffect(() => {
        dispatch(fetchUsers({ page, pageSize, role }));
    }, [dispatch, page, role]);

    return (
        <Grid sx={{ marginTop: '100px' }} container spacing={3} padding={3}>
            <Grid item xs={12} sx={{ marginBottom: 3, textAlign: "center" }}>
                <Typography variant="h6">Фильтр по должности</Typography>
                <Select
                    value={role || ""}
                    onChange={(e) => setRole(e.target.value || undefined)}
                    displayEmpty
                    sx={{
                        minWidth: 200,
                        marginLeft: 2,
                        marginTop: '30px',
                        backgroundColor: '#ffffff',
                        color: 'black'
                    }}
                >
                    <MenuItem value="">Все</MenuItem>
                    <MenuItem value="director">Директор</MenuItem>
                    <MenuItem value="employee">Сотрудник</MenuItem>
                    <MenuItem value="founder">Учредитель</MenuItem>
                    <MenuItem value="admin">Администратор</MenuItem>
                </Select>
            </Grid>

            {loading && <CircularProgress sx={{ margin: "auto" }} />}
            {error && <Typography color="error">{error}</Typography>}
            {!loading && !error && users?.results?.length ? (
                users.results.map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">
                                    {user.full_name.trim() || user.email || "Имя не указано"}
                                </Typography>
                                <Typography variant="body2" color="primary">
                                    {user.group.join(", ")}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            ) : (
                !loading && !error && <Typography>Нет пользователей для отображения</Typography>
            )}

            <Grid container justifyContent="center" spacing={2} sx={{ marginTop: 3 }}>
                <Button
                    variant="contained"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    sx={{
                        background: "#ffffff",
                        color: "black"
                    }}
                >
                    Назад
                </Button>
                <Typography variant="h6" sx={{ margin: "0 20px" }}>
                    Страница {page}
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={!users?.next}
                    sx={{
                        background: "#ffffff",
                        color: "black"
                    }}
                >
                    Вперед
                </Button>
            </Grid>
        </Grid>
    );
};

export default UsersPage;
