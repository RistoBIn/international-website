import React from 'react';
import classNames from 'classnames';
import styles from './DomainTable.module.scss';

const DomainTable = ({ domains }) => {
  if (!domains || domains.length < 1) return <></>;
  return (
    <>
      {/* <ColorDescription /> */}
      <table className={classNames('table', 'is-fullwidth', styles.table)}>
        <thead className={styles.head}>
          <tr>
            <th>Oppdretter</th>
            <th className="is-hidden-mobile">Lokalitet</th>
            <th>Domene</th>
            <th className="is-hidden-mobile">Status</th>
          </tr>
        </thead>
        <tfoot className={styles.foot}>
          <tr>
            <th>Oppdretter</th>
            <th className="is-hidden-mobile">Lokalitet</th>
            <th>Domene</th>
            <th className="is-hidden-mobile">Status</th>
          </tr>
        </tfoot>
        <tbody className={styles.body}>
          {domains.map(domainItem => (
            <TableItem
              domain={domainItem.DOMENE}
              company={domainItem.OPPDRETTER}
              location={domainItem.LOKALITET}
              domainStatus={domainItem.STATUS}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

const TableItem = ({ domain, company, domainStatus, location }) => {
  let status = domainStatus;
  const isActive = status.toLowerCase() === 'aktiv';
  if (status.length < 1 || status.toLowerCase() === 'tilgjengelig')
    status = 'Tilgjengelig';
  return (
    <tr className={classNames({ [styles.green]: isActive }, styles.tableItem)}>
      <td>
        <p className={styles.company}>{company}</p>
      </td>
      <td className="is-hidden-mobile">
        <p className={classNames(styles.location)}>{location}</p>
      </td>
      <td>
        <p className={styles.domain}>{domain}</p>
      </td>
      <td className="is-hidden-mobile">
        <p className={classNames(styles.status, 'paragraph')}>{status}</p>
      </td>
    </tr>
  );
};

// const ColorDescription = () => (
//   <div className={classNames('is-hidden-tablet')}>
//     <ColorDescriptionItem
//       description="Kan kjøpes"
//       classNameDot={styles.greenDot}
//     />
//     <ColorDescriptionItem
//       description="Aktivt domene under SEALAB"
//       classNameDot={styles.yellowDot}
//     />
//     <ColorDescriptionItem
//       description="Ikke tilgjengelig for kjøp"
//       classNameDot={styles.redDot}
//     />
//   </div>
// );

// const ColorDescriptionItem = ({ classNameDot, description }) => (
//   <div className={styles.colorDescriptionItem}>
//     <div className={classNameDot} />
//     <p>{description}</p>
//   </div>
// );

export default DomainTable;
