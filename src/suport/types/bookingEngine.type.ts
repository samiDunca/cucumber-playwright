import { BookingRulesInputs } from "../enums/bookingEngine.enum";

export interface IBookingRulesObjectInput {
    name: string;
    value: string;
  }
  
  export interface IBookingRulesObjectCheckbox {
    value: string;
    methodName: string;
  }


  export interface IBookingGroupData {
    groupName: string,
    daysInAdvance: number,
    maxConcurrentBookings: number,
    maxConcurrentlyBookedHours: number,
    maxHoursPerDay: number,
    maxHoursPerMonth: number,
  }

  