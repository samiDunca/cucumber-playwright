Feature: Booking Management

Background:
    Given User navigates to the application
    And User logs in

Scenario: Selecting a Random Slot by given Time and Random Column
        # adding
    When the user click on calendar icon
    And the user selects a date one month appart from current date
    And the user selects a random slot by given Time and Random Column
    Then the user is let to continue based on the slot availability
    When the user selects reservation type
    And  the user selects a member from the dropdown
    And the user selects the duration
    And the user clicks on 'Save' Reservation button
    Then a confirmation message is displayed

        # editing
    When the user clicks on the newly created reservation
    And the user clicks on edit icon
    And the user changes Start Time
    And the user clicks on 'Save' Reservation button
    Then the modification is displayed in the table

        # deleting
    When the user clicks on the newly edited reservation 
    And the user click on the trash icon
    And the user clicks on 'Delete' Reservation button
    Then the reservation disappears from table



Scenario: Selecting a Random Slot by given Column and Random Time
        # adding
    When the user click on calendar icon
    And the user selects a date one month appart from current date
    And the user selects a random slot by given Column and Random Time
    Then the user is let to continue based on the slot availability
    When the user selects reservation type
    And  the user selects a member from the dropdown
    And the user selects the duration
    And the user clicks on 'Save' Reservation button
    Then a confirmation message is displayed

        # deleting
    When the user clicks on the newly edited reservation 
    And the user click on the trash icon
    And the user clicks on 'Delete' Reservation button
    Then the reservation disappears from table






    # When the user changes to 'Booked' status
    # Then the 'Booked' status modification is displayed in the table
    # When the user changes to 'Checked In' status
    # Then the 'Checked In' status modification is displayed in the table
    # When the user changes to 'Playing' status
    # Then the 'Playing' status modification is displayed in the table
    # When the user changes to 'No-Show' status
    # Then the 'No-Show' status modification is displayed in the table
    # When the user changes to 'Pending' status
    # Then the 'Pending' status modification is displayed in the table