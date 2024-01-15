import { useOutlet } from 'react-router-dom';

export default function ExposedWrapper() {
  const outlet = useOutlet();
  return <>{outlet}</>;
}
