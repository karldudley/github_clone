import React, { useState } from 'react'

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton, Typography } from '@mui/material';
import Link from '@mui/material/Link';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export default function RepoCard({repo}) {
    const [expanded, setExpanded] = React.useState(false);
    const [liked, setLiked] = useState(false)
    let date = new Date(repo.created_at)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }} elevation={3}>
            <CardHeader 
                align="center"
                title={
                    <Typography noWrap variant="overline">
                        {repo.name.replaceAll(/[-_]/g, ' ')}
                    </Typography>
                 }
            />
            <CardActions disableSpacing>
                {liked 
                ?
                    <IconButton color="error" aria-label="add to favorites" onClick={() => setLiked(!liked)}>
                        <FavoriteIcon />
                    </IconButton>
                :
                    <IconButton aria-label="add to favorites" onClick={() => setLiked(!liked)}>
                        <FavoriteIcon />
                    </IconButton>
                }
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Forks: {repo.forks}</Typography>
                    <Typography paragraph>Stars: {repo.stargazers_count}</Typography>
                    <Typography paragraph>Language: {repo.language}</Typography>
                    <Typography paragraph>Created on: {date.toDateString()}</Typography>
                    <Typography noWrap>
                        GitHub Link: <Link target="_blank" rel="noopener" underline="hover" href={repo.html_url}>{repo.html_url}</Link>
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}
