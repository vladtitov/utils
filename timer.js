/**
 * Created by VladHome on 3/6/2016.
 */

var http = require('http');
var fs = require('fs');

var logfilename = function(){
    var date = new Date();
    return '_'+(date.getMonth()+1)+'-'+date.getDate()+'.log';
}

var url = 'http://localhost/callcenter/rem/Test.php';
var counter=0;
var errors=0;
var success=0;

var loadData = function(onDataLoaded,onLoadErrror){
    var req = http.get(url, function(resp) {
        var str = '';
        resp.on('data', function (chunk) {
            str += chunk;
        });

        resp.on('end', function () {
            onDataLoaded(str);

        });

    }).on('error',function(e){ onLoadErrror(e)});

    }

var onDataLoaded = function(res){
    res = "\n\r"+(new Date()).toLocaleString()+"\n"+res;
    fs.appendFile('success'+logfilename(), res, function (err) {

    });
    success++
}
var onLoadErrror = function(res){
    res = "\n\r"+(new Date()).toLocaleString()+"\n"+res;
    fs.appendFile('error'+logfilename(), res, function (err) {

    });
errors++;
}


setInterval(function(){
    counter++
    console.log(' counter '+ counter+' success '+success+'  errors '+ errors);
    loadData(onDataLoaded,onLoadErrror);
},6000);

loadData(onDataLoaded,onLoadErrror);