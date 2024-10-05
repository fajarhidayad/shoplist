import { Button } from './ui/button';

export default function GoogleButton(props: { onClick?: () => void }) {
  return (
    <Button
      onClick={props.onClick}
      variant={'outline'}
      className="w-full"
      type="button"
    >
      Sign in with Google
    </Button>
  );
}
