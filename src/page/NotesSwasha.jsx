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

import {
  ref,
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


function Notes() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageName, setImageName] = useState([]);
  const [downloadType, setDownloadType] = useState(null);


  const handleChooseFile = () => {
    // Show an alert asking the user to choose a download type
    const selectedOption = prompt(
      "Please choose a download option:",
      "free or paid"
    );

    // Set the download type based on the user's choice
    setDownloadType(selectedOption === "free" ? "free" : "paid");
  };
  const imagesListRef = ref(storage, "images/");
    const [deleteStatus, setDeleteStatus] = useState('idle');

 
  const uploadFile = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
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
    
      <input id="ip" class="custom-file-input" onClick={handleChooseFile}
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
            <button class="button1"  id="ip" onClick={uploadFile}> Upload Image </button>

      <center>
      {imageUrls.map((url) =>
    <div>
      <a href={url} target="blank">  {downloadType === "free" && (

       <button type="button" class="button">        Free Download

</button>
)}
      </a>

      
     <center class="iframe-loading">

        <iframe src={url}  loading="lazy" width="500px" height="500px" 
         onload="$('.iframe-loading').css('background-image', 'none');">

         </iframe>

           {downloadType === "paid" && (

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
>

</GooglePayButton>
    )}
                </center>

   </div>
      )}
     </center>

    </div>
  );
}

export default Notes;