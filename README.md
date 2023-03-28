# Assignment

Please create a page that contains an input field.
When the user enters _at least_ three characters into this input field,
you should display all flight information from the `flights.json` file where the destination airport matches the entered input.
Limit the search result to a maximum of 5 flights.

Please implement it using React. Try to keep it simple.

We think 4 hours should be enough to spend on this assignment.
Please don't spend more than that unless you're having fun and want to show off :)

## Requirements:

-   Use React. Create your app with React but try to limit the use of third party UI libraries.
-   Use Typescript. Make sure your app is typed correctly.
-   Make it look nice. Make use of the provided colors. How you want to implement them is entirely your choice ;)
-   Your application should treat the contents of `flights.json` as the output of an API endpoint.
    It should load this asynchronously using XHR or Fetch API and should not require a page reload when the user changes their input.
-   Make sure the results are sortable. The filtered flight data should be sortable on date and (expected) time. Initial expected sorting is early to late.

## Submission:

-   Create a clone of this repository locally.
    Then push it to **your GitHub account** and continue working from there.
    Once you have finished, please send us the URL of the repository you have created.

### Some things to consider:

-   We like DRY and KISS
-   We like tested code
-   We like readable code
-   We like using the latest features of ES6 where applicable
-   Last but not least, have fun!

# Uitwerking Wilco

Ik heb een simpele express server gemaakt waarmee je de flights.json kan opvragen met de query parameters `airport`, `limit` en `order_by`. Er zit wat random delay in om server vertraging te simuleren.

De frontend is gemaakt met React en Vite dev server. Je kan typen in het input field en dan begint hij gelijk te "zoeken". Er zit een debounce op, je kan ook op enter drukken. Ik heb ook een abort controller toegevoegd om server requests te annuleren als er een nieuwe zoekopdracht gedaan wordt. Ik heb een hele basic implementatie van een state machine om duidelijk onderscheid te maken tussen loading, succes en error states.

Wat styling betreft heb ik zelf wat utility classes gemaakt a la tailwind in utils.css. Eslint en prettier voor DX. Google material icon font voor vliegtuig icoontje in title en loading spinner en sorting arrow.

1. Run `npm install`
2. Backend server aanzetten met `node server/index.js` (endpoint: http://localhost:3000/flights)
3. Frontend app draaien met `npm run dev`, navigeer naar http://localhost:5173/
