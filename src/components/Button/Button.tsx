import type { ButtonProps } from '../../types/ButtonProps';

export function Button({ className, onClick, text }: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}
