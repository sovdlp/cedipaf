const entrega = require('../models/entrega');

/*let entrega = [
    { remision: 1, cliente: "VITALIS", fecha_envio: "01-01-2022", fecha_entrega: "05-01-2022", transportador: "COORDINADORA", guia_envio: "09210038705", estado: "ENTREGADO" },
    { remision: 2, cliente: "LEGRAND", fecha_envio: "02-01-2022", fecha_entrega: "05-01-2022", transportador: "COORDINADORA", guia_envio: "09210038706", estado: "DESPACHADO" },
    { remision: 3, cliente: "CHALVER", fecha_envio: "03-01-2022", fecha_entrega: "05-01-2022", transportador: "COORDINADORA", guia_envio: "09210038707", estado: "DEVUELTO" },
    { remision: 4, cliente: "VECOL", fecha_envio: "04-01-2022", fecha_entrega: "05-01-2022", transportador: "COORDINADORA", guia_envio: "09210038708", estado: "PENDIENTE" }
]*/

class ServerController {
    constructor() {

    }

    register(req, res) {
        entrega.create(req.body, (error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(201).json(data);
            }
        });
    }

    /* register(req, res) {
        //obtener datos
        let { id, nombre, apellido } = req.body;
        console.log("Usuario registrado con éxito");
        console.table({ id, nombre, apellido });
        users.push(req.body);
        res.status(200).json({
            message: "Usuario registrado con éxito"
        });
    } */

    /*    update(req, res) {
            let { id, nombre, apellido } = req.body;
            console.table({ id, nombre, apellido });
    
            users.forEach(element => {
                if (id == element.id) {
                    element.nombre = nombre;
                    element.apellido = apellido;
                }
            });
    
            if (users != null) {
                res.status(200).json(users);
            } else {
                res.status(400).json({ message: "Usuario no encontrado" });
            }
        }*/

    update(req, res) {
        let { remision, cliente, fecha_envio, fecha_entrega, transportador, guia_envio, estado } = req.body;
        let obj = { cliente, fecha_envio, fecha_entrega, transportador, guia_envio, estado };
        entrega.findByIdAndUpdate(remision, { $set: obj }, (error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);
            }
        })
    }


    /*deleteUser(req, res) {
        let { id } = req.body;
        console.table({ id });

        let tempUser = [];
        users.forEach(element => {
            if (id != element.id) {
                tempUser.push(element);
            }
        });

        users = tempUser;
        if (users != null) {
            res.status(200).json(users);
        } else {
            res.status(400).json({ message: "Usuario no encontrado" });
        }
    }*/

    /*deleteUser(req, res) {
        let { id } = req.body;
        person.findByIdAndDelete(id, (error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);
            }
        })
    }*/


    /*    getUsers(req, res) {
            let id = req.params.id;
            let userResp = null;
            users.forEach(element => {
                if (id == element.id) {
                    userResp = element;
                }
            });
    
            if (userResp != null) {
                res.status(200).json(userResp);
            } else {
                res.status(400).json({ message: "Usuario no encontrado" });
            }
        }*/

    getDocumentos(req, res) {
        let remision = req.params.remision;
        entrega.findById(remision, (error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);
            }
        })
    }

    /*    getAllUsers(req, res) {
            res.status(200).json(users);
        }*/

    getAllDocumentos(req, res) {
        entrega.find((error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);
            }
        })
    }

}

exports.default = ServerController;