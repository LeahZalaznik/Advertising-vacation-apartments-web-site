import React, { useState } from 'react';
import emailjs from 'emailjs-com';


export const EmailModal = ({ isOpen, onClose, ToSend }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');

    if (!ToSend) {
        return <div>אין מידע על הדירה לשליחה</div>; 
    }
    const aaa=ToSend
    const ApartmentName=ToSend.name;
    const AdvertiserEmail=ToSend.emailAdvertiser;
    const contentMessage=ToSend.description;
    const handleSubmit = (event) => {
        event.preventDefault();
        emailjs.send("service_yi62c5o", "template_40wcko7", {
            to_name: userName,
            from_name: ToSend.name,
            message: contentMessage ,
            user_email: userEmail,
            reply_to: AdvertiserEmail
        }, "PvyrnLmTx3D3JJs2M")
        .then((response) => {
            console.log('Sending email with the following content:');
            console.log('To Name:', userName);
            console.log('From Name:', ApartmentName);
            console.log('Message:', contentMessage);
            console.log('User Email:', userEmail);
            console.log('Reply To:', AdvertiserEmail);
            console.log('SUCCESS!', response.status, response.text);
            onClose(); 
        }, (err) => {
            console.log('FAILED...', err);
        });
    };

    if (!isOpen) return null;
    return <>
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    value={userEmail} 
                    onChange={(e) => setUserEmail(e.target.value)} 
                    placeholder="הכנס את כתובת המייל שלך" 
                    required 
                />
                 <input 
                    type="text"  
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                    placeholder="הכנס את שמך" 
                    required 
                />
                <button type="submit">שלח מייל</button>
                <button type="button" onClick={onClose}>סגור</button>
            </form>
        </div>
        </>
    
};