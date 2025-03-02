import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TaskIcon from '@mui/icons-material/Task';
import {FormControl, Modal, Select, TextField} from '@mui/material';
import '../../styles/variables.css';
import {NavLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {selectUser, unsetUser} from "../../store/userSlice.ts";
import {logout} from "../../store/userThunk.ts";
import {DecodedToken} from "../../type";
import {jwtDecode} from "jwt-decode";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    '@media (max-width: 600px)': {
        p: 2,
    },
};


const projects = ['Проект 1', 'Проект 2', 'Проект 3'];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState<string>('');
    const [project, setProject] = useState<string>('');
    const navigate = useNavigate()
    const [userRole, setUserRole] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreate = () => {
        setTitle('');
        setDescription('');
        setAssignee('');
        setType('');
        handleClose();
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        dispatch(logout());
        dispatch(unsetUser());
        navigate("/login");
    };

    return (
        <AppBar position="fixed" sx={{background: 'var(--primary-color)'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <TaskIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <NavLink
                        to="/"
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                            }}
                        >
                            Task Manager
                        </Typography>
                    </NavLink>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="open navigation menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{display: {xs: 'block', md: 'none'}}}
                        >
                            <MenuItem>
                                <NavLink to="/" style={{textDecoration: 'none'}}>
                                    Главная
                                </NavLink>
                            </MenuItem>
                            {userRole === "director" || userRole === "admin" ? (
                                <MenuItem>
                                    <Button
                                        sx={{
                                            color: '#FFFFFF',
                                            marginRight: 2,
                                            height: '30px',
                                            backgroundColor: '#434238',
                                        }}
                                        variant="contained"
                                        color="inherit"
                                        onClick={handleOpen}>
                                        Создать
                                    </Button>
                                </MenuItem>
                            ) : null}
                            {userRole === "director" || userRole === "admin" ? (
                                <MenuItem>
                                    <NavLink to="/list" style={{textDecoration: 'none'}}>
                                        <Button
                                            sx={{
                                                color: '#FFFFFF',
                                                marginRight: 2,
                                                height: '30px',
                                                backgroundColor: '#434238',
                                            }}
                                            variant="contained"
                                        >
                                            Список
                                        </Button>
                                    </NavLink>
                                </MenuItem>
                            ) : null}
                            {userRole === "admin" || userRole === "director" ? (
                                <MenuItem>
                                    <NavLink to="/usersPage" style={{textDecoration: 'none'}}>
                                        <Button
                                            sx={{
                                                color: '#FFFFFF',
                                                marginRight: 2,
                                                height: '30px',
                                                backgroundColor: '#434238',
                                            }}
                                            variant="contained"
                                        >
                                            Страница Юзеров
                                        </Button>
                                    </NavLink>
                                </MenuItem>
                            ): null}
                            {userRole === "employee" ? (
                                <MenuItem>
                                    <NavLink to="/userTasks" style={{textDecoration: 'none'}}>
                                        <Button
                                            sx={{
                                                color: '#FFFFFF',
                                                marginRight: 2,
                                                height: '30px',
                                                backgroundColor: '#434238',
                                            }}
                                            variant="contained"
                                        >
                                           Мои задачи
                                        </Button>
                                    </NavLink>
                                </MenuItem>
                            ): null}
                        </Menu>
                    </Box>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, alignItems: 'center'}}>
                        {userRole === "director" || userRole === "admin" ? (
                            <Button
                                sx={{
                                    color: '#FFFFFF',
                                    marginRight: 2,
                                    height: '30px',
                                    backgroundColor: '#434238',
                                    marginLeft: '10px'
                                }} variant='contained' onClick={handleOpen}>
                                Создать
                            </Button>
                        ) : null}
                        {userRole === "director" || userRole === "admin" ? (
                            <NavLink to="/list" style={{textDecoration: 'none'}}>
                                <Button
                                    sx={{
                                        color: '#FFFFFF',
                                        marginRight: 2,
                                        height: '30px',
                                        backgroundColor: '#434238',
                                    }}
                                    variant="contained"
                                >
                                    Список
                                </Button>
                            </NavLink>
                        ) : null}
                        {
                            userRole === "admin" || userRole === "director" ? (
                                <NavLink to="/usersPage" style={{textDecoration: 'none'}}>
                                    <Button
                                        sx={{
                                            color: '#FFFFFF',
                                            marginRight: 2,
                                            height: '30px',
                                            backgroundColor: '#434238',
                                        }}
                                        variant="contained"
                                    >
                                        Страница Юзеров
                                    </Button>
                                </NavLink>
                            ) : null}
                        {
                            userRole === "employee" ?
                                <NavLink to="/userTasks" style={{textDecoration: 'none'}}>
                                    <Button
                                        sx={{
                                            color: '#FFFFFF',
                                            marginRight: 2,
                                            height: '30px',
                                            backgroundColor: '#434238',
                                        }}
                                        variant="contained"
                                    >
                                        Задачи
                                    </Button>
                                </NavLink> : null
                        }
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Tooltip title="Открыть настройки">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar sx={{border: '2px solid white'}} alt="User Avatar"
                                        src="./src/assets/anonymous.svg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {user ? (
                                <>
                                    <NavLink to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <MenuItem onClick={handleCloseUserMenu}>Профиль</MenuItem>
                                    </NavLink>

                                    <MenuItem onClick={() => {
                                        handleCloseUserMenu();
                                        handleLogout();
                                    }}>
                                        Выход
                                    </MenuItem>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <MenuItem onClick={handleCloseUserMenu}>Вход</MenuItem>
                                    </NavLink>
                                </>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
                        Создание {type === 'Тикет' ? 'тикета' : 'задачи'}
                    </Typography>
                    <FormControl fullWidth sx={{marginBottom: 2}}>
                        <Select
                            labelId="type-label"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>
                                Выберите тип
                            </MenuItem>
                            <MenuItem value="Тикет">Тикет</MenuItem>
                            <MenuItem value="Задача">Задача</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{marginBottom: 2}}>
                        <Select
                            labelId="project-label"
                            value={project}
                            onChange={(e) => setProject(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>
                                Выберите проект
                            </MenuItem>
                            {projects.map((proj) => (
                                <MenuItem key={proj} value={proj}>
                                    {proj}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Название"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        label="Описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={3}
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        label="Исполнитель"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        fullWidth
                        sx={{marginBottom: 2}}
                    />
                    <FormControl fullWidth sx={{marginBottom: 2}}>
                        <Typography variant="body2" sx={{marginBottom: 1}}>
                            Прикрепить файлы:
                        </Typography>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => {
                                if (e.target.files) {
                                    const filesArray = Array.from(e.target.files);
                                    console.log('Прикрепленные файлы:', filesArray);
                                }
                            }}
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleCreate}
                        disabled={!title || !description || !assignee}
                        sx={{
                            backgroundColor: 'var(--primary-color)',
                            color: '#FFFFFF',
                            marginRight: 2
                        }}
                    >
                        Создать
                    </Button>
                </Box>
            </Modal>
        </AppBar>
    );
};

export default Header;
