import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from '@mui/material';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';

export default function RepoCard({repo, getDetails}) {
  return (
    <div> 
        <Card elevation={2}>
            <CardHeader
                action={
                    <IconButton onClick={() => getDetails(repo.name)}>
                      <CheckCircleOutlined />
                    </IconButton>
                }
                title={
                    <Typography gutterBottom variant="h6" component="h2">
                       {repo.name}
                    </Typography>
                 }
                
            />
            <CardContent>
                <Typography>
                    {repo.url}
                </Typography>
            </CardContent>
        </Card>
    </div>
  )
}
