#!/bin/bash
APIPORT=5177
mongo --quiet < delete_test.js > /dev/null

curl --silent -X POST -H "Content-Type: application/json" --insecure --data @new.test.item.1 https://localhost:${APIPORT}/api/test > /dev/null
STATUS=$?

if [  "$STATUS" = "0" ]; then
  echo "Test passed"
else
  echo "Test failed : "
  echo $STATUS
fi

exit $STATUS
