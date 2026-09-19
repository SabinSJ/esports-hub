export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface ErrorForm {
  username?: string;
  email?: string;
  password?: string;
  general?: string;
}

export interface UseAuthFormOptions<T> {
  initialValues: T;
  validate: (values: T) => ErrorForm;
  onSubmit: (values: T) => Promise<void>;
}
