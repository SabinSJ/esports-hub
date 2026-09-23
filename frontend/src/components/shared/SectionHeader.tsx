import Link from 'next/link';
import styles from './SectionHeader.module.css';

interface Props {
  title: string;
  label: string;
  path: string;
}
const SectionHeader = ({ title, label, path }: Props) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        <span className={styles.bar} />
        {title}
      </h2>

      <Link href={path} className={styles.action}>
        {label} →
      </Link>
    </div>
  );
};

export default SectionHeader;
