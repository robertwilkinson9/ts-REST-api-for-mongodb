#!/bin/bash
APIPORT=5177
mongo < delete_test.js

curl --silent -X POST -H "Content-Type: application/json" --data @new.test.item.1 http://localhost:${APIPORT}/api/test > /dev/null
curl --silent -X GET -H "Content-Type: application/json" http://localhost:${APIPORT}/api/tests --output tests.out
if [ -s tests.out ]; then
  #jq '.' tests.out
  RESULT=$(jq '.success' tests.out)
  
  rm tests.out
  echo RESULT is ${RESULT}
  
  if [  "$RESULT" = "true" ]; then
    echo "Test passed"
    exit 0
  else
    echo "Test failed"
    echo $RESULT
    exit 1
  fi
else
  echo "Must start the server with 'npm run start' before testing"
  exit 2
fi
