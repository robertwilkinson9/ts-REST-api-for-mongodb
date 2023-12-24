#!/bin/bash
APIPORT=6177
./run_mongo.sh

curl --silent -X POST -H "Content-Type: application/json" --insecure --data @new.test.item.1 https://localhost:${APIPORT}/api/test > /dev/null
curl --silent -X GET -H "Content-Type: application/json" --insecure https://localhost:${APIPORT}/api/all_tests --output tests.out

if [ -s tests.out ]; then
  ID=$(jq -r '.data[0]._id' tests.out)
  curl --silent -X PUT -H "Content-Type: application/json" --insecure --data @new.test.item.2 https://localhost:${APIPORT}/api/test/${ID} > /dev/null
  STATUS=$?
  
  rm tests.out
  if [  "$STATUS" = "0" ]; then
    echo "Test passed"
  else
    echo "Test failed : "
    echo $STATUS
  fi
  exit $STATUS
else
  echo "Must start the server with 'npm run start' before testing"
  exit 2
fi
