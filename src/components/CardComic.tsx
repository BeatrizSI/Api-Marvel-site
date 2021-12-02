import React, { useState } from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IComic } from '../interfaces/comics'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface props {
  comic: IComic
}

const CardComic = ({ comic }: props) => {

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const handleClose = () => {
    setIsOpenDialog(false);
  };

  if (isOpenDialog) {
    return (

      <div>
        <Dialog
          open={isOpenDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">

            {`#${comic.id}=${comic.title}`}
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {comic.description}
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              /><br />
            </DialogContentText>

          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Fechar</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        // height="200"
        image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {comic.title}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => { setIsOpenDialog(true) }}>Exibir Detalhes</Button>
      </CardActions>
    </Card>

  );
}

export default CardComic;