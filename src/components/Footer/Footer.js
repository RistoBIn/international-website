import React from 'react';
import { Link } from 'gatsby';
import PartnersLogos from '../PartnersLogos';
import SealabLogo from '../../img/logo.inline.svg';
import MailIcon from '../../img/envelope.inline.svg';
import PhoneIcon from '../../img/phone.inline.svg';
import Button from '../Button';
import { cleanPath } from '../../utils/paths';

const year = new Date().getFullYear();

const Footer = ({
  phone,
  email,
  mainNavigation,
  hardwareNavigation,
  softwareNavigation,
  secondaryNavigation,
  callToAction,
  companyOffices,
}) => {
  return (
    <footer className="footer">
      <PartnersLogos />

      <div className="has-dark-background">
        <div className="container">
          <section id="footer-navigation" className="section is-small">
            <div className="columns">
              <List title="Hovedsider" navigationItems={mainNavigation} />
              <List
                title="BlueThink Apper"
                navigationItems={softwareNavigation}
              />
              <List title="Hardware" navigationItems={hardwareNavigation} />
              <List title="Om" navigationItems={secondaryNavigation} />
            </div>
          </section>
          <section id="company-information" className="section is-small">
            <div className="columns">
              <div className="column is-3">
                <h3 className="is-red">Kontakt</h3>
                <p>
                  <span>
                    <MailIcon />
                  </span>
                  {email}
                </p>
                <p>
                  <span>
                    <PhoneIcon />
                  </span>
                  {phone}
                </p>
              </div>
              {companyOffices.map(office => (
                <div className="column is-3">
                  <h3>{office.title}</h3>
                  <StringList items={office.addressItems} />
                </div>
              ))}
            </div>
          </section>
          <section id="book-demo" className="section is-small">
            <div className="text">
              <h3>{callToAction.title}</h3>
              <p>{callToAction.description}</p>
            </div>
            <Button
              text={callToAction.buttonText}
              className="is-primary large"
              link={callToAction.buttonPath}
            />
          </section>
          <section id="copyright" className="section is-small">
            <SealabLogo />
            <div className="copyright-text">
              <p>Copyright © SEALAB AS {year}</p>
              <Link to="/personvern">Personvernerklæring</Link>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
};

const StringList = ({ items }) => (
  <ul>
    {items.map(item => (
      <li>
        <p>{item}</p>
      </li>
    ))}
  </ul>
);

const List = ({ title, navigationItems }) => (
  <div className="column is-3">
    <h3>{title}</h3>
    <ul>
      {navigationItems.map(item => (
        <li key={item.title ? item.title : item}>
          {item.path ? (
            <Link to={cleanPath(item.path)}>{item.title}</Link>
          ) : (
            <p>{item}</p>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
