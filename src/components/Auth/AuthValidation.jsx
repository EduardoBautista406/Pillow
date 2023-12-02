import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const AuthValidation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        navigate("/login"); 
      }
    });
    return unsubscribe;
  }, [navigate]);
};

export default AuthValidation;
