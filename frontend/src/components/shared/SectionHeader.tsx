import styles from './SectionHeader.module.css';

interface Props {
  title: string;
  action?: { label: string; onClick: () => void };
}
const SectionHeader = ({ title, action }: Props) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        <span className={styles.bar} />
        {title}
      </h2>

      {action && (
        <button onClick={action.onClick} className={styles.action}>
          {action.label} →
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
