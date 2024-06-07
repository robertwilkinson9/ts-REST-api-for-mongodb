#!/bin/bash
NAME=$1
PORT=$2
#
POD=$(kubectl get pods | grep $NAME | awk '{print $1}')
k3s kubectl expose pod $POD --target-port $PORT --name $NAME --type=LoadBalancer
