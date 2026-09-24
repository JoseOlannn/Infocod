import * as React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export default function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nuevo mensaje de contacto desde Infocod</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nuevo Lead: {name}</Heading>
          <Text style={text}>
            <strong>Correo:</strong> {email}
          </Text>
          <Hr style={hr} />
          <Section>
            <Text style={text}>
              <strong>Mensaje:</strong>
            </Text>
            <Text style={messageText}>{message}</Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Este correo fue enviado desde el formulario de contacto de Infocod.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '5px',
  boxShadow: '0 5px 10px rgba(20,50,70,.2)',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0 48px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  padding: '0 48px',
};

const messageText = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '16px 48px',
  backgroundColor: '#f9f9f9',
  borderRadius: '4px',
  margin: '0 48px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  padding: '0 48px',
};
