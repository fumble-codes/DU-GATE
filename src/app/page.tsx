import { NavBar } from "@/components/landing/nav"
import { HeroSection } from "@/components/landing/hero"
import { FeatureAnchorRow } from "@/components/landing/features"
import { SplitFeatureSection } from "@/components/landing/split-features"
import { TrustSection } from "@/components/landing/trust"
import { PricingSection } from "@/components/landing/pricing"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas-bg">
      <NavBar />
      <main>
        <HeroSection />
        <FeatureAnchorRow />
        <SplitFeatureSection />
        <PricingSection />
        <TrustSection />
      </main>
      <Footer />
    </div>
  )
}
