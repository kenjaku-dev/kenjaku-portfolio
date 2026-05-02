import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Features from '@/components/features';
import Skills from '@/components/skills';
import Repos from '@/components/repos';
import Testimonials from '@/components/testimonials';
import Footer from '@/components/footer';
import Splash from '@/components/splash';
import ScrollToTop from '@/components/scroll-to-top';
import StarWidget from '@/components/star-widget';
import CustomCursor from '@/components/custom-cursor';
import Background3D from '@/components/background-3d';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Background3D />
      <CustomCursor />
      <Splash />
      <Navbar />
      <Hero />
      <Features />
      <Skills />
      <Repos />
      <Testimonials />
      <Footer />
      <ScrollToTop />
      <StarWidget />
    </main>
  );
}
