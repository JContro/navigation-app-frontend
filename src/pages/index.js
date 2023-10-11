import Head from 'next/head';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';
import Button from '@components/Button';

import styles from '@styles/Home.module.scss';

const DEFAULT_CENTER = [51.51297635567389, -0.117451976654785]

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Deception in Navigation Application</title>
        <meta name="description" content="Deception in Navigation App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <Container>
          <h1 className={styles.title}>
          Deception in Navigation Application
          </h1>

          <Map className={styles.homeMap} width="800" height="400" center={DEFAULT_CENTER} zoom={12}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={DEFAULT_CENTER}>
                  <Popup>
                    Some delicious text to add here if helpful
                  </Popup>
                </Marker>
              </>
            )}
          </Map>

          <p className={styles.description}>
            <code className={styles.code}>Start by adding some deception</code>
          </p>

          <p className={styles.view}>
            Some scenario here
            {/* <Button href="https://github.com/colbyfayock/next-leaflet-starter">Vew on GitHub</Button> */}
          </p>
        </Container>
      </Section>
    </Layout>
  )
}
