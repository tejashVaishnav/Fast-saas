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
  userFirstname: string | null | undefined;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ReciptEmail = ({ userFirstname }: KoalaWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Welcome aboard! We&apos;re thrilled to have you as a new subscriber. 🎊
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
        <Text style={paragraph}>
          Welcome aboard! We&apos;re thrilled to have you as a new subscriber.
          🎊
        </Text>
        <Text style={paragraph}>Hi {userFirstname},</Text>

        <Text style={paragraph}>
          Get ready for some amazing content, exclusive perks, and a whole lot
          of fun. Your journey with us is just beginning, and we can&apos;t wait to
          make every moment special. If you have any questions or need
          assistance, we&apos;re just a click away!
        </Text>
        <Text style={paragraph}>
        Cheers to new adventures,
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

ReciptEmail.PreviewProps = {
  userFirstname: "Tejas",
} as KoalaWelcomeEmailProps;

export default ReciptEmail;

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
