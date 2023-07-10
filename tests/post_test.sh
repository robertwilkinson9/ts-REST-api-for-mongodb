#!/bin/bash
APIPORT=5177
mongo --quiet < delete_test.js > /dev/null

curl --silent -X POST -H "Content-Type: application/json" --data @new.test.item.1 http://localhost:${APIPORT}/api/test > /dev/null
STATUS=$?

if [  "$STATUS" = "0" ]; then
  echo "Test passed"
else
  echo "Test failed : "
  echo $STATUS
fi

#curl --silent -X GET -H "Content-Type: application/json" http://localhost:${APIPORT}/api/all_tests

#echo

exit $STATUS
