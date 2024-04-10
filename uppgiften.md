# Grupparbete Airbean API

## Instruktioner

I detta grupparbete ska ni skapa ett API för en webbapp där det går att beställa kaffe och
få den levererad via drönare (drönare ingår ej i uppgiften).

### User stories

En gruppmedlem gör ett repo och bjuder in resterande gruppmedlemmar till det repot. Sedan under fliken **Projects** så välj ett nytt projekt och sätt upp enligt strukturen nedan samt kopiera över alla user stories. Ni får även använda Trello och skapa upp fler stories eller tasks (som kan vara mer tekniska). I detta grupparbete kan det vara till fördel att skapa upp lite fler tasks att koppla till en user story som mer beskriver det som behövs göras i backend för att uppnå funktionaliteten i user storyn.

**Obs!** En user story kan också enbart vara en FE-story alltså att det inte behövs göras något i backend.

https://github.com/users/nz-bill/projects/1/views/1

### Betygskriterier

**För Godkänt:**

- Uppfyller alla krav av funktionalitet.
- Använder sig av Express och NeDB som databas (en annan databas exempelvis MongoDB är okej ifall alla i gruppen är överens om detta).
- All input som skickas i url eller i body ska valideras och ifall det är fel data ska ett felmeddelande skickas tillbaka.
- Det ska enbart gå att lägga till produkter som finns i menyn, ifall någon annan produkt skickas med så ska ett felmeddelande skickas tillbaka. Även pris ska kontrolleras.
- När ett konto skapas ska detta kopplas till ett slumpat användarid (här används fördelaktigt ett bibliotek, ex UUID) där användarid:et sedan kan användas för att hämta orderhistorik, användarnamn ska alltså ej skickas med i url för att hämta orderhistorik.

**För Väl Godkänt:**

- Allt i godkänt
- Kunna se pågående beställningar och tidigare beställningar (man kollar när beställningen lades (klockslag) gentemot vad klockan är nu. Här är det godkänt att använda något bibliotek för datum och tidshantering (ex. `moment.js` eller `date-fns`).
- Ert projekt använder sig av en M(V)C-arkitektur.

### Inlämning

Inlämning sker på Azomo med en länk till ert Github repo med er kod senast **onsdag 17/4 (23.59)** och gruppredovisning **torsdag 18/4 (09.00-16.00).**
