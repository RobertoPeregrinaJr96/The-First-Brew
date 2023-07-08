# The First Brew

## Database Schema Design

![db-schema]

[db-schema]: ./images/Database_Schema_Design.png

## API Documentation

## Coffee

### Returns All Coffee

- Require Authentication: false
  - Request
    - Method: GET
    - URL: /api/coffee
    - Body: none
  - Successful Response
    - status Code:200
    - Header:
      - Content-Type:application/json
    - Body:
      ```json
      {
          "Coffee":[
             "id": 1,
             "name": "Espresso",
              "price": 2.5,
              "description": " <=== body ===>",
              "createdAt": "2023-06-23T17:09:39.000Z",
              "updatedAt": "2023-06-23T17:09:39.000Z"
              ]
      }
      ```

### Returns Coffee by Id

- Require Authentication: false
  - Request
    - Method: GET
    - URL: /api/coffee/:coffeeId
    - Body: none
  - Successful Response - status Code:200
  - Header:
    - Content-Type:application/json
    - Body:
      ```json
      {
        "id": 1,
        "name": "Espresso",
        "price": 2.5,
        "description": " <=== body ===>",
        "createdAt": "2023-06-23T17:09:39.000Z",
        "updatedAt": "2023-06-23T17:09:39.000Z"
      }
      ```

### Create an Item

- Creates and returns a new Item.

- Require Authentication: true

- Request

  - Method: POST
  - URL: /api/coffee/:coffeeId
  - Headers:

    - Content-Type: application/json
    - Body:

      ```json
      {
        "id": 1,
        "name": "Espresso",
        "price": 2.5,
        "description": " <=== body ===>",
        "createdAt": "2023-06-23T17:09:39.000Z",
        "updatedAt": "2023-06-23T17:09:39.000Z"
      }
      ```

- Successful Response

  - Status Code: 201

  - Headers: - Content-Type: application/json - Body:

    ```json
    {
      "id": 1,
      "name": "Espresso",
      "price": 2.5,
      "description": " <=== body ===>",
      "createdAt": "2023-06-23T17:09:39.000Z",
      "updatedAt": "2023-06-23T17:09:39.000Z"
    }
    ```

- Error Response: Body validation error

  - Status Code: 400

  - Headers:

    - Content-Type: application/json

    - Body:

      ```json

        To be added

      ```

### Return Reviews by Coffee Id

- Require Authentication: false
  - Request
    - Method: GET
    - URL: /api/coffee/:coffeeId/reviews
    - Body: none
  - Successful Response
    - status Code:200
    - Header:
      - Content-Type:application/json
      - Body:
        ```json
        [
          {
            "id": 1,
            "coffeeId": 1,
            "userId": 2,
            "title": "Heavenly Espresso Delight!",
            "rating": 5,
            "review": " <=== body ===>",
            "createdAt": "2023-06-23T17:09:39.000Z",
            "updatedAt": "2023-06-23T17:09:39.000Z",
            "User": {
              "id": 2,
              "firstName": "jane",
              "lastName": "Doe",
              "phoneNumber": 2222222,
              "username": "FakeUser1"
            }
          }
        ]
        ```

### Create a Review for a Coffee

- Require Authentication: false
  - Request
    - Method: POST
    - URL: /api/coffee/:coffeeId/reviews
    - Body:
    ```json
    {
      "coffeeId": 1,
      "userId": 2,
      "title": "Heavenly Espresso Delight!",
      "rating": 5,
      "review": " <=== body ===>"
    }
    ```
  - Successful Response
    - status Code:200
    - Header:
      - Content-Type:application/json
      - Body:
    ```json
    {
      "coffeeId": 1,
      "userId": 2,
      "title": "Heavenly Espresso Delight!",
      "rating": 5,
      "review": " <=== body ===>"
    }
    ```

## Reviews

### Get All Reviews

- Require Authentication: false

  - Request
    - Method: GET
    - URL: /api/reviews
  - Successful Response

    - status Code:200
    - Header:
    - Content-Type:application/json
    - Body:

      ```json
      [
        {
          "id": 1,
          "coffeeId": 1,
          "userId": 2,
          "title": "Heavenly Espresso Delight!",
          "rating": 5,
          "review": " <=== body ===>",
          "createdAt": "2023-06-23T17:09:39.000Z",
          "updatedAt": "2023-06-23T17:09:39.000Z"
        }
      ]
      ```

### Get All of The Users Reviews

- Require Authentication: false

  - Request
    - Method: GET
    - URL: /api/reviews/current
  - Successful Response

    - status Code:200 - Header:
    - Content-Type:application/json
    - Body:

      ```json
      [
        {
          "id": 1,
          "coffeeId": 1,
          "userId": 2,
          "title": "Heavenly Espresso Delight!",
          "rating": 5,
          "review": " <=== body ===>",
          "createdAt": "2023-06-23T17:09:39.000Z",
          "updatedAt": "2023-06-23T17:09:39.000Z"
        }
      ]
      ```

### Upate Reveiw

- Require Authentication: false

  - Request - Method: put
  - URL: /api/reviews
  - Request
    - Body:
      ```json
      {
        "title": "Heavenly Espresso Delight!",
        "rating": 5,
        "review": " <=== body ===>"
      }
      ```
  - Successful Response
    - status Code:200
    - Header:
      - Content-Type:application/json
    - Body:
      ```json
      {
        "id": 1,
        "coffeeId": 1,
        "userId": 2,
        "title": "Heavenly Espresso Delight!",
        "rating": 5,
        "review": " <=== body ===>",
        "createdAt": "2023-06-23T17:09:39.000Z",
        "updatedAt": "2023-06-23T17:09:39.000Z"
      }
      ```

### Delete User Review

- Require Authentication: false

  - Request
    - Method: DELETE
    - URL: /api/reviews/:reviewId
  - Successful Response

    - status Code:200
    - Header:
      - Content-Type:application/json
    - Body:

      ```json
      {
        "message": "Review Successfully Deleted"
      }
      ```

## Items

### GET All Items

- Require Authentication: false

  - Request
    - Method: GET
    - URL: /api/items
  - Successful Response

    - status Code:200
    - Header:
      - Content-Type:application/json
    - Body:

      ```json
      {
        "Items":[
          {
            {
              "id": 36,
              "cartId": 1,
              "coffeeId": 1,
              "instructionId": null,
              "quantity": 1,
              "createdAt": "2023-07-04T09:57:44.218Z",
              "updatedAt": "2023-07-04T09:57:44.218Z"
            },
          }
        ]
      }
      ```

### GET Item by Id

- Require Authentication: false

  - Request
    - Method: GET
    - URL: /api/items/:itemId
  - Successful Response

    - status Code:200
    - Header:
      - Content-Type:application/json
    - Body:

      ```json
      {
        "oneItem": [
          {
            "id": 38,
            "cartId": 1,
            "coffeeId": 2,
            "instructionId": null,
            "quantity": 5,
            "createdAt": "2023-07-04T09:57:44.218Z",
            "updatedAt": "2023-07-04T09:57:44.218Z"
          }
        ]
      }
      ```

### Update item by Id

- Require Authentication: false

  - Request

    - Method: PUT
    - URL: /api/items/:itemId
    - Header:
      - Content-Type:application/json
    - Body:

      ```json
      {
        "id": 38,
        "cartId": 1,
        "coffeeId": 2,
        "instructionId": null,
        "quantity": 5
      }
      ```

  - Successful Response

    - status Code:200
    - Header:
      - Content-Type:application/json
    - Body:

      ```json
      {
        "oneItem": [
          {
            "id": 38,
            "cartId": 1,
            "coffeeId": 2,
            "instructionId": null,
            "quantity": 5,
            "createdAt": "2023-07-04T09:57:44.218Z",
            "updatedAt": "2023-07-04T09:57:44.218Z"
          }
        ]
      }
      ```

### Delete Item by Id

- Require Authentication: false

  - Request
    - Method: DELETE
    - URL: /api/items/:itemId
  - Successful Response

    - status Code:200
    - Header:
      - Content-Type:application/json
    - Body:

      ```json
      {
        "message": "Review Successfully Deleted"
      }
      ```
