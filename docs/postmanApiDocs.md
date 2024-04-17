# API AirBean

Kristofer Almeros, Joel Keskitalo, Emanuele De Negri, Mattias Rensmo

## API Docs

### GET

Check Order Status

http://localhost:5000/api/beans/order/status/5T1Garjk03gaM6An

---

### GET

Get Menu

http://localhost:5000/api/menu/

---

### GET

Get One Menu Item

http://localhost:5000/api/menu/2

---

### GET

Get Order History for User

http://localhost:5000/api/user/abc123/history

---

### POST

Create Order

http://localhost:5000/api/beans/order

Body

```json
{
  "order": [
    {
      "id": 1,
      "price": 39,
      "amount": 1
    },
    {
      "id": 3,
      "price": 49,
      "amount": 4
    }
  ],
  "customer": "abc123"
}
```

---

### POST

Add Menu items

http://localhost:5000/api/menu

Body

```json
{
  "menuItems": [
    {
      "type": "menu",
      "id": 2,
      "title": "Caffè Doppio",
      "desc": "Bryggd på månadens bönor.",
      "price": 49
    }
  ]
}
```

---

### POST

CreateUser
http://localhost:5000/api/user/register

Body

```json
{
  "username": "joel2",
  "password": "losen123"
}
```

---

### POST

LoginUser

http://localhost:5000/api/user/login

Body

```json
{
  "username": "mattias",
  "password": "losen123"
}
```

---

### DELETE

Delete menu item

http://localhost:5000/api/menu/DIiHPJQRXIR6ePZj
