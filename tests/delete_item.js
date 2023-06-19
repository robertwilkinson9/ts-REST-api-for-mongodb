use item
db.runCommand({delete: "item", deletes: [ { q: { }, limit: 0 } ], writeConcern: { w: "majority", wtimeout: 5000 }})
