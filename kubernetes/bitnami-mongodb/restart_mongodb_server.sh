#!/bin/bash
helm uninstall my-mongodb
kubectl delete pv my-mongodb
kubectl apply -f my-mongodb-pv.yaml
#kubectl get pv
helm install my-mongodb bitnami/mongodb --version 14.2.6
#kubectl get all
kubectl describe deployment.apps/my-mongodb
