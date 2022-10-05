import React, { useState, useEffect } from 'react'
import axios from 'axios'

import RepoDetails from "./RepoDetails";

import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';

import './App.css';

function App() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [repos, setRepos] = useState([])
  const [details, setDetails] = useState({})
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    setRepos([]);
    setDetails({});
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
    });
  }

  const renderRepo = (repo) => {
    return (
      <div className="row" onClick={() => getDetails(repo.name)} key={repo.id}>
        <h2 className="rep-name">
          {repo.name}
        </h2>
      </div>
    );
  }

  const getDetails = (repoName) => {
    setDetailsLoading(true)
    axios({
      method: "get",
      url: `https://api.github.com/repos/${name}/${repoName}`,
    }).then (res => {
        setDetailsLoading(false);
        setDetails(res.data);      
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
          <div className="results-container">
            {repos.map(renderRepo)}
          </div>
        </div>
        <RepoDetails details={details} loading={detailsLoading} />
      </div>
    </div>
  );
}

export default App;
