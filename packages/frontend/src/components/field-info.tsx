import { ReactNode } from 'react';

export default function FieldInfo(props: {
  children: ReactNode;
  isTouched: boolean;
  length: number;
}) {
  return (
    <>
      {props.isTouched && props.length ? (
        <em className="text-red-500 text-xs mt-1">{props.children}</em>
      ) : null}
    </>
  );
}
