import RegistrationTitleBlock from "../RegistrationTitleBlock/RegistrationTitleBlock.tsx";
import Cards from "../../components/Cards/Cards.tsx";
import {Grid2} from "@mui/material";
import GetStartedBlock from "../GetStartedBlock/GetStartedBlock.tsx";
import taskImage from "../../assets/task-management.png";

const title: Record<string, string> = {
    card1: 'Контролируйте задачи с лёгкостью',
    card2: 'Анализируйте результаты',
    card3: 'Эффективное взаимодействие',
    card4: 'Работайте так, как удобно вам',
    card5: 'Никаких пропущенных дедлайнов',
};

const text: Record<string, string> = {
    card1: 'Управляйте всеми задачами команды в одном месте. Удобные фильтры и статусы помогут вам всегда оставаться в курсе.',
    card2: 'Интерактивные графики и отчёты позволят оценить эффективность сотрудников и найти узкие места в процессе.',
    card3: 'Создавайте тикеты, обсуждайте задачи и делитесь комментариями в реальном времени. Ваша команда будет работать слаженно.',
    card4: 'Настройте рабочий процесс под себя: доски, списки, этапы. Максимальная гибкость для достижения ваших целей.',
    card5: 'Вовремя напоминаем о важных задачах и подсказываем, что нужно сделать. С нами вы всегда на шаг впереди.',
};

const ProjectsPage = () => {
    return (
        <Grid2>
            <RegistrationTitleBlock />
            <Cards title={title} text={text} image={taskImage}/>
            <GetStartedBlock />
        </Grid2>
    );
};

export default ProjectsPage;