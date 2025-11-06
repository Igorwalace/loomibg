import React from 'react'
import Header from '../pages/header'
import { HeroSection } from './hero'
import { FeaturesSection } from './features-section'
import { Footer } from './footer'

function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </>
  )
}

export default Home