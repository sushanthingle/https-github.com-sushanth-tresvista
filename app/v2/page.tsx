import NavbarV2         from './components/NavbarV2'
import HeroV2           from './components/HeroV2'
import WhoWeAreV2       from './components/WhoWeAreV2'
import EIOSectionV2     from './components/EIOSectionV2'
import BoldCalloutV2    from './components/BoldCalloutV2'
import WhoWeWorkWithV2  from './components/WhoWeWorkWithV2'
import ContactV2        from './components/ContactV2'
import Footer           from '../components/Footer'
import ScrollProgress   from '../components/ScrollProgress'
import CustomCursor     from '../components/CustomCursor'

export default function HomeV2() {
  return (
    <main className="bg-white">
      <CustomCursor />
      <ScrollProgress />
      <NavbarV2 />
      <HeroV2 />
      <WhoWeAreV2 />
      <BoldCalloutV2 />
      <EIOSectionV2 />
      <WhoWeWorkWithV2 />
      <ContactV2 />
      <Footer />
    </main>
  )
}
