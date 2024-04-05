import mongoose from 'mongoose';

if (process.env.CONNECTION_STRING) {

  var connection_string;

// if the connection string does not start with mongo, assume it is base64 encoded
  if (process.env.CONNECTION_STRING.startsWith("mongo")) {
    connection_string = process.env.CONNECTION_STRING;
  } else {
    const buf = new Buffer(process.env.CONNECTION_STRING, 'base64');
    connection_string = buf.toString('ascii');
  }

console.log(`DB CONNECTION STRING is ${connection_string}`)

mongoose
    .connect(connection_string)
    .catch((e: unknown) => {if (e instanceof Error) {console.error('Connection error', e.message)}})

//   db = mongoose.connection
}
export const db = mongoose.connection
