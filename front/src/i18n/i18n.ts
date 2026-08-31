import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './es.json';

// Spanish is the only supported language today; the resource bundle is kept
// under its own key so additional languages can be added without touching
// the components that consume translations.
void i18next.use(initReactI18next).init({
  resources: {
    es: { translation: es },
  },
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
