const FestivalModel = require("../models/festivals.model")
const ReservationModel = require("../models/reservations.model")
const GameModel = require("../models/games.model")
const ZoneModel = require("../models/zones.model")
const EditorModel = require("../models/editors.model")

const ObjectId = require('mongoose').Types.ObjectId

module.exports.getListOfFestivals = async(req,res) => {
    const response = []
    try {
        const festivals = await FestivalModel.find()
        for (let i = 0; i < festivals.length; i++) {
            const f = festivals[i];
            let nb_rt_low = f.nb_t_low
            let nb_rt_premium = f.nb_t_premium
            let nb_rt_standard = f.nb_t_standard
            let nb_rsm_low = f.nb_sm_low
            let nb_rsm_premium = f.nb_sm_premium
            let nb_rsm_standard = f.nb_sm_standard

            const reservations = await ReservationModel.find({festival: f._id})
            let cpt_t_low = 0
            let cpt_t_premium = 0
            let cpt_t_standard = 0
            let cpt_sm_low = 0
            let cpt_sm_premium = 0
            let cpt_sm_standard = 0

            for (let j = 0; j < reservations.length; j++) {
                const r = reservations[j];
                cpt_t_low += r.nb_t_low? r.nb_t_low : 0
                cpt_t_premium += r.nb_t_premium? r.nb_t_premium : 0
                cpt_t_standard += r.nb_t_standard? r.nb_t_standard : 0
                cpt_sm_low += r.nb_sm_low? r.nb_sm_low : 0
                cpt_sm_premium += r.nb_sm_premium? r.nb_sm_premium : 0
                cpt_sm_standard += r.nb_sm_standard? r.nb_sm_standard : 0
            }
            nb_rt_low = f.nb_t_low - cpt_t_low
            nb_rt_premium = f.nb_t_premium - cpt_t_premium
            nb_rt_standard = f.nb_t_standard - cpt_t_standard
            nb_rsm_low = f.nb_sm_low - cpt_sm_low
            nb_rsm_premium = f.nb_sm_premium - cpt_sm_premium
            nb_rsm_standard = f.nb_sm_standard - cpt_sm_standard

            response.push({
                f,
                nb_rt_low,
                nb_rt_premium,
                nb_rt_standard,
                nb_rsm_low,
                nb_rsm_premium,
                nb_rsm_standard
            })
        }
        res.status(201).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}

module.exports.addFestival = async(req, res) => {

    const {name, year,
        nb_t_premium, nb_t_standard, nb_t_low,
        nb_sm_premium, nb_sm_standard, nb_sm_low,
        premium_t_price, standard_t_price, low_t_price,
        premium_sm_price, standard_sm_price, low_sm_price} = req.body

    try {

        const festival = await FestivalModel.create({
            _id: ObjectId(),
            name: name,
            year: year,
            nb_t_premium: nb_t_premium,
            nb_t_standard: nb_t_standard,
            nb_t_low: nb_t_low,
            nb_sm_premium: nb_sm_premium,
            nb_sm_standard: nb_sm_standard,
            nb_sm_low: nb_sm_low,
            premium_t_price: premium_t_price,
            standard_t_price: standard_t_price,
            low_t_price: low_t_price,
            premium_sm_price: premium_sm_price,
            standard_sm_price: standard_sm_price,
            low_sm_price: low_sm_price,
            is_current: true
        })
        res.status(201).json({festivalId: festival._id})

    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports.deleteFestival = async(req, res) => {
    const idFestival = req.params.id
    const mongooseId = ObjectId(idFestival)

    try {
        FestivalModel.deleteOne({_id: mongooseId})
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.updateFestival = async(req, res) => {
    const idFestival = req.params.id
    const mongooseId = ObjectId(idFestival)

    try {
        FestivalModel.updateOne({_id: mongooseId}, req.body)
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

module.exports.setCurrent = async(req, res) => {
    const idFestival = req.params.id
    const mongooseId = ObjectId(idFestival)

    try {
        await FestivalModel.updateOne({is_current: true}, {is_current: false})
        FestivalModel.updateOne({_id: mongooseId}, {is_current: true})
            .then(() => res.status(201).send())

    } catch(e) {
        console.log(e)
        res.status(400).send({e})
    }
}

/**
 * Returns a list of games where each
 * game is presented in the current festival
 */
 module.exports.getFestivalGames = async(req, res) => {
    try {
        const currentFestival = await FestivalModel.findOne({is_current: true})
        const reservations = await ReservationModel
            .find({festival: currentFestival._id})

        //   6065b1c7b393e02c7cf028a5
        let games=[]
        for (let i = 0; i < reservations.length; i++) {
            const g = reservations[i].games
            for (let j = 0; j < g.length; j++) {
                // g[j] is the game j of the reservation i
                const exhibitor = await EditorModel.findById(reservations[i].exhibitor).select("-games")
                const game = await GameModel.findById(g[j]._id)
                const state = g[j].state
                let zone
                if(game) {
                    zone = await ZoneModel.findById(game.zone)
                }
                const editor = await EditorModel.findOne({games: g[j]._id}).select("-games")
                const proto = g[j].proto
                games.push({game, state, zone, editor, exhibitor, proto})
            }
        }
        res.status(200).json(games)
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
}

module.exports.getCurrentFestival = async(req, res) => {
    try {
        const currentFestival = await FestivalModel
            .findOne({is_current: true})
        res.status(200).json(currentFestival)
    } catch (error) {
        console.log(e)
        res.status(500).send({e})
    }
}

module.exports.getFestivalEditors = async(req, res) => {
    try {
        const currentFestival = await FestivalModel
            .findOne({is_current: true})
        const reservations = await ReservationModel
            .find({festival: currentFestival._id})

        let editors=[]
        for (let i = 0; i < reservations.length; i++) {
            const g = reservations[i].games
            for (let j = 0; j < g.length; j++) {
                // g[j] is the game j of the reservation i 
                const game = await GameModel.findById(g[j]._id)
                if(game){
                    const editor = await EditorModel.findOne({games: game._id})
                    let found = false;
                    for(let k = 0; k < editors.length; k++) {
                        if (editors[k]._id.toString() === editor._id.toString()) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        editors.push(editor)
                    }
                }
            }
        }
        res.status(200).send(editors)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports.getFestivalExhibitors = async(req, res) => {
    try {
        const currentFestival = await FestivalModel
            .findOne({is_current: true})
        const reservations = await ReservationModel
            .find({festival: currentFestival._id})

        let exhibitors = []
        for (let i = 0; i < reservations.length; i++) {
            const exhibitor = await EditorModel
                .findById(reservations[i].exhibitor) 
            console.log(exhibitor)
            exhibitors.push(exhibitor)
        }
        res.status(200).send(exhibitors)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getFestivalZones = async(req, res) => {
    try {
        const currentFest = await FestivalModel
            .findOne({is_current: true})
        const zones = await ZoneModel.find({festival: currentFest._id})
        res.status(200).send(zones)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

/*module.exports.getEditor = async(req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    try {
        const editor = await EditorModel.findById(req.params.id)
        for (let i = 0; i < editor.length; i++) {
            const e = editor[i];
            
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
} */