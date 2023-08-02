import { useState, useEffect } from 'react'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BreedMenu() {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    getBreeds();
  }, []);



  const getBreeds = async () => {
    try {
      const response = await fetch(`/api/breeds`, {
        method: "GET",
      });
      const data = await response.json();
      setBreeds(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
   <>
   
    <div className='side-menu'>
    <Typography variant='h6'>
    Explore Breed Forums
   </Typography>
      <ul>
        {breeds.slice(0, -2).map((breed, i) => (
          <li key={i}>
            <Link to={`/${breed.id}`} style={{ color: 'black' }}>
              {breed.breed}
              </Link>
            </li>
        ))}
      </ul>
    </div>
    </>
  )
}
