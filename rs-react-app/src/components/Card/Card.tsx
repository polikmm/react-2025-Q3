import { Component } from "react";
import { CardMeta } from "../CardMeta/CardMeta";
import type { CardItem } from "../../types/CardItem";
import styles from "./styles.module.css";

export class Card extends Component<CardItem> {
  render() {
    return (
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{this.props.name}</h2>
        <CardMeta  data={this.props}/>
      </div>
    )
  }
}
