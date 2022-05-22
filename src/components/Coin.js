import React, { useEffect, useState } from "react";
import "./Coin.css";
import {Button} from  "web3uikit"; 
import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";
   


function Coin({perc, setPerc, token, setModalToken, setVisible}) {

   const [colour, setColour] = useState();
   const contractProcessor = useWeb3ExecuteFunction();
  const { isAuthenticated} = useMoralis();
   
   useEffect(() => {

    if (perc <= 20) {
      setColour("#ff4c4c")
    }else if (perc > 20 && perc < 50){
      setColour("#ffbf00")
    }else{
      setColour("#5ab400")
    }

   }, [perc]);

  async function vote(upDown){

    let options = {
      contractAddress: "0xa2E5612364dF4995Ea556e7D544446eF89e56a93",
      functionName: "vote",
      abi: [
      {
      "inputs":[
      {
      "internalType":"string",
      "name":"_ticker",
      "type":"string"
      },
      {
      "internalType":"bool",
      "name":"_vote",
      "type":"bool"
    }
    ],
      "name":"vote",
      "outputs":[],
      "stateMutability":"nonpayable",
      "type":"function"
    }
    ],
    params: {
      _ticker: token,
      _vote: upDown,
    },
    }


    await contractProcessor.fetch({
      params: options,
      onSucess: () => {
        console.log("vote succesful");
      },
      onError: (error) => {
        alert(error.data.message)
      }
    });

  }

  


  return (
    <>
    
    <div>

      <div className="token">

      {token}

      </div>

      <div className="circle" style={{boxShadow: `0 0 20px ${colour}`}}>

          <div className="wave"
          
          style={{    

            marginTop: `${100-perc}%`,
            boxShadow: `0 0 20px ${colour}`,
            backgroundColor: colour,


          }}
          
          ></div>
          <div className="percentage"> {perc}% </div>
      </div>

      <div className="votes">

           <Button 
           
           onClick={() => {
            if(isAuthenticated){
              vote(true)
            }else{
              alert("Authenicate to Vote")
            }
           }}
           text="Up"
           theme="primary"
           type="button"
           
           />

          <Button 
           color="red"
           onClick={() => {
            if(isAuthenticated){
              vote(false)
            }else{
              alert("Authenicate to Vote")
            }
           }}
           text="Down"
           theme="colored"
           type="button"
           
           />

      </div>

      <div className="votes">
            <Button
            onClick={()=>{
              setModalToken(token)
              setVisible(true);
            }}
            text="INFO"
            theme="translucent"
            type="button"
          />
        </div>



    </div>

      
    </>
  );
}

export default Coin;
