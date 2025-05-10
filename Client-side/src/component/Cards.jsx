import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from './Search';
import axios from 'axios';
import { Box, Container, Grid, Paper, Typography, Slider, Button } from '@mui/material';
import { ListCard } from './ListCard';
import { debounce } from 'lodash';
import { setList } from '../redux/apartmentSlice';

export const Cards = () => {
  const dispatch = useDispatch();
  const Apartments = useSelector(state => state?.apartment?.list);
  const [filteredApartment, setFilteredApartment] = useState(Apartments);
  const [filters, setFilters] = useState({ category: '', city: '', price: '', minPrice: '', maxPrice: '', minBeds: '', maxBeds: '', bed: '', advertiser: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/apartment')
      .then(response => {
        dispatch(setList(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  }, [dispatch]);

  useEffect(() => {
    const applyFilters = debounce(() => {
      axios.post('http://localhost:3001/apartment/ByConditions', filters)
        .then(response => {
          setFilteredApartment(response.data);
        })
        .catch(error => {
          setFilteredApartment([]);
          console.log(error);
        });
    }, 500);

    applyFilters();
    return () => applyFilters.cancel();
  }, [filters]);

  const FilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, marginLeft: '40%' }}>
        <ListCard apartments={filteredApartment} type={2} />     
      </Box>

      <Box p={3} width={'320px'} sx={{ position: 'fixed', top: '150px', left: '25px', height: '50vh', overflowY: 'auto', backgroundColor: 'white', boxShadow: '-2px 0 5px rgba(60, 215, 235, 0.93)', borderColor: 'blue', borderRadius: '8px' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1E88E5' }}>סינון דירות</Typography>
        
        <Search
          text="עיר"
          options={[...new Set(Apartments?.map(a => a?.city?.name))]}
          onChange={value => {
            const cityObj = Apartments.find(apartment => apartment?.city?.name === value);
            FilterChange('city', cityObj ? cityObj.city : value);
          }}
        />
        
        <Typography sx={{ marginTop: 2 }}>טווח מחיר</Typography>
        <Slider
          value={[filters.minPrice || 0, filters.maxPrice || 10000]}
          onChange={(e, newValue) => {
            FilterChange('minPrice', newValue[0]);
            FilterChange('maxPrice', newValue[1]);
          }}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
        />

        <Search
          text="קטגוריה"
          marginTop="2px"
          options={[...new Set(Apartments?.map(apartment => apartment.category.name))]}
          onChange={value => {
            const categoryObj = Apartments.find(apartment => apartment.category.name === value);
            FilterChange('category', categoryObj ? categoryObj.category : value);
          }}
        />

        <Search
          text="מיטות"
          marginTop="2px"
          options={[...new Set([])]}
          onChange={value => {
            FilterChange('Numbers_beds',value);
          }}
        />

        <Button variant="contained" color="primary" sx={{ marginTop: 2, width: '100%' }}>
          חפש דירות
        </Button>
      </Box>
    </div>
  );
};
