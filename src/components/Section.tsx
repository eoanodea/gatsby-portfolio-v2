import React, { Fragment } from 'react';
import styled from 'styled-components';
import MouseIcon from './MouseIcon';

const SectionContainer = styled.div`
  min-height: 100vh;
  min-width: 320px;
  max-width: 1366px;
  display: flex;
  margin: auto;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  padding: 5em 1em;
  scroll-behavior: smooth;
  position: relative;

  @media (max-width: 500px) {
    padding: 2em 0.2em;
  }
`;

export const Section = ({ children }: any) => <SectionContainer>{children}</SectionContainer>;
