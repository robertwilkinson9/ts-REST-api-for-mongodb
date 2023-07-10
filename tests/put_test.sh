#!/bin/bash
APIPORT=5177
mongo --quiet < delete_test.js > /dev/null

curl --silent -X POST -H "Content-Type: application/json" --data @new.test.item.1 http://localhost:${APIPORT}/api/test > /dev/null
curl --silent -X GET -H "Content-Type: application/json" http://localhost:${APIPORT}/api/all_tests --output tests.out

if [ -s tests.out ]; then
  ID=$(jq -r '.data[0]._id' tests.out)
  curl --silent -X PUT -H "Content-Type: application/json" --data @new.test.item.2 http://localhost:${APIPORT}/api/test/${ID} > /dev/null
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
