import { Component } from 'react';
import type { CardMetaProps } from '../../types/CardMetaProps';
import './styles.css';

export class CardMeta extends Component<CardMetaProps> {
  render() {
    return (
      <div className="cardMeta" data-testid="cardMeta">
        <h4 className="cardMetaH4">
          <span className="cardMetaSpan">height:</span>
          {this.props.data.height}
        </h4>
        <h4 className="cardMetaH4">
          <span className="cardMetaSpan">weight:</span>
          {this.props.data.weight}
        </h4>
        <h4 className="cardMetaH4">
          <span className="cardMetaSpan">base experience:</span>
          {this.props.data.base_experience}
        </h4>
      </div>
    );
  }
}
