import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, FormControlLabel, Checkbox, Autocomplete, IconButton, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { Add, Delete, ExpandMore } from "@mui/icons-material";
import axios from 'axios';
import CitySelect from "./citySelect";
import AccessibleOutlinedIcon from '@mui/icons-material/AccessibleOutlined';
import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';
import ChurchOutlinedIcon from '@mui/icons-material/ChurchOutlined';
import { useDispatch, useSelector } from "react-redux";
import { selectAdvertiser } from "../redux/advertiserSlice";
import { setList } from "../redux/apartmentSlice";

export const AddApartment = ({ isOpen, setOpen }) => {
    const [category, setCategory] = useState([]);
    const [additievs, setadditievs] = useState([]);
    const [newAddon, setNewAddon] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const advertiser = useSelector(state => state?.advertiser?.advertiser)
    const dispatch=useDispatch()
    const Apartments=useSelector(state=>state?.apartment.list)
    
    const schema = Yup.object().shape({
        name: Yup.string().required("אין דבר כזה דירה ללא שם"),
        city: Yup.string().required("באיזה עיר הדירה?"),
        description: Yup.string().required("תתאר קצת, שידעו לאיפה הם באים"),
        // category: Yup.required("חובה לבחור קטגוריה"),
        numbers_beds: Yup.number().required("מספר מיטות נדרש"),
        address: Yup.string().required("הכנס כתובת בבקשה"),
        price: Yup.string().required("נדרש לכתוב מחיר מינימלי"),
    });

    const {control, setValue, register, handleSubmit, formState: { errors }, watch } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        axios.get('http://localhost:3001/category')
            .then(response => {
                setCategory(response.data)
                getAll()
    })
            .catch(error => console.log('Error:', error));
    }, []);
    const getAll=(() => {
        axios.get('http://localhost:3001/apartment')
          .then(response => {
            dispatch(setList(response.data));
          })
          .catch(error => {
            console.log(error);
          });
});
      

    const onSubmit = (data) => {
        let addi = []
        if (data.isDati)
            addi = [...addi, 'מותאם לציבור הדתי']
        if (data.pool)
            addi = [...addi, 'בריכה']
        if (data.disabled)
            addi = [...addi, 'נגישות לנכים']
        
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.category?data.category:'');
        formData.append('city', data.city);
        formData.append('address', data.address);
        formData.append('Numbers_beds', data.numbers_beds);
        formData.append('price', data.price);
        formData.append('advertiser', advertiser?.advertiser?._id);
    
        // תוספים (additives)
        [...addi, ...additievs.map(a => a.name)].forEach((addon, index) => {
            formData.append(`additives[${index}]`, addon);
        });
    
        // תמונות
        selectedImages.forEach((imgObj, index) => {
            formData.append('img', imgObj.file);  // שימי לב: רק file ולא id
        });
    
    
        // שליחה לשרת
        axios.post('http://localhost:3001/apartment', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            console.log("הדירה הוספה בהצלחה", response.data);
            dispatch(setList(response.data.apartments));
            console.log(response.data.apartments);        
            setOpen(false);
        })
        .catch(error => console.error("שגיאה בהוספת דירה:", error));
    };

    const handleImageChange = (e) => {

        const file = e.target.files;
        if (!file) return;
        const newImages = Array.from(file).map(image => ({
            id: URL.createObjectURL(image), 
            file: image
        }));
        setSelectedImages((prev) => [...prev, ...newImages]);
    };

    const addAddon = () => {
        if (newAddon.trim() === "") return;
        setadditievs([...additievs, { id: Date.now(), name: newAddon }]);
        setNewAddon("");
    };

    const removeImage = (imageId) => {
        setSelectedImages(selectedImages.filter(img => img.id !== imageId));
    };

    const removeAddon = (id) => {
        setadditievs(additievs.filter(addon => addon.id !== id));
    };

    return (
        <Dialog open={isOpen} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle>הוספת דירה</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: 'flex', flexDirection: 'column', gap: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: 3,
                        maxWidth: 400,
                        mx: "auto",
                        my: 5,
                        p: 3,
                    }}>

                    <TextField label="שם דירה" fullWidth {...register('name')} error={!!errors.name} helperText={errors.name?.message} />

                    <TextField label="תיאור" fullWidth multiline rows={4} {...register('description')} error={!!errors.description} helperText={errors.description?.message} />

                    <Controller
                        name="city"
                        control={control}
                        render={({ field }) => <CitySelect onSelect={(city) => setValue("city", city)} />}
                    />

                    <TextField label="כתובת" fullWidth {...register('address')} error={!!errors.address} helperText={errors.address?.message} />

                    <Controller
    name="category"
    control={control}
    render={({ field }) => (
        <Autocomplete
            {...field}
            options={category}
            getOptionLabel={(option) => option.name || ''} // אם option.name הוא undefined, החזר מחרוזת ריקה

            value={category.find(cat => cat._id === field.value) || null} // קבע את ה-value לפי ה-ID
            onChange={(_, newValue) => {
                field.onChange(newValue ? newValue._id : ''); // השתמש ב-field.onChange
            }}
            renderInput={(params) => (
                <TextField {...params} label="קטגוריה" error={!!errors.category} helperText={errors.category?.message} />
            )}
        />
    )}
/>


                    <TextField label="מספר מיטות" fullWidth type="number" {...register('numbers_beds')} error={!!errors.numbers_beds} helperText={errors.numbers_beds?.message} />

                    <TextField label="מחיר" fullWidth {...register('price')} error={!!errors.price} helperText={errors.price?.message} />

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: "center" }}>
                        <FormControlLabel
                            control={<Checkbox {...register('isDati')} />}
                            label="מותאם לציבור הדתי"
                            icon={<ChurchOutlinedIcon />} checkedIcon={<ChurchOutlinedIcon />}
                        />
                        <FormControlLabel
                            control={<Checkbox {...register('disabled')} />}
                            label="נגיש לנכים"
                            icon={<AccessibleOutlinedIcon />} checkedIcon={<AccessibleOutlinedIcon />}
                        />
                        <FormControlLabel
                            control={<Checkbox {...register('pool')} />}
                            label="בריכה"
                            icon={<PoolOutlinedIcon />} checkedIcon={<PoolOutlinedIcon />}
                        />
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextField label="הוסף תוסף" variant="outlined" value={newAddon} onChange={(e) => setNewAddon(e.target.value)} fullWidth />
                        <Button onClick={addAddon} variant="contained" color="primary" startIcon={<Add />}>הוסף</Button>
                    </Box>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>רשימת תוספים ({additievs.length})</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {additievs.length === 0 ? (
                                <Typography color="textSecondary">לא נוספו תוספים עדיין</Typography>
                            ) : (
                                additievs.map((addon) => (
                                    <Box key={addon.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1, borderBottom: "1px solid #ddd" }}>
                                        <Typography>{addon.name}</Typography>
                                        <IconButton onClick={() => removeAddon(addon.id)} color="error">
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                ))
                            )}
                        </AccordionDetails>
                    </Accordion>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
                        <Button variant="contained" component="label">
                            העלאת תמונות
                            <input type="file" hidden multiple accept="image/*" onChange={handleImageChange} />
                        </Button>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {selectedImages.map((image) => (
                                <Box key={image.id} sx={{ position: "relative" }}>
                                    <img src={image.id} alt="תמונה נבחרת" width={100} height={100} style={{ borderRadius: 8 }} />
                                    <IconButton
                                        onClick={() => removeImage(image.id)}
                                        sx={{
                                            position: "absolute",
                                            top: -5,
                                            right: -5,
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                            color: "white",
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" onClick={() => setOpen(false)}>סגור</Button>
                        <Button type="submit" variant="contained" color="primary">להוסיף דירה</Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
};
