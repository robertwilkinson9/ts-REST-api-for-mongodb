use book
db.createUser( { user: "reserver", pwd: "assets", roles: [ { role: "dbOwner", db: "book" }, { role: "readWrite", db: "book" } ] } )
use desk
db.createUser( { user: "reserver", pwd: "assets", roles: [ { role: "dbOwner", db: "desk" }, { role: "readWrite", db: "desk" } ] } )
use carpark
db.createUser( { user: "reserver", pwd: "assets", roles: [ { role: "dbOwner", db: "carpark" }, { role: "readWrite", db: "carpark" } ] } )
