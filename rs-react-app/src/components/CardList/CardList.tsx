import { Component } from "react";
import type { CardListState } from "../../types/CardListState";
import { Card } from "../Card/Card";
import styles from "./styles.module.css";
import type { CardListProp } from "../../types/CardListProp";

export default class CardList extends Component<CardListProp, CardListState> {
  render() {
    return (
      <div className={styles.cardList}>
        {this.props.data?.length > 0 && this.props.data.map((item) => (<Card name={item.name}
          base_experience={item.base_experience}
          height={item.height}
          weight={item.weight} />))}
      </div>
    )
  }
}