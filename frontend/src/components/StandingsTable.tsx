import { Standing } from '@/data/mock';
import { getStandingsColumns } from '@/constants/standings-columns';

import TeamLogo from './TeamLogo';

import styles from './StandingsTable.module.css';

interface Props {
  standings: Standing[];
  compact?: boolean;
  onTeamSelect?: (id: string) => void;
}

const StandingsTable = ({ standings, compact, onTeamSelect }: Props) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            {getStandingsColumns(compact).map((column) => (
              <th
                key={column.key}
                className={`${styles.headerCell} ${styles[`align_${column.align}`]}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {standings.map((s, i) => (
            <tr
              key={s.team.id}
              onClick={() => onTeamSelect?.(s.team.id)}
              className={`${styles.row} 
                ${i === 0 ? styles.rowTop : ''} 
                ${onTeamSelect ? styles.rowClickable : ''}`}
            >
              <td className={styles.cell}>
                <span
                  className={`${styles.rank} ${i === 0 ? styles.rankTop : ''}`}
                >
                  {s.rank}
                </span>
              </td>

              <td className={styles.cell}>
                <div className={styles.teamCell}>
                  <TeamLogo team={s.team} size={28} />
                  <span className={styles.teamName}>{s.team.name}</span>
                </div>
              </td>

              {!compact && (
                <td className={`${styles.cell} ${styles.center}`}>
                  <span className={styles.region}>{s.team.region}</span>
                </td>
              )}

              {getStandingsColumns(compact).map((column) => (
                <td
                  key={column.key}
                  className={`${styles.cell} ${styles.center}`}
                >
                  <span className={styles.statValue}>{s[column.key]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
