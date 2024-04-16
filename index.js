const { registerMenuRoutes } = require("./routes/menuRoutes");
const { registerPromotionRoutes } = require("./routes/applyPromotionRoutes");

const express = require("express");
const nedb = require("nedb-promise");

const db = new nedb({ filename: "database.db", autoload: true });

const app = express();

const PORT = 5000;

app.use(express.json())

// var menu = {
//   type: 'menu',
//   menu: [
//     {
//       id: 1,
//       title: 'Bryggkaffe',
//       desc: 'Bryggd på månadens bönor.',
//       price: 39,
//     },
//     {
//       id: 2,
//       title: 'Caffè Doppio',
//       desc: 'Bryggd på månadens bönor.',
//       price: 49,
//     },
//     {
//       id: 3,
//       title: 'Cappuccino',
//       desc: 'Bryggd på månadens bönor.',
//       price: 49,
//     },
//     {
//       id: 4,
//       title: 'Latte Macchiato',
//       desc: 'Bryggd på månadens bönor.',
//       price: 49,
//     },
//     {
//       id: 5,
//       title: 'Kaffe Latte',
//       desc: 'Bryggd på månadens bönor.',
//       price: 54,
//     },
//     {
//       id: 6,
//       title: 'Cortado',
//       desc: 'Bryggd på månadens bönor.',
//       price: 39,
//     },

// db.insert(menu, function (err, newDoc) {
//   // Callback is optional
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(newDoc)
//   }
//   // newDoc is the newly inserted document, including its _id
//   // newDoc has no key called notToBeSaved since its value was undefined
// }) */

// db.remove({ _id: 'KtGCCRq7dCI9IEWV' }, {}, function (err, numRemoved) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(numRemoved)
//   }
// })
app.post("/menu", async (req, res) => {
  try {
    await db.remove({}, { multi: true }); // Rimuovi il vecchio menu

    // Inserisci il nuovo menu nel database
    await db.insert(menu);

    res.status(201).send("Nuovo menu aggiunto con successo.");
  } catch (error) {
    console.error("Errore durante l'aggiunta del nuovo menu:", error);
    res.status(500).send("Si è verificato un errore durante l'aggiunta del nuovo menu.");
  }
});
var menu = {
  type : "menu",
  "menu": [
    {
      "id": 1,
      "title": "Bryggkaffe",
      "price": 39,
      "activePromotion": true,
      "combo": []
    },
    {
      "id": 2,
      "title": "Caffè Doppio",
      "price": 49,
      "activePromotion": true,
      "combo": []
    },
    {
      "id": 3,
      "title": "Cappuccino",
      "price": 49,
      "activePromotion": false,
      "combo": [3, 4]
    },
    {
      "id": 4,
      "title": "Latte Macchiato",
      "price": 49,
      "activePromotion": false,
      "combo": [3, 4]
    },
    {
      "id": 5,
      "title": "Kaffe Latte",
      "price": 54,
      "activePromotion": false,
      "combo": []
    },
    {
      "id": 6,
      "title": "Cortado",
      "price": 39,
      "activePromotion": false,
      "combo": []
    }
  ],
  "combos": [
    {
      "id": 1,
      "products": [3, 4],
      "discount": 5
    }
  ]
}


app.post("/menu", async (req, res) => {
  try {
    // Inserisci il nuovo menu nel database
    await db.insert(menu);

    res.status(201).send("Nuovo menu aggiunto con successo.");
  } catch (error) {
    console.error("Errore durante l'aggiunta del nuovo menu:", error);
    res.status(500).send("Si è verificato un errore durante l'aggiunta del nuovo menu.");
  }
});


const order1 = {
  type: "order",
  _id: 1,
  leveranstid: "2024T11:40:00",
  price: 122,
  uid: undefined,
};
const order2 = {
  type: "order",
  _id: 2,
  leveranstid: "2024T11:40:00",
  price: 122,
  uid: "xxx",
};
const order14 = {
  type: "order",
  _id: 14,
  leveranstid: "2024T11:40:00",
  price: 123,
  uid: "xxx",
};

const user = { type: "user", _id: 3, name: "aaa", orderHistory: [2, 14] };
// user /  orders /
// Sök efter alla ordrar som har uid xxx

// bean /  status
// Sök igenom användarna till du hitta ngn med rätt ordernummer

app.get("/", async (req, res) => {
  // Find all documents in the collection
  //Här kan vi använda type om vi vill hitta något av en särskild typ.
  //type: 'menu' - type: 'user', - type: 'order'
  const dbRes = await db.find({ type: "menu" });

  console.log(dbRes);
  res.send(dbRes);
});

registerMenuRoutes(app);
registerPromotionRoutes(app);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
