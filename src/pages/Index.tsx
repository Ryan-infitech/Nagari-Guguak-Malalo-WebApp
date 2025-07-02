
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import WelcomeMessage from '@/components/home/WelcomeMessage';
import QuickServices from '@/components/home/QuickServices';
import NewsSection from '@/components/home/NewsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WelcomeMessage />
      <QuickServices />
      <NewsSection />
    </Layout>
  );
};

export default Index;
