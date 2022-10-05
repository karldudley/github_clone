import React, { useState, useEffect } from 'react'
import axios from 'axios'

import RepoCard from "./components/RepoCard"

import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import './App.css';

function App() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [repos, setRepos] = useState([])

  useEffect(() => {
    setRepos([]);
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
        setLoading(false);
        setRepos(res.data);
        console.log(repos)    
    });
  }

  const renderRepo = (repo) => {
    return (
      <Grid item xs={12} md={6} lg={4} key={repo.id}>
        <RepoCard repo={repo}/>
      </Grid>
    );
  }

  return (
        <div className="page">
          <Typography
            variant="h6"
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
              color="primary"
              required
            />
            <br /><br />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<KeyboardArrowRightIcon/>}
            >
            {loading ? "Searching..." : "Search"}
            </Button>
          </form>
          <Container>
            <Grid container spacing={3}>
              {repos.map(renderRepo)}
            </Grid>
          </Container>
        </div>


  );
}

export default App;
