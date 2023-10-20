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

export async function getListingDataFromDatabase() {
    const listingsCollection = collection(db, 'listings');
    try {
      const listingData = await getDocs(listingsCollection);

      const filteredData = listingData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
        return filteredData;
    } catch (error) {
      console.error("Error fetching listing data, " + error);
    }
  };

  export function sortByDate(listingData) {
    return listingData.sort(function(a, b) {
      var aSeconds = a.date.seconds;
      var bSeconds = b.date.seconds;
      var aNanoseconds = a.date.nanoseconds;
      var bNanoseconds = b.date.nanoseconds;
  
      if (aSeconds > bSeconds) {
        return -1;
      } else if (aSeconds < bSeconds) {
        return 1;
      } else {
        if (aNanoseconds > bNanoseconds) {
          return -1;
        } else if (aNanoseconds < bNanoseconds) {
          return 1;
        } else {
          return 0;
        }
      }
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