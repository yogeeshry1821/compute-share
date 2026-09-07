import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Audiences } from "@/components/landing/audiences";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="mx-auto w-[65%] border-x border-border bg-background text-foreground">
      <main>
        <Nav />
        <Hero />
        <HowItWorks />
        <Audiences />
        <Pricing />
        <Footer />
      </main>
    </div>
  );
}
