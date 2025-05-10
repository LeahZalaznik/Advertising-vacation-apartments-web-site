import axios from "axios"

export const getWeather = async (city) => {
    try {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WHATHER_KEY_API}&lang=he&units=metric`);
        console.log(data);
        if (data) {
            return {
                id: data.weather[0]?.id,
                temp: data.main?.temp.toFixed(1), 
                city: data.name,                
                desc: data.weather[0]?.description ,
                icon:data.weather[0]?.icon

            };
        }
        
    } catch (err) {
        console.error("שגיאה בשליפת מזג האוויר:", err.message);
        return { error: "לא נמצאו נתונים לעיר זו" };
    }
};
