import { useEffect, useState } from "react";

interface Props {
  airport?: string;
}

export default function FlightSearch({ airport }: Props) {
  const [state, setState] = useState("idle");

  useEffect(() => {
    if (airport) {
      setState(airport);
    }
  });

  return <div>Test</div>;
}
