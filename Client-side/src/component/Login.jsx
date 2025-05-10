import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../style/Style.css'
import { useDispatch } from 'react-redux';
import { Box, TextField, Button } from "@mui/material";
import { setCurrentAdvertiser ,setCurrentToken} from '../redux/advertiserSlice';
import axios from 'axios';
export const Login = () => {
    var advertiser = { email: "", password: "", phoneNumber: "", phoneNumber2: "" }
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        email: yup.string().email('דואר אלקטרוני לא תקני').required('דואר אלקטרוני נדרש'),
        phoneNumber: yup.string().matches(/^05\d{8}$/, 'מספר טלפון לא תקני').required('שם  הינו שדה חובה'),
        password: yup.string().min(6, 'הסיסמא חייבת להיות לפחות 6 תווים').required('סיסמא נדרשת')
    })
    const { register,handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    const onSubmit = (data) => {
        console.log(data);
        
            axios.post(`http://localhost:3001/advertiser`,data)
            .then(response => {
                console.log(response.status);
                if (response.status === 200) {
                    dispatch(setCurrentAdvertiser(response.data));
                    dispatch(setCurrentToken(response.token));
                    console.log(response.data);
                    
                } else {
                    console.log('Unexpected response status:', response.status);
                }
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }
    return <>
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: 400,
                mx: "auto",
                my: 5,
                p: 3,
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                <TextField
                    label=" מייל"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register("email", { required: "שם הינו שדה חובה" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    onBlur={(event)=>{advertiser.email=event.target.value}}
                />
                <TextField
                    label=" סיסמה"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    {...register("password", { required: "סיסמה נדרשת" })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                   

                />
                  <TextField
                    label="מספר טלפון"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register("phoneNumber", { required: "מספר טלפון הינו שדה חובה" })}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                

                />
                <TextField
                    label=" טלפון נוסף"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register("phoneNumber2", { required: "מספר טלפון הינו שדה חובה" })}
        
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3, borderRadius: 2, backgroundColor: 'red' }}
                >
                    לאישור 
                </Button>
            </form>
        </Box>
    </>
}