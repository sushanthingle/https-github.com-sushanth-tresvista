import Navbar        from './components/Navbar'
import VideoHero     from './components/VideoHero'
import WhoWeAre      from './components/WhoWeAre'
import EIOSection    from './components/EIOSection'
import WhoWeWorkWith from './components/WhoWeWorkWith'
import Contact       from './components/Contact'
import Footer        from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor  from './components/CustomCursor'

export default function Home() {
  return (
    <main>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <VideoHero />
      <WhoWeAre />
      <EIOSection />
      <WhoWeWorkWith />
      <Contact />
      <Footer />
    </main>
  )
}
