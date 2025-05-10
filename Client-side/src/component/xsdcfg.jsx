import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails, Slider, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Sidebar = ({ filters, setFilters }) => {
  const [priceRange, setPriceRange] = useState([100, 1000]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    setFilters({ ...filters, price: newValue });
  };

  const handleCheckboxChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.checked });
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          padding: 2,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        סינון דירות
      </Typography>
      <List>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>טווח מחירים</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={5000}
              step={100}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography>₪{priceRange[0]}</Typography>
              <Typography>₪{priceRange[1]}</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>מתקנים</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel
              control={
                <Checkbox
                  name="pool"
                  checked={filters.pool || false}
                  onChange={handleCheckboxChange}
                />
              }
              label="בריכה"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="jacuzzi"
                  checked={filters.jacuzzi || false}
                  onChange={handleCheckboxChange}
                />
              }
              label="ג'קוזי"
            />
            {/* הוספת מתקנים נוספים לפי הצורך */}
          </AccordionDetails>
        </Accordion>
        {/* הוספת קטגוריות סינון נוספות לפי הצורך */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
