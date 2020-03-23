import React from 'react';
import ContactFormProduct from '../../components/ContactFormProduct';
import Layout from '../../components/Layout';
import Title from '../../components/Title';
import Hero from '../../components/HeroBackgroundImage';
import backgroundImage from '../../img/tablet-holding-portrait.jpg';

// style={{ backgroundImage: `url(${backgroundImage})` }}
export const OrderProduct = () => {
  return (
    <>
      <Layout>
        <Hero
          heading="BlueThink™ GO - Meld interesse"
          subheading="Neste generasjons kontrollrom er mobilt, meld din interesse
      allerede i dag."
          backgroundImage={backgroundImage}
          buttonPath="#meld-interesse"
          buttonText="Meld interesse"
        />

        <section id="meld-interesse" className="section has-dark-background">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3 has-text-centered">
                <Title
                  title="Meld interesse"
                  description="Meld din interesse og få tilsendt ytterligere informasjon om
                  tjenesten i tillegg til prisliste. Når skjemaet under er fylt
                  ut og sendt, vil du kontaktes innen kort tid."
                  position="center"
                />
                <ContactFormProduct
                  formName="bluethink-go"
                  action="/bluethink-go/takk"
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default OrderProduct;
