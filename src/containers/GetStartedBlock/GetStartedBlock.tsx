import {Grid2} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import taskManager2 from "../../assets/task-management2.png"
import CardMedia from "@mui/material/CardMedia";
import EastIcon from '@mui/icons-material/East';

const GetStartedBlock = () => {
    return (
        <Grid2 sx={{
            maxWidth: 'var(--container-width)',
            display: {
                sm: 'block',
                md: 'flex',
                xs: 'flex'
            },
            flexWrap: {
                sm: 'wrap',
                md: 'nowrap',
                xs: 'nowrap'
            },
            margin: '0 auto',
            alignItems: 'center'
        }}>
            <Grid2 sx={{
                textAlign: {
                    xs: 'center',
                    sm: 'center',
                    md:'left',
                    lg: 'left',
                },
                padding: {
                    xs: 'none',
                    sm: 'none',
                    md:'0 20px',
                    lg: '',
                }
            }}>
                <Typography typography='h4' sx={{
                    marginBottom: '20px',
                    fontSize: {
                        xs: '27px',
                        sm: '35px'
                    }
                }}>
                    Ускорьте совместную работу команды
                    и повысить производительность
                </Typography>
                <Typography sx={{
                    marginBottom: '20px',
                    fontSize: {
                        xs: '15px',
                        sm: '20px'
                    },
                     width: {
                        xs: '100%',
                        sm: '100%',
                        lg: '90%'
                     }
                }}>
                    Упростите коммуникацию между командами и быстрее достигайте поставленных целей с помощью
                    программного обеспечения для управления командой, которое повышает производительность и дает
                    возможность всем вместе работать умнее.
                </Typography>
                <Button sx={{
                    marginTop: '10px',
                    color: '#FFFFFF',
                    borderColor: '#FFFFFF'
                }} variant='outlined'>
                    Начать
                    <EastIcon sx={{
                    marginLeft: '10px'
                }} /></Button>
            </Grid2>
            <CardMedia
                component="img"
                image={taskManager2}
                alt="card-image"
                sx={{
                    width: {
                        sm: '80%',
                        md: '40%'
                    },
                    margin: {
                        sm: '0 auto',
                    },
                    maxHeight: {
                        xs: '330px'
                    },
                    display: {
                        xs: 'none',
                        sm: 'none',
                        lg: 'block',
                        md: 'block',
                    }
                }}
            />
        </Grid2>
    );
};

export default GetStartedBlock;