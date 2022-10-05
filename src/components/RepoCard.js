import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from '@mui/material';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import Link from '@mui/material/Link';

export default function RepoCard({repo, getDetails}) {
  return (
    <div> 
        <Card elevation={3}>
            <CardHeader
                action={
                    <IconButton onClick={() => getDetails(repo.name)}>
                      <CheckCircleOutlined />
                    </IconButton>
                }
                title={
                    <Typography gutterBottom variant="overline" component="h2">
                       {repo.name}
                    </Typography>
                 }
                
            />
            <CardContent>
                <Typography noWrap>
                    <Link target="_blank" rel="noopener" underline="hover" href={repo.html_url}>{repo.html_url}
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    </div>
  )
}
