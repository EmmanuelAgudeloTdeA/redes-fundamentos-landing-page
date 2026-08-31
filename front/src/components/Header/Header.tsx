import { useTranslation } from 'react-i18next';

const NETWORK_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cg fill='none' stroke='%2338bdf8' stroke-width='1' stroke-opacity='0.35'%3E%3Cline x1='10' y1='10' x2='70' y2='40'/%3E%3Cline x1='70' y1='40' x2='130' y2='15'/%3E%3Cline x1='70' y1='40' x2='55' y2='105'/%3E%3Cline x1='55' y1='105' x2='120' y2='125'/%3E%3C/g%3E%3Cg fill='%2338bdf8' fill-opacity='0.55'%3E%3Ccircle cx='10' cy='10' r='2.5'/%3E%3Ccircle cx='70' cy='40' r='3'/%3E%3Ccircle cx='130' cy='15' r='2.5'/%3E%3Ccircle cx='55' cy='105' r='2.5'/%3E%3Ccircle cx='120' cy='125' r='2.5'/%3E%3C/g%3E%3C/svg%3E\")";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="relative overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_60%),linear-gradient(160deg,#0f172a_0%,#1e293b_55%,#0b1220_100%)] px-7 py-16 text-center sm:px-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{ backgroundImage: NETWORK_PATTERN, backgroundSize: '220px 220px' }}
      />
      <div className="relative z-10">
        <span className="mb-4 inline-flex items-center gap-[7px] rounded-full border border-sky-400/30 bg-sky-400/10 px-3.5 py-1.5 text-[13px] font-medium text-sky-300 sm:mb-[18px]">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
          {t('header.kicker')}
        </span>
        <h1 className="font-display text-[27px] leading-tight text-white sm:mx-auto sm:max-w-[680px] sm:text-[44px]">
          {t('header.title')}
        </h1>
        <p className="mx-auto mt-3.5 max-w-[520px] text-sm leading-relaxed text-slate-300 sm:mt-[22px] sm:text-[17px]">
          {t('header.subtitle')}
        </p>
      </div>
    </header>
  );
}
