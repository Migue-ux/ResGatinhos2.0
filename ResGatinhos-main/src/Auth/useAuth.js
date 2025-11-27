
import { useState } from 'react';


const MOCK_USER = {
  id: "user-123",
  name: "Camila Medeiros", 
  email: "camila@resgatinhos.com",
};

export function useAuth() {
  
  const [user] = useState(MOCK_USER); 

  
  return {
    user: user,
    isLoggedIn: !!user,
    
  };
}