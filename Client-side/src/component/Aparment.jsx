

import { useSelector } from "react-redux";
import { Box, Typography, Grid, Button, Card, CardMedia, Stack, IconButton, Input } from "@mui/material";
import { AttachMoney, CheckCircleOutline, CreditCard, Event, HighlightOff, LocationCity, LocationOn, Speed, AddComment } from "@mui/icons-material";
import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Item from "./Item";
import Gallery from "./ImageGallery";

export const Aparment = () => {
    const to = useRef(null);
    let location = useLocation();
    const apartment = location.state;
    const [currentImage, setCurrentImage] = useState(0);
    const [open,setOpen]=useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev > 0 ? prev - 1 : apartment?.img.length - 1));
        }, 6000);
        return () => clearInterval(interval);
    }, [apartment?.img?.length]);

    const features = [
        { icon: <LocationOn />, label: apartment.city?.name },
        { icon: <AttachMoney />, label: apartment?.price },
        { icon: <CheckCircleOutline />, label: "מאושר" },
        { icon: <CreditCard />, label: "אפשרות תשלומים" },
    ];

return (
    <Box sx={{ display: "flex",flexDirection:'row', height: '100vh', width: '100%',padding:8,justifyContent: 'space-between'}}>
        
        <Box sx={{ padding: 4, width: '35%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h4" sx={{ color: '#4682B4', marginBottom: 2 }}>{apartment?.name}</Typography>
            <Typography variant="body1" sx={{textAlign:'center', marginBottom: 4 }}>{apartment?.description}</Typography>
 
            <Button variant="contained" color="primary" startIcon={<AddComment />} sx={{ marginTop: 4, borderRadius: '20px' }} onClick={()=>{setOpen(true)}}>
                הוסף חוות דעת
            </Button>
            {open&&(
                <>
                <Input  aria-label="Demo input" multiline placeholder="Type something…" />
                <Button onClick={() => setOpen(false)}>ביטול</Button>
                </>
                )}

        </Box>

       
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '85%', width: '50%', flexShrink: 0 }}>
            <Gallery apartment={apartment}></Gallery>
            <Box sx={{ display: 'flex',flexDirection:'row',justifyContent:'center',padding:'3px', gap: 1 }}>
                {apartment.additives.map((item, index) => (
                    
                        <Box sx={{ display: 'flex',flexDirection:'column',justifyContent:'center',padding:'3px', gap: 1 }}>
                            <Item>{item}</Item>
                        </Box>
                  
                ))}
             </Box>
           
        </Box>

    </Box>
)
}
