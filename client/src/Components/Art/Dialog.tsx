import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core/'
import { Close } from '@material-ui/icons'
import ArtDetail from './ArtDetail'

const useStyles = makeStyles({
  dialog: {
    '& .MuiDialog-paperWidthSm': {
      width: '95%',
      maxWidth: 'none',
      '@media (min-width: 1024px)': {
        width: '80%',
      },
    },
    '& .MuiDialog-paper': {
      margin: '0',
    },
    '& .MuiDialogContent-dividers': {
      borderTop: 'none',
    },
    '& h2': {
      display: 'flex',
      justifyContent: 'space-between',
      '@media (max-width: 834px)': {
        fontSize: '1rem',
      },
    },
    '& .MuiIconButton-root': {
      padding: '0',
    },
  },
})

interface ArtDialogProps {
  openDialog: boolean
  setOpenDialog: (arg0: boolean) => void
  artId: number
  artName: string
}

const ArtDialog: FC<ArtDialogProps> = ({ openDialog, setOpenDialog, artId, artName }) => {
  const classes = useStyles()
  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <Dialog
      className={classes.dialog}
      open={openDialog}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="art-dialog-title"
    >
      <DialogTitle id="art-dialog-title">
        <span>{artName}</span>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>
        <ArtDetail artId={artId} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          닫 기
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ArtDialog
