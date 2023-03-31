import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/elements/Card';
import Text from '../components/elements/Text';
import Button from '../components/elements/Button';
import Child from './Child';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faAirFreshener, faCircleUser} from '@fortawesome/free-solid-svg-icons'


import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
// import Child from './Child';

import Signup from './Signup';

import AnotherComponent from "./AnotherComponent";

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  //       const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };
   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail(null);
      }
    });

    // return () => {
    //   unsubscribe();
    // };
  }, []);

  //   const onLogin = (e) => {
  //       e.preventDefault();
  //       signInWithEmailAndPassword(auth, email, password)
       


  // //     const [email, setEmail] = useState('');
  // // const handleEmailChange = (event) => {
  // //   setEmail(event.target.value);
  // };


  return (
<div>
  <section style={{height:"60px",position:"relative"}}  className="text-white">      

 <div className="text-left pt-10 pb-10">

 <FontAwesomeIcon  style={{ color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial",
      position:"relative",
      marginLeft:"23px",
      bottom:"84px"
  }}  icon={faCircleUser} color="skyblue"  size="2x" bounce />
      {email ? (
        <p
        style={{ color: "white",
      padding: "10px",
      fontFamily: "Arial",
      position:"relative",
          bottom:"84px"
  }}
   className="font-bold text-2xs">  {email}</p>
      ) : (
        <p>Signin again</p>
      )}
    </div>
    </section>
    
</div>

  )
}

export default Home


