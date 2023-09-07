Feature: Booking Management

Background:
    Given User navigates to the application
    And User logs in

Scenario: Create booking selecting a random slot by given Time and Random Column
        # adding
    When the user click on calendar icon
    And the user selects a date one month appart from current date
    And the user selects a random slot by given Time and Random Column
    Then the user is let to continue based on the slot availability
    When the user selects reservation type
    And the user selects a member from the dropdown
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



Scenario: Create booking selecting a random slot by given Column and Random Time
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

Scenario: Select calendar available buttons
	When user clicks on 'tomorrow' button
    Then the selected date 'tomorrow' is displayed
	When user clicks on 'two days from today' button
    Then the selected date 'two days from today' is displayed
	When user clicks on 'three days from today' button
    Then the selected date 'three days from today' is displayed
	When user clicks on 'four days from today' button
    Then the selected date 'four days from today' is displayed
	When user clicks on 'five days from today' button
    Then the selected date 'five days from today' is displayed
    When user clicks on 'six days from today' button
    Then the selected date 'six days from today' is displayed
    When user clicks on 'return to today' button
    Then the selected date 'today' is displayed

Scenario: Add, Edit (reservation, account and membership data) and Delete a Reservation
        # adding
    When the user click on calendar icon
    And the user selects a date one month appart from current date
    And the user selects a random slot by given Column and Random Time
    Then the user is let to continue based on the slot availability
    When the user selects reservation type
    And the user clicks on 'Create New Customer' Reservation button
    And the user inserts in 'First Name' customer input
    And the user inserts in 'Last Name' customer input
    And the user inserts in 'Email' customer input
    And the user inserts in 'Phone' customer input
    And the user clicks on 'Save Customer' Reservation button
    And the user selects the duration
    And the user clicks on 'Save' Reservation button
    Then a confirmation message is displayed
        # editing reservation data
    When the user clicks on the newly created reservation
    And the user clicks on edit icon
    And the user selects tomorrow date
    And the user changes 'Start Time' input
    And the user changes 'End Time' input
    And the user clicks on 'Save' Reservation button
    Then the edited reservation is visible in the table
    	#edit account data
    When the user clicks on the newly edited reservation
    And the user clicks on 'Account' tab button
    And the user inserts in 'First Name' input
    And the user inserts in 'Last Name' input
    And the user inserts in 'Phone' input
    And the user clicks on 'Save' Reservation button
    Then the changes are displayed in the modal
           # editing membership data
    When the user clicks on 'Membership' tab button
    And the user clicks on 'Add a Membership' Reservation button
    And the user selects a membership plan from dropdown
    And the user clicks on 'Save' Reservation button
    Then a message is displayed in the modal
         # delete membership data
    When the user clicks on Tree Dots button
    And the user clicks on 'Deactivate Membership'  
    And the user clicks on 'Deactivate Membership'
    Then the membership is deactivated 
        # deleting the reservation
    When the user clicks on 'Current Reservation' tab button
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