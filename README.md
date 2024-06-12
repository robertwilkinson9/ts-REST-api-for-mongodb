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

<code>SSL_CERT=/certs/localhost.crt SSL_KEY=/certs/localhost.key npm run book</code>

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

For each frontend start the backend

e.g.

<code>kubectl apply -f desk-backend.yaml</code>

then start the backend service

e.g.

<code>kubectl apply -f desk-backend-service.yaml</code>

then run

<code>./write_frontend_yaml.sh <name of backend></code>

then the frontend can be applied and started.

e.g.

<code>kubectl apply -f desk-frontend.yaml</code>

It is not possible for the TS code to resolve the symbol used by Kubernetes to identify resources so we resolve the names to IP addresses outside the code. There are probably much better ways of achieving this, but until then the above is effective.

Some example yaml files are in the kubernetes directory alongside a script to write the appropriate frontend yaml file, our application can not see the ENV variables apart from those we prefix with VITE_ so we build the frontend yaml file here. It would be better to use the ENV variables, but ...

expose the frontend pod on minikube via

┌──(kali㉿kali-raspberry-pi5)-[~/src/typescript/ts-REST-api-for-mongodb/kubernetes]
└─$ kubectl expose pod book-frontend --port 5176 --name frontend --type NodePort
service/frontend exposed

and then we can see it here

┌──(kali㉿kali-raspberry-pi5)-[~/src/typescript/ts-REST-api-for-mongodb/kubernetes]
└─$ minikube service frontend --url --https
https://192.168.49.2:32656

moved to k3s and there

1. Install mongodb, I used helm to do so.
   Connect via a client and set username/passwords on the databases e.g.
> use book
book> db.createUser({user: "reserver", pwd: "ass3ts", roles: [ "readWrite"]})

2.create secrets file via

<code>
$ cat write_secrets
#!/bin/bash

cat <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: mongodb-connection-strings
type: Opaque
stringData:
EOF
./setup_secrets book
./setup_secrets desk
./setup_secrets carpark
</code>

where setup_secrets is:

<code>
$ cat setup_secrets
#!/bin/bash
if [ $# -ne 1 ]
then
        echo "NEED 1 argument - type e.g. book, desk"
        exit 1
fi
TYPE=$1

echo -n "  ${TYPE}_connection_string: "
echo $(echo "mongodb://reserver:ass3ts@mongodb.default.svc.cluster.local/${TYPE}" | base64 -w 100)
# 100 is a big enough number so it doesn't get linespaces occasionally inserted. I could mend it properly ...
</code>

running e.g.

<code>
./setup_secrets desk
</code>

will write a YAML file to STDOUT which can be applied

(e.g. via

<code>
kubectl apply -f secret_filename.yaml
</code>
where
<code>
secret_filename.yaml
</code>
is the output of running the above setup_secrets command)

to give the desk application secrets with which to access the mongodb datastore.

On k3s, to expose the service, we can create a load balancer around the single node because the
load balancer is given an external IP address.

<code>
$ cat kubernetes/make_lb.sh
#!/bin/bash
NAME=$1
PORT=$2
#
POD=$(kubectl get pods | grep $NAME | awk '{print $1}')
k3s kubectl expose pod $POD --target-port $PORT --name $NAME --type=LoadBalancer
</code>

this load balancer can be accessed by the front-end which needs to talk to the backend, the front-end
can be similarly exposed to allow network access.

<code>
$ kubectl describe service/book-backend | grep -A2 ^LoadBalancer | grep -v unset
LoadBalancer Ingress:     192.168.1.173
TargetPort:               6180/TCP
</code>

Currently both public end-points must be visited with a browser and cerficates accepted manually
before use of the services, but this is solely a consequence of self-signed certification for SSL.
