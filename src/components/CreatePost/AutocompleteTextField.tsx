import React, { useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';

interface Props {
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  label?: string;
  fullWidth?: boolean;
  autoComplete?: string;
  variant?: 'standard' | 'filled' | 'outlined';
}

const AutocompleteTextField: React.FC<Props> = ({ onPlaceSelected, onChange, value, error, required, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const clevelandBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(41.390150, -81.878399), // southwest corner
    new google.maps.LatLng(41.602058, -81.545192)  // northeast corner
  );

  useEffect(() => {
    if (!inputRef.current) return;
    if (autocompleteRef.current) return;  
    
    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'], // restrict results to addresses
        bounds: clevelandBounds, // restrict results to Cleveland
        strictBounds: true,
    });
    autocompleteRef.current = autocomplete;

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      onPlaceSelected && onPlaceSelected(place);
    });

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
      autocompleteRef.current = null;
    };
  }, []);

  return (
    <TextField 
      {...props}
      required={required}
      inputRef={inputRef}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
};

export default AutocompleteTextField;