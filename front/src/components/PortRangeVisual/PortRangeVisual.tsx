import type { PortRange, StatItem } from '../../types/content';

interface PortRangeVisualProps {
  stats: StatItem[];
  ranges: PortRange[];
}

const BAND_BACKGROUND_CLASSES = ['bg-ink-900 text-white', 'bg-ink-700 text-white', 'bg-slate-200 text-ink-800'];
const BAND_LABEL_CLASSES = ['text-slate-400', 'text-slate-300', 'text-ink-600'];

export function PortRangeVisual({ stats, ranges }: PortRangeVisualProps) {
  return (
    <>
      <div className="mt-[22px] flex flex-wrap gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[10px] border border-line bg-white px-4 py-2.5">
            <div className="font-display text-lg font-bold text-ink-900">{stat.value}</div>
            <div className="mt-0.5 text-[11.5px] text-ink-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-line bg-white p-[22px]">
        {ranges.map((band, index) => (
          <div
            key={band.range}
            className={`rounded-[9px] px-4 py-3.5 ${index < ranges.length - 1 ? 'mb-2.5' : ''} ${BAND_BACKGROUND_CLASSES[index]}`}
          >
            <div className="font-display text-[12.5px] font-semibold">{band.range}</div>
            <div className={`mt-0.5 text-xs ${BAND_LABEL_CLASSES[index]}`}>{band.label}</div>
            {band.badges && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {band.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
