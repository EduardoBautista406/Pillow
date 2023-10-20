import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, storage, db, uploadString, ref, getDownloadURL } from '../../firebase';


export async function addUserDataToDatabase(userData, housingData) {
    const listingsCollection = collection(db, 'listings');

    // Convert current date to a string in the format "m/dd/yyyy"
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const dateString = `${month}/${day}/${year}`;

    await addDoc(listingsCollection, {
        address: housingData.address1 + ' ' + housingData.address2,
        date: serverTimestamp(),
        description: housingData.review,
        image: "null",
        preferences: housingData.gender,
        price: housingData.price,
        sqft: housingData.sqft,
        bedrooms: housingData.beds,
        bathrooms: housingData.baths,
        user: userData.email,
      });    
}

/*
    try {
        const response = await fetch('https://your-api-endpoint.com/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
    */