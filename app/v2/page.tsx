import NavbarV2          from './components/NavbarV2'
import HeroV2            from './components/HeroV2'
import ProblemV2         from './components/ProblemV2'
import WorkflowsV2       from './components/WorkflowsV2'
import EIOSectionV2      from './components/EIOSectionV2'
import InsightsV2        from './components/InsightsV2'
import AIAtTresVistaV2   from './components/AIAtTresVistaV2'
import NewsletterV2      from './components/NewsletterV2'
import ContactV2         from './components/ContactV2'
import Footer            from '../components/Footer'

export default function HomeV2() {
  return (
    <main style={{ backgroundColor: '#07122B' }}>
      <NavbarV2 />
      <HeroV2 />
      <ProblemV2 />
      <WorkflowsV2 />
      <EIOSectionV2 />
      <InsightsV2 />
      <AIAtTresVistaV2 />
      <NewsletterV2 />
      <ContactV2 />
      <div style={{ borderRadius: '64px 64px 0 0', overflow: 'hidden', marginTop: '-64px', position: 'relative', zIndex: 9 }}>
        <Footer />
      </div>
    </main>
  )
}
