export enum CalendarButtonNames {
  TODAY = "today",
  TOMORROW = "tomorrow",
  TWO_DAYS_FROM_TODAY = "two days from today",
  THREE_DAYS_FROM_TODAY = "three days from today",
  FOUR_DAYS_FROM_TODAY = "four days from today",
  FIVE_DAYS_FROM_TODAY = "five days from today",
  RETURN_TO_TODAY = "return to today",
}

export enum ReservationData {
    START_TIME = "Start Time",
    END_TIME = "End Time"
}

export enum ReservationTabButtons {
    CURRENT_RESERVATION = 'Current Reservation',
    ACCOUNT = 'Account',
    MEMBERSHIP = 'Membership',
    BILLING = "Billing"
}

export enum AccountData {
    FIRST_NAME = 'First Name',
    LAST_NAME = 'Last Name',
    PHONE = 'Phone',
    EMAIL = 'Email'
}

export enum ReservationStatus {
    BOOKED = 'Booked',
    PAID = 'Paid',
    CHECKED_IN = 'Checked In',
    PLAYING = 'Playing',
    NO_SHOW = 'No-Show',
    PENDING = 'Pending'
}

export enum CustomerRelated {
    CREATE_NEW_CUSTOMER = 'Create New Customer',
    SAVE_CUSTOMER = 'Save Customer',
    EDIT_MEMBERSHIP = 'Edit Membership'
}
