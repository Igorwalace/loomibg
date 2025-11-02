import React from 'react'
import Header from '../pages/header'
import { HeroSection } from './hero'
import { FeaturesSection } from './features-section'

function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
    </>
  )
}

export default Home