const Discord = require('discord.js');
var AssistantV1 = require('watson-developer-cloud/assistant/v1');
var watson = require('watson-developer-cloud');
var config = require('./config');
var help = require('./help');
const client = new Discord.Client();
const watsonUrl = 'https://gateway.watsonplatform.net/assistant/api';
const shell = require('shelljs');
const requests = require('./requests.js');

var controller=0;

var service = new AssistantV1({
    iam_apikey: config.watson_api_key,
    version: config.watson_version,
    url: watsonUrl
  });

var workspace_id = config.workspace_id;

var ctx;

client.on('ready', function(){
    console.log("I am ready");
});

//--------------------Mensagem é recebida pelo bot do Discord------------------------
client.on('message', function(message){
        if(((client.user.id != message.author.id && message.channel.type == "dm"))
        ||(client.user.id != message.author.id && message.channel.name.includes("teste-interação-entre-bots"))){
          var mess = requests.remove("@"+client.user.username, message.cleanContent);
          console.log("\n------------------------\nUser says -> " + mess);
          if(selectConfig(mess, message)){
            var promise = new Promise(function(resolve, reject) {

              //----------------Integração com Watson------------------------
                var newMessageFromUser = message.content;
                service.message({
                        workspace_id: workspace_id,
                        input: { text: newMessageFromUser },
                        context : ctx,
                        }, processResponse);
    
                function processResponse(err, response) {
                  if (err) {
                    console.error(err);
                    resolve(null)
                    return;
                  }
    
                  if (response.intents.length > 0) {
                    var recognizedIntent = response.intents[0].intent;
                    var entities = response.entities;
                    console.log('Detected intent: #' + recognizedIntent);
                    listStuff(message, recognizedIntent);
                  }
    
                  if (response.output.generic.length != 0 && controller==0) {
                      ctx = response.context;
                      var resp = response.output.generic[0].text;
                      console.log("Bot says -> " + resp);
                      resolve(resp);
                  }
                }
          //-------------------------------------------------------------
              });
          }
          (async function(){
              var result = await promise;
              if(result){
                  message.reply(result);
              }
          }());
        }
        controller=0;
});

//------------------SELECT CONFIG--------------------

function selectConfig(mess,message){
  if(message.cleanContent.includes("!AddIntent")){
    console.log("\nAdd Intent\n");
    mess = requests.remove("!AddIntent", mess);
    requests.addIntent(mess, message, service);
    return false;
  }
  else if(message.cleanContent.includes("!UpdateIntent")){
    console.log("\nUpdate Intent\n");
    mess = requests.remove("!UpdateIntent", mess);
    requests.updateIntent(mess, message, service);
    return false;
  }
  else if(message.cleanContent.includes("!DeleteIntent")){
    console.log("\nDelete Intent\n");
    mess = requests.remove("!DeleteIntent", mess);
    requests.deleteIntent(mess, message, service);
    return false;
  }
  else if(message.cleanContent.includes("!AddExample")){
    console.log("\nInsert Example\n");
    mess = requests.remove("!AddExample", mess);
    requests.insertExample(mess, message, service);
    return false;
  }
  else if(message.cleanContent.includes("!UpdateExample")){
    console.log("\nUpdate Example\n");
    mess = requests.remove("!UpdateExample", mess);
    requests.updateExample(mess, message, service);
    return false;
  }
  else if(message.cleanContent.includes("!AddEntity")){
    console.log("\nAdd Entity\n");
    mess = requests.remove("!AddEntity", mess);
    requests.addEntity(mess, message, service);
    return false;
  }
  else if(message.cleanContent.includes("!AddDialog")){
    console.log("\nAdd Dialog\n");
    mess = requests.remove("!AddDialog", mess);
    requests.addDialog(mess, message, service);
    return false;
  }
  else if(message.cleanContent.includes("!DeleteDialog")){
    controller=1;
    console.log("\nDelete Dialog\n");
    mess = requests.remove("!DeleteDialog", mess);
    requests.deleteDialog(mess, message, service);
    return false;
  }
  else if(message.cleanContent.includes("!UpdateDialog")){
    console.log("\nUser wants to update dialog responses\n");
    requests.updateDialog(mess, message, service);
    return false;
  }
  else{
    return true;
  }
}

//--------------------------------------------------

//------------------PREPARE FOR CONFIG--------------------

function listStuff(message, recognizedIntent){
  if(recognizedIntent.includes('list_intent')){
    console.log("\nUser wants to see a list of intents\n");
    console.log("\nShow Intent\n");
    requests.showIntents(message, service);
  }
  else if(recognizedIntent.includes('list_dialogs')){
    console.log("\nUser wants to see a list of dialogs\n");
    console.log("\nShow Dialog Nodes\n");
    requests.showDialogs(message, service);
  }
  else if(recognizedIntent.includes('help')){
    requests.helpMe(message);
  }
  else if(recognizedIntent.includes('user_name')){
    message.reply("Seu nome é "+message.author);
  }
}

//--------------------------------------------------

client.login(config.discord_client_id);
