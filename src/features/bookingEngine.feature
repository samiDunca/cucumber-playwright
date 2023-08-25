Feature: Edit Booking Url


Background:
    Given User navigates to the application

Scenario: Edit Booking Url

    Given that the user is on the Booking Engine page
    When the user adds or changes the Url link
    And the user press on 'Save' button 
    Then the Url should be saved successfully