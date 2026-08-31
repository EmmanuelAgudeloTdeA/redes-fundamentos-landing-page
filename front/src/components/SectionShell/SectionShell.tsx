import type { ReactNode } from 'react';

interface SectionShellProps {
  id: string;
  icon: ReactNode;
  title: string;
  tinted?: boolean;
  children: ReactNode;
}

export function SectionShell({ id, icon, title, tinted = false, children }: SectionShellProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 border-t border-line px-6 py-12 sm:px-20 sm:py-[88px] ${tinted ? 'bg-paper' : 'bg-white'}`}
    >
      <div className="mb-6 flex items-center gap-3.5">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] bg-ink-900 text-white">
          {icon}
        </div>
        <h2 className="font-display text-[20px] text-ink-900 sm:text-[28px]">{title}</h2>
      </div>
      {children}
    </section>
  );
}
