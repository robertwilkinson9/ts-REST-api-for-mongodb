helm uninstall my-mongodb
kubectl apply -f my-mongodb-pv.yaml
kubectl get pv
helm install my-mongodb bitnami/mongodb --version 14.2.6
kubectl get all
kubectl describe deployment.apps/my-mongodb

bob@portugal:~/src/kubernetes/bitnami-mongodb$ kubectl get pv
NAME            CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS     CLAIM                STORAGECLASS   REASON   AGE
mongo-data-pv   1Gi        RWO            Retain           Bound      default/mongo-data                           2d19h
my-mongodb      8Gi        RWO            Retain           Released   default/my-mongodb                           110m
bob@portugal:~/src/kubernetes/bitnami-mongodb$ kubectl delete pv my-mongodb
persistentvolume "my-mongodb" deleted
bob@portugal:~/src/kubernetes/bitnami-mongodb$ kubectl get pv
NAME            CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                STORAGECLASS   REASON   AGE
mongo-data-pv   1Gi        RWO            Retain           Bound    default/mongo-data                           2d19h
bob@portugal:~/src/kubernetes/bitnami-mongodb$ kubectl apply -f my-mongodb-pv.yaml
persistentvolume/my-mongodb created
bob@portugal:~/src/kubernetes/bitnami-mongodb$ kubectl get pv
NAME            CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM                STORAGECLASS   REASON   AGE
mongo-data-pv   1Gi        RWO            Retain           Bound       default/mongo-data                           2d19h
my-mongodb      8Gi        RWO            Retain           Available                                                4s
bob@portugal:~/src/kubernetes/bitnami-mongodb$ helm uninstall my-mongodb
release "my-mongodb" uninstalled
bob@portugal:~/src/kubernetes/bitnami-mongodb$ kubectl get all
NAME                         READY   STATUS    RESTARTS        AGE
pod/mongo-6cc8dd8f86-jp6qd   1/1     Running   120 (20m ago)   2d19h

NAME                         TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)           AGE
service/kubernetes           ClusterIP   10.96.0.1     <none>        443/TCP           2d22h
service/mongo-nodeport-svc   NodePort    10.97.80.30   <none>        27017:32000/TCP   2d19h

NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/mongo   1/1     1            1           2d19h

NAME                               DESIRED   CURRENT   READY   AGE
replicaset.apps/mongo-6cc8dd8f86   1         1         1       2d19h
bob@portugal:~/src/kubernetes/bitnami-mongodb$ kubectl get pv
NAME            CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS     CLAIM                STORAGECLASS   REASON   AGE
mongo-data-pv   1Gi        RWO            Retain           Bound      default/mongo-data                           2d19h
my-mongodb      8Gi        RWO            Retain           Released   default/my-mongodb                           33s
bob@portugal:~/src/kubernetes/bitnami-mongodb$ kubectl delete pv my-mongodb
persistentvolume "my-mongodb" deleted
bob@portugal:~/src/kubernetes/bitnami-mongodb$ kubectl get pv
NAME            CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                STORAGECLASS   REASON   AGE
mongo-data-pv   1Gi        RWO            Retain           Bound    default/mongo-data                           2d19h
bob@portugal:~/src/kubernetes/bitnami-mongodb$ kubectl apply -f my-mongodb-pv.yaml
persistentvolume/my-mongodb created
bob@portugal:~/src/kubernetes/bitnami-mongodb$ kubectl get pv
NAME            CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM                STORAGECLASS   REASON   AGE
mongo-data-pv   1Gi        RWO            Retain           Bound       default/mongo-data                           2d19h
my-mongodb      8Gi        RWO            Retain           Available                                                6s
bob@portugal:~/src/kubernetes/bitnami-mongodb$
bob@portugal:~/src/kubernetes/bitnami-mongodb$ kubectl exec pod/my-mongodb-client -it -- /bin/bash
I have no name!@my-mongodb-client:/$ mongosh "mongodb://reserver:ass3ts@my-mongodb.default.svc.cluster.local:27017/book"
