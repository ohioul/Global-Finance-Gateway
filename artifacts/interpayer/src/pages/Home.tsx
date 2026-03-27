import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Marketplace } from '@/components/sections/Marketplace';
import { Advantages } from '@/components/sections/Advantages';
import { Process } from '@/components/sections/Process';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Services />
        <Marketplace />
        <Advantages />
        <Process />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
