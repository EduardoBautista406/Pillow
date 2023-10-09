import React, { useState, useEffect } from 'react';
import { Image, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, storage, db, uploadString, ref, getDownloadURL } from '../../firebase';

export default function ListingsBackend() {
  const [listingList, setListingList] = useState([]);
  const [rating, setRating] = useState(1);
  const [listingLine1, setListingLine1] = useState('');
  const [listingLine2, setListingLine2] = useState('');
  const [listingCity, setListingCity] = useState('');
  const [listingState, setListingState] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [preferencesInput, setPreferencesInput] = useState('');
  const [listingZip, setListingZip] = useState('');
  const [furnishedInput, setFurnishedInput] = useState(false);
  const [washerInput, setWasherInput] = useState(false);

  const [listingAddress, setListingAddress] = useState('');

  const [searchDishTerm, setSearchDishTerm] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);

  const [isAddressError, setAddressError] = useState(false);
  const [isDescriptionError, setDescriptionError] = useState(false);
  const [isReviewError, setIsReviewError] = useState(false);
  const [isPhotoError, setIsPhotoError] = useState(false);

  const navigation = useNavigation();
  const listingCollections = collection(db, 'listings');
  const addressCollection = collection(db, 'Address');
  var dishId;

  

  useEffect(() => {
    const getListings = async () => {
      try {
        const addressData = await getDocs(addressCollection);
        const filteredListingData = addressData.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name
        }));
        console.log(filteredListingData);
        setListingList(filteredListingData);
      } catch (error) {
        console.error(error);
      }
    };
    getListings();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePost = () => {
    setAddressError(listingAddress === '');
    setIsPhotoError(selectedImage === null);

    // check if review is under 100 characters
    setDescriptionError(descriptionInput.length < 100);

    if (listingAddress === '' || searchDishTerm === '' || descriptionInput === '') {
      return;
    }

    // Send data to reviews database
    addListing();

    // Go back to previous screen
    navigation.goBack();
  };

  const addListing = async () => {
    const listingsCollection = collection(db, 'listings');
  
    // If there is no address with the same name, create one with a name and an id, save the id, returns an error if there's a duplicate
    let addressId;
    let listingInput = listingLine1.toLowerCase() + ", " + listingLine2.toLowerCase() + ", " + listingCity.toLowerCase() + ", " + listingState.toLowerCase() + ", " + listingZip;
    const existingAddress = listingList.find((address) => address.line1.toLowerCase() + ", " + address.line2.toLowerCase() + ", " + address.city.toLowerCase() + ", " + address.state.toLowerCase() + ", " + address.zip === listingInput);
    if (!existingAddress) {
      const newAddressRef = await addDoc(addressCollection, { city: listingCity, line1: listingLine1, line2: listingLine2, state: listingState, zip: listingZip });
      addressId = newAddressRef.id;
    } else {
      setAddressError(true);
      //addressId = existingAddress.id;
    }
    
    // Convert current date to a string in the format "m/dd/yyyy"
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const imageUrl = await uploadImage();
    // Save the review with the date, dish id as dish, rating, text, and curr user email as user
    await addDoc(listingsCollection, {
      address: addressId,
      date: serverTimestamp(),
      description: descriptionInput,
      furnished: furnishedInput,
      hasWasher: washerInput,
      image: imageUrl,
      preferences: preferencesInput,
      price: priceInput,
      user: auth.currentUser.email,
    });
  
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const uploadImage = async () => {
    console.log(selectedImage);
    if (!selectedImage) {
      return '';
    }
    const filename = selectedImage.substring(selectedImage.lastIndexOf('/') + 1);
    const storageRef = ref(storage, dishId + '/' + filename);


    await uploadString(storageRef, selectedImage).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    //set transferred state

    const url = await getDownloadURL(storageRef, selectedImage);
    return url;
};

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
          <TouchableOpacity onPress={handleGoBack}>
            <Ionicons name="close" size={36} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Create review</Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>
      <FlatList
        style={{ width: '100%' }}
        ListHeaderComponent={
          <>
            {/*Restaurant*/}
            <View style={styles.dishContainer}>
              <Text style={styles.text}>Address</Text>
              <TextInput
                style={styles.input} 
                onChangeText={text => setListingLine1(text)}
                value={listingLine1}
                placeholder="Line 1"
              />
              <TextInput
                style={styles.input} 
                onChangeText={text => setListingLine2(text)}
                value={listingLine2}
                placeholder="Line 2"
              />
              <TextInput
                style={styles.input} 
                onChangeText={text => setListingCity(text)}
                value={listingCity}
                placeholder="City"
              />
              <TextInput
                style={styles.input} 
                onChangeText={text => setListingState(text)}
                value={listingState}
                placeholder="State"
              />
              <TextInput
                style={styles.input} 
                onChangeText={text => setListingZ(text)}
                value={listingState}
                placeholder="State"
              />
              <TextInput
                style={styles.input} 
                onChangeText={text => setListingZip(text)}
                value={listingZip}
                placeholder="Zip"
              />
              {isAddressError && <Text style={styles.errorText}>Please enter an address</Text>}
            </View>
            {/*Dish*/}
            <View style={styles.dishContainer}>
              <Text style={styles.text}>Price</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setPriceInput(text)}
                value={priceInput}
                placeholder="Rent per month"
              />
              {isDescriptionError && <Text style={styles.errorText}>please enter price</Text>}
            </View>
            {/*Rating*/}
            {/*Review*/}
            <View style={styles.dishContainer}>
              <Text style={styles.text}>Description</Text>
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Add a description"
                onChangeText={text => setDescriptionInput(text)}
                value={descriptionInput}
                multiline={true}
                numberOfLines={6}
              />
            </View>
            {isDescriptionError && <Text style={styles.errorText}>You must include a review that is less than 40 characters</Text>}
            {/*Image*/}
            <View style={styles.dishContainer}>
              <Text style={styles.text}>Image (optional)</Text>
              <TouchableOpacity style={{padding: 10}} onPress={pickImage}>    
                {selectedImage ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />  
                    <TouchableOpacity onPress={() => setSelectedImage('')}>
                      <Ionicons name="trash-bin" size={30} color="#727272" style={{ padding: 10}} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ backgroundColor: '#ccc', width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="add" size={30} color="#fff" />
                  </View>
                )}      
              </TouchableOpacity>
            </View>
            {isPhotoError && <Text style={styles.errorText}>You must upload an image</Text>}

          </>
        }
        data={[]}
        renderItem={({ item }) => null}
        ListFooterComponent={
          <TouchableOpacity style={styles.addButton} onPress={handlePost}>
            <Text style={styles.buttonText}>Post review</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    backgroundColor: '#fff',
    borderColor: '#f2f2f2',
    borderWidth: 1,
    justifyContent: 'flex-end',
    height: 100,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  autocomplete: {
    backgroundColor: '#fff',
    zIndex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  autocompleteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  descriptionInput: {
    height: 80,
  },
  addButton: {
    backgroundColor: "#9ABC06",
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc',
    padding: 10,
  },
  ratingStarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dishContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    zIndex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  autocompleteContainer: {
    backgroundColor: 'black',
    width: '100%',
    height: 50,
    zIndex: 1,
  },
  autocompleteInputContainer: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 0,
    margin: 0,
  },
  dropdownItemContainer: {
    backgroundColor: "white",
    borderRadius: 5,
  },
  dropdownItem: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: 5, 
    marginBottom: 5, 
    backgroundColor: '#9ABC06', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 20 
  },
  dropdownText: {
    color: "#FFF", 
    fontSize: 15, 
    fontWeight: "bold"
  },
  errorText: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },

});

