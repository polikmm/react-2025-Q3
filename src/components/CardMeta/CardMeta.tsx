import type { CardMetaProps } from '../../types/CardMetaProps';
import './styles.css';

export function CardMeta({ data }: CardMetaProps) {
  return (
    <div className="cardMeta" data-testid="cardMeta">
      <h4 className="cardMetaH4">
        <span className="cardMetaSpan">height:</span>
        {data.height}
      </h4>
      <h4 className="cardMetaH4">
        <span className="cardMetaSpan">weight:</span>
        {data.weight}
      </h4>
      <h4 className="cardMetaH4">
        <span className="cardMetaSpan">base experience:</span>
        {data.base_experience}
      </h4>
    </div>
  );
}
