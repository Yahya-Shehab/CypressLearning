Feature: Favorite Article

    Scenario: Set article as favorite article
        Given The system has an article
        When Set article on favorite article list

    Scenario: Set article as favorite article
        Given The admin user has an article
        And The system has a user
        And That user likes the admin's article
        When The admin user opens the article page for that article
        Then The article should have the number 1 in favorite button