import React from 'react'
import '../css/RegisterPage.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import { registerPageSchema } from '../schemas/RegisterPageSchema';
import registerPageService from '../services/RegisterPageService';
import { UserType } from '../types/Types';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';


function RegisterPage() {

  const navigate = useNavigate();

  const submit = async (values: any, actions: any) => {
    try {
      const payload: UserType = {
        id:String(Math.floor(Math.random()*999999)),
        username: values.username,
        password: values.password,
        balance:1000
      }
      const response = await registerPageService.register(payload)
      if (response) {
        clear();
        toast.success("Kullanıcı kaydedildi")
        navigate("/login");
      }
    } catch (error) {
      toast.error("Kullanıcı kaydedilirken hata oluştu")
    }
  }
    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
      initialValues: {
        username: '',
        password: ''
      },
      onSubmit: submit,
      validationSchema: registerPageSchema
    });

    const clear = () => {
      resetForm();
    }

    return (
      <div className='register'>
        <div className='reg-form'>
          <form onSubmit={handleSubmit}>
            <div className='form-div'>
              <h2 style={{ color: '#22007c', textAlign: 'center', marginBottom: '15px' }}>Sign Up</h2>
              <TextField
                id="username"
                placeholder='Kullanıcı Adı'
                value={values.username}
                onChange={handleChange}
                sx={{
                  marginBottom: '15px'
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaUser />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
                helperText={errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
              />
              <TextField
                id="password"
                type='password'
                value={values.password}
                onChange={handleChange}
                sx={{
                  marginBottom: '15px'
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaLock />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
                helperText={errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}

              />
              <div style={{ display: 'flex', gap: '5px' }}>
                <Button type='submit' size='small' variant='contained' sx={{ textTransform: 'none', color: 'white', backgroundColor: '#7161ef', height: '28px' }}>Kaydol</Button>
                <Button onClick={clear} size='small' variant='contained' sx={{ color: 'white', backgroundColor: '#957fef', height: '28px', textTransform: 'none' }}>Temizle</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
  export default RegisterPage