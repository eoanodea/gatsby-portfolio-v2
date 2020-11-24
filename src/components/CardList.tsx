import * as React from 'react';
import { Card } from './Card';

export const CardList = (props: any) => {
  const [activeCard, setActiveCard] = React.useState<number | null>(null);

  const toggleCard = (i: number | null) => {
    setActiveCard(i);
  };
  console.log(props.edges, 'yeeahaw');

  return (
    <ul className="card-list">
      {props.edges.map(({ node }: any, i: number) => {
        console.log('node', node.html);
        const card = node.frontmatter;
        const isSelected = activeCard !== null && activeCard === i;

        return <Card key={i} toggleActiveCard={toggleCard} cardI={i} isSelected={isSelected} html={node.html} {...card} />;
      })}
    </ul>
  );
};
