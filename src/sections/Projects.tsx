import React from 'react';

import { Section } from '../components/Section';
import { CardList } from '../components/CardList';

import Post from '../models/Post';

interface IProps {
  edges: { node: Post }[];
}

export const Projects = ({ edges }: IProps) => {
  return (
    <Section id={'projects'}>
      <h2 className="title">Projects</h2>

      {edges ? <CardList edges={edges} /> : <p>No Projects Found</p>}
    </Section>
  );
};
