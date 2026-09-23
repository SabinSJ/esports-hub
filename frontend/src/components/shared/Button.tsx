'use client';

import styles from '@/components/shared/Button.module.css';

interface Props<T> {
  data: T;
  buttonTitle?: string;
  active?: boolean;
  onClick: (data: T) => void | Promise<void>;
}

const Button = <T,>({ data, buttonTitle, active, onClick }: Props<T>) => {
  return (
    <button
      className={`${styles.button} ${active ? styles.active : ''}`}
      onClick={() => onClick(data)}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>

      {buttonTitle}
    </button>
  );
};

export default Button;
