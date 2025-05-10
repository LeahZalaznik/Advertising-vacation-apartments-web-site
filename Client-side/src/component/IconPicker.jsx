import React, { useState } from "react";
import * as Icons from "@mui/icons-material";
import { Box, Grid, TextField, Typography } from "@mui/material";

const IconPicker = () => {
  const [search, setSearch] = useState("");

  // יצירת רשימה של כל האייקונים הקיימים ומסנן לפי חיפוש
  const iconNames = Object.keys(Icons).filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <TextField
        label="חיפוש אייקון"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
      />

      <Grid container spacing={2} mt={2} style={{ maxHeight: "400px", overflowY: "auto" }}>
        {iconNames.map((name) => {
          const Icon = Icons[name];
          return (
            <Grid
              item
              key={name}
              xs={3}
              onClick={() => {}}
              style={{ cursor: "pointer", textAlign: "center" }}
            >
              <Icon fontSize="large" />
              <Typography variant="caption">{name}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default IconPicker;
