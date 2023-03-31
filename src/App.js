import React, {useState, useEffect} from 'react';
import bg from './components/assets/bg.png';
// import Sidebar from './components/widgets/Sidebar';
import Home from './page/Home';
import Notes from './page/Notes';
import Signup from './page/Signup';
import Login from './page/Login';
import Child from './page/Child';
import Timer from './page/Timer';
import Stopwatch from './page/Stopwatch';
import {Routes, Route} from 'react-router-dom';
// import Navbar from './components/widgets/Navbar';
import Layout from './components/widgets/Layout';
import Lay from './components/widgets/Lay';

import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (email) => {
    setEmail(email);
  }

  return (
    <Router>
      <div className="App bg-primary">
        <section>          
          <div>            
            <Routes>
           

                  <Route 
                  path="/home"
                  element={
                  <div>
                     <Layout>
                     
                      < Child />
                    </Layout>
                    <Lay>
                      <Home/>
                    </Lay>
                  </div>
                  
                  }
                />

                <Route 
                  path="/notes"
                  element={
                  <div>
                     <Layout>
                     
                      < Child />
                    </Layout>
                    <Lay>
                      < Notes />
                    </Lay>
                  </div>
                  
                  }
                />

                <Route 
                  path="/timer"
                  element={
                    <Layout>
                      < Timer />
                    </Layout>
                  
                  }
                />
                
                <Route 
                  path="/stopwatch"
                  element={
                    <Layout>
                 
                      < Stopwatch />
                    </Layout>
                  
                  }
                />              
              
                 <Route 
                  path="/child"
                  element={
                    <Layout>
                 
                      < Child />
                    </Layout>
                  
                  }
                />              
              
              <Route path="/" element={
                <>
                <Signup onEmailChange={handleEmailChange} /> 
                </>
}/>

              <Route path="/login" element={<Login/>}/>
            </Routes>          
          </div>
        </section>

      </div>
    </Router>
  );
}

export default App;



