# ts-REST-api-for-mongodb

A type script REST API with mongodb as the data store

This is a very simple REST API written in Typescript to use express to provide access to a config-file driven MongoDB back end.

This code started life from the ideas presented at https://dev.to/andrewbaisden/creating-react-node-apps-that-connect-to-postgresql-and-harperdb-41h3

PostGresQL was initially used as the backend to the react app, then changed to use MongoDB. The code was changed from JavaScript to TypeScript.

A number of exemplar files are provided in the <strong>config</strong> directory; each of which is used by the targets in <em>package.json</em>
dependent on the value supplied on the command line.

e.g. <code>npm run desk</code>

which is how the desk backend would be started in a development mode.

Fields in the default <em>all_items</em> endpoint can be configured to be masked for suppression of PII.

SSL
---

SSL is used for the REST API and certificates and keys must be supplied e.g.

<code>SSL_CERT=../certs/localhost.crt SSL_KEY=../certs/localhost.key npm run book</code>

DOCKER
------

<code>docker compose</code> can be used to start up a set of images and some scripts are provided to manage the process.

<code>run_mongo.sh</code> should be run first, then

<code>run_backend_type.sh TYPE</code>

should be run to start up the appropriate backend service

<code>run_frontend_type.sh TYPE</code>

is then run to run the corresponding frontend service, which displays the address where it can be accessed.

The log files of the services provide some information.

This will construct the images from the relevant dockerfiles which can be tagged and uploaded to docker.com.

KUBERNETES
----------

The kubernetes yaml files reference the images constructed and uploaded in the previous section.

Typically the mongodb service is started

For each frontend we start the backend, then the backend service 

e.g.

<code>kubectl apply -f desk-backend.yaml
kubectl apply -f desk-backend-service.yaml</code>

Then run 

<code>./write_frontend_yaml.sh <name of backend></code>

Then the frontend can be applied and started.

e.g.

<code>kubectl apply -f desk-frontend.yaml</code>

Some example yaml files are in the kubernetes directory alongside a script to write the appropriate frontend yaml file, our application can not see the ENV variables apart from those we prefix with VITE_ so we build the frontend yaml file here. It would be better to use the ENV variables, but ...
