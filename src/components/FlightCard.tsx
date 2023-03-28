import { Flight } from "../api";

interface Props {
    flight: Flight;
}

export default function FlightCard({ flight }: Props) {
    return (
        <div>
            {flight.date}
            {flight.expectedTime}
            {flight.airport}
            {flight.flightNumber}
        </div>
    );
}
