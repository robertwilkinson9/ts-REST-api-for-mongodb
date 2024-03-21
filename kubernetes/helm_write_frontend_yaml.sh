#/bin/bash
TYPE=$1
SRC_DIR="../../ts-reserve-assets/"
FE_PORT=$(cat ${SRC_DIR}/package.json | jq --raw-output .config.${TYPE})
echo FE_PORT is $FE_PORT
END_POINTS=$(kubectl describe service/ra-${TYPE} | grep ^Endpoints: | awk '{print $NF}')
if [ $? -eq 0 ]
then
  echo endpoints is $END_POINTS

  END_POINT_IP=$(echo ${END_POINTS} | awk -F: '{print $1}')
  echo endpoint_ip is $END_POINT_IP
  END_POINT_PORT=$(echo ${END_POINTS} | awk -F: '{print $2}')
  echo endpoint_port is $END_POINT_PORT
else
  echo NO endpoints

  END_POINT_IP=$(kubectl describe service/ra-${TYPE} | grep ^IP: | awk '{print $NF}')
  echo endpoint_ip is $END_POINT_IP
  END_POINT_PORT=$(kubectl describe service/ra-${TYPE} | grep ^Port: | awk -F/ '{print $1}' | awk '{print $NF}')
  echo endpoint_port is $END_POINT_PORT
fi

VITE_TYPE=$TYPE

if [ ${TYPE} = "carpark" ]
then
  VITE_TYPE="bay"
fi
echo VITE_TYPE is ${VITE_TYPE}

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
        - containerPort: ${FE_PORT}
      env:
      - name: SSL_CERT
        value: /certs/localhost.crt
      - name: SSL_KEY
        value: /certs/localhost.key
      - name: VITE_API_IP
        value: "${END_POINT_IP}"
      - name: VITE_API_PORT
        value: "${END_POINT_PORT}"
      - name: VITE_TYPE
        value: "${VITE_TYPE}"
EOF
