import { IBookingGroupData } from "../types/bookingEngine.type";
import { memberData } from "../types/member.type";
import { scheduleData, startAndEndDate } from "../types/reservation.type";
import { GenerateRandomStrings, extractHoursWithIndexAndValueConstraint } from "./generateRandomStrings";

export class StringUtils {
    static generateRandomUserData(): memberData {
        const firstNameList: string[] = ['Petru', "Ioana", "Ana", "Iulia", "Vektor"]
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

    static generateRandomReservationData(): scheduleData {
        const randomTwoDigitNumber = Math.floor(Math.random() * 60) + 1;
        const scheduleName = GenerateRandomStrings.generateRandomName()
        const firstArray = ['12:30a','1:00a','1:30a','2:00a','2:30a','3:00a','3:30a','4:00a','4:30a','5:00a','5:30a','6:00a','6:30a','7:00a','7:30a','8:00a','8:30a','9:00a','9:30a','10:00a','10:30a','11:00a','11:30a','12:00p','12:30p','1:00p','1:30p','2:00p','2:30p','3:00p','3:30p','4:00p','4:30p','5:00p','5:30p','6:00p','6:30p','7:00p','7:30p','8:00p','8:30p','9:00p','9:30p','10:00p','10:30p'];
        const secondArray = ['12:30a','1:00a','1:30a','2:00a','2:30a','3:00a','3:30a','4:00a','4:30a','5:00a','5:30a','6:00a','6:30a','7:00a','7:30a','8:00a','8:30a','9:00a','9:30a','10:00a','10:30a','11:00a','11:30a','12:00p','12:30p','1:00p','1:30p','2:00p','2:30p','3:00p','3:30p','4:00p','4:30p','5:00p','5:30p','6:00p','6:30p','7:00p','7:30p','8:00p','8:30p','9:00p','9:30p','10:00p','10:30p'];
        const overrideNames: string[] = ['Petru Override', "Ioana Override", "Ana Override", "Iulia Override", "Vektor Override"]

        const overrideName = overrideNames[Math.floor(Math.random() * overrideNames.length)]
        const overrideAmount = Math.floor(Math.random() * 90) + 10;
          
        const {hourFromFirstArray, hourFromSecondArray}: startAndEndDate | any = extractHoursWithIndexAndValueConstraint(firstArray, secondArray);

        return {
            randomTwoDigitNumber,
            scheduleName,
            hourFromFirstArray,
            hourFromSecondArray,
            overrideName,
            overrideAmount,
        } 
    }
}

