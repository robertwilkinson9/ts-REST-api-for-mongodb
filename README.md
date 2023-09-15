# ts-REST-api-for-mongodb
A type script REST API with mongodb as the data store

This is a very simple REST API written in Typescript to use express to provide access to a config file driven MongoDB back end
- the API is invoked through src/index.ts, and the rest of the functionality is done through the subdirectories in the src directory.

This code started life from the ideas presented at https://dev.to/andrewbaisden/creating-react-node-apps-that-connect-to-postgresql-and-harperdb-41h3

I used PostGresQL as my first backend to my react app, then decided that since I had only one table, that I would be better of with a NoSQL backend, so
changed the code so that it worked with MongoDB rather than PgSQL. I then decide to change JavaScript to TypeScript because I realised it was better.

The backend is configured by <em>config.json</em> in the <strong>config</strong> directory.

A number of exemplar files are provided in the <strong>config</strong> direcoty; each of which is copied into place by the targets in <em>package.json</em>

the facility to mask certain fields in the default, <em>all_items</em>, endpoint is provided.

This is for suppression of PII, by default - there are easy ways to circumvent the restriction, though ...

SSL is used for the REST API and certificates and keys must be supplied e.g.

SSL_CERT=../certs/localhost.crt SSL_KEY=../certs/localhost.key npm run book
