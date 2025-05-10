import { Outlet, useNavigate } from "react-router";
import { Cards } from "./Cards";
import { Box, Button, ButtonGroup, Card, CardMedia, Container, Typography, Stack } from "@mui/material";

export const Home = () => {
    const nav = useNavigate();

    return (
        <Container maxWidth="false" sx={{ padding: 0 }}>
            <Box display="flex" justifyContent="flex-end" my={2}>
                <Button variant="contained" color="primary" onClick={() => {nav('/Register')}}>
                    כניסה לאזור אישי
                </Button>
            </Box>

            <Card sx={{ width: "100%", height: 500, overflow: "hidden", borderRadius: 2, boxShadow: 3 }}>
                <CardMedia component="img" src="/aaaa.jpg" alt="תמונה ראשית" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Card>
            <Cards />

            <Outlet />
        </Container>
    );
};
