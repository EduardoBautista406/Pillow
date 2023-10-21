import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, doc, getDoc } from '../../firebase';
import { MAPS_API_KEY } from '../../Backend/api_key';


export async function addUserDataToDatabase(userData, housingData, imageUrl) {
    const listingsCollection = collection(db, 'listings');

    // Convert current date to a string in the format "m/dd/yyyy"
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    // const dateString = `${month}/${day}/${year}`;

    await addDoc(listingsCollection, {
        address: housingData.address1,
        line2: housingData.address2,
        date: serverTimestamp(),
        description: housingData.review,
        image: imageUrl,
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

  export function getListingById(listingId) {
    const docRef = doc(db, 'listings', listingId);
    try {
        const listingData = getDoc(docRef);    
        return listingData;
    } catch (error) {
        console.error("Error fetching listing data, " + error);
    }
  }

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

  export async function getAddressImage(address) {
    const GEOCODING_ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${MAPS_API_KEY}`;
  
    const response = await fetch(GEOCODING_ENDPOINT);
    const data = await response.json();
  
    if (data.results && data.results[0] && data.results[0].geometry && data.results[0].geometry.location) {
      const { lat, lng } = data.results[0].geometry.location;
  
      // Construct the Street View URL
      const STREET_VIEW_ENDPOINT = `https://maps.googleapis.com/maps/api/streetview?size=600x600&location=${lat},${lng}&key=${MAPS_API_KEY}`;
      
      return STREET_VIEW_ENDPOINT; // This URL will display the image for the given address
    } else {
      throw new Error("Unable to retrieve image for the given address.");
    }
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