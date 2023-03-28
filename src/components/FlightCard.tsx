import { Flight } from "../api";

interface Props {
    flight: Flight;
}

export default function FlightCard({ flight }: Props) {
    return (
        <div className="flex m-auto w-max-50 bg-white box-shadow p-1 m-1 gap-1">
            <span>{flight.date}</span>
            <span>{flight.expectedTime}</span>
            <span className="font-bold">{flight.airport}</span>
            <span>{flight.flightNumber}</span>
        </div>
    );
}
