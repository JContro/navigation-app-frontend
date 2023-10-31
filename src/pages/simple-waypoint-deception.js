import Head from "next/head";
import { useState } from "react";
import Layout from "@components/Layout";
import Section from "@components/Section";
import Container from "@components/Container";
import Map from "@components/Map";
import Button from "@components/Button";
import { toast, ToastContainer } from "react-toastify";

import styles from "@styles/Home.module.scss";

const DEFAULT_CENTER = [51.51297635567389, -0.117451976654785];

export default function Home() {
  const [markers, setMarkers] = useState([]);
  const [computeEvent, setComputeEvent] = useState(null);

  const resetMarkers = () => {
    setMarkers([]);
  };

  const compute = () => {
    if (markers.length === 3) {
      setComputeEvent(Date.now()); // or any other unique value
    } else {
      toast.error("You have not selected three points: start, waypoint, end");
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <Head>
        <title>Simple Waypoint Deception</title>
        <meta name="description" content="Deception in Navigation App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <Container>
          <h1 className={styles.title}>Simple Waypoint</h1>
          <Section>
            <Container>
              <p className={styles.description}>
                Click on the map to set the START, WAYPOINT, and END points.
              </p>
            </Container>
          </Section>
          <Map
            className={styles.homeMap}
            width="800"
            height="400"
            center={DEFAULT_CENTER}
            zoom={12}
            markers={markers}
            setMarkers={setMarkers}
            computeEvent={computeEvent}
          >
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={DEFAULT_CENTER}>
                  <Popup>Some delicious text to add here if helpful</Popup>
                </Marker>
              </>
            )}
          </Map>
          <p className={styles.description}>
            <Button variant="secondary" onClick={resetMarkers}>
              Reset
            </Button>
            <Button onClick={compute}>Compute</Button>
          </p>

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
  );
}
