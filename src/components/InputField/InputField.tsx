import type { InputFieldProps } from '../../types/InputFieldProps';
import './styles.css';
export function InputField({ value, onChange, placeholder }: InputFieldProps) {
  return (
    <input
      className="input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
