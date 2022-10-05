import React, { useState } from 'react'
import axios from 'axios'
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';

import './App.css';

function App() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [repos, setRepos] = useState([])



  const handleSubmit = (e) => {
    e.preventDefault()

    if (name) {
      searchRepos();
    }
  }

  const searchRepos = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/users/${name}/repos`,
    }).then (res => {
        setLoading(false);
        setRepos(res.data);
        console.log(repos);
        
    });
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
            {loading ? "Searching..." : "Search"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
