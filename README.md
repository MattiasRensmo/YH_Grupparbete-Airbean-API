# API Docs

## Get Menu

- `/api/beans/`
- METHOD: GET
- RESPONSE: JSON

### SUCCESS (200):

```
{
  "status": "success"
  "menu":[
    {
      "id":1,
      "title":"Bryggkaffe",
      "desc":"Bryggd på månadens bönor.",
      "price":39
    },
  ]
}
```

### ERROR (500):

```
{
  status: "error"
  error: "Något gick fel, försök igen senare."
}
```

## Place order

- `/api/beans/order`
- METHOD: POST
- UID: ID (optional)

### PAYLOAD

JSON

```
{
  "details": {
    "order": [
      {
        "id": 1,
        "price": 39
        "amount": 1
      },
      {
        id: 3,
        "price": 49
        "amount": 2
      }
    ]
  }
}
```

### SUCCESS

JSON

```
{
  "status": "success"
  "orderNum": "AB1709847453844Y"
  "eta": 12
}
```

### ERROR

Product ID finns inte i DB:

```
{
  "status": "error"
  "error": "Du kan bara beställa från menyn"
}
```

Priset i order är fel:

```
{
  "status": "error"
  "error": "Fuska inte med priset"
}
```

## Get Order Status

- `/api/beans/order/status/:id`
- METHOD: GET
- RESPONSE: JSON

### SUCCES (200):

```
{
  "status": "success"
  "orderNum": "AB1709847453844Y"
  "eta": 12
}
```

### ERROR

```
{
  "status": "error"
  "error": "Hittar inte ordernumret"
}
```

## Sign up

- `/api/user/signup`
- METHOD: POST

### PAYLOAD

JSON

```
{
  "fullName": "Mattias Rensmo"
  "username": "mattias@rensmo.se",
  "password": "losen"
}
```

### SUCCESS

JSON

```
{
  "status": "success"
  "UID": "eyJhbGciOiJ"
}
```

### ERROR

Användarnamn upptaget

```
{
  "status": "error"
  "error": "Användarnamnet finns redan"
}
```

Lösenord för kort

```
{
  "status": "error"
  "error": "Lösenordet är för kort"
}
```

## Login

- `/api/user/login`
- METHOD: POST

### PAYLOAD

JSON

```
{
  "username": "mattias",
  "password": "losen"
}
```

### SUCCESS: JSON

```
{
  "status": "success"
  "UID ": "eyJhbGciO"
}
```

### ERROR

```
{
  "status": "error"
  "error": "Användarnamnet eller lösenordet är fel"
}
```

## Get order history

- `/api/user/history`
- METHOD: GET
- UID: "5w4kljh234k"

### SUCCESS: JSON

```
{
  "status": "success"
  "orderHistory": [
    {
      "orderNum": "AB1709847453844Y",
      "timestamp": "2024-01-06T17:20:34.000Z"
      "price": 123
    }
  ]
}
```

### ERROR

```
{
  "status": "error"
  "error": "Du är inte inloggad"
}
```

<!--
## Check JWT

- `/api/user/status`
- METHOD: GET
- AUTH: JWT

### SUCCESS: JSON

```
{
  "status": "success"
}
```

### ERROR

```
{
  "status": "error"
  "error": "Token är inte giltig"
}
``` -->
