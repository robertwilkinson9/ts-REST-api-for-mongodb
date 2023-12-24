#!/bin/bash
APIPORT=5179
./run_mongo.sh

curl --silent -X POST -H "Content-Type: application/json" --data @new.item http://localhost:${APIPORT}/api/item > /dev/null
curl --silent -X GET -H "Content-Type: application/json" http://10.0.2.15:5179/api/items --output items.out
if [ -s items.out ]; then
  #jq '.' items.out
  RESULT=$(jq '.success' items.out)
  
  rm items.out
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
