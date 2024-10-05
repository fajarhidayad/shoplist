import { ReactNode } from 'react';

export default function Separator(props: { children?: ReactNode }) {
  return (
    <div className="flex items-center my-4">
      <div className="flex-grow border-t border-gray-300"></div>
      {props.children}
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}
