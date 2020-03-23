import React from 'react';
import Layout from '../components/Layout';
import Livestream from '../components/Livestream';
import Title from '../components/Title';

const World = () => (
  <Layout>
    <section className="section blog-content has-dark-background">
      <div
        className="container content"
        style={{ width: '60vw', margin: 'auto' }}
      >
        <Title
          title="SEALAB WORLD"
          description="Sjekk ut Livestream fra vårt Demo-anlegg"
          position="center"
        />
        <Livestream />
      </div>
    </section>
  </Layout>
);

export default World;
