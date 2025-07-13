import { Component } from 'react';
import type { CardMetaProps } from '../../types/CardMetaProps';
import styles from './styles.module.css';

export class CardMeta extends Component<CardMetaProps> {
  render() {
    return (
      <div className={styles.cardMeta}>
        <h4 className={styles.cardMetaH4}>
          <span className={styles.cardMetaSpan}>height:</span>
          {this.props.data.height}
        </h4>
        <h4 className={styles.cardMetaH4}>
          <span className={styles.cardMetaSpan}>weight:</span>
          {this.props.data.weight}
        </h4>
        <h4 className={styles.cardMetaH4}>
          <span className={styles.cardMetaSpan}>base experience:</span>
          {this.props.data.base_experience}
        </h4>
      </div>
    );
  }
}
