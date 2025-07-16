import { Component } from 'react';
import type { CardListState } from '../../types/CardListState';
import { Card } from '../Card/Card';
import './styles.css';
import type { CardListProp } from '../../types/CardListProp';
import { Button } from '../Button/Button';

export default class CardList extends Component<CardListProp, CardListState> {
  render() {
    return (
      <>
        <div className="cardList">
          {this.props.data?.length > 0 &&
            this.props.data.map((item) => (
              <Card
                key={item.name}
                name={item.name}
                base_experience={item.base_experience}
                height={item.height}
                weight={item.weight}
              />
            ))}
        </div>
        <Button onClick={this.props.handleThrowError} text="error" />
      </>
    );
  }
}
