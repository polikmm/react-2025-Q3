import type { ButtonProps } from '../../types/ButtonProps';

export function Button({ onClick, text }: ButtonProps) {
  return <button onClick={onClick}>{text}</button>;
}
