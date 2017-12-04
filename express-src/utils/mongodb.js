import Promise from 'bluebird'
import { mongoClient } from 'mongodb'

import config from './config'

const mongodbConnection = mongoClient.connect(config.mongoURL, {
    promiseLibrary: Promise
})

export default mongodbConnection
