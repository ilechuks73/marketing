import React, { useState, useEffect } from 'react'
import { Container, Card, Box, Typography, Button, Checkbox } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import {CustomInput, PasswordInputs} from '../../components/Basic/CustomInput';
import { indigo } from '@material-ui/core/colors'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/marketerAction'


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        backgroundColor: '#C4C4C41A',
        width: '100%',
        minHeight: '110vh',
        position: 'relative'
    },
    loginCard: {
        position: 'absolute',
        top: '7rem',
        marignBottom: '4rem',
        left: '30%',
        right: '30%',
        width: '40%',
        minHeight: '80%',
        borderRadius: '5%'
    },
    loginCardS: {
        position: 'absolute',
        top: '7rem',
        marignBottom: '4rem',
        left: '20%',
        right: '20%',
        width: '60%',
        minHeight: '80%',
        borderRadius: '5%'
    },
    loginCardXs: {
        position: 'absolute',
        top: '7rem',
        marignBottom: '4rem',
        left: '10%',
        right: '10%',
        width: '80%',
        minHeight: '80%',
        borderRadius: '5%'
    },
    headText: {
        font: 'inter',
        paddingTop: '2rem',
        paddingLeft: '1rem'
    },
    buttons: {
        paddingTop: '2rem',
        textAlign: 'center'
    },
    buttons1: {
        paddingTop: '2rem',
        display: 'flex'
    },
    btn: {
        textTransform: 'inherit',
        backgroundColor: '#F6F6F6',
        fontWeight: 'bold'
    },
    icon: {
        color: '#6056D7'
    },
    form: {
        marginTop: '2rem'
    },
    field: {
        marginTop: '1rem',
        marginBottom: '1rem',
        background: '#F6F6F6'

    },
    check: {
        display: 'flex',
        flexDirection: 'row'
    },
    toggleParent: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row'
    },
    loginBtn: {
        width: '15rem',
        margin: '1rem 0 0 0'
    },
    active: {
        border: '1px solid #6056D7',
        textTransform: 'inherit',
        backgroundColor: '#F6F6F6',
        fontWeight: 'bold'
    }
})

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(indigo[400]),
      backgroundColor: indigo[400],
      '&:hover': {
        backgroundColor: indigo[700],
      },
    },
  }))(Button);

function MarketerLogin() {
    const classes = useStyles()

    const[checked, setChecked] = useState(false)
    const handleCheck = e => {
        setChecked(e.target.checked)
    }

  
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const marketerLogin = useSelector(state => state.marketerLoginReducer)

    const { loading, error, marketerInfo } = marketerLogin

    useEffect(() => {
        if(marketerInfo){
            history.push('/dashboard/client')
        }
    })
    const onSubmit = (values)  => {
      const {email, password } = values
      dispatch(login( email, password ))
    };

    const validate = values => {
        const errors = {}
        if(!values.email) {
            errors.email = 'Email is required'
        }
        if(!values.password){
            errors.password = 'Password is required'
        }
        return errors;
    }

    return (
    <>
        <Box component='div' display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }} className={classes.root}>
                <Card className={classes.loginCard} data-aos="fade-right" data-aos-delay='700'>
                    <Container>
                    <Typography variant='h3' className={classes.headText}>Login as</Typography>
                    <div className={classes.buttons}>
                        <Button
                        variant='contained'
                        startIcon={<PersonIcon className={classes.icon}  />}
                        className={location.pathname === '/login/client' ? classes.active : classes.btn}
                        style={{marginRight: '2rem'}}
                        disableRipple
                        disableElevation
                        onClick={() => history.push('/login/client')}
                        >
                            Client
                        </Button>
                        <Button
                        variant='contained'
                        startIcon={<BusinessIcon className={classes.icon}  />}
                        className={location.pathname === '/login/marketer' ? classes.active : classes.btn}
                        style={{marginLeft: '2rem'}}
                        disableRipple
                        disableElevation
                        onClick={() => history.push('/login/marketer')}
                        >
                            Marketer
                        </Button>
                    </div>
                    <div>
                       <Form
                       onSubmit={onSubmit}
                       validate={validate}
                       render={({ handleSubmit }) => (
                           <Container>
                           <form onSubmit={handleSubmit} noValidate autoComplete='off' className={classes.form}>
                           {error && <h5 style={{color: 'red'}}>{error}</h5>}
                               {loading && <h5>Loading...</h5>}
                               <div>
                                    <label>Email</label>
                                    <br />
                                    <Field 
                                    name="email" 
                                    component={CustomInput}
                                    type='email'
                                    required
                                    className={classes.field} 
                                    />
                                </div>
                               <div>
                                    <label>Password</label>
                                    <br />
                                    <Field 
                                    name="password" 
                                    component={PasswordInputs}
                                    required
                                    className={classes.field}
                                    />
                                </div>
                               <div className={classes.check}>
                               <Checkbox
                                    checked={checked}
                                    onChange={handleCheck}
                                    color='primary'
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                <Typography variant='body2' style={{ paddingTop: '.7rem'}}>Forgotten Paswword?</Typography>
                               </div>
                               <div style={{ textAlign: 'center'}}>
                               <ColorButton variant='contained' 
                               color='primary' 
                               className={classes.loginBtn} 
                               type='submit' 
                               >
                                   Login
                                </ColorButton>
                               </div>
                               <Typography variant='body2' align='center' style={{paddingTop: '1rem'}}>
                                   Do not have either account?
                                <Link to='/register/marketer'> Register Here</Link> 
                                   </Typography>
                           </form>
                           </Container>
                       )} /> 
                    </div>
                    </Container>
                </Card>
        </Box>

        {/* small screen */}
        <Box component='div'  display={{ xs: 'none', sm: 'block', md: 'none', lg: 'none' }} className={classes.root}>
                <Card className={classes.loginCardS} data-aos="fade-right" data-aos-delay='700'>
                    <Container>
                    <Typography variant='h3' className={classes.headText}>Login as</Typography>
                    <div className={classes.buttons}>
                        <Button
                        variant='contained'
                        startIcon={<PersonIcon className={classes.icon}  />}
                        className={location.pathname === '/login/client' ? classes.active : classes.btn}
                        style={{marginRight: '2rem'}}
                        disableRipple
                        disableElevation
                        onClick={() => history.push('/login/client')}
                        >
                            Client
                        </Button>
                        <Button
                        variant='contained'
                        startIcon={<BusinessIcon className={classes.icon}  />}
                        className={location.pathname === '/login/marketer' ? classes.active : classes.btn}
                        style={{marginLeft: '2rem'}}
                        disableRipple
                        disableElevation
                        onClick={() => history.push('/login/marketer')}
                        >
                            Marketer
                        </Button>
                    </div>
                    <div>
                       <Form
                       onSubmit={onSubmit}
                       validate={validate}
                       render={({ handleSubmit }) => (
                           <Container>
                           <form onSubmit={handleSubmit} noValidate autoComplete='off' className={classes.form}>
                           {error && <h5 style={{color: 'red'}}>{error}</h5>}
                               {loading && <h5>Loading...</h5>}
                               <div>
                                    <label>Email</label>
                                    <br />
                                    <Field 
                                    name="email" 
                                    component={CustomInput}
                                    type='email'
                                    required
                                    className={classes.field} 
                                    />
                                </div>
                               <div>
                                    <label>Password</label>
                                    <br />
                                    <Field 
                                    name="password" 
                                    component={PasswordInputs}
                                    required
                                    className={classes.field}
                                    />
                                   
                                </div>
                               <div className={classes.check}>
                               <Checkbox
                                    checked={checked}
                                    onChange={handleCheck}
                                    color='primary'
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                <Typography variant='body2' style={{ paddingTop: '.7rem'}}>Forgotten Paswword?</Typography>
                               </div>
                               <div style={{ textAlign: 'center'}}>
                               <ColorButton variant='contained' 
                               color='primary' 
                               className={classes.loginBtn} 
                               type='submit' 
                               >
                                   Login
                                </ColorButton>
                               </div>
                               <Typography variant='body2' align='center' style={{paddingTop: '1rem'}}>
                                   Do not have either account?
                                <Link to='/register/marketer'> Register Here</Link> 
                                   </Typography>
                           </form>
                           </Container>
                       )} /> 
                    </div>
                    </Container>
                </Card>
        </Box>


        {/* Extra small screen */}
        <Box component='div' display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none' }} className={classes.root}>
                <Card data-aos="fade-right" data-aos-delay='700' className={classes.loginCardXs}>
                    <Container>
                    <Typography variant='h3' className={classes.headText}>Login as</Typography>
                    <div className={classes.buttons}>
                        <Button
                        variant='contained'
                        startIcon={<PersonIcon className={classes.icon}  />}
                        className={location.pathname === '/login/client' ? classes.active : classes.btn}
                        style={{marginRight: '2rem'}}
                        disableRipple
                        disableElevation
                        onClick={() => history.push('/login/client')}
                        >
                            Client 
                        </Button>
                        <Button
                        variant='contained'
                        startIcon={<BusinessIcon className={classes.icon}  />}
                        className={location.pathname === '/login/marketer' ? classes.active : classes.btn}
                        style={{marginLeft: '2rem'}}
                        disableRipple
                        disableElevation
                        onClick={() => history.push('/login/marketer')}
                        >
                            Marketer
                        </Button>
                    </div>
                    <div>
                       <Form
                       onSubmit={onSubmit}
                       validate={validate}
                       render={({ handleSubmit }) => (
                           <Container>
                           <form onSubmit={handleSubmit} noValidate autoComplete='off' className={classes.form}>
                           {error && <h5 style={{color: 'red'}}>{error}</h5>}
                               {loading && <h5>Loading...</h5>}
                               <div>
                                    <label>Email</label>
                                    <br />
                                    <Field 
                                    name="email" 
                                    component={CustomInput}
                                    type='email'
                                    required
                                    className={classes.field} 
                                    />
                                </div>
                               <div>
                                    <label>Password</label>
                                    <br />
                                    <Field 
                                    name="password" 
                                    component={PasswordInputs}
                                    type='password'
                                    required
                                    className={classes.field}
                                    />
                                  
                                </div>
                               <div className={classes.check}>
                               <Checkbox
                                    checked={checked}
                                    onChange={handleCheck}
                                    color='primary'
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                <Typography variant='body2' style={{ paddingTop: '.7rem'}}>Forgotten Paswword?</Typography>
                               </div>
                               <div style={{ textAlign: 'center'}}>
                               <ColorButton variant='contained' 
                               color='primary' 
                               className={classes.loginBtn} 
                               type='submit' 
                               >
                                   Login
                                </ColorButton>
                               </div>
                               <Typography variant='body2' align='center' style={{paddingTop: '1rem'}}>
                                   Do not have either account?
                                <Link to='/register/marketer'> Register Here</Link> 
                                   </Typography>
                           </form>
                           </Container>
                       )} /> 
                    </div>
                    </Container>
                </Card>
        </Box>
        </>
    )
}

export default MarketerLogin
