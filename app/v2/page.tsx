import NavbarV2        from './components/NavbarV2'
import HeroV2          from './components/HeroV2'
import WhoWeAreV2      from './components/WhoWeAreV2'
import EIOSectionV2    from './components/EIOSectionV2'
import WhoWeWorkWithV2 from './components/WhoWeWorkWithV2'
import ContactV2       from './components/ContactV2'
import Footer          from '../components/Footer'

export default function HomeV2() {
  return (
    <main style={{ backgroundColor: '#e5e7eb' }}>
      <NavbarV2 />
      <HeroV2 />
      <WhoWeAreV2 />
      <EIOSectionV2 />
      <WhoWeWorkWithV2 />
      <ContactV2 />
      <div style={{ borderRadius: '64px 64px 0 0', overflow: 'hidden', marginTop: '-64px', position: 'relative', zIndex: 6 }}>
        <Footer />
      </div>
    </main>
  )
}
