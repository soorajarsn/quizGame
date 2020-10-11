const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = require('config').get('databaseUrl');
const dbName = "quizme";
const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();
const getNamespace = async function (collection) {
  try {
    // const clnt = await client.connect();
    const namespace = client.db(dbName).collection(collection);
    return namespace;
  } catch (err) {
    await client.connect();
    console.log(err);
    return client.db(dbName).collection(collection);
  }
};
const insertOne = function (namespace, doc) {
  namespace.insertOne(doc, function (err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);
  });
};
const updateOne = function (namespace, query, dc) {
  namespace.updateOne(
    query,
    {
      $set: dc,
    },
    function (err, r) {
      assert.equal(null, err);
    }
  );
};
const findOne = async function (namespace, query) {
  let data = await namespace.findOne(query);
  return data;
};
const findMany = function (namespace, query) {
  let data = namespace.find(query).toArray();
  return data;
};
const deleteDoc = function (namespace, query) {
  namespace.deleteMany(query, function (err, r) {
    assert.equal(null, err);
    console.log("deleted successfully");
  });
};
// const update = async function(){
//   await client.connect();
  
//   client.db(dbName).collection('quizes').updateOne({topic:"Node.js"},{$pull:{questions:{question:''}}});
// }
// update();
module.exports = {
  getNamespace,
  insertOne,
  updateOne,
  deleteDoc,
  findOne,
  findMany,
};
