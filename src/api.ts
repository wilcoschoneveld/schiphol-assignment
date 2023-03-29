import { fetch } from "cross-fetch";

export interface Flight {
    flightIdentifier: string;
    flightNumber: string;
    airport: string;
    date: string;
    expectedTime: string;
    originalTime: string;
    url: string;
    score: string;
}

interface ApiResponse {
    flights: Flight[];
}

async function fetchData(
    airport: string,
    dateAscending: boolean,
    signal?: AbortSignal,
    limit = 5
) {
    const response = await fetch(
        "http://localhost:3000/flights?" +
            new URLSearchParams({
                airport,
                limit: limit.toString(),
                order_by: dateAscending ? "date:asc" : "date:desc",
            }),
        { signal }
    );

    const data = await response.json();
    return data as ApiResponse;
}

export { fetchData };
