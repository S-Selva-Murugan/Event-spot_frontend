import * as React from 'react';
import { memo } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
import "./Card.css"

 function CarouselCatCard({
  categoryId,
  events,
  name
}) {
  return (
    <Link style={{marginTop:"10%"}} to={`/category/${categoryId}/${name}`}>
    <Card
      className='Card'
    sx={{ borderRadius: '50%', height: 140, width: 140, margin: 'auto' }}>
    <CardMedia
        sx={{ height: 140}}
        image="https://imgs.search.brave.com/7B_Rw2oRq-eDjTBRVXv_BfL837_QifLp9xtgaybt_lE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudGVtcGxhdGUu/bmV0L3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE3LzAxLzI1MTY0/MTEzL0Fic3RyYWN0/LUJsYWNrLWFuZC1X/aGl0ZS1Mb2dvLmpw/Zw"

    />
      <CardContent>


      </CardContent>

    </Card>
    <Typography gutterBottom variant="h6" component="div" sx={{marginLeft:"7%",fontStyle:"oblique"}}>
          {name}
        </Typography>
    </Link>
  );

  }

  export default memo(CarouselCatCard)
