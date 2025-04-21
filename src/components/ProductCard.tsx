import React from 'react'
import { ProductType } from '../types/Types'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: ProductType
}

function ProductCard(props: ProductCardProps) {
    const { id, title, price, description, category, image, raiting } = props.product;
    const navigate = useNavigate();
    return (
        <Card sx={{ cursor: 'pointer', baxShadow: '1px 3px 5px lightgrey', width: '330px', height: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '60px 10px' }}>
            <img src={image} width={230} height={230} />
            <CardContent sx={{ height: '250px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title.substring(0, 60)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description.substring(0, 200)}...
                </Typography>
            </CardContent>
            <div>
                <h2 style={{ fontFamily: 'arial' }}>{price} ₺</h2>
            </div>
            <CardActions>
                <Button onClick={() => navigate("/product-detail/" + id)} size="small" variant='outlined' color='info'>Detay</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard