const Toy = require('./Toy');



class ToyController {

    index(req, res) {
        let toys = Toy.all();
        res.render('toyIndex', { toys: toys });
    }

    show(req, res) {
        let id = req.params.id;
        let toy = Toy.find(id);

        if (!toy) {
            res.send("Could not find toy with id of " + id);
        } else {
            res.render('toyShow', { toy: toy });
        }
    }

    newToy(req, res) {
        res.render('toyNew', { toy: new Toy() });
    }

    create(req, res) {
        console.log("About to create toy");
        console.log(req.body);
        let newToy = Toy.create(req.body.toy);

        // Send a redirect to the "show" route for the new toy.
        res.writeHead(302, { 'Location': `/toys/${newToy.id}` });
        res.end();
    }

    edit(req, res) {
        let id = req.params.id;
        let toy = Toy.find(id);

        if (!toy) {
            res.send("Could not find toy with id of " + id);
        } else {
            res.render('toyEdit', { toy: toy });
        }
    }

    update(req, res) {
        let id = req.params.id;
        let toy = Toy.find(id);

        if (!toy) {
            res.send("Could not find toy with id of " + id);
        } else {
            toy.name = req.body.toy.name;
            toy.description = req.body.toy.description;
            toy.manufacturer = req.body.toy.manufacturer;
            toy.price = req.body.toy.price;
            // If using a database, we would need some kind of "save" method here.

            // Send a redirect to the "show" route for the new toy.
            res.writeHead(302, { 'Location': `/toys/${toy.id}` });
            res.end();
        }
    }
}

module.exports = ToyController;