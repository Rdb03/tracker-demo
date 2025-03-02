import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import React from "react";
import {Grid2} from "@mui/material";
import {NavLink} from "react-router-dom";

interface Props {
    text: string,
    title: string,
    image: string,
    objectFit?: string,
    link?: string,
}

const CardItem: React.FC<Props> = (data) => {
    return (
        <NavLink style={{
            maxWidth: 345, width: '100%',
               display: 'inline-block',
            textDecoration: 'none',
        }} to={data.link || ''}>
            <Card sx={{maxWidth: 345, display: 'flex', flex: 1, width: '100%'}}>
                <CardActionArea sx={{display: 'flex', flexDirection: 'column'}}>
                    <Grid2 sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={data.image}
                            alt="card-image"
                            sx={{
                                objectFit: data.objectFit || 'cover',
                            }}
                        />
                        <CardContent sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{
                                    minHeight: '56px',
                                    lineHeight: 1.2,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {data.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    marginTop: 'auto',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {data.text}
                            </Typography>
                        </CardContent>
                    </Grid2>
                </CardActionArea>
            </Card>
        </NavLink>
    );
}

export default CardItem;
