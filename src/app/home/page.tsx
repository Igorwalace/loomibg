import React from 'react'
import Header from '../pages/header'
import { HeroSection } from './hero'
import { FeaturesSection } from './features-section'
import { Footer } from './footer'
import { ShowcaseSection } from './showcase'
import FeaturesRemoveText from './features-remove-text'

function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <FeaturesRemoveText />
      <Footer />
    </>
  )
}

export default Home