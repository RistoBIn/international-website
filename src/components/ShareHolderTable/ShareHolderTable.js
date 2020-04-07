import React from 'react';
import classNames from 'classnames';
import styles from './ShareHolderTable.module.scss';

const ShareHolderTable = ({ shareholders }) => {
  if (
    !shareholders ||
    shareholders.length < 1 ||
    !shareholders[0].name ||
    !shareholders[0].shares
  )
    return <></>;
  return (
    <>
      {/* <ColorDescription /> */}
      <table className={classNames('table', 'is-fullwidth', styles.table)}>
        <thead className={styles.head}>
          <tr>
            <th>Rank</th>
            <th>Shareholders</th>
            <th>Shares</th>
            <th className="is-hidden-mobile">% of shares</th>
            <th className="is-hidden-mobile">Account type</th>
            <th className="is-hidden-mobile">Country</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {shareholders.map((shareholderItem, index) => (
            <TableItem
              rank={index + 1}
              shareholder={shareholderItem.name}
              shares={shareholderItem.shares}
              percentOfShares={shareholderItem.percentage}
              accountType={shareholderItem.accountType}
              country={shareholderItem.country}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

const TableItem = ({
  rank,
  shareholder,
  shares,
  percentOfShares,
  accountType,
  country,
}) => {
  return (
    <tr className={classNames(styles.tableItem)}>
      <td>
        <p className={styles.tableItem__rank}>{rank}</p>
      </td>
      <td>
        <p className={classNames(styles.tableItem__shareholder)}>
          {shareholder}
        </p>
      </td>
      <td>
        <p className={classNames(styles.tableItem__shares)}>{shares}</p>
      </td>
      <td className="is-hidden-mobile">
        <p className={styles.tableItem__percentOfShares}>
          {percentOfShares * 100}
        </p>
      </td>
      <td className="is-hidden-mobile">
        <p className={styles.tableItem__accountType}>{accountType}</p>
      </td>
      <td className="is-hidden-mobile">
        <p className={styles.tableItem__country}>{country}</p>
      </td>
    </tr>
  );
};

export default ShareHolderTable;
