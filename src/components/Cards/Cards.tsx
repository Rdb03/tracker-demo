import {Grid2} from '@mui/material';
import CardItem from '../CardItem/CardItem';
import React from "react";

interface Props {
    title?: Record<string, string>;
    text?: Record<string, string>;
    image?: string,
    objectFit?: string,
}

const Cards: React.FC<Props> = ({title = {}, text = {}, image = '', objectFit}) => {
    return (
        <Grid2
            container
            spacing={2}
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '16px',
                margin: '50px auto',
                maxWidth: 'var(--container-width)'
            }}
        >
            {Object.keys(title).map((key, index) => (
                <Grid2
                    key={index}
                    sx={{
                        flex: '1 1 calc(25% - 16px)',
                        maxWidth: '345px',
                        minWidth: '250px',
                        boxSizing: 'border-box',
                    }}
                >
                    <CardItem title={title[key]} text={text[key]} image={image} objectFit={objectFit} />
                </Grid2>
            ))}
        </Grid2>

    );
};

export default Cards;
