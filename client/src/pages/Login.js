import React,{ useState } from 'react'
import {Flex,Box,Heading,FormControl,FormLabel,Input, Button,  CircularProgress, Text} from '@chakra-ui/core';
// import { userLogin } from '../utils/mockApi';
import ErrorMessage from '../components/ErrorMessage'; 
import {login, useAuth, logout,authFetch} from "../auth"
import { Redirect,Route } from 'react-router';
import Secret from  './Secret'
export default function Login() {
  const [username,setUsername]  = useState('');
  const [password,setPassword] =  useState('')
  const [error] = useState('');
 
  const onSubmitClick = (e)=>{
    e.preventDefault()
    console.log("You pressed login")
    let opts = {
      'username': username,
      'password': password
    }
    console.log(opts)
    fetch('/api/login', {
      method: 'post',
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(token => {
        if (token.access_token){
          login(token)
          console.log(token)  
                  
        }
        else {
          console.log("Please type in correct username/password")
        }
      }) }
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  // eslint-disable-next-line no-undef
  const handleSubmit= async event => {
    event.preventDefault()
    //alert(`Username: ${username} & Password: ${password}`);

  }
  const PrivateRoute = ({ component: Component, ...rest }) => {
    const [logged] = useAuth();
  
    return <Route {...rest} render={(props) => (
      logged
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  }
  const [logged] = useAuth();
       return(           
      <div>
      <Flex width="full" align="center" justifyContent="center">
      <Box p={8}maxWidth="500px"borderWidth={1} borderRadius={8} boxShadow="lg"> 
            <Box textAlign="center">
            <Heading>Login</Heading>
            </Box>
            <Box my={4} textAlign="left">
            {!logged? 
              <form onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="username"
                    placeholder="Username"
                    size="lg"
                    onChange={handleUsernameChange}
                    />
                </FormControl>
                <FormControl isRequired mt={6}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Password"
                    size="lg"
                    onChange={handlePasswordChange}
                    />
                </FormControl>
                <Button variantColor="teal"variant="outline"type="submit"width="full"mt={4} onClick={onSubmitClick}>
                    Sign In
                </Button>
                
              </form>  :
              <div>  
                <PrivateRoute path="/secret" component={Secret} /> 
              <Button onClick={() => logout()}Logout>
               Logout
              </Button>  
              </div>
            }
            </Box>
      </Box>
    </Flex>
    </div>
       );
  }