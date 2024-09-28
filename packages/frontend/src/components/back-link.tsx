import { Link } from '@tanstack/react-router';

export default function BackLink(props: {
  href?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to={props.href}
      onClick={props.onClick}
      className="text-main hover:underline font-bold text-sm"
    >
      &larr; back
    </Link>
  );
}
