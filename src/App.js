import React, { useState, useEffect } from 'react'
import axios from 'axios'

import RepoCard from "./components/RepoCard"

import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Masonry from 'react-masonry-css'

import './App.css';
import github from './images/github.png';

function App() {
  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [ownerUrl, setOwnerUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [repos, setRepos] = useState([])

  const breakpoints = {
    default: 4,
    1500: 3,
    1100: 2,
    700: 1
  }

  useEffect(() => {
    setRepos([]);
    setOwner('')
    setOwnerUrl('')
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
        setOwnerUrl(res.data[0].owner.html_url)
        
    }).catch((error) => {
        setLoading(false);
        setError(true)
    });
  }

  const renderRepo = (repo) => {
    return (
      <div key={repo.id}>
        <RepoCard repo={repo}/>
      </div>
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
          style = {{width: 230}}
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
          placeholder="Enter Username"
          color="primary"
          required
          spellCheck="false"
      />
      <div className="pic">
        <a href={ownerUrl} target="blank">
          <img src={owner} alt="" width="100"/>
        </a>
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
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {(error)  ? <Alert severity="error">This username could not be found.</Alert> 
                  : repos.map(renderRepo)
        }
      </Masonry>

      </div>
  );
}

export default App;
