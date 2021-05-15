import React, { memo, FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Chip, Paper, Typography, ButtonBase } from '@material-ui/core'
import { ArtistCategory } from '../../types'
import { translateArtistCategory } from '../../utils'
import Like from './Like'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '0 15px 15px 15px',
    borderRadius: '20px',
    '@media (max-width: 834px)': {
      padding: '0 11px 11px 11px',
    },
  },
  buttonBase: {
    height: '200px',
    '@media (max-width: 834px)': {
      height: '140px',
    },
  },
  image: {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
    borderRadius: '20px',
    '@media (max-width: 834px)': {
      maxHeight: '140px',
    },
  },
  head: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '11px',
    '@media (max-width: 834px)': {
      marginBottom: '9px',
    },
  },
  headText: {
    display: 'flex',
    flexDirection: 'column',
  },
  realNameBox: {
    width: '103px',
    '@media (max-width: 834px)': {
      width: '70px',
    },
  },
  realName: {
    display: 'inline',
    color: theme.palette.lightBlack.main,
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '1px',
    '@media (max-width: 834px)': {
      fontSize: '11px',
    },
  },
  artistName: {
    maxWidth: '103px',
    fontSize: '11px',
    marginBottom: '5px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '@media (max-width: 834px)': {
      fontSize: '10px',
      maxWidth: '70px',
    },
  },
  largeAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    alignSelf: 'center',
    '@media (max-width: 834px)': {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  },
  chipLable: {
    width: '43px',
    height: '18px',
    fontSize: '10px',
  },
  like: {
    cursor: 'pointer',
    color: theme.palette.lightBlack.main,
    position: 'relative',
    top: '10px',
    left: '-1px',
    '& .MuiSvgIcon-root': {
      fontSize: '19px',
      '@media (max-width: 834px)': {
        fontSize: '1.1rem',
      },
    },
  },
}))

interface ArtistPosterProps {
  id: number
  artistName: string
  realName: string
  thumbnailUrl: string
  representativeWorkUrl: string
  category: ArtistCategory
}

const Poster: FC<ArtistPosterProps> = ({
  id,
  artistName,
  realName,
  thumbnailUrl,
  representativeWorkUrl,
  category,
}) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper} elevation={2}>
      <span className={classes.like}>
        <Like artistId={id} />
      </span>
      <div className={classes.head}>
        <Avatar alt="작가 프로필 사진" className={classes.largeAvatar} src={thumbnailUrl} />
        <div className={classes.headText}>
          <Typography
            className={classes.realName}
            variant="subtitle1"
            onClick={() => {
              window.open('/artist/' + id)
            }}
          >
            {realName}
          </Typography>
          <Typography className={classes.artistName} variant="body2">
            {artistName}
          </Typography>
          <Chip
            className={classes.chipLable}
            size="small"
            label={translateArtistCategory(category)}
          />
        </div>
      </div>
      <ButtonBase
        className={classes.buttonBase}
        onClick={() => {
          window.open('/artist/' + id)
        }}
      >
        <img alt="작가의 대표 작품 이미지" className={classes.image} src={representativeWorkUrl} />
      </ButtonBase>
    </Paper>
  )
}

export const MemoizedPoster = memo(Poster)
export default Poster
