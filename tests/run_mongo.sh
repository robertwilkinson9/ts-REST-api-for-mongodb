if [ $(which mongo) ]; then
  mongo --quiet < delete_test.js > /dev/null
  echo "MONGO WORKS"
else if [ $(which mongosh) ]; then
       mongosh --quiet < delete_test.js > /dev/null
       echo "MONGOSH WORKS"
     fi
fi
