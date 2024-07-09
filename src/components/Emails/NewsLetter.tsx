import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface KoalaWelcomeEmailProps {
    userFirstName: string | null | undefined;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const Newsletter = ({
    userFirstName,
  }: KoalaWelcomeEmailProps) => (
    <Html>
      <Head />
      <Preview>
        This is the newsletter email template
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* <Img
            src={`https://www.svgrepo.com/show/222196/rocket.svg`}
            width="170"
            height="50"
            alt="Koala"
            style={logo}
          /> */}
          <Text style={paragraph}>Hi {userFirstName},</Text>
          <Text style={paragraph}>
            Welcome to FastSaaS newsletter.
          </Text>
          <Text style={paragraph}>
            Introducing FastSaaS, the top choice for quickly and easily building
            and launching SaaS applications. Ideal for developers and businesses
            looking for a simple setup, FastSaaS removes the usual challenges of
            software development, letting you concentrate on your main business
            goals.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href="https://getkoala.com">
              Get started
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            The FastSaas team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Idk the address you write it here.
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  Newsletter.PreviewProps = {
    userFirstName: "Tejas",
  } as KoalaWelcomeEmailProps;
  
  export default Newsletter;
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };
  
  const logo = {
    margin: "0 auto",
  };
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
  };
  
  const btnContainer = {
    textAlign: "center" as const,
  };
  
  const button = {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
  };
  
  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
  };
  