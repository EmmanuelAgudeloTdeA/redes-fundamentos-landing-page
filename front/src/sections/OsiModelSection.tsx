import { useTranslation } from 'react-i18next';
import { SectionShell, ContentBlock, OsiStack, TopicImage, LayersIcon } from '../components';
import type { OsiModelContent } from '../types/content';

export function OsiModelSection() {
  const { t } = useTranslation();
  const content = t('osiModel', { returnObjects: true }) as OsiModelContent;
  const [definitionBlock, layersBlock, relevanceBlock] = content.blocks;

  return (
    <SectionShell id="osi-model" icon={<LayersIcon className="h-[19px] w-[19px]" />} title={content.title}>
      <div className="border-t border-line">
        <ContentBlock index={1} title={definitionBlock.title}>
          <div className="relative float-right mb-4 ml-6 w-[55%] pb-6 sm:w-[220px]">
            <TopicImage
              topic="osi-model"
              alt={content.imageAlt}
              className="aspect-[4/3] w-full rounded-xl border border-line object-cover"
              fallbackClassName="aspect-[4/3] w-full rounded-xl border border-line text-[10px]"
            />
            <div className="absolute -right-4 -bottom-1 w-1/2 overflow-hidden rounded-lg border-4 border-white shadow-lg shadow-slate-900/25 sm:-right-6">
              <TopicImage
                topic="osi-model-physical-layer"
                alt={content.physicalLayerImageAlt}
                className="aspect-[4/3] w-full object-cover"
                fallbackClassName="aspect-[4/3] w-full text-[9px]"
              />
            </div>
          </div>
          <p className="text-sm leading-relaxed text-ink-600">{definitionBlock.body}</p>
          <div className="clear-both" />
        </ContentBlock>

        <ContentBlock index={2} title={layersBlock.title}>
          <p className="text-sm leading-relaxed text-ink-600">{layersBlock.intro}</p>
          <OsiStack layers={layersBlock.layers} />
        </ContentBlock>

        <ContentBlock index={3} title={relevanceBlock.title} isLast>
          <p className="max-w-[62ch] text-sm leading-relaxed text-ink-600">{relevanceBlock.body}</p>
        </ContentBlock>
      </div>
    </SectionShell>
  );
}
