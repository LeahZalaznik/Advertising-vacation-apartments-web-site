import { Box, keyframes, Typography } from "@mui/material";

export const Animation = ({ text,speed }) => {
    const scrollAnimation = keyframes`
        from {
             transform: translateX(-100%);
            }
        to {
            transform: translateX(100%);
            }`;
    return (
        <Box
            sx={{
                overflow: 'visible',
                display: 'inline-flex',
                whiteSpace: 'nowrap',
                position: 'relative',
                width: '100%'
            }}
        >
            <Typography
                sx={{
                    paddingRight:'50px',
                    animation: `${scrollAnimation} ${speed}s linear infinite`,
                }}
            >
                {text}
            </Typography>
            <Typography
                 sx={{
                    paddingRight:'50px',
                    animation: `${scrollAnimation} ${speed}s linear infinite`,
                }}
            >
                {text}
            </Typography>

        </Box>
    );
};