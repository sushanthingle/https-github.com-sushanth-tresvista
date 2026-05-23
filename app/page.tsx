import Navbar         from './components/Navbar'
import VideoHero      from './components/VideoHero'
import WhoWeAre       from './components/WhoWeAre'
import EIOSection     from './components/EIOSection'
import WhoWeWorkWith  from './components/WhoWeWorkWith'
import Contact        from './components/Contact'
import Footer         from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BoldCallout    from './components/BoldCallout'

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <VideoHero />
      <WhoWeAre />
      <BoldCallout />
      <EIOSection />
      <WhoWeWorkWith />
      <Contact />
      <Footer />
    </main>
  )
}
