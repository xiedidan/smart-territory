import mongodbConnection from '../../utils/mongodb'
import { TILE_COLLECTION } from '../../consts'

/*
tile info:
{
    level,
    tiles: [{ filename,
        geometry: { width, height },
        segment: { x, y },
        position: { x, y }
    }]
}
*/

export function setTile(req, res) {
    const { tile } = req

    mongodbConnection.then((db) => {
        db.collection(TILE_COLLECTION).findOne({}, (err1, foundTile) => {
            if (err1) {
                console.log('tile.controller::setTile() Error', err1.toString())
                res.status(500).send(err1.toString())
                return
            }

            db.collection(TILE_COLLECTION).deleteOne({ _id: foundTile._id }, (err2) => {
                if (err2) {
                    console.log('tile.controller::setTile() Error', err2.toString())
                    res.status(500).send(err2.toString())
                    return
                }

                db.collection(TILE_COLLECTION).insert(tile, (err3, insertedTile) => {
                    if (err3) {
                        console.log('tile.controller::setTile() Error', err3.toString())
                        res.status(500).send(err3.toString())
                        return
                    }

                    res.status(200).json(insertedTile)
                })
            })
        })
    })
}

export function getTile(req, res) {
    mongodbConnection.then((db) => {
        db.collection(TILE_COLLECTION).findOne({}, (err, foundTile) => {
            if (err) {
                console.log('tile.controller::getTile() Error', err.toString())
                res.status(500).send(err.toString())
                return
            }

            res.status(200).json(foundTile)
        })
    })
}
