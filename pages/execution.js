//API: https://apigateway-dev.roomlessrent.com/listing-svc/listing/search
//metodo: POST
//Body: {"listingTypes":[],"services": [],"fromPrice":0,"toPrice":300000,"sortField":"RELEVANCE","sortOrder":"ASC","lang":"it","pageNumber":0,"pageSize":60,"radius":20,"placeSlang":"citta-milano","latitude":45.4640998840332,"longitude":9.189740180969238}

//Contattare le API e mostrare elenco di annunci immobiliari, mostrando immagine principale, prezzo, titolo e indirizzo.
//Aggiungere poi un filtro per il prezzo minimo e massimo (utilizzare campi fromPrice e toPrice del body della richiesta) per chiedere alle API di ritornare annunci che rispettano quel filtro.

//Richiesta extra: aggiungere supporto al paging (utilizzare campo pageNumber)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image'


const Fetchando = () => {
  const [data, setData] = useState(null);
  
  const [pageNumber, setPageNumber] = useState(0);
  const [totalNumberPages, setTotalNumberPages] = useState(0);
  
  
  var requestData = {
    listingTypes: [],
    services: [],
    fromPrice: 0,
    toPrice: 300000,
    sortField: 'RELEVANCE',
    sortOrder: 'ASC',
    lang: 'it',
    pageNumber: 0, // Puoi modificare questo valore per cambiare la pagina
    pageSize: 60,
    radius: 20,
    placeSlang: 'citta-milano',
    latitude: 45.4640998840332,
    longitude: 9.189740180969238
  };
  
 
  const fetchData = async () => {
    try {
      const response = await axios.post('https://apigateway-dev.roomlessrent.com/listing-svc/listing/search', {
        ...requestData,
        pageNumber: pageNumber
      });
      setData(response.data.data);
      setTotalNumberPages(response.data.totalNumberPages)
    } catch (error) {
      console.error(error);
    }
  };


  const Avanti = () => {
    if (pageNumber <= 7) { // Ho considerato il fatto che l'ottava pagina è l'ultima con dei contenuti, considerando la prima pagina sia 0 e non 1, di conseguenza 0-8 numberTotalPages = 9.
      setPageNumber(pageNumber + 1);
    }
  }
  


  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  const Indietro = () => {
    if (pageNumber >= 1)
      setPageNumber(pageNumber - 1);
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  

  return (
    
    
    <div id="list_housing" class="">
                       
      {data && Array.isArray(data) ? (
        <ul class="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 ml-2 mr-2">
          {data.map((item, index) => (
            <li key={index} class="h-auto max-w-full rounded-lg relative  ">
              <div>
                <img src={item.image} alt={"foto"} class="rounded max-w-full h-3/4 " />
                <div class="text-black rounded font-mono text-center text-xl bg-slate-100 ">
                  {item.name.slice(0, 25)} <br />{item.monthlyPrice + "€"} </div>
                                                      
                <br />
              </div>
            </li>
                    
              
          ))}
            
          
          
      
    


        </ul>
      ) : (
        <div class="text-center">
          <div role="status">
            <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg><p class="text-center">In caricamento...</p>
            <span class="sr-only">In caricamento...</span>
          </div>
        </div>
      )}
      
        < div class="text-center">
      <button onClick={Avanti} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded ">Avanti</button>
      <button onClick={Indietro} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded ml-1">Indietro</button>
      <p class="font-semibold text-center"> Sei alla pagina: {pageNumber} di {totalNumberPages - 1}</p>
        </div>      
     
  
      
    </div>
    
      
      
  );
};

export default Fetchando;