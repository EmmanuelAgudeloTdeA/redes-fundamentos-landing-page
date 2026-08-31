import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 px-4 py-6 text-center text-sm text-slate-400">
      <p>{t('footer.text')}</p>
    </footer>
  );
}
