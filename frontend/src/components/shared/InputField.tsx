import styles from '@/components/shared/InputField.module.css';

interface Props {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  name,
  type,
  value,
  placeholder,
  error,
  onChange,
}: Props) => {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default InputField;
