import { IBookingGroupData } from "../types/bookingEngine.type";
import { memberData } from "../types/member.type";
import { GenerateRandomStrings } from "./generateRandomStrings";

export class StringUtils {
    static generateRandomUserData(): memberData {
        const firstNameList: string[] = ['Petru', "Ioana", "Ana", "Iulia", "Vektor"];
        const lastNameList: string[] = ['Lutenco', 'Puscac', 'Dorca', 'Cusnir', 'Glavan'] 
        const emailList: string[] = ['petru@tech23.io', 'Ioana@tech.io23', 'ana@tech23.io', 'vektor@tech23.io', 'petru@tech23.io', 'Ioana@tech23.io', 'ana@tech23.io', 'vektor@tech23.io']

        const newFirstNameList: string[] = ['Petru1', "Ioana1", "Ana1", "Iulia1", "Vektor1"];
        const newLastNameList: string[] = ['Lutenco11', 'Puscac11', 'Dorca1', 'Cusnir1', 'Glavan1'] 
        const newEmailList: string[] = ['petru@tech13.io', 'Ioana@tech13.io', 'ana@tech13.io', 'vektor@tech13.io']
        
        const firstName = firstNameList[Math.floor(Math.random() * firstNameList.length)]
        const lastName = lastNameList[Math.floor(Math.random() * lastNameList.length)]
        const email = emailList[Math.floor(Math.random() * emailList.length)]
        const randomNumber = Math.floor(Math.random() * 100000000);
        const phoneNumber = '07' + randomNumber.toString().padStart(8, '0');

        const newFirstName = newFirstNameList[Math.floor(Math.random() * newFirstNameList.length)]
        const newLastName = newLastNameList[Math.floor(Math.random() * newLastNameList.length)]
        const newEmail = newEmailList[Math.floor(Math.random() * newEmailList.length)]
        const newRandomNumber = Math.floor(Math.random() * 100000000);
        const newPhoneNumber = '07' + newRandomNumber.toString().padStart(8, '0');

        return {
            firstName,
            lastName,
            email,
            phoneNumber: parseInt(phoneNumber),
            newFirstName,
            newLastName,
            newEmail,
            newPhoneNumber: parseInt(newPhoneNumber),
        }
    }

    static generateRandomBookingUrl () {
        const baseUrl = "https://tq-golf-dev-booking.azurwebsites.nel";
        const randomSuffix = Math.random().toString(36).substring(2, 8); 
        return `${baseUrl}-${randomSuffix}`;
    }

    static generateRandomBookingGroupData (): IBookingGroupData {
        const groupName = GenerateRandomStrings.generateRandomName()
        const daysInAdvance = Math.floor(Math.random() * 9) + 1;
        const maxConcurrentBookings = Math.floor(Math.random() * 9) + 1;
        const maxConcurrentlyBookedHours = Math.floor(Math.random() * 9) + 1;
        const maxHoursPerDay = Math.floor(Math.random() * 9) + 1;
        const maxHoursPerMonth = Math.floor(Math.random() * 90) + 10;
        return {
            groupName,
            daysInAdvance,
            maxConcurrentBookings,
            maxConcurrentlyBookedHours,
            maxHoursPerDay,
            maxHoursPerMonth,
        }
    }
}

