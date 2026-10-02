import { CapabilityOrbit } from '@/components/yatra/capability-orbit'
import { CursorGlow } from '@/components/yatra/cursor-glow'
import { DestinationExplorer } from '@/components/yatra/destination-explorer'
import { FinalSection, Footer } from '@/components/yatra/footer'
import { Hero } from '@/components/yatra/hero'
import { LanguageConstellation } from '@/components/yatra/language-constellation'
import { LanguageProblem } from '@/components/yatra/language-problem'
import { Navbar } from '@/components/yatra/navbar'
import { OCRDemo } from '@/components/yatra/ocr-demo'
import { Preloader } from '@/components/yatra/preloader'
import { SmartTouristLens } from '@/components/yatra/smart-tourist-lens'
import { TravelAssistant } from '@/components/yatra/travel-assistant'
import { UnifiedExperience } from '@/components/yatra/unified-experience'
import { VoiceDemo } from '@/components/yatra/voice-demo'

export default function Page() {
  return (
    <>
      <Preloader />
      <CursorGlow />
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <LanguageProblem />
        <CapabilityOrbit />
        <OCRDemo />
        <VoiceDemo />
        <LanguageConstellation />
        <SmartTouristLens />
        <DestinationExplorer />
        <TravelAssistant />
        <UnifiedExperience />
        <FinalSection />
      </main>
      <Footer />
    </>
  )
}
