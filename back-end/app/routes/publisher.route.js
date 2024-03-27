const express=require("express");
const publisher=require("../controllers/publisher.controller");

const router=express.Router();

router.route("/").get(publisher.findAll).post(publisher.create).delete(publisher.delete);

router.route("/favorite").get(publisher.findFavorite);

router.route("/:id").get(publisher.findOne).put(publisher.update).delete(publisher.delete);
