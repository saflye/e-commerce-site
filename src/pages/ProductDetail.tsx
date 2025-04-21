import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import { ProductType } from '../types/Types';
import { Button } from '@mui/material';
import { addProductToBasket } from '../redux/basketSlice';
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

function ProductDetail() {

    const { productId } = useParams();
    const dispatch = useDispatch();

    const [count, setCount] = useState<number>(0)

    const [product, setProduct] = useState<ProductType | null>();
    const getProductById = async (productId: number) => {
        try {
            dispatch(setLoading(true))
            const product: ProductType = await productService.getProductById(productId);
            setProduct(product);
        } catch (error) {
            toast.error("Ürün getirilirken hata oluştu: " + error)
        } finally {
            dispatch(setLoading(false))
        }
    }
    const addBasket = () => {
        if (product) {
            const payload: ProductType = {
                ...product,
                count: count
            }
            dispatch(addProductToBasket(payload))
            toast.success("Ürün sepete eklendi")
        }
    }

    useEffect(() => {
        getProductById(Number(productId))
    }, [])
    return (
        <Container maxWidth="lg">
            {product && <>
                <div style={{ display: 'flex', flexDirection: "row", alignItems: 'flex-start', justifyContent: 'flext-start', marginTop: '60px' }}>
                    <div>
                        <img src={product.image} width={350} height={400} alt="" />
                    </div>
                    <div style={{ marginLeft: '60px', marginTop: '60px' }}>
                        <div style={{ fontFamily: 'arial', fontWeight: 'bold', fontSize: '20px' }}>
                            {product.title}
                        </div>
                        <div style={{ fontFamily: 'arial', fontSize: '16px', marginTop: '25px', height: '100px' }}>
                            {product.description}
                        </div>
                        <div style={{ fontFamily: 'arial', fontSize: '25px', fontWeight: 'bold' }}>
                            {product.price}₺
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <span onClick={() => setCount(count + 1)} style={{ fontSize: '30px', cursor: 'pointer', marginRight: '10px' }}> <CiCirclePlus /></span>
                            <span style={{ fontSize: '30px', fontFamily: 'arial' }}>{count}</span>
                            <span onClick={() => count > 0 && setCount(count - 1)} style={{ fontSize: '30px', cursor: 'pointer', marginLeft: '10px' }}><CiCircleMinus /></span>
                        </div>
                        <div>
                            <Button onClick={addBasket} color='info' variant='contained' size='small' sx={{ textTransform: 'none', marginTop: '20px' }}>Sepete Ekle</Button>
                        </div>
                    </div>
                </div>
            </>}
        </Container>
    )
}

export default ProductDetail