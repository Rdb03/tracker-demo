import {Route, Routes} from "react-router-dom";
import ProjectsPage from "./containers/ProjectsPage/ProjectsPage.tsx";
import Header from "./components/Header/Header.tsx";
import Login from "./containers/LoginPage/Login.tsx";
import MainPageUser from "./containers/MainPageUser/MainPageUser.tsx";
import ProjectPage from "./containers/ProjectPage/ProjectPage.tsx";
import TicketPage from "./containers/TikcetPage/TicketPage.tsx";
import CreateTicketPage from "./containers/CreateTicketPage/CreateTicketPage.tsx";
import TicketListPage from "./containers/TicketListPage/TicketListPage.tsx";
import AnalyticsDashboard from "./containers/AnalyticsDashboard/AnalyticsDashboard.tsx";
import RegisterPage from "./containers/Users/RegisterPage/RegisterPage.tsx";
import Profile from "./containers/Profile/Profile.tsx";
import ProtectedRoute from "./containers/ProtectedRoute/ProtectedRoute.tsx";
import {useEffect} from "react";
import UsersPage from "./containers/Users/UsersPage/UsersPage.tsx";
import {useAppDispatch} from "./store/hooks.ts";
import {fetchUserData} from "./store/userThunk.ts";
import DeskTasks from "./containers/DeskTasks/DeskTasks.tsx";


const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(fetchUserData());
        }
    }, [dispatch]);


    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<ProjectsPage/>}/>
                    <Route path="/projects" element={<ProjectsPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/pageUser" element={<MainPageUser/>}/>
                    <Route path="/project1" element={<ProjectPage/>}/>
                    <Route path="/ticketPage" element={<TicketPage/>}/>
                    <Route path="/create-ticket" element={<CreateTicketPage/>}/>
                    <Route path="/list" element={<TicketListPage/>}/>
                    <Route path="/analyticsDashboard" element={<AnalyticsDashboard/>}/>
                    <Route path="/register-page" element={<RegisterPage/>}/>
                    <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                    <Route path="/usersPage" element={<UsersPage/>}/>
                    <Route path="/userTasks" element={<DeskTasks/>} />
                </Routes>
            </main>
        </>
    )
};

export default App;
