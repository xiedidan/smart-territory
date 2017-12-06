import Promise from 'bluebird'
import { MongoClient } from 'mongodb'

import config from '../config'

const mongodbConnection = MongoClient.connect(config.mongoURL, {
    promiseLibrary: Promise
})

export default mongodbConnection
