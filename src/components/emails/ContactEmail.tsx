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
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  phone,
  company,
  service,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nuevo mensaje de contacto de {name} - Infocod</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nuevo Lead: {name}</Heading>
          <Text style={text}>
            <strong>Correo:</strong> {email}
          </Text>
          {phone && phone !== 'No proporcionado' && (
            <Text style={text}>
              <strong>Teléfono:</strong> {phone}
            </Text>
          )}
          {company && company !== 'No especificada' && (
            <Text style={text}>
              <strong>Empresa:</strong> {company}
            </Text>
          )}
          {service && service !== 'General' && (
            <Text style={text}>
              <strong>Servicio de interés:</strong> {service}
            </Text>
          )}
          <Hr style={hr} />
          <Section>
            <Text style={text}>
              <strong>Mensaje:</strong>
            </Text>
            <Text style={messageText}>{message}</Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Este correo fue enviado desde el formulario de contacto de Infocod para infocod.codes@gmail.com.
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
