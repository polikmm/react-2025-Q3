import { Component } from 'react';
import { CardMeta } from '../CardMeta/CardMeta';
import type { CardItem } from '../../types/CardItem';
import './styles.css';

export class Card extends Component<CardItem> {
  render() {
    return (
      <div className="card">
        <h2 className="cardTitle">{this.props.name}</h2>
        <CardMeta data={this.props} />
      </div>
    );
  }
}
