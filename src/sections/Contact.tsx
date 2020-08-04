import React from 'react';

import { Section } from '../components/Section';
import styled from 'styled-components';

interface IState {
  status: string;
  sending: boolean;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    color: var(--secondary);
    margin: 10px 5px;
    display: block;
  }

  input,
  textarea {
    width: 100%;
    font-size: 1.5em;
    padding: 5px;
    border-radius: 8px;
  }

  button {
    background-color: #f35fb4;
    color: #fff;
    text-transform: uppercase;
    border-radius: 8px;
    padding: 10px;
    font-size: 1.3em;
    margin: 30px 0;
    border: none;
    transition: 0.2s ease;
  }

  button:disabled {
    color: rgba(16, 16, 16, 0.5);
    background-color: rgba(239, 239, 239, 0.3);
  }
`;

export class Contact extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      status: '',
      sending: false
    };
  }

  setSending = (sending: boolean) => this.setState({ sending });

  submitForm = (ev: any) => {
    this.setSending(true);
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: 'SUCCESS', sending: false });
      } else {
        this.setState({ status: 'ERROR', sending: false });
      }
    };
    xhr.send(data);
  };

  render() {
    const { status, sending } = this.state;
    return (
      <Section id={'contact'}>
        <h2 className="title">Contact</h2>
        <Form onSubmit={this.submitForm} action="https://formspree.io/mbjzwznb" method="POST">
          <label>Your Name:</label>

          <input required type="text" name="name" />

          <label>Email:</label>

          <input required type="email" name="email" />

          <label>Message:</label>

          <textarea required name="message" />

          {status === 'SUCCESS' ? (
            <p>Your message has been sent!</p>
          ) : (
            <button disabled={sending}>{sending ? 'Sending...' : 'Send'}</button>
          )}
          {status === 'ERROR' && <p>Ooops! There was an error.</p>}
        </Form>
      </Section>
    );
  }
}
