import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { MemoizedPoster } from '../../Components/Art/Poster'
import FilterContainer from '../../Components/Art/FilterContainer'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
  leftSideBar: {
    color: theme.palette.lightBlack.main,
    margin: '50px 0px 50px 0px',
    minWidth: '283px',
    '@media (max-width: 823px)': {
      display: 'none',
      margin: '10px 0px 10px 0px',
    },
  },
  posters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 252px)',
    gridGap: '18px',
    justifyContent: 'center',
    marginBottom: '32px',
    '@media (max-width: 823px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(157px, auto))',
      margin: '20px 10px 20px 10px',
      gridGap: '10px',
    },
  },
  contentSection: {
    width: '100%',
    margin: '50px 0px 50px 0px',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 823px)': {
      margin: '10px 0px 10px 0px',
    },
  },
  loadMoreButton: {
    fontWeight: 'bold',
  },
  filterContainer: {
    boxSizing: 'border-box',
    minWidth: '283px',
    paddingLeft: '20px',
    position: 'fixed',
    zIndex: 1,
    overflowX: 'scroll',
  },
}))

interface ArtListPresenterProps {
  arts: Array<any>
  handleLoadMore: () => void
}

const ArtListPresenter: FC<ArtListPresenterProps> = ({ arts, handleLoadMore }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.leftSideBar}>
        <div className={classes.filterContainer}>
          <FilterContainer />
        </div>
      </div>
      <div className={classes.contentSection}>
        <div className={classes.posters}>
          {arts.map((art) => (
            <MemoizedPoster
              key={art.id}
              id={art.id}
              artistId={art.artist.id}
              name={art.name}
              width={art.width}
              height={art.height}
              artistName={art.artist.artistName}
              saleStatus={art.saleStatus}
              price={art.price}
              representativeImageUrl={art.representativeImageUrl}
            />
          ))}
        </div>
        <Button className={classes.loadMoreButton} onClick={handleLoadMore}>
          더 보기
        </Button>
      </div>
    </div>
  )
}

export default ArtListPresenter
