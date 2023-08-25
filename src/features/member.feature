Feature: Add Member

Background:
    Given User navigates to the application

Scenario Outline: Add Member
    And User enter the username 
    And User enter the password 
    When User click on the signIn button
    Then Login should be success
    When the user clicks on the "Members" page button
    And user clicks on + button
    And user insert personal data
    When the user clicks on "save" button
    Then the member should be created

    And the user clicks on an existing Member
    And the user click on the account tab
    And the user is edited with the following data
    When the user clicks on "save" button
    Then the member should be updated 
    # 



    Examples: 
    | username                |   password    |   firstName | lastName    |         email      |      phone       |   newFirstName  |  newLastName  |  newPhone  |
    | samueldunca@yahoo.com   |   Frodo123    |   Sabin     | Negru       |    sabin23@nibas.io  |      456789      |   Sabin1        |  Negru1       |   2323     |   
    # | samueldunca@yahoo.com |   Frodo123    |   David     | Negru       |    david23@divad.io  |      487358023   |   David1        |  Negru1       |   8765     |   
    # | samueldunca@yahoo.com |   Frodo123    |   Elida     | Negru       |    elida23@adile.io  |      222222222   |   Elida1        |  Negru1       |   0000     |   
    
