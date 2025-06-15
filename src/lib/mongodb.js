"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/mongodb.ts
var mongodb_1 = require("mongodb");
var uri = process.env.MONGODB_URI;
var options = {};
var client;
var clientPromise;
if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MongoDB URI to .env.local");
}
if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new mongodb_1.MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
}
else {
    client = new mongodb_1.MongoClient(uri, options);
    clientPromise = client.connect();
}
exports.default = clientPromise;
