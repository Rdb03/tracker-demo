import '../../styles/variables.css'
import {Grid2} from '@mui/material';
import Typography from "@mui/material/Typography";

const RegistrationTitleBlock = () => {
    return (
        <Grid2 sx={{
            maxWidth: 'var(--container-width)',
            display: 'flex',
            margin: '0 auto',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '100px'
        }} container spacing={2}>
            <Grid2>
                <Typography sx={{
                    fontSize: "50px"
                }} typography='h1'>
                <span
                    style={{
                        marginLeft: 'var(--spacing-left-small)',
                    }}>
                         Контроль.
                </span>
                    <br/>
                    <span
                        style={{
                            marginLeft: 'var(--spacing-left-medium)',
                        }}>
                    Анализ.
                </span>
                    <br/>
                    <span
                        style={{
                            marginLeft: 'var(--spacing-left-large)',
                        }}>
                       Результат.
                </span>
                    <br/>
                    <span style={{
                        fontWeight: 'bold'
                    }}>
                         — всё в одной системе
                    </span>
                </Typography>
            </Grid2>
            <Grid2 sx={{
                flex: 1,
                textAlign: {
                    xs: 'center',
                    sm: 'center',
                    md: 'right',
                },
                minWidth: 'unset',
            }}>
            </Grid2>
        </Grid2>
    );
};

export default RegistrationTitleBlock;