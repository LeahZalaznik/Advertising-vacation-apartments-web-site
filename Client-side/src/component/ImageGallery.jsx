import { useState } from 'react';
import { Box, Grid, IconButton, Pagination } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion } from 'framer-motion';
import { PhotoSizeSelectSmall } from '@mui/icons-material';
const Gallery = ({ apartment }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const imagesPerPage = 7;
  const totalPages = Math.ceil(apartment?.img?.length / imagesPerPage);
  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % apartment.img?.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + apartment.img?.length) % apartment.img.length);
  };
  const handleDotClick = (page) => {
    setSelectedImage(page * imagesPerPage);
  };

  return (
    <Box>
      <Box sx={{ position: 'relative', textAlign: 'center', marginBottom: 2 }}>
        <img 
        src={`/pict/${apartment.name}${apartment?.img?.[selectedImage]?.substring(9 + apartment?.name.length + 1)}`} 
        alt={apartment.name} 
        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px' }} 
        />
        <IconButton onClick={prevImage} sx={{ position: 'absolute', top: '50%', left: 10, background: 'rgba(0,0,0,0.5)', color: 'white' }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton onClick={nextImage} sx={{ position: 'absolute', top: '50%', right: 10, background: 'rgba(0,0,0,0.5)', color: 'white' }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

    

      <Box display="flex" justifyContent="center" gap={1} marginBottom={2}>
        {apartment.img.slice(selectedImage, selectedImage + imagesPerPage).map((img, index) => (
          <motion.img
            key={index}
            src={`/pict/${apartment.name}${img?.substring(9 + apartment?.name.length + 1)}`}
            alt="Thumbnail"
            onClick={() => setSelectedImage(selectedImage + index)}
            style={{ width: 80, height: 80, objectFit: 'cover', cursor: 'pointer', borderRadius: '8px', border: selectedImage === (selectedImage + index) ? '2px solid #2196f3' : 'none' }}
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </Box>

      <Box display="flex" justifyContent="center" gap={0.5} marginBottom={2}>
        {Array(totalPages).fill().map((_, index) => (
          <Box 
            key={index} 
            sx={{ width: 6, height: 6, borderRadius: '50%', background: index === Math.floor(selectedImage / imagesPerPage) ? '#2196f3' : '#ccc', cursor: 'pointer', transition: 'background 0.3s' }}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </Box>
    
    </Box>
  );
};

export default Gallery;
