import { useState } from 'react';
import { getImageUrl } from '../../services';

const FALLBACK_PATTERN =
  'repeating-linear-gradient(135deg, #f1f5f9 0px, #f1f5f9 10px, #f8fafc 10px, #f8fafc 20px)';

interface TopicImageProps {
  topic: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export function TopicImage({ topic, alt, className = '', fallbackClassName }: TopicImageProps) {
  const [hasFailed, setHasFailed] = useState(false);

  if (hasFailed) {
    return (
      <div
        className={`flex items-center justify-center border-[1.5px] border-dashed border-slate-300 p-4 text-center font-medium text-ink-400 ${
          fallbackClassName ?? className
        }`}
        style={{ backgroundImage: FALLBACK_PATTERN }}
      >
        {alt}
      </div>
    );
  }

  return (
    <img
      className={className}
      src={getImageUrl(topic)}
      alt={alt}
      loading="lazy"
      onError={() => setHasFailed(true)}
    />
  );
}
