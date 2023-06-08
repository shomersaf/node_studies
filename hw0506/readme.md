# Classwork.js: Create new Entry point +
1. entry point GET /Product +
2. the entry point will recieve product name /product?name=<PRODUCT_NAME> +
3. the entry point will return the following message "Your product name is: <PRODUCT_NAME> " +



# Write new API +
## PORT 4000 +
### Entrypoints +
1. GET /cars - find some api that return cars and copy paste the content into the code +
2. GET /log?text="SOME_TEXT" print the text into a file (log.txt) use `append`+
3. create middleware `app.use` that will validate `text` to max 20 characters
  ( if the text contains more than 20 characters return response to the client with error)+
4. GET /log-file will return the log.txt content +
5. create a draw.io of your API with the relations 