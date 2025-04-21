import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, setCurrentUser, setDrawer, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import { ProductType } from '../types/Types';
import { SlBasket } from "react-icons/sl";
import Badge from '@mui/material/Badge';
import { RootState } from '../redux/store';


function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
 
    const {basket}=useSelector((state:RootState)=>state.basket)

    const logout = () => {
        localStorage.removeItem("currentuser");
        dispatch(setCurrentUser(null));
        navigate("/login")
        toast.success("Çıkış yapıldı");

    }
    const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.value) {
                dispatch(filterProducts(e.target.value));

            } else {
                const products: ProductType[] = await productService.getAllProducts();
                dispatch(setProducts(products))
            }
        } catch (error) {
            toast.error("filtreleme olurken hata oluştu: " + error)
        }
    }

    const openDrawer =()=>{
        dispatch(setDrawer(true));
    }
    return (
        <AppBar position="static" sx={{ backgroundColor: '#9272EA' }}>
            <Toolbar>
                <IconButton
                    onClick={() => navigate("/")}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography onClick={() => navigate("/")} variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} >
                    Asteria
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilter(e)}
                        sx={{
                            width: '300px', marginButton: '25px', marginRight: '20px'
                        }}
                        id="searchInput"
                        placeholder='bir şey ara'
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                    </InputAdornment>
                                ),
                                style: {
                                    color: 'lightgrey',
                                    borderBottom: '1px solid lightgrey'
                                }
                            },

                        }}
                        variant="standard"
                    />
                    <Badge badgeContent={basket.length} color="secondary" sx={{margin:'0px 10px', cursor:'pointer'}}>
                        <SlBasket onClick={openDrawer} style={{ fontSize: '18px',cursor: 'pointer' }} />
                    </Badge>
                    <Button onClick={logout} sx={{ textTransform: 'none' }} color="inherit">Çıkış Yap</Button>
                </div>

            </Toolbar>
        </AppBar >
    )
}

export default Navbar