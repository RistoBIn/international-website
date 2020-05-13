import React from 'react';
import ContactFormProduct from '../../../components/ContactFormProduct';
import Layout from '../../../components/Layout';
import Title from '../../../components/Title';
import Hero from '../../../components/HeroBackgroundImage';
import backgroundImage from '../../../img/tablet-holding-portrait.jpg';

export const OrderProduct = () => {
  return (
    <>
      <Layout>
        <Hero
          heading="BlueThink™ GO - Order product"
          subheading="The next generation of control room is mobile; report your interest today."
          backgroundImage={backgroundImage}
          buttonPath="#report-interest"
          buttonText="Interested? Contact us for more information"
        />

        <section id="meld-interesse" className="section has-dark-background">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3 has-text-centered">
                <Title
                  title="Interested? Contact us for more information"
                  description="Contact us if you're interested. We're looking forward to tell you more about what BlueThink GO is, and what it is going to be. "
                  position="center"
                />
                <ContactFormProduct
                  formName="bluethink-go"
                  action="/products/bluethink-go/thanks/"
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
