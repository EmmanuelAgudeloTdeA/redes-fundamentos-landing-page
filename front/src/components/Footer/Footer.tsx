import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-ink-900 px-4 py-[22px] text-center text-[13px] text-slate-400 sm:py-7">
      <p>{t('footer.text')}</p>
    </footer>
  );
}
