import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Features from '@/components/features';
import Skills from '@/components/skills';
import Repos from '@/components/repos';
import Testimonials from '@/components/testimonials';
import Footer from '@/components/footer';
import Splash from '@/components/splash';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Splash />
      <Navbar />
      <Hero />
      <Features />
      <Skills />
      <Repos />
      <Testimonials />
      <Footer />
    </main>
  );
}
