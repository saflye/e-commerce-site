import '../css/LoginPage.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import { registerPageSchema } from '../schemas/RegisterPageSchema';
import loginPageService from '../services/LoginPageService';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoading } from '../redux/appSlice';
import { UserType } from '../types/Types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface CheckUserType {
  result: boolean,
  currentUser: UserType | null
}

function LoginPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkUser = (userList: UserType[], username: string, password: string): CheckUserType => {
    const response: CheckUserType = { result: false, currentUser: null }
    
    userList.forEach((user: UserType) => {
      if (user.username == username && user.password === password) {
        response.result = true;
        response.currentUser = user;
      }
    })
    return response;
  }
  const submit = async (values: any, actions: any) => {
    try {
      dispatch(setLoading(true))
      const response: UserType[] = await loginPageService.login();
      if (response) {
        const checkUserResponse: CheckUserType = checkUser(response, values.username, values.password);
        if (checkUserResponse.result && checkUserResponse.currentUser) {
          dispatch(setCurrentUser(checkUserResponse.currentUser));
          localStorage.setItem("currentUser", JSON.stringify(checkUserResponse.currentUser))
          navigate("/")
        } else {
          toast.error("Kullanıcı adı veya şifre hatalı")
        }
      }
    } catch (error) {
      toast.error("Giriş yapılırken hata oluştu:" + error)
    } finally {
      dispatch(setLoading(false));
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
    <div className='login'>
      <div className='log-form'>
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
              <Button type='submit' size='small' variant='contained' sx={{ textTransform: 'none', color: 'white', backgroundColor: '#7161ef', height: '28px' }}>Giriş Yap</Button>
              <Button onClick={clear} size='small' variant='contained' sx={{ color: 'white', backgroundColor: '#957fef', height: '28px', textTransform: 'none' }}>Temizle</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage