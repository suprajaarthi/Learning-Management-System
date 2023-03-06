import "../App.css";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import TextExample from './Card.js';
import Card from 'react-bootstrap/Card';
import GooglePayButton from '@google-pay/button-react';
// import DragAndDrop from './DragAndDrop.js';
// import { FileUploader } from "react-drag-drop-files";
import Image from './bg.png'; // Import using relative path
import Login from './Login';
import Child from './Child';
import Signup from './Signup';
import AnotherComponent from "./AnotherComponent";


import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import {storage } from "../firebase";
import { v4 } from "uuid";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';


function Notes(props) {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  function handleDeleteClick() {
    setIsVisible(false);
  }



  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageName, setImageName] = useState([]);

  const imagesListRef = ref(storage, "images/");
  const [deleteStatus, setDeleteStatus] = useState('idle');


 const myFunction = () => {
    const enteredEmail = prompt('Confirm you"re staff Mailid before Uploading');
    setEmail(enteredEmail);
console.log(email);
console.log(email.endsWith("@staff.com"));
}
  const uploadFile = () => {
     
if ( imageUpload == null){

 alert("Choose the file before uploading ")
    }
   else  if (!email.endsWith("@staff.com"))
    {
       alert("Only Staffs can upload files!")
     return;
    }
    else if(email.endsWith("@staff.com"))
    {
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      alert("Your file is being uploaded!")
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  }
};



  useEffect(() => {
    listAll(imagesListRef).then((response) => { 
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
          setImageName((arr) => [...arr, item.name]);
        });
      });
    });
  }, []);



  return (

    <div style={{ backgroundImage: `url(${Image})` }} id="cols">
      <input id="ip"  onClick={myFunction} class="custom-file-input"
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />

            <button class="button1"  id="ip" onClick={uploadFile}> Upload File </button>

{/*<p>Your email is: {email}</p>*/}
      <center>
      {imageUrls.map((url) =>
    <div >
      <a href={url} target="blank">   <button type="button"  class="button">  Free Download </button>

      </a>


     <center class="iframe-loading">



        <iframe id="getframe" src={url} 
        style={{ overflow: 'hidden' }}  style={{ opacity: 0.5 }} width="500px" height="500px" 
         >

         </iframe>

            <GooglePayButton
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD', 
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
},
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100.00',
      currencyCode: 'USD',
      countryCode: 'US',
    },
  }}
  onLoadPaymentData={paymentRequest => {
    console.log('load payment data', paymentRequest);
  }}
/>
                </center>

   </div>
      )}
     </center>

    </div>
  );
}

export default Notes;