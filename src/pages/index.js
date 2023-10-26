import Link from "next/link";
import Layout from "@components/Layout";
import Section from "@components/Section";
import Container from "@components/Container";

export default function Index() {
  return (
    <Layout>
      <Section>
        <Container>
          <h1>Select an Experiment</h1>
          <ul>
            <li>
              <Link href="/simple-waypoint-deception">
                Simple Waypoint Deception
              </Link>
              {/* You can style the Link component or its content if needed */}
            </li>
            {/* Add other experiments here */}
          </ul>
        </Container>
      </Section>
    </Layout>
  );
}
