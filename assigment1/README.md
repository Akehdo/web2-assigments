# Goods Store API (Express CRUD)

## Project Description

This project is a simple REST API built with **Node.js** and **Express**.
It simulates a small electronics store and provides CRUD operations for managing goods.
Data is stored in a local JSON file (`data.json`).

---

## How to Install Dependencies

1. ``` git clone https://github.com/Akehdo/web2-assigments/assigment1```
2. Open terminal in the project folder
3. In terminal: ``` npm install ```
4. In terminal: ``` node server.js```
5. The server will run on: http://localhost:3000

## API Routes
### Demo Routes

* GET / – Server test

* GET /time – Returns current server time

* GET /status – Returns server status

### Goods CRUD Routes

* GET /goods – Get all goods

* POST /goods – Create a new good

* PUT /goods/:id – Update a good by ID

* DELETE /goods/:id – Delete a good by ID


# Example Postman Requests
## Create a Good
### POST /goods
```
{
  "name": "Phone",
  "price": 3000,
  "category": "mobilePhones"
}
```

## Get All Goods

### GET /goods

### Response:
```
[
  {
    "id": 1,
    "name": "Phone",
    "price": 3000,
    "category": "mobilePhones"
  }
]
```

# Update a Good

## PUT /goods/1
 
```
{
  "price": 3500
}

```

# Delete a Good

## DELETE /goods/1720000000000

### Response:
```
{
  "success": true
}

```