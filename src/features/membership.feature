Feature: Booking Management

Background:
    Given User navigates to the application
    And User logs in

Scenario: Verify that the user can create a Membership Plan
    Given that the user is on the Memberships page
    When the user clicks on the plus button for new Membership Plan
    And the user inserts name in Membership Name input
    And the user selects a Booking Group from member dropdown
    And the user clicks the save button for Membership Plan modal
    Then the membership should be created
