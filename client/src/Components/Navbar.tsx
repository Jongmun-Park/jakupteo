import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import React, { FunctionComponent, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import SignUp from './User/SignUp'
import Login from './User/Login'

const useStyles = makeStyles(() => ({
  container: {
    height: '60px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  headerLogo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '20px'
  },
  headerLogoFont: {
    color: '#722F37',
    fontWeight: 900,
    fontSize: 'large',
  },
  headerButtons: {
    width: '400px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '20px',
  },
  searchBox: {},
}))

const IS_LOGIN = gql`
  {
    currentUser {
      id
      username
    }
  }
`

const NavBar: FunctionComponent = () => {
  const classes = useStyles({})
  const [signUpOpen, setSignUpOpen] = useState(false)
  const [logInOpen, setLogInOpen] = useState(false)
  const { data, error } = useQuery(IS_LOGIN)

  if (error) {
    console.error(error.message)
    return <p>Something is wrong</p>
  }

  const signUpClickOpen = () => {
    setSignUpOpen(true)
  }

  const logInClickOpen = () => {
    setLogInOpen(true)
  }

  return (
    <header>
      <nav className={classes.container}>
        <div className={classes.headerLogo}>
          <Button href="/" className={classes.headerLogoFont}>JAKUPSIL</Button>
        </div>
        <div className={classes.searchBox}></div>
        <div className={classes.headerButtons}>
          <Button href="/art">ART</Button>
          <Button href="/artist">ARTIST</Button>
          {!data?.currentUser ? (
            <div>
              <Button variant="outlined" onClick={logInClickOpen}>
                LOG IN
              </Button>
              <Button
                variant="outlined"
                onClick={signUpClickOpen}
                style={{ marginLeft: '15px' }}
              >
                SIGN UP
              </Button>
              {signUpOpen && <SignUp openDialog={signUpOpen} handleOpenDialog={setSignUpOpen} />}
              {logInOpen && <Login openDialog={logInOpen} handleOpenDialog={setLogInOpen} />}
            </div>
          ) : (
            <div>
              <Button variant="outlined" href="/upload-post">
                LOG OUT
              </Button>
              {/* <Button variant="outlined" href="/upload-post">
                UPLOAD
              </Button> */}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default NavBar
