import React, { useState } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import { number } from 'prop-types';
import Logo from '../../img/logo.inline.svg';
import EnvelopeIcon from '../../img/envelope.inline.svg';
import PhoneIcon from '../../img/phone.inline.svg';
import { cleanPath } from '../../utils/paths';
import { idMaker } from '../../utils/id-maker';
import styles from './Navbar.module.scss';
import { chunk } from '../../utils/lodash';

const gen = idMaker();

export const Navbar = ({
  className,
  menuPaths,
  phone = '+47 729 09 111',
  email = 'contact@sealab.no',
}) => {
  const [isHamburgerMenuActive, setHamburgerMenuActive] = useState(false);
  const [isDropdownActive, setDropdownActive] = useState(false);

  return (
    <>
      <nav
        className={classNames('navbar', className, styles.navbar)}
        role="navigation"
        aria-label="main navigation"
      >
        <div className={classNames('navbar-brand')}>
          <Link to="/" className="navbar-item">
            <figure className="image">
              <Logo />
            </figure>
          </Link>
          <button
            type="button"
            tabIndex={0}
            aria-label="menu"
            aria-expanded="false"
            className={classNames('navbar-burger', 'burger', 'nav-toggle', {
              'is-active': isHamburgerMenuActive,
            })}
            data-target="navbarMenuHeroC"
            onClick={() => setHamburgerMenuActive(!isHamburgerMenuActive)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <div
          id="navbarMenuHeroC"
          className={classNames('navbar-menu', {
            'is-active': isHamburgerMenuActive,
          })}
        >
          <div className="navbar-end">
            <NavbarItems
              setDropdownActive={setDropdownActive}
              menuPaths={menuPaths}
            />

            <div id="contact" className="is-hidden-tablet">
              <div className="info">
                <EnvelopeIcon />
                <p className="subtitle">E-mail</p>
                <a href={`mailto:${email}`} className="is-bold">
                  {email}
                </a>
              </div>
              <div className="info">
                <PhoneIcon />
                <p className="subtitle">Phone</p>
                <a href={`tel:${phone}`} className="is-bold">
                  {phone}
                </a>
              </div>
            </div>
            <div
              className={classNames(
                styles.navbar__button,
                'navbar-item',
                'has-buttons',
                'is-hidden-tablet',
              )}
            >
              <Link className="button is-white" to="/contact/">
                Contact
              </Link>
            </div>
            <div
              className={classNames(
                styles.navbar__button,
                'navbar-item',
                'has-buttons',
              )}
            >
              <Link className="button is-white" to="/sealab-tv-channel/">
                SEALAB TV
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className={classNames(styles.background, 'navbar-background')} />
    </>
  );
};

const NavbarItems = ({ menuPaths }) => {
  return (
    <>
      {menuPaths.map(menuItem => {
        if (
          menuItem.dropdown &&
          typeof menuItem.dropdown !== 'string' &&
          (menuItem.dropdown.highlighted || menuItem.dropdown.regular)
        ) {
          return <MenuDropDown key={gen.next().value} menuItem={menuItem} />;
        }
        return (
          <Link
            key={gen.next().value}
            activeClassName="is-active"
            className={classNames('navbar-item', 'is-tab', styles.navbar__item)}
            to={cleanPath(menuItem.path)}
          >
            {menuItem.title}
          </Link>
        );
      })}
    </>
  );
};

const MenuDropDown = ({ menuItem }) => {
  const [isExpandedMobile, setExpandedMobile] = useState(false);
  let highlightColumns = [];
  let regularColumns = [];
  if (menuItem.dropdown.highlighted)
    highlightColumns = chunk(menuItem.dropdown.highlighted, 4);
  if (menuItem.dropdown.regular)
    regularColumns = chunk(menuItem.dropdown.regular, 5);
  const numberOfColumns = regularColumns.length + highlightColumns.length;
  console.log(numberOfColumns);

  return (
    <div className={classNames(styles.dropdown)}>
      <div
        onKeyDown={() => setExpandedMobile(!isExpandedMobile)}
        role="button"
        tabIndex={0}
        onClick={() => setExpandedMobile(!isExpandedMobile)}
        className={classNames(
          'navbar-link',
          styles.dropdown__button,
          styles.navbar__item,
        )}
      >
        {menuItem.title}
      </div>
      <div
        className={classNames(
          styles.dropdown__content,
          {
            [styles.dropdown__isActive]: isExpandedMobile,
          },
          { [styles.dropdown__content_oneColumn]: numberOfColumns === 1 },
        )}
      >
        <div className={classNames('container', styles.container)}>
          {highlightColumns.map(column => {
            return <DropdownColumn columnItems={column} isHighlighted />;
          })}
          {regularColumns.map(column => {
            return <DropdownColumn columnItems={column} />;
          })}
        </div>
      </div>
    </div>
  );
};

const DropdownColumn = ({ columnItems, isHighlighted }) => (
  <div
    className={classNames('navbar-column', styles.dropdown__column, {
      [styles.dropdown__column_highlighted]: isHighlighted,
    })}
  >
    {columnItems.map(dropdownItem => {
      return (
        <Link
          key={gen.next().value}
          className={classNames(styles.navbar__item, styles.dropdown__item, {
            [styles.dropdown__item__highlighted]: isHighlighted,
          })}
          activeClassName={classNames(
            'is-active',
            styles.dropdown__item_active,
          )}
          to={cleanPath(dropdownItem.path)}
        >
          {dropdownItem.title}
        </Link>
      );
    })}
  </div>
);

export default Navbar;
