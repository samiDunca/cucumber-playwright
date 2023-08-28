Feature: User Authentication tests

  Background: 
    Given User navigates to the application

  Scenario: Verify that the login works
    And User enter the username 
    And User enter the password 
    When User click on the signIn button
    Then Login should be success
    
   