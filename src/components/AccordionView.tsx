import React from "react";
import { List } from "react-native-paper";

interface AccordionProps {
  description: string;
  buyPrice: number;
  stock: number;
}

export default function AccordionView({ description, buyPrice, stock }: AccordionProps) {
  return (
    <List.Section>
      <List.Accordion title="Description" left={(props) => <List.Icon {...props} icon="information" />}>
        <List.Item title={description} />
      </List.Accordion>

      <List.Accordion title="Prix d'achat" left={(props) => <List.Icon {...props} icon="cash" />}>
        <List.Item title={`${buyPrice} FCFA`} />
      </List.Accordion>

      <List.Accordion title="Stock disponible" left={(props) => <List.Icon {...props} icon="cube" />}>
        <List.Item title={`${stock} unités`} />
      </List.Accordion>
    </List.Section>
  );
}
