'use strict';

exports.PORT = process.env.PORT || 8080;
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/hearthhome-user-db';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/hearthhome-user-db';
exports.JWT_SECRET = process.env.JWT_SECRET || 'rosebud';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

//To connect to mongo DB:
// hearthhome-server jeffconnelly$ mon ds113826.mlab.com:13826/hearthhome-db-u jc -p jcjs