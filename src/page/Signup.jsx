import React, {useState} from 'react';
import Text from '../components/elements/Text';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';
import Child from './Child';
import AnotherComponent from "./AnotherComponent";

const Signup = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
   const [error, setError] = useState(""); 
  const min = 162301;
  const max = 162320;

  const [value, setValue] = useState();
  const [number, setNumber] = useState("");

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
    
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

    const onSubmit = async (e) => {
      e.preventDefault()
          if ((number < 162301 || number > 162320) && (!email.endsWith("@staff.com"))) {
      alert("Dear User1, Please enter a valid staff Mail id or Your Registered Student Number "); 
    
    } else {
    

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            
           if(user.email.endsWith('staff.com')) {
      // Set custom claim for "staff" role
        user.getIdTokenResult().then((idTokenResult) => {
        if (idTokenResult.claims.role !== 'staff') {
          auth().currentUser.getIdToken(true).then((idToken) => {
            // Set the custom claim for "staff" role
            auth().setCustomUserClaims(user.uid, {
              role: 'staff',
            }).then(() => {
              // Reload the user's token to reflect the new custom claim
              return auth().currentUser.getIdToken(true);
            }).then((newIdToken) => {
              // Token has been updated
              console.log('User token updated with staff role');
            }).catch((error) => {
              console.error(error);
            });
          }).catch((error) => {
            console.error(error);
          });
        }
      }).catch((error) => {
        console.error(error);
      });
    }
             
            console.log(user);
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });


    
    }
  }
  

  return (
    <main >   

        <section>
            <div className="flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <Text className="text-4xl text-white text-center font-bold mb-2">
                         Learning  <span className="text-tertiary">Management</span>

                        </Text>

                        <h2 className="text-white text-center text-base  tracking-tight text-gray-900">
                            Are you new? Sign up today
                        </h2>                        
                    </div>

                    
                    <form onSubmit={onSubmit} className="mt-8 space-y-6" >                    
                        <div className=" space-y-6 rounded-md shadow-sm">
                         <div>
      <label className="sr-only" htmlFor="numberInput">Register Number</label>
      <input
       className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
       placeholder="Register Number"
       label="Register Number"
        type="number"
        id="numberInput"
        name="numberInput"
        
        value={number}
        onChange={handleNumberChange}
      />
    </div>

                            
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    First name
                                </label>
                                <input
                                    label="First name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}                                    
                                    name="firstname"
                                    type="text"                                    
                                    required                                
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="First name"                                   
                                />

                            </div>

                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Last name
                                </label>
                                <input
                                    label="Last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}                                    
                                    required

                                    type="text"
                                    name="lastname"                                                                       
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Last name"                                    
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                Email address
                                </label>
                                <input
                                    type="email"
                                    label="Email address"
                                    value={email}
                                    onChange={handleEmailChange}                                    
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"                                
                                />
                                
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    label="Create password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}                                    
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"                                
                                />
                            </div>
                        </div>                        

                        <div>
                            <button
                                type="submit"                                                               
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >   
                                Sign up                                                             
                            </button>
                        </div>
                                             
                    </form>
                   

                    <p className="text-sm text-white text-center">
                        Already have an account?{' '}
                        <NavLink to="/login" className="underline text-tertiary">
                            Sign in
                        </NavLink>
                    </p>
                    
                </div>
            </div>
        </section>
    </main>
  )
}

export default Signup