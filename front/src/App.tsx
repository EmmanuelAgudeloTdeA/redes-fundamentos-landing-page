import { Layout } from './layout';
import { Section, ContactForm } from './components';

export function App() {
  return (
    <Layout>
      <Section
        id="logical-ports"
        titleKey="logicalPorts.title"
        bodyKey="logicalPorts.body"
        imageAltKey="logicalPorts.imageAlt"
        imageTopic="logical-ports"
      />
      <Section
        id="protocols"
        titleKey="protocols.title"
        bodyKey="protocols.body"
        imageAltKey="protocols.imageAlt"
        imageTopic="protocols"
        reversed
      />
      <Section
        id="osi-model"
        titleKey="osiModel.title"
        bodyKey="osiModel.body"
        imageAltKey="osiModel.imageAlt"
        imageTopic="osi-model"
      />
      <ContactForm />
    </Layout>
  );
}

export default App;
