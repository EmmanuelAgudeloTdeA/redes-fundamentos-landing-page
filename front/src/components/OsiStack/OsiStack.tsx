import type { OsiLayer } from '../../types/content';

interface OsiStackProps {
  layers: OsiLayer[];
}

const LAYER_BACKGROUND_COLORS = ['#0f172a', '#1e293b', '#293548', '#334155', '#3d4c66', '#48597a', '#0ea5e9'];

export function OsiStack({ layers }: OsiStackProps) {
  return (
    <div className="mt-3.5 flex flex-col gap-1.5">
      {layers.map((layer, index) => (
        <div
          key={layer.number}
          className="flex items-center gap-3.5 rounded-[9px] px-4 py-2.5 text-white"
          style={{ backgroundColor: LAYER_BACKGROUND_COLORS[index] }}
        >
          <div className="font-display w-5 flex-none text-[13px] font-bold">{layer.number}</div>
          <div className="font-display w-[98px] flex-none text-[12.5px] font-semibold sm:w-[118px] sm:text-[13.5px]">
            {layer.name}
          </div>
          <div className="hidden text-xs leading-snug opacity-85 sm:block">{layer.description}</div>
        </div>
      ))}
    </div>
  );
}
