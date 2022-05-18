const express = require('express');
const serverController = require("../controllers/serverController");

class ServerRouter{
    constructor(){
        this.router = express.Router();
        this.config();
    }

    config(){
        const objServerC = new serverController.default();
        this.router.get("/documentos", objServerC.getAllDocumentos);
        this.router.get("/documentos/:remision", objServerC.getDocumentos);
        this.router.post("/documentos", objServerC.register);
        this.router.put("/documentos", objServerC.update);
        //this.router.delete("/documentos", objServerC.deleteDocumento);        
    }
}

exports.default = ServerRouter;