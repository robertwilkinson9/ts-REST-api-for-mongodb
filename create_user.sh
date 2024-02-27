db.createUser( { user: "reserver", pwd: "assets", roles: [ { role: "dbOwner", db: "book" }, { role: "readWrite", db: "book" } ] } )
