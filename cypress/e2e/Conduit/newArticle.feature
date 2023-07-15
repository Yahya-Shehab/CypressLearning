Feature: New Article

    Scenario: Successful publish new article
        Given Open Editor page
        When Fill all elements of article
        And Publish article
        Then The article should be published

    Scenario: Faild publish new article
        Given Open Editor page
        When Fill all elements of article except title
        And Publish article
        Then The article shouldn't be published and error message should be appeared

    Scenario: Faild publish new article
        Given Open Editor page
        When Fill all elements of article except article description
        And Publish article
        Then The article shouldn't be published and error message should be appeared

    Scenario: Faild publish new article
        Given Open Editor page
        When Fill all elements of article except article body
        And Publish article
        Then The article shouldn't be published and error message should be appeared


    Scenario: Article using API
        Given The system has an article


    Scenario: Article using API
        Given The system has an article with popular tag
        When Open Home page
        And Click on popular tag
        Then My article should be appeared


    Scenario: Delete Article
        Given The system has an article
        When Delete Article