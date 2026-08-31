import { ToastContainer } from 'react-toastify';
import { Layout } from './layout';
import { OverviewStrip, ContactForm } from './components';
import { LogicalPortsSection, ProtocolsSection, OsiModelSection } from './sections';

export function App() {
  return (
    <Layout>
      <OverviewStrip />
      <LogicalPortsSection />
      <ProtocolsSection />
      <OsiModelSection />
      <ContactForm />
      <ToastContainer position="bottom-right" autoClose={4000} />
    </Layout>
  );
}

export default App;
