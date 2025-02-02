export interface Flight {
  id?: number;
  date: string;
  aircraftType: string;
  registration: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  totalTime: string;
  pilotInCommand: boolean;
  remarks?: string;
}

export class FlightFactory {
  static empty(): Flight {
    return {
      id: undefined,
      date: "",
      aircraftType: "",
      registration: "",
      departure: "",
      arrival: "",
      departureTime: "",
      arrivalTime: "",
      totalTime: "",
      pilotInCommand: true,
      remarks: undefined
    };
  }

  static fromObject(obj: Partial<Flight>): Flight {
    return {
      id: obj.id ?? undefined,
      date: obj.date ?? "",
      aircraftType: obj.aircraftType ?? "",
      registration: obj.registration ?? "",
      departure: obj.departure ?? "",
      arrival: obj.arrival ?? "",
      departureTime: obj.departureTime ?? "",
      arrivalTime: obj.arrivalTime ?? "",
      totalTime: obj.totalTime ?? "",
      pilotInCommand: obj.pilotInCommand ?? true,
      remarks: obj.remarks ?? undefined
    };
  }
}
