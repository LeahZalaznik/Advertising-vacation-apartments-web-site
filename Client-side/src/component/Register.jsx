import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../style/Style.css'
import { useDispatch } from 'react-redux';
import { Box, TextField, Button } from "@mui/material";
import { setCurrentAdvertiser, selectAdvertiser, setCurrentToken } from '../redux/advertiserSlice';
import axios from 'axios';
import { Advertiser } from './Advertiser';
import { Outlet, useNavigate } from 'react-router';
export const Register = () => {
    const nav=useNavigate()
    const [showAdvertiser, setShowAdvertiser] = useState(true);
    var advertiserEmail = "";
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        email: yup.string().email('דואר אלקטרוני לא תקני').required('דואר אלקטרוני נדרש'),
        phoneNumber: yup.string().matches(/^05\d{8}$/, 'מספר טלפון לא תקני').required('שם  הינו שדה חובה'),
        password: yup.string().min(6, 'הסיסמא חייבת להיות לפחות 6 תווים').required('סיסמא נדרשת')
    })
    const myLogin = () => {
        console.log(advertiserEmail) 
        console.log(advertiserEmail)        
            axios.get(`http://51.20.12.20:3001/advertiser/Login/${advertiserEmail}`)
            .then(response => {
                console.log(response.status);
                if (response.status === 200) {
                    dispatch(setCurrentAdvertiser(response.data));
                    dispatch(setCurrentToken(response.data.token));
                    nav('/Advertiser',{state:response.data})
                    setShowAdvertiser(!showAdvertiser)
                } else {
                    console.log('Unexpected response status:', response.status);
                }
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }
    return <>
        {showAdvertiser &&<Box
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
            <div  style={{ width: "100%" }}>
                <label >נא הכנס מייל </label>
                <TextField
                    label=" מייל"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onBlur={(event)=>{advertiserEmail=event.target.value}}
                />
               
                <Button
                onClick={myLogin}
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3, borderRadius: 2, backgroundColor: 'red' }}
                >
                    לאישור 
                </Button>
            </div>
        </Box>}
        {!showAdvertiser && <Advertiser advertiser={selectAdvertiser}></Advertiser>}
        <Outlet></Outlet>
    </>
}
