import React, { useState } from "react";
export default function GeoLocation(){
    return{
        const [location, setLocation] = useState(0);
        findCoordinates = () => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const location = JSON.stringify(position);
        
                setLocation({ location });
              },
              (error) => Alert.alert(error.message),
              { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
          };
    }
}