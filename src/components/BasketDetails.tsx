import React, { useEffect } from 'react'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setDrawer, updateBalance } from '../redux/appSlice';
import { ProductType, UserType } from '../types/Types';
import { Button } from '@mui/material';
import { calculateBasket, removeProductFromBasket, setBasket } from '../redux/basketSlice';
import { toast } from 'react-toastify';
import { FaTrash } from "react-icons/fa";

function BasketDetails() {

    const { drawer, currentUser } = useSelector((state: RootState) => state.app);
    const { basket, totalAmount } = useSelector((state: RootState) => state.basket);

    const dispatch = useDispatch();
    const closeDrawer = () => {
        dispatch(setDrawer(false))
    }

    useEffect(() => {
        dispatch(calculateBasket())
    }, [basket])
    const removeProduct = (productId: number) => {
        dispatch(removeProductFromBasket(productId))
    }
    const buy = () => {
        if (currentUser?.balance && currentUser.balance < totalAmount) {
            toast.warn("Bakiyeniz yeterli değildir")
            return;
        }
        if (currentUser?.balance) {
            const remaningTotal = currentUser.balance - totalAmount;
            const payload: UserType = {
                ...currentUser,
                balance: remaningTotal
            }
            dispatch(updateBalance(payload))
            dispatch(setBasket([]));
            localStorage.removeItem("basket");
            toast.success("Ürünler satın alınmıştır")
        }
    }
    return (
        <Drawer open={drawer} anchor='right' sx={{ width: '250px' }} onClose={closeDrawer}>
            {
                basket && basket.map((product: ProductType) => (
                    <React.Fragment key={product.id}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', padding: '20px 30px' }}>
                            <div style={{ marginRight: '15px' }}>
                                <img src={product.image} width={60} height={60} alt="" />
                            </div>
                            <div style={{ width: '300px' }}>
                                <div style={{ fontFamily: 'arial', fontWeight: 'bold' }}>{product.title.substring(0, 30)}</div>
                                <div>{product.description.substring(0, 40)}..</div>
                            </div>
                            <div style={{ marginRight: '20px' }}>{product.count}</div>
                            <div style={{ fontFamily: 'arial', fontSize: '15px', fontWeight: 'bold', width: '70px' }}>{product.price}₺</div>
                            <div><Button onClick={() => removeProduct(product.id)} size='medium' sx={{ textTransform: 'none', height: '25px' }} ><FaTrash /></Button></div>
                        </div>

                    </React.Fragment>
                ))
            }
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 60px' }}>
                <div style={{ fontSize: '18px', fontFamily: 'arial' }}>Toplam Tutar: {parseFloat(totalAmount.toFixed(2))}</div>
                <div><Button onClick={buy} sx={{ textTransform: 'none', height: '25px', marginTop: '20px' }} size='small' variant='contained' color='secondary'>Satın Al</Button></div>
            </div>
        </Drawer>
    )
}

export default BasketDetails