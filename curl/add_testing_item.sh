SSL_CERT_FILE=/certs/localhost.crt curl --silent -X POST -H "Content-Type: application/json" --insecure --data @aux_tests_data.json https://localhost:6177/api/testing_item_name
