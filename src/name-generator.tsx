import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLogo from './logo';

interface Name {
  first: string;
  last: string;
}

interface Location {
  country: string;
}

interface User {
  name: Name;
  location: Location;
  dob: {
    age: number;
  };
  email: string;
}

const RandomGenerator: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [number, setNumber] = useState<number | null>(null);

  useEffect(() => {
    generateUser();
    generateNumber();
  }, []);

  const generateUser = () => {
    axios.get('https://randomuser.me/api/').then((response) => {
      const user: User = response.data.results[0];
      setUser(user);
    });
  };

  const generateNumber = () => {
    setNumber(Math.floor(Math.random() * 110000) + 32);
  };

  return (
    <div>
       <h1 className='logo-text animate__animated animate__fadeInDown'>namest.</h1>
      <h2 className='creator-content animate__animated animate__fadeInDown'>Developed by <a href="https://rmzn.netlify.app" target='_blank'>Ramazan Azimli</a></h2>
      <button onClick={() => {
        generateUser();
        generateNumber();
      }} className='animate__animated animate__fadeInDown'>Generate</button>
      <br />
      {user && (
        <div className='container animate__animated animate__fadeInUp'>
          <p>
            Name: <span className='animate__animated animate__fadeInDown'>{user.name.first} {user.name.last}</span>
          </p>
          <p>Age: <span className='animate__animated animate__fadeInDown'>{user.dob.age}</span></p>
          <p>Country: <span className='animate__animated animate__fadeInDown'>{user.location.country}</span></p>
          <p>Email: <span>{user.email}</span></p>
      {number && <p>Generate ID: <span className='animate__animated animate__fadeInDown'>{number}</span></p>}
        </div>
      )}
    </div>
  );
};

export default RandomGenerator;