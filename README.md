# The First Brew

## Database Schema Design

![db-schema]

[db-schema]:Images/Database_Schema_Design.png

# API Documentation

## Users

### GET User by Id

- Require Authentication: true

- Request

  - Method: GET
  - URL: /api/users/:userId
  - Header:
    - Content-Type:application/json
  - Body:

  ```json
  {
    "id": 2,
    "firstName": "jane",
    "lastName": "Doe",
    "phoneNumber": 2222222,
    "profileImageUrl": "https://freeawsbucket.s3.us-west-1.amazonaws.com/user_seeders/pexels-demo2-.jpg",
    "username": "FakeUser1"
  }
  ```

- Successful Response

  - status Code:200
  - Header:
    - Content-Type:application/json
  - Body:

```json
{
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Smith",
    "email": "demo@user.io",
    "username": "Demo-lition"
  }
}
```

### GET All Users

- Require Authentication: true

- Request
  - Method: GET
  - URL: /api/users/
- Successful Response

  - status Code:200
  - Header:
    - Content-Type:application/json
  - Body:

```json
{
  "user": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "demo@user.io",
      "username": "Demo-lition"
    }
  ]
}
```

### POST Sign a new User

- Require Authentication: false

- Request

  - Method: POST
  - URL: /api/users
  - Header:
    - Content-Type:application/json
  - Body:

  ```js
    {
        "email",
        "username",
        "hashedPassword",
        "firstName",
        "lastName",
        "profileImageUrl",
        "phoneNumber",
    }
  ```

- Successful Response

  - status Code:200
  - Header:
    - Content-Type:application/json
  - Body:

  ```js
    { "User":{
          "id": ...,
          "firstName": ...,
          "lastName":  ...,
          "email":  ...,
          "username": ...,
          "profileImageUrl":  ...,
          "phoneNumber": ...,

        }
    };

  ```

### Update a Users information

- Require Authentication: true

- Request

  - Method: PUT
  - URL: /api/users/:userId
  - Header:
    - Content-Type:application/json
  - Body:

  ```js
    { "User":{
          "id": ...,
          "firstName": ...,
          "lastName":  ...,
          "email":  ...,
          "username": ...,
          "phoneNumber": ...,

        }
    };

  ```

- Successful Response

  - status Code:200
  - Header:
    - Content-Type:application/json
  - Body:

  ```js
    { "User":{
          "id": ...,
          "firstName": ...,
          "lastName":  ...,
          "email":  ...,
          "username": ...,
          "phoneNumber": ...,
        }
    };

  ```

### Delete a User

- Require Authentication: true

- Request
  - Method: GET
  - URL: /api/users/:userId
- Successful Response

  - status Code:200
  - Header:
    - Content-Type:application/json
  - Body:

  ```json
  {
    "message": "Successfully deleted"
  }
  ```

## Coffee

### GET All Coffee

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

### GET Coffee by Id

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

### POST an Item

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

### GET Reviews by Coffee Id

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

### POST a Review for a Coffee

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

### GET All Reviews

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

### GET All of The Users Reviews

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

### Update Review

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

### Update Instructions

- Require Authentication: false

  - Request
    - Method: DELETE
    - URL: /api/items/:itemId
  - Successful Response
  - Header:
    - Content-Type:application/json
  - Body:

  ```json
  {
    "additions": [
      ["Extra Large", 29],
      ["2% Milk", 30],
      ["Very Hot", 31],
      ["", 32]
    ],
    "custom": ["85555555555555555555555555555555555", 8]
  }
  ```

  - status Code:200
  - Header:
    - Content-Type:application/json
  - Body:

  ```json
    {
    "Item":{
          "id":8,
          "Coffee":{},
          "Instruction":[{…}],
          "cartId":1,
          "coffeeId":8,
          "instructionId":null,
          "quantity":1,
          "createdAt":"2023-08-07T00:57:47.000Z",
          "updatedAt":"2023-08-07T00:57:47.000Z",
          }
    }
  ```

## Shopping Cart

### GET all shopping carts

- Require Authentication: true

- Request
  - Method: GET
  - URL: /api/cart/
- Successful Response

  - status Code:200
  - Header:
    - Content-Type:application/json
  - Body:

  ```json
  {
    "ShoppingCart": [
      {
        "id": 1,
        "userId": 1,
        "createdAt": "2023-08-07T00:57:47.000Z",
        "updatedAt": "2023-08-07T00:57:47.000Z"
      },
      {
        "id": 2,
        "userId": 2,
        "createdAt": "2023-08-07T00:57:47.000Z",
        "updatedAt": "2023-08-07T00:57:47.000Z"
      },
      {
        "id": 4,
        "userId": 5,
        "createdAt": "2023-08-07T15:18:23.382Z",
        "updatedAt": "2023-08-07T15:18:23.382Z"
      }
    ]
  }
  ```

### GET Current Users Cart

- Require Authentication: true

- Request
  - Method: GET
  - URL: /api/cart/current
- Successful Response

  - status Code:200
  - Header:
    - Content-Type:application/json
  - Body:

  ```json
  {
    "UserCart": [
      {
        "id": 1,
        "userId": 1,
        "createdAt": "2023-08-07T00:57:47.000Z",
        "updatedAt": "2023-08-07T00:57:47.000Z",
        "Items": [
          {
            "id": 8,
            "cartId": 1,
            "coffeeId": 8,
            "instructionId": null,
            "quantity": 1,
            "createdAt": "2023-08-07T00:57:47.000Z",
            "updatedAt": "2023-08-07T00:57:47.000Z",
            "Coffee": {
              "id": 8,
              "name": "Affogato",
              "price": 5,
              "description": " Indulge in our heavenly Affogato - a delightful union of rich, smooth espresso and   velvety vanilla gelato. A symphony of flavors awaits as a single shot of our freshly brewed espresso is poured over a generous scoop of luscious, artisanal vanilla gelato. Watch as the steam rises, mingling with the cold creaminess of the gelato, creating a tantalizing dance of temperature and texture. ",
              "default": "Small-Whole Mlik-Cold-1/3 Decaf Espresso Roast",
              "createdAt": "2023-08-07T00:57:47.000Z",
              "updatedAt": "2023-08-07T00:57:47.000Z"
            },
            "Instruction": []
          }
        ]
      }
    ]
  }
  ```

      ```
