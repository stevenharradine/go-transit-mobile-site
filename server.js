var http       = require('http')
var dispatcher = require('httpdispatcher')
var cheerio    = require("cheerio")
var request    = require("request")
var fs         = require('fs')
var PORT       = 8080

var navigation  = "<div class='nav'>"
    navigation += '<a href="/departures">Union Departures</a>'
    navigation += '<a href="/alerts">Service Alerts</a>'
    navigation += "</div>"

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
                html += '<link rel="stylesheet" type="text/css" href="http://www.gotransit.com/css/departures.css"/>'
                html += '<link rel="stylesheet" type="text/css" href="styles.css"/>'
                html += '<meta name="viewport" content="width=device-width, initial-scale=1">'
                html += '<meta http-equiv="Refresh" content="60" />'
                html += '</head><body>'
                html += '<div class="tbldiv" style="width: 700px">'
                html += $(".leftContainerHome").find (".tbldiv").html()
                html += "</div>"
                html += '<div class="tbldiv data" style="width: 700px">'
                html += $(".leftContainerHome").find (".tbldiv").next().html()
                html += "</div>"
                html += "<div class='nav-level-2'>"
                html += '<a href="#" class="showTrain">Train Schedules</a>'
                html += '<a href="#" class="showBus">Bus Schedules</a>'
                html += "</div>"
                html += navigation
                html += '<script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>'
                html += '<script src="function.js"></script>'
                html += '</body></html>'

            res.write (html)
            res.end()
          } catch (error) {
            res.write (error)
            res.end()
          }
    });
});


dispatcher.onGet("/alerts", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'})

    request({
      uri: "http://www.gotransit.com/publicroot/en/updates/servicestatus.aspx",
    }, function(error, response, body) {
        try {
            var $ = cheerio.load(body)
            var html  = '<html><head>'
                html += '<link rel="stylesheet" type="text/css" href="http://www.gotransit.com/MasterPages/css/serviceUpdate.css"/>'
                html += '<link rel="stylesheet" type="text/css" href="styles.css"/>'
                html += '<meta name="viewport" content="width=device-width, initial-scale=1">'
                html += '<meta http-equiv="Refresh" content="60" />'
                html += '</head><body>'
                html += '<div class="gridStatusTrain" style="width: 263px">'
                html += $("#serviceTable").html()
                html += "</div>"
                html += navigation
                html += '<script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>'
                html += '<script src="function.js"></script>'
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
