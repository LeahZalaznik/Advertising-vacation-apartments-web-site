import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const Search = ({ text, options, onChange }) => {
  
  return (
    <Autocomplete
      options={options}
      getOptionLabel={option => option != null ? option.toString() : ''}
      onChange={(event, newValue) => onChange(newValue)}
      renderInput={params => <TextField {...params} label={text} />}
      sx={{ width: 300, margin: '0 10px' }}
    />
  );
};
