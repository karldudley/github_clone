import React, { useState } from 'react'
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';

import './App.css';

function App() {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name) {
      console.log(name);
      
    }
  }

  return (
    <div className="page">
      <div className="landing-page-container">
        <div className="left-side">
          <Typography
            variant="h6"
            color="textPrimary"
            gutterBottom
          >
            GitHub Repos
          </Typography>
          <form onSubmit={handleSubmit} noValidate autoComplete='off'>
            <TextField
              onChange={(e) => setName(e.target.value)}
              label="GitHub Username"
              variant="outlined"
              color="primary"
              required
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<KeyboardArrowRightIcon/>}
            >
            Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
