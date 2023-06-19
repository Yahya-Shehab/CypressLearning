Feature: Sign in conduit account

    Scenario: Vallid Sign in
        Given Open Sign in page
        When Fill valid email and password, then submit sign in
        Then Home page for valid account should appeared