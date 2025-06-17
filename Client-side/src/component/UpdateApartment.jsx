import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Autocomplete, IconButton } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { Add, Delete } from "@mui/icons-material";
import axios from 'axios';
import CitySelect from "./citySelect";
import { selectAdvertiser } from "../redux/advertiserSlice";
import { useDispatch, useSelector } from "react-redux";
import { setList } from "../redux/apartmentSlice";

export const UpdateApartment = ({ isOpen, setOpen, apartment }) => {
    const [categories, setCategories] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch=useDispatch()
     const advertiser = useSelector(selectAdvertiser)
     const token=advertiser.currentToken
     const headers = { 'Authorization': `Bearer ${token}` }
    const schema = Yup.object().shape({
        name: Yup.string().required("אין דבר כזה דירה ללא שם"),
        city: Yup.object().nullable().required("באיזה עיר הדירה?"),
        description: Yup.string().required("תתאר קצת, שידעו לאיפה הם באים"),
        numbers_beds: Yup.number().required("מספר מיטות נדרש"),
        address: Yup.string().required("הכנס כתובת בבקשה"),
        price: Yup.string().required("נדרש לכתוב מחיר מינימלי"),
        category: Yup.object().nullable().required("בחר קטגוריה"),
    });

    const { control, setValue, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        axios.get('http://51.20.12.20:3001/category')
            .then(response => setCategories(response.data))
            .catch(error => console.log('Error:', error));
        setValue("name", apartment.name || "");
        setValue("description", apartment.description || "");
        setValue("city", apartment.city || null);
        setValue("address", apartment.address || "");
        setValue("category", apartment.category || null);
        setValue("numbers_beds", apartment.Numbers_beds || "4");
        setValue("price", apartment.price || "");
        setSelectedImages(apartment.img || []);
        setLoading(false);
    }, [apartment]);

    const onSubmit = (data) => {
        let updatedApartment = {
            name: data.name,
            description: data.description,
            city: data.city,
            address: data.address,
            category: data.category,
            Numbers_beds: data.numbers_beds,
            price: data.price,
            img: selectedImages,
        };
console.log(advertiser);
console.log(headers);

        axios.put(`http://51.20.12.20:3001/apartment/${apartment?._id}`, updatedApartment,{headers})
            .then(response => {
                console.log("הדירה עודכנה בהצלחה:", response.data);
                dispatch(setList(response.data.apartments))
                setOpen(false);
            })
            .catch(error => console.error("שגיאה בעדכון דירה:", error));
    };

    const handleImageChange = (e) => {
        const file = e.target.files;
        if (!file) return;
        const newImages = Array.from(file).map(image => ({
            id: URL.createObjectURL(image), file
        }));
        setSelectedImages((prev) => [...prev, ...newImages]);
    };

    const removeImage = (imageId) => {
        setSelectedImages(selectedImages.filter(img => img.id !== imageId));
    };

    if (loading) return null;

    return (
        <Dialog open={isOpen} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle>עדכון דירה</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
                    <TextField label="שם דירה" fullWidth {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
                    <TextField label="תיאור" fullWidth multiline rows={4} {...register('description')} error={!!errors.description} helperText={errors.description?.message} />

                    <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                            <CitySelect value={field.value} onSelect={(city) => setValue("city", city)} />
                        )}
                    />

                    <TextField label="כתובת" fullWidth {...register('address')} error={!!errors.address} helperText={errors.address?.message} />

                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                options={categories}
                                getOptionLabel={(option) => option.name || '-'}
                                onChange={(_, newValue) => setValue("category", newValue)}
                                renderInput={(params) => (
                                    <TextField {...params} label="קטגוריה" error={!!errors.category} helperText={errors.category?.message} />
                                )}
                            />
                        )}
                    />
                    <TextField label="מספר מיטות" fullWidth type="number" name="numbers_beds"{...register('numbers_beds')} error={!!errors.numbers_beds} helperText={errors.numbers_beds?.message} />
                    <TextField key={apartment.id} label="מחיר" fullWidth name="price" {...register('price')} error={!!errors.price} helperText={errors.price?.message} />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        {selectedImages.map((image, index) => (
                            <Box key={image.id} sx={{ position: "relative" }}>
                                <img key={image.id} src={`/pict/${apartment.name}${image?.id ? image.id : image?.substring(9 + apartment?.name.length + 1)}`} alt="תמונה" width={100} height={100} style={{ borderRadius: 8 }} />
                                <IconButton onClick={() => removeImage(image.id)} color="error">
                                    <Delete />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                    <Button variant="contained" component="label" startIcon={<Add />}>
                        הוסף תמונות
                        <input type="file" multiple hidden onChange={handleImageChange} />
                    </Button>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" onClick={() => setOpen(false)}>סגור</Button>
                        <Button type="submit" variant="contained" color="primary">עדכן דירה</Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
