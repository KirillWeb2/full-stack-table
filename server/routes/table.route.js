import { Router } from "express";
import Table from "../models/table.js";

const router = Router()


const generateFilter = (column, type, value) => {
    switch (column) {
        case "name":
            switch (type) {
                case "equally": return { name: { $eq: value } }
                case "contains": return { name: { $in: new RegExp(value, 'gi') } }
                default: return
            }
        case "quantity":
            switch (type) {
                case "more": return { quantity: { $gt: +value } }
                case "less": return { quantity: { $lt: +value } }
                case "equally": return { quantity: { $eq: +value } }
                default: return
            }
        case "distance":
            switch (type) {
                case "more": return { distance: { $gt: +value } }
                case "less": return { distance: { $lt: +value } }
                case "equally": return { distance: { $eq: +value } }
                default: return
            }
        default: return
    }
}

const generateSort = (sortColumn, sort) => {
    const sorted = {}

    sorted[sortColumn] = sort == 'asc' ? 1 : -1

    return sorted
}

const onlySort = async (skip, limit, sortColumn, sort, res) => {
    const maxRows = await Table.find()
  
    const rows = await Table.find({}, {}, { skip: skip, limit: limit }).sort(generateSort(sortColumn, sort))

    return res.status(200).json({ rows, max: maxRows.length })
}

const onlySearch = async (skip, limit, searchColumn, type, value, res) => {
    const maxRows = await Table.find(generateFilter(searchColumn, type, value), {})

    const rows = await Table.find(generateFilter(searchColumn, type, value), {}, { skip: skip, limit: limit })

    return res.status(200).json({ rows, max: maxRows.length })
}

const searchAndSort = async (skip, limit, sortColumn, sort, searchColumn, type, value, res) => {
    const rows = await Table.find(generateFilter(searchColumn, type, value), {}, { skip: skip, limit: limit }).sort(generateSort(sortColumn, sort))

    const maxRows = await Table.find(generateFilter(searchColumn, type, value), {})

    return res.status(200).json({ rows, max: maxRows.length })
}

router.get('/', async (req, res) => {
    try {
        const { sort, sortColumn, searchColumn, type, value, limit, page } = req.query

        const skip = page == 1 ? 0 : (limit * (page - 1))



        if (sortColumn && !value) {
            return onlySort(skip, limit, sortColumn, sort, res)
        }

        if (!sortColumn && value) {
            return onlySearch(skip, limit, searchColumn, type, value, res)
        }

        if (sortColumn && value) {
            return searchAndSort(skip, limit, sortColumn, sort, searchColumn, type, value, res)
        }


        // get
        const rows = await Table.find({}, {}, { skip: skip, limit: limit })

        const maxRows = await Table.find()

        res.status(200).json({ rows, max: maxRows.length })
    } catch (error) {
        console.log(error)
    }
})




export default router