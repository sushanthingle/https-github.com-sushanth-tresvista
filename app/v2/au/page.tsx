import NavbarV2        from '../components/NavbarV2'
import HeroAbout       from './components/HeroAbout'
import WhoWeAreAbout   from './components/WhoWeAreAbout'
import CultureValues   from './components/CultureValues'
import CSRSection      from './components/CSRSection'
import CareerBanner    from './components/CareerBanner'
import NewsSection     from './components/NewsSection'
import ContactAbout    from './components/ContactAbout'
import Footer          from '../../components/Footer'

export default function AboutUsV2() {
  return (
    <main style={{ backgroundColor: '#07122B' }}>
      <NavbarV2 />
      <HeroAbout />
      <WhoWeAreAbout />
      <CultureValues />
      <CSRSection />
      <CareerBanner />
      <NewsSection />
      <ContactAbout />
      <div style={{ borderRadius: '64px 64px 0 0', overflow: 'hidden', marginTop: '-64px', position: 'relative', zIndex: 9 }}>
        <Footer />
      </div>
    </main>
  )
}
