import { ReactNode } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';

export default function TitleText(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={twMerge('font-bold text-2xl text-slate-600', props.className)}
    >
      {props.children}
    </h1>
  );
}
