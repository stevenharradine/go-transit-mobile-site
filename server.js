var http       = require('http')
var dispatcher = require('httpdispatcher')
var cheerio    = require("cheerio")
var request    = require("request")
var fs         = require('fs')
var PORT       = 8080

var server = http.createServer(function (req, res){
    dispatcher.dispatch(req, res);
});

server.listen(PORT, '0.0.0.0', function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

dispatcher.onGet("/departures", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'})

    request({
      uri: "http://www.gotransit.com/publicroot/en/unionstation/departures.aspx",
    }, function(error, response, body) {
        try {
            var $ = cheerio.load(body)
            var html  = '<html><head>'
                html += '<link rel="stylesheet" type="text/css" href="http://www.gotransit.com/css/departures.css"/></head><body>'
                html += '<link rel="stylesheet" type="text/css" href="styles.css"/></head><body>'
                html += '<meta http-equiv="Refresh" content="60" />'
                html += '<div class="tbldiv" style="width: 700px">'
                html += $(".leftContainerHome").find (".tbldiv").html()
                html += "</div>"
                html += '<div class="tbldiv data" style="width: 700px">'
                html += $(".leftContainerHome").find (".tbldiv").next().html()
                html += '<script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>'
                html += '<script src="function.js"></script>'
                html += "</div>"
                html += '</body></html>'

            res.write (html)
            res.end()
          } catch (error) {
            res.write (error)
            res.end()
          }
    });
});

dispatcher.onGet("/styles.css", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/css'});

    read ('styles.css', function (data) {
        res.end(data);
    }, function (error) {
        console.log (error);
    })
})

dispatcher.onGet("/function.js", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/javascript'});

    read ('function.js', function (data) {
        res.end(data);
    }, function (error) {
        console.log (error);
    })
})

function read (filename, success_callback, error_callback) {
    fs.readFile(filename, 'utf8', function (err,data) {
        if (err) {
            return error_callback (err);
        }
        
        return success_callback (data);
    });
}
