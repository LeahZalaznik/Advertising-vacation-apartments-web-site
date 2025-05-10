import { Card, CardContent, CardMedia, Button, Typography, Box, IconButton, Checkbox, Chip, CardActions } from '@mui/material';
import { Favorite, FavoriteBorder, Pool, Accessible, Delete, Edit } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import axios from 'axios';
import { UpdateApartment } from './UpdateApartment';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdvertiser } from '../redux/advertiserSlice';
import { EmailModal } from './SendEmail';
import { setList } from '../redux/apartmentSlice';

export const CardApartment = ({ setApartments, apartment, type }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [updateApartment, showUpdateApartment] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch()
  const [weather, setWeather] = useState({ temp: '', desc: '', icon: '' });
  const advertiser = useSelector(selectAdvertiser);
  const token = advertiser.currentToken;
  const headers = { 'Authorization': `Bearer ${token}` };

  useEffect(() => {
    axios.get(`http://localhost:3001/city/${apartment?.city?._id}`)
      .then(response => {
        setWeather({
          temp: response.data.temp,
          desc: response.data.desc,
          icon: `https://openweathermap.org/img/wn/${response.data.icon}@2x.png`
        });
      })
      .catch(() => {
        setWeather({ temp: 'אין נתונים', icon: '' });
      });
  }, [apartment]);

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.03 }} transition={{ duration: 0.5 }}>
  <Card sx={{
    width: '100%',
    maxWidth: '65vw',  // הכרטיס יתפוס 65% מהרוחב של המסך
    height: '400px',   // גובה קבוע
    display: 'flex',
    flexDirection: 'row',
    margin: '20px',
    background: '#FFFFFF',
    borderRadius: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    border: '2px solid #80DEEA',
    minHeight: '350px', // לוודא שהכרטיס לא יתפשט יותר מדי
}}>
    <Box display="flex" flexDirection="column" justifyContent="space-between" p={1} borderRight="2px solid #80DEEA">
        {type === 1 ? (
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <IconButton color="error" onClick={() => 
                    axios.delete(`http://localhost:3001/apartment/${apartment._id}`, { headers })
                    .then(response => {
                        dispatch(setList(response.data.apartments));
                    })}>
                    <Delete />
                </IconButton>
                <IconButton color="primary" onClick={() => showUpdateApartment(true)}>
                    <Edit />
                </IconButton>
            </CardActions>
        ) : (
            <Checkbox icon={<FavoriteBorder sx={{ color: '#80DEEA' }} />} checkedIcon={<Favorite sx={{ color: '#80DEEA' }} />} />
        )}
        <Box display="flex" alignItems="center" gap={1}>
            {weather.icon && <img src={weather.icon} alt="weather icon" style={{ width: 32, height: 32 }} />}
            <Typography variant="body2">{weather.temp}°C {weather.desc}</Typography>
        </Box>
    </Box>

    <CardMedia 
        component="img" 
        image={`/pict/${apartment?.name}/aaa.jpg`} 
        alt={apartment.name} 
        sx={{
            width: '40%', 
            height: '100%', // תופס את כל הגובה של הכרטיס
            objectFit: 'cover', // תמונה לא תעוות אם היא לא ממלאת את כל השטח
            cursor: 'pointer'
        }} 
        onClick={() => nav('/Aparment', { state: apartment })}
    />

    <CardContent sx={{
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px',
        overflow: 'hidden', // לא יתפשט מעבר לגבולות
    }}>
        <Typography variant="h6" textAlign="center" gutterBottom sx={{ color: '#424242', fontWeight: 'bold' }}>
            {apartment.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2">מחיר: ₪{apartment.price}</Typography>
            <Typography variant="body2">עיר: {apartment.city?.name}</Typography>
        </Box>
        <Typography variant="body2" noWrap>{apartment?.description?.split(' ').slice(0, 10).join(' ')}...</Typography>

        <Box display="flex" gap={1} mb={2}>
            {apartment.additives?.slice(0, 3)?.map((add, index) => (
                <Chip key={index} icon={getIcon(add)} label={add} sx={{ bgcolor: '#80DEEA', color: '#FFFFFF' }} />
            ))}
        </Box>

        <Button variant="contained" sx={{ backgroundColor: '#80DEEA', width: '100%', borderRadius: '12px', color: '#fff' }} onClick={() => nav('/Aparment', { state: apartment })}>
            לפרטים
        </Button>
        <Button variant="contained" onClick={() => setModalOpen(true)} sx={{ backgroundColor: '#80DEEA', width: '100%', borderRadius: '12px', color: '#fff' }}>
            לשליחת מייל
        </Button>
        <Typography variant="body2" textAlign="right" sx={{ mt: 1 }}>טלפון: {apartment.advertiser?.phoneNumber}</Typography>
        <EmailModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} ToSend={{ ApartmentName: apartment.name, contentMessage: `תאור:${apartment.description} מחיר:${apartment.price} כתובת:${apartment.address} מספר מיטות:${apartment.Numbers_beds}` }} />
    </CardContent>
</Card>

      <UpdateApartment isOpen={updateApartment} setOpen={showUpdateApartment} apartment={apartment} />
    </motion.div>
  );
};

const getIcon = (addon) => {
  switch (addon) {
    case 'בריכה': return <Pool sx={{ color: '#80DEEA' }} />;
    case 'נגישות לנכים': return <Accessible sx={{ color: '#80DEEA' }} />;
    default: return null;
  }
};
