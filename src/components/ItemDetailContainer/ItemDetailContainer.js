import React, { useEffect, useState } from 'react';
import { fetchData } from '../../helpers/fetchData';
import Card from '@mui/material/Card';
import { CardMedia, Typography } from '@mui/material';
import { Button, ButtonGroup } from '@mui/material';
export const ItemDetailContainer = () => {
    const [productos, setProductos] = useState([]);
    const [index, setIndex] = useState(0);
    const handleAnterior = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };
    const handleSiguiente = () => {
        if (index < productos.length()) {
            setIndex(index + 1);
        }
    };
    useEffect(() => {
        fetchData()
            .then((resp) => {
                console.log(resp)
                setProductos(resp);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [productos]);
    return (
        productos && productos.length ? (
            productos.map(prod => (
                <div>
                    <Card key={prod.id} className="card">
                        <CardMedia
                            className="media"
                            component="img"
                            image={
                                require(`../../data/img/${prod.Imagen}`)
                                    .default
                            }
                            alt={prod.Imagen}
                        />
                        <Typography variant="body2" color="initial">
                            {prod.Tipo}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="h4"
                            color="initial"
                            component="div"
                        >
                            {prod.Marca + ' ' + prod.Serie}
                        </Typography>
                        <Typography variant="body1" color="initial">
                            USD$ {prod.Precio}
                        </Typography>
                        <ButtonGroup variant="contained" color="primary" aria-label="">
                            <Button onClick={handleAnterior}> Anterior </Button>
                            <Button onClick={handleSiguiente}> Siguiente </Button>
                        </ButtonGroup>
                    </Card>
                </div>
            ))
        ) : <></>
    );
};
