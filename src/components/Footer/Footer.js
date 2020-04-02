import React from 'react';
import { Link } from 'gatsby';
import SealabLogo from '../../img/logo.inline.svg';
import MailIcon from '../../img/envelope.inline.svg';
import PhoneIcon from '../../img/phone.inline.svg';
import Button from '../Button';
import { cleanPath } from '../../utils/paths';
import { idMaker } from '../../utils/id-maker';

const gen = idMaker();
const year = new Date().getFullYear();

const Footer = ({
  phone,
  email,
  mainNavigation,
  secondaryNavigation,
  thirdNavigation,
  fourthNavigation,
  callToAction,
  companyOffices,
}) => {
  return (
    <footer className="footer">
      <div className="has-dark-background">
        <div className="container">
          <section id="footer-navigation" className="section is-small">
            <div className="columns is-multiline">
              <List title="Solutions" navigationItems={mainNavigation} />
              <List title="Products" navigationItems={secondaryNavigation} />
              <List title="Projects" navigationItems={thirdNavigation} />
              <List title="About" navigationItems={fourthNavigation} />
            </div>
          </section>
          <section id="company-information" className="section is-small">
            <div className="columns">
              {companyOffices.map(office => (
                <div key={gen.next().value} className="column is-3">
                  <h3>{office.title}</h3>
                  <StringList items={office.addressItems} />
                </div>
              ))}
            </div>
          </section>
          <section id="book-demo" className="section is-small">
            <div className="columns">
              <div className="column is-3 contact-info">
                <h3 className="is-red">Contact</h3>
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
              <div className="column cta is-9">
                <div className="text">
                  <h3>{callToAction.title}</h3>
                  <p>{callToAction.description}</p>
                </div>
                <Button
                  text={callToAction.buttonText}
                  className="is-primary medium"
                  path={callToAction.buttonPath}
                />
              </div>
            </div>
          </section>
          <section id="copyright" className="section is-small">
            <SealabLogo />
            <div className="copyright-text">
              <p>Copyright © SEALAB AS {year}</p>
              <Link to="/personvern">Privacy Policy</Link>
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
      <li key={gen.next().value}>
        <p>{item}</p>
      </li>
    ))}
  </ul>
);

const List = ({ title, navigationItems }) =>
  navigationItems.length <= 4 ? (
    <div className="column is-3">
      <h3>{title}</h3>
      <ul>
        {navigationItems.map(item => (
          <li key={gen.next().value}>
            {item.path ? (
              <Link to={cleanPath(item.path)}>{item.title}</Link>
            ) : (
              <p>{item}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <>
      <div className="column is-3">
        <h3>{title}</h3>
        <ul>
          {navigationItems.slice(0, 4).map(item => (
            <li key={gen.next().value}>
              {item.path ? (
                <Link to={cleanPath(item.path)}>{item.title}</Link>
              ) : (
                <p>{item}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="column is-3">
        <h3 role="presentation" className="is-hidden-mobile">
          <br />
        </h3>
        <ul>
          {navigationItems.slice(4, 8).map(item => (
            <li key={gen.next().value}>
              {item.path ? (
                <Link to={cleanPath(item.path)}>{item.title}</Link>
              ) : (
                <p>{item}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="column is-3">
        <h3 role="presentation" className="is-hidden-mobile">
          <br />
        </h3>
        <ul>
          {navigationItems.slice(8, 12).map(item => (
            <li key={gen.next().value}>
              {item.path ? (
                <Link to={cleanPath(item.path)}>{item.title}</Link>
              ) : (
                <p>{item}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="column is-3">
        <h3 role="presentation" className="is-hidden-mobile">
          <br />
        </h3>
        <ul>
          {navigationItems.slice(12, 16).map(item => (
            <li key={gen.next().value}>
              {item.path ? (
                <Link to={cleanPath(item.path)}>{item.title}</Link>
              ) : (
                <p>{item}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

export default Footer;
