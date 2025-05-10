import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListCard } from "./ListCard";
import { useLocation } from "react-router";
import { Button } from "@mui/material";
import { AddApartment } from "./addApartment";
import { selectAdvertiser } from "../redux/advertiserSlice";

export const Advertiser = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    const advertiser = location.state;
    const AAdver = useSelector(selectAdvertiser);
    const headers = { 'Authorization': `Bearer ${advertiser?.token}` };
    const [list, setList] = useState([]);
    const [addApartment, showAddApartment] = useState(false);
    const apartment = useSelector(state => state.apartment.list);
    const [apartments, setApartments] = useState([]);

    useEffect(() => {
        if (advertiser?.advertiser?._id) {
            axios.get(`http://localhost:3001/apartment/ByAdvertiser/${advertiser.advertiser._id}`, { headers })
                .then(response => {
                    if (JSON.stringify(response.data) !== JSON.stringify(list)) {
                        setList(response.data);
                    }
                })
                .catch(err => {
                    console.error(err);
                    setList([]);
                });
        }
    }, [advertiser]); 

    useEffect(() => {
        if (Array.isArray(apartment) && Array.isArray(list)) {
            setApartments(apartment.filter(ap =>advertiser?.advertiser?._id === ap?.advertiser?._id));
        } else {
            setApartments(list);
        }
    }, [list, apartment,setApartments]); 

    return (
        <>
        
            <Button onClick={() => showAddApartment(true)}>הוספת דירה</Button>
            <AddApartment  isOpen={addApartment} setOpen={showAddApartment} />
            {list.length > 0 ? (
                <ListCard apartments={apartments} setApartments={setApartments} type={1} />
            ) : (
                <p>לא נמצאו דירות.</p>
            )}
        </>
    );
};
