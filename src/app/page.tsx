import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import WelcomeMessage from '@/components/home/WelcomeMessage';
import QuickServices from '@/components/home/QuickServices';
import DestinationSection from '@/components/home/DestinationSection';
import UMKMSection from '@/components/home/UMKMSection';
import NewsSection from '@/components/home/NewsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WelcomeMessage />
      <QuickServices />
      <DestinationSection />
      <UMKMSection />
      <NewsSection />
    </>
  );
}
