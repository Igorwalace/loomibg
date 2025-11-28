import React from 'react'

// pages
import Header from '../pages/header'
import { HeroSection } from './hero'
import { FeaturesSection } from './features-section'
import { Footer } from './footer'
import FeaturesRemoveText from './features-remove-text'
import { MagicDemoSection } from './showcase'

function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <MagicDemoSection />
      <FeaturesRemoveText />
      <Footer />
    </>
  )
}

export default Home