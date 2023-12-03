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
      console.log("Successfully added listing to database.");
      window.location.href = '/';
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

  export const getTimeAgo = (timestamp) => {
    const now = new Date().getTime();
    const then = timestamp.toMillis();
    const seconds = Math.floor((now - then) / 1000);
    if (seconds < 60) {
      return seconds + 's ago';
    }
  
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return minutes + 'min ago';
    }
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return hours + 'h ago';
    }
  
    const days = Math.floor(hours / 24);
    if (days < 31) {
      return days + 'd ago';
    }
  
    const months = Math.floor(days / 30);
    if (months < 12) {
      return months + 'mon ago';
    }
  
    const years = Math.floor(months / 12);
    return years + 'y ago';
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

  export function sortByPriceAscending(listingData) {
    return [...listingData].sort((a, b) => a.price - b.price);
  }

  export function sortByPriceDescending(listingData) {
    return [...listingData].sort((a, b) => b.price - a.price);
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
