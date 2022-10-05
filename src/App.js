import React, { useState, useEffect } from 'react'
import axios from 'axios'

import RepoCard from "./components/RepoCard"

import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

import './App.css';
import github from './images/github.png';

function App() {
  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [repos, setRepos] = useState([])

  useEffect(() => {
    setRepos([]);
    setOwner('')
  }, [name])


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
        setError(false)
        setLoading(false);
        setRepos(res.data);
        setOwner(res.data[0].owner.avatar_url)
        console.log(owner);
        
    }).catch((error) => {
        setLoading(false);
        setError(true)
    });
  }

  const renderRepo = (repo) => {
    return (
      <Grid item xs={12} sm= {6} md={4} lg={3} key={repo.id}>
        <RepoCard repo={repo}/>
      </Grid>
    );
  }

  return (
    <div className="page">

      <Typography
        variant="h5"
        color="textPrimary"
        gutterBottom
      >
        Search GitHub Repos
      </Typography>
      <form onSubmit={handleSubmit} noValidate autoComplete='off'>
        <TextField
          onChange={(e) => setName(e.target.value)}
          label="GitHub Username"
          variant="outlined"
          sx={{
            ".MuiOutlinedInput-root": {
              flexDirection: "row"
            },
            img: {
              paddingRight: "0.5rem"
            }
          }}
          InputProps={{
            startAdornment: (
              <img
                src={github}
                alt="GitHub Icon"
                width="30"
              />
            )
          }}
          placeholder="Enter GitHub Username"
          color="primary"
          required
          spellCheck="false"
      />
      <div className="pic">
        <img src={owner} alt="" width="100"/>
      </div>
        <br /><br />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon/>}
        >
        {loading ? "Searching..." : "Search"}
        </Button>
        <br/><br/>
        
      </form>
      <br />
      <Grid container spacing={3}>
        {(error)  ? <Alert severity="error">This user could not be found. Please try again!</Alert> 
                  : repos.map(renderRepo)
        }
      </Grid>

    </div>
  );
}

export default App;
