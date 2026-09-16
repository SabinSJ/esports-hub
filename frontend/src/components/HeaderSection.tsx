'use client';

import { useRouter } from 'next/navigation';

import styles from './HeaderSection.module.css';

interface Props {
  topBarColor?: string;
  backLabel?: string;
  meta?: Array<{ type: 'text' | 'dot'; value: string }>;
  children?: React.ReactNode;
  stats?: Array<{ label: string; value: string | number; color?: string }>;
}

export default function HeaderSection({
  topBarColor,
  backLabel = 'Back',
  meta = [],
  children,
  stats,
}: Props) {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <div className={styles.wrapper}>
      {topBarColor && (
        <div className={styles.topBar} style={{ background: topBarColor }} />
      )}

      <div className={styles.inner}>
        {onBack && (
          <button onClick={onBack} className={styles.backButton}>
            ← {backLabel}
          </button>
        )}

        {meta.length > 0 && (
          <div className={`${styles.row} ${styles.rowWrap} mb-6`}>
            {meta.map((m, i) =>
              m.type === 'dot' ? (
                <span key={i} className={styles.metaDot}>
                  ·
                </span>
              ) : (
                <span key={i} className={styles.metaText}>
                  {m.value}
                </span>
              )
            )}
          </div>
        )}

        {children}

        {stats && (
          <div className={styles.statGrid}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statBox}>
                <div className={styles.statLabel}>{s.label}</div>
                <div
                  className={styles.statValue}
                  style={{ color: s.color || 'white' }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
