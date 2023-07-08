import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from './header'
import Footer from './footer'
import Fetchando from './execution'
import FilterPrice from './filterprice'


const inter = Inter({ subsets: ['latin'] })
import React, { useState, useEffect } from 'react';




export default function Home() {

 



 
      return (
    
        <main
          className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}>
          <Header/>
                    
      
          <FilterPrice class=" mb-5" />
        
          <div  class="">
            <div >
              <Fetchando/>
            </div>
          </div>
          
          
          <div class="mb-8">
         
          </div>
          <Footer />
        </main>
      )
    }

