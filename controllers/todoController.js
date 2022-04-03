const bodyParser = require('body-parser');

const fs = require("fs");

const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {
    app.get('/', (req, res) => {
        getData((data) => {
            res.render('todo', {data: data});
        })
    });

    app.post('/', urlencodedParser, (req, res) => {
        getData((data) => {
            data.booksToRead.push(req.body);
            saveData(data);
            res.json(data.booksToRead);
        })
    });

    app.delete('/:item', (req,res) => {
        getData((data)=> {
            const finished = data.booksToRead.find(todo => todo.item.replace(/ /g, '-') === req.params.item);

            data.finishedBooks.push(finished);
    
            data.booksToRead = data.booksToRead.filter((todo) => {
                return todo.item.replace(/ /g, '-') !== req.params.item;
            });
            saveData(data);
            res.json({data: data});
        })
    });

    app.delete('/delete/:item', (req,res) => {
        getData((data)=> {
            data.finishedBooks = data.finishedBooks.filter((todo) => {
                return todo.item.replace(/ /g, '-') !== req.params.item;
            });

            saveData(data);

            res.json({data: data});
        })
    });
};


function getData(callback) {
    try{
        fs.readFile("./data.json", "utf-8", (err, data) => {
            if(err) return err;
            callback(JSON.parse(data));
        })
    } catch(err) {
        console.log("Error", err)
    }
};

function saveData(data) {
    try{
        fs.writeFile("./data.json", JSON.stringify(data), (err) => {
            if(err) return err;
        })
    } catch(err) {
        console.log("Error", err)
    }
};