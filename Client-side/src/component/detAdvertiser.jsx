import { Button } from "@mui/material";
import { Box } from "lucide-react";
import { AddApartment } from "./addApartment";
import { useState } from "react";
import { Outlet } from "react-router";

export const PersonalArea=()=>{
    const [addApartment, showAddApartment] = useState(false); 

return (
    <>
        <Box 
            sx={{
                display: "flex",
                flexDirection: "column", 
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff5f5",
                borderRadius: 3,
                boxShadow: 4, 
                maxWidth: 400,
                mx: "auto",
                my: 5,
                p: 4,
            }}
        >
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    mt: 2,
                    borderRadius: 2,
                    backgroundColor: '#f44336', 
                    '&:hover': {
                        backgroundColor: '#d32f2f', 
                    },
                    transition: "background-color 0.3s",
                }}
                onClick={() => showAddApartment(true)}
            >
                הוספת רכב
            </Button>
            {addApartment &&  <AddApartment  isOpen={addApartment} setOpen={showAddApartment} />}
        </Box>
        <Outlet />
    </>
);
};
