import React, { useState } from 'react';
import axios from 'axios';

const FilterPrice = () => {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [response, setResponse] = useState(null);
  const [prezziList, setPrezziList] = useState([]);

  
  const handleMinValueChange = (event) => {
    setMinValue(event.target.value);
  };

  const handleMaxValueChange = (event) => {
    setMaxValue(event.target.value);
  };


  const handleCustomRequest = async () => {
    try {
      const url = 'https://apigateway-dev.roomlessrent.com/listing-svc/listing/search'; // Indirizzo API personalizzato

      const requestBody = {
        fromPrice: minValue,
        toPrice: maxValue
      };

      const response = await axios.post(url, requestBody);
      // Gestisci la risposta dalla richiesta personalizzata
      setResponse(response.data);
      

      var listaabitazionijson = JSON.stringify(response.data.data)
      //console.log(listaabitazionijson)
      const abitazione = JSON.parse(listaabitazionijson);
      
      
      
    
       const prezzi = abitazione.map((item) => (
 
        <ul class="">
          <li  key={item} class="h-auto max-w-full rounded-lg relative hover:animate-pulse">
            <div class=" w-96">
              <img src={item.image} class="rounded w-96 h-96" />
              <div class=" text-black rounded font-mono text-center text-xl bg-slate-200 ">
                {item.name.slice(0, 25)} <br />
                {item.price}€
                </div>
              </div>
            </li>
           </ul>
      
      ));
      setPrezziList(prezzi);
    } catch (error) {
      console.error('Errore nella richiesta personalizzata:', error);
    }

  };





  
    return (
      
      <div>
        
        <div class="block text-center mt-2">
          <input type="text" value={minValue} onChange={handleMinValueChange} placeholder="Minimo" class="  w-48 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <input type="text" value={maxValue} onChange={handleMaxValueChange} placeholder="Massimo" class="  w-48 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <button onClick={handleCustomRequest} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2  transition-opacity">Cerca</button>
        </div>
        <div>
          
          {response && (
            
            <div class="grid grid-cols-1 ml-12 mr-12 gap-4 mt-4 sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 max-w-full ">
                
                {prezziList}
              
            </div>
          )}
        </div>
      </div>
    );
  };



export default FilterPrice;
