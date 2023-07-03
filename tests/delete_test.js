use test
db.runCommand({delete: "test", deletes: [ { q: { }, limit: 0 } ], writeConcern: { w: "majority", wtimeout: 5000 }})
