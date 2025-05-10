import { Box } from "@mui/material";
import { CardApartment } from "./CardApartment1";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export const ListCard = ({apartments, setApartments, type }) => {
  const apartment = useSelector(state => state.apartment.list);
  return (
    <div>{Array.isArray(apartments) && apartments.length > 0 ? (
      apartments.map((apartment, index) => (
        <CardApartment setApartments={setApartments} apartment={apartment} key={index} type={type} />
      ))
    ) : (
      <p>לא נמצאו דירות.</p>
    )}
    </div>
  );
};