'use client';

import { useRouter } from 'next/navigation';

import styles from './NotFound.module.css';

interface Props {
  value: string;
}

const NotFound = ({ value }: Props) => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>{value} not found</div>

      <button onClick={onBack} className={styles.backButton}>
        ← Back
      </button>
    </div>
  );
};

export default NotFound;
