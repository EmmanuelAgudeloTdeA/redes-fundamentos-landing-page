import type { ReactNode } from 'react';

interface ContentBlockProps {
  index: number;
  title: string;
  children: ReactNode;
  isLast?: boolean;
  tinted?: boolean;
}

export function ContentBlock({ index, title, children, isLast = false, tinted = false }: ContentBlockProps) {
  return (
    <div className={`flex gap-3.5 py-7 sm:gap-5 ${isLast ? '' : 'border-b border-line'}`}>
      <div
        className={`font-display flex h-[30px] w-[30px] flex-none items-center justify-center rounded-lg border border-line text-[13px] font-bold text-ink-400 ${
          tinted ? 'bg-white' : 'bg-paper'
        }`}
      >
        {index}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-display mb-2 text-[15px] font-semibold text-ink-900 sm:text-base">{title}</div>
        {children}
      </div>
    </div>
  );
}
