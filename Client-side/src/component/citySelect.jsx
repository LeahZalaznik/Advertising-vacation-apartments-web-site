import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CitySelect({ value,onSelect }) {
    const [cities, setCities] = useState([]); // רשימת כל הערים מה-API החיצוני
    const [myCities, setMyCities] = useState([]);
    const [loading, setLoading] = useState(false);

    

    useEffect(() => {
        axios.get(`http://51.20.12.20:3001/city`)
        .then(response => setMyCities(response.data))
        .catch(error => console.error("Error fetching my cities:", error));
        fetchCitiesFromAPI(); 
    }, []);

    const fetchCitiesFromAPI = async () => {
        try {
            const response = await fetch("https://api.github.com/gists/57cc6b03eefcb47e731003c109e3a67a");
            const data = await response.json();
            const file = data.files[Object.keys(data.files)[0]];
            const citiesList = JSON.parse(file.content).cities.city;
            const hebrewCities = citiesList.map(city => city.hebrew_name[0]); // שמות הערים בעברית
            setCities(hebrewCities);
        } catch (error) {
            setMyCities(myCities?.map(city => city?.name))
            console.error("Error fetching cities from API:", error);
        }
    };

    const handleCitySelect = async (event, selectedCity) => {
        if (!selectedCity) return;

        setLoading(true);
        try {
            // 1️⃣ בדיקה אם העיר קיימת במסד
            let city=myCities.find(c => c.name==selectedCity)
            if( city){
                console.log("✅ עיר קיימת:", city);
                onSelect(city.data._id);
            } 
            else {
                city = await axios.post("http://51.20.12.20:3001/city", {name:selectedCity });
                console.log("🆕 עיר נוספה למסד:", city.data);
                onSelect(city.data._id); 
            }
        } catch (error) {
            console.error("Error checking/adding city:", error);
        }
        setLoading(false);
    };

    return (
        <Autocomplete
            options={cities}
            freeSolo
            onChange={handleCitySelect}
            defaultValue={value?.name}
            renderInput={(params) => <TextField {...params} label="בחר עיר" disabled={loading} />}
        />
    );
}
