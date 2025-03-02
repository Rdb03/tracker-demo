import {Grid2} from "@mui/material";
import '../../styles/global.css';
import '../../styles/variables.css';
import DeskTasks from "../DeskTasks/DeskTasks.tsx";

const ProjectPage = () => {
    return (
        <Grid2 sx={{margin: '100px auto', maxWidth: '1250px'}}>
            <DeskTasks/>
        </Grid2>
    );
};

export default ProjectPage;