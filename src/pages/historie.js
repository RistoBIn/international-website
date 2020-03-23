import React from 'react';
import Layout from '../components/Layout';
import MilanImg from '../img/milan.jpg';
import OscarImg from '../img/oscar.jpg';

const History = () => (
  <Layout>
    <section className="section is-medium blog-content">
      <div className="container content">
        <h1>Historie</h1>
        <p className="subtitle">
          SEALAB ble etablert i 2015, gründerne er far og sønn Milan Marković og
          Oscar Marković. Sammen skapte de noe som senere kom til å bli stort.
          De har jobbet målrettet og har enormt med arbeidskraft. Det har ført
          til at SEALAB er i kraftig vekst, og utviklingen fortsetter.{' '}
        </p>
        <div className="columns">
          <div className="column  is-3">
            <figure className="image">
              <img src={MilanImg} alt="Milan markovic" />
            </figure>
          </div>
          <div className="column">
            <h3>COO, STYRELEDER</h3>
            <p>
              Milan Marković er en entreprenør med mye kunnskap og hardt arbeid
              bak seg. I mange år har han dedikert seg til utvikling innen
              design og teknologi. Sentralt i hans virke er en sjelden blanding
              av forretningsdrift, teknologisk forståelse, kreativitet og
              artistisk ekspertise. Han har evnen til å fokusere, og driver
              prosjekter fremover, god ledelse står helt sentralt i dette.
            </p>
          </div>
        </div>
        <div className="columns">
          <div className="column is-3">
            <figure className="image">
              <img src={OscarImg} alt="Oscar markovic" />
            </figure>
          </div>
          <div className="column">
            <h3>CEO, STYREMEDLEM</h3>
            <p>
              Oscar Marković har de siste fem årene dedikert seg til design og
              teknologiutvikling. Han har veiledet studenter fra avdelingen for
              Teknisk Kybernetikk ved NTNU innen teknologi og produktutvikling.
              I tillegg har han gjort R&D på høyt nivå innen
              undervanns-kameraer, optiske systemer og maskinsyn-løsninger. I
              likhet med Milan Marković har han evnen til å aldri gi opp
              kombinert med et sterkt fokus og svært god ledelse.
            </p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default History;
