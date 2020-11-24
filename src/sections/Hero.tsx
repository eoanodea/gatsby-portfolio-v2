import React from 'react';

import { Section } from '../components/Section';
import { Player } from '@lottiefiles/react-lottie-player';

export const Hero = () => (
  <Section id={'home'}>
    <Player
      src="https://assets5.lottiefiles.com/packages/lf20_akvf8jo7.json"
      background="transparent"
      style={{ width: '300px', height: '300px', margin: 0 }}
      loop
      autoplay
    ></Player>

    <h1 className="title">Eoan O'Dea</h1>

    <p className="date">
      Full Stack Developer
      <br />
      Designer & Entrepreneur
    </p>
  </Section>
);
