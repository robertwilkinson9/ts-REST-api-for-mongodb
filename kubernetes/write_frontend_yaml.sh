#/bin/bash
TYPE=$1
PORT=$2
#PORT from head ../../ts-reserve-assets/package.json
BACKEND_IP=$(kubectl describe service/${TYPE}-backend-service | grep ^IP: | awk '{print $NF}')
echo beip is $BACKEND_IP
BACKEND_PORT=$(kubectl describe service/${TYPE}-backend-service | grep TargetPort: | awk '{print $2}' | awk -F/ '{print $1}')
echo beport is $BACKEND_PORT

cat << EOF > ${TYPE}-frontend.yaml
---
apiVersion: v1
kind: Pod
metadata:
  name: ${TYPE}-frontend
  labels:
    app: web
spec:
  containers:
    - name: ${TYPE}-frontend
      image: robertwilkinsonwork299/reserve-assets-${TYPE}-frontend
      ports:
        - containerPort: ${PORT}
      env:
      - name: SSL_CERT
        value: /certs/localhost.crt
      - name: SSL_KEY
        value: /certs/localhost.key
      - name: VITE_API_IP
        value: "${BACKEND_IP}"
      - name: VITE_API_PORT
        value: "${BACKEND_PORT}"
      - name: VITE_TYPE
        value: "${TYPE}"
EOF
