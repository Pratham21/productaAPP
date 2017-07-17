var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('mongodb://pbharadwaj:Tulip#123@ds153689.mlab.com:53689/product_db',['productlist']);
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.get('/productlist/', function(req,res){
    console.log("i received get req")
    db.productlist.find(function(err,docs) {
        
        console.log(docs);
        res.json(docs);
    })

});
app.post('/productlist/', function( req,res){
    console.log(req.body);
    console.log("got insert request");
    db.productlist.insert(req.body, function(err, doc){
        res.json(doc);
        
    })
});
app.delete('/productlist/:id', function(req, res){
    var id = req.params.id;
    console.log("got delete request");
    console.log(id);
    db.productlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
                         res.json(doc);
    })
});
app.get('/productlist/:id', function(req, res){
    console.log("got edit request for retriving the ID");
        var id = req.params.id;
        console.log(id);
    console.log("got edit request");
        db.productlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
//            console.log("edit data"+JSON.stringfy(doc));
            res.json(doc);
        })  
        
}); 
app.put('/productlist/:id', function(req, res){
    var id = req.params.id;
    console.log(req.body.name);
    db.productlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
                                update: {$set: {name: req.body.name, category: req.body.category, brand: req.body.brand}},
                                new: true}, function(err,doc)
                                    {
                                res.json(doc);
                                    });
});
app.listen(port);
console.log("server running on port 3000");