var config = require('./config');
var help = require('./help');


module.exports = {
//---------------------ADD-INTENT-----------------------

addIntent(mess, message, service){

    var intent = mess.split("->")[0];
    console.log("\n\nIntent: "+intent+"\n\n");
    intent = remove(" ", intent);

    var exps = mess.split("->")[1].split("/");
    console.log("\n\nExamples: "+exps+"\n\n");

    var ex = new Array();
    for (var i = 0; i< exps.length; i++){
        ex.push({text:exps[i]});    
    }
    
    var params = {
        workspace_id: config.workspace_id,
        intent: intent,
        examples: ex
    };

    service.createIntent(params, function(err, response) {
        if (err) {
          var intentJaCriadoMessage = 'Unique Violation: The value "'+intent.toLowerCase()+'" already exists';
          console.error(err);
          if(err.message==intentJaCriadoMessage){
            message.reply('Ops! Parece que eu já conheço esse Intent...Tente me mostrar mais exemplos para ele!');
          }else{
              message.reply('Ops! Algo deu errado por aqui...Pode verificar o log para mim?');
          }
        } else {
          console.log('Intent '+intent+ ' criado com sucesso. E os seguintes exemplos foram inseridos: \n'+exps);
          message.reply("Entendido!");
        }
      });
},

//--------------------------------------------------

//-----------------Update-Intent--------------------

updateIntent(mess, message, service){

  var intent = mess.split("->")[0];
  console.log("\n\nIntent: "+intent+"\n\n");
  intent = remove(" ", intent);

  var exps = mess.split("->")[1].split("/");
  console.log("\n\nExamples: "+exps+"\n\n");

  var ex = new Array();
  for (var i = 0; i< exps.length; i++){
      ex.push({text:exps[i]});    
  }

  var params = {
    workspace_id: config.workspace_id,
    intent: intent,
    new_examples: ex,
    new_description: ''
  };
    
  service.updateIntent(params, function(err, response) {
    if (err) {
      console.error(err);
      message.reply("Ops! Algo deu errado...Você pode olhar o log para saber o que deu errado.");
    } else {
      console.log(JSON.stringify(response, null, 2));
      message.reply("Certo! Vou me lembrar disso.");
    }
  });
},

//--------------------------------------------------

//-----------------Delete-Intent--------------------

deleteIntent(mess, message, service){
  mess = remove(" ", mess);
  var intent = mess;
  intent = remove(" ", intent);

  console.log("\n\nIntent: "+intent+"\n\n");

  var params = {
      workspace_id: config.workspace_id,
      intent: intent
    };
    
  service.deleteIntent(params, function(err, response) {
    if (err) {
      console.error(err);
      message.reply("Ops! Algo deu errado...Você pode olhar o log para saber o que deu errado."+
      "Mas pode ser que essa intenção não exista, verifique se não foi erro de digitação!");
    } else {
      console.log(JSON.stringify(response, null, 2));
      message.reply("Nunca nem vi nenhum \""+intent+"\". Apagado com sucesso!");
    } 
  });
},

//--------------------------------------------------

//-----------------Insert-Example-------------------

insertExample(mess, message, service){

    var intent = mess.split("->")[0];
    console.log("\n\nIntent: "+intent+"\n\n");
    intent = remove(" ", intent);

    var example = mess.split("->")[1];
    console.log("\n\nExamples: "+example+"\n\n");

    var params = {
        workspace_id: config.workspace_id,
        intent: intent,
        text: example
      };
      
      service.createExample(params, function(err, response) {
        if (err) {
            var valueAlreadyExists = 'Unique Violation: The value "hello" already exists';
          console.error(err);
          if(err.message==valueAlreadyExists){
            message.reply("Eu já conheço esse exemplo...");
          }
        } else {
          console.log(JSON.stringify(response, null, 2));
          message.reply("Anotado! Obrigado por me ensinar!");
        } 
      });
},

//--------------------------------------------------

//-----------------Update-Example--------------------

updateExample(mess, message, service){

  var intent = mess.split("->")[0];
  intent = remove(" ", intent);
  console.log("\n\nIntent: "+intent+"\n\n");

  var oldExample = mess.split("->")[1].split("/")[0];
  console.log("\n\nOld example: "+oldExample+"\n\n");

  var newExample = mess.split("->")[1].split("/")[1];
  console.log("\n\nNew example: "+newExample+"\n\n");

  var params = {
      workspace_id: config.workspace_id,
      intent: intent,
      text: oldExample,
      new_text: newExample         
    };
    
    service.updateExample(params, function(err, response) {
    if (err) {
      console.error(err);
      message.reply("Ops! Algo deu errado...Você pode olhar o log para saber o que deu errado.");
    } else {
      console.log(JSON.stringify(response, null, 2));
      message.reply("Ok, já está corrigido!");
    }
  });
},

//--------------------------------------------------

//-------------------Add-Entity---------------------

addEntity(mess, message, service){

  var entity = mess.split("->")[0];
  console.log("\n\nEntity: "+entity+"\n\n");

  var exps = mess.split("->")[1].split("/");
  console.log("\n\nValues: "+exps+"\n\n");

  var values = new Array();
  for (var i = 0; i< exps.length; i++){
      values.push({value:exps[i]});    
  }

  var params = {
    workspace_id: config.workspace_id,
    entity: entity,
    values: values
  };
    
  service.createEntity(params, function(err, response) {
    if (err) {
      console.error(err);
      message.reply("Ops! Algo deu errado...Você pode olhar o log para saber o que deu errado.");
    } else {
      console.log(JSON.stringify(response,null, 2));
      message.reply("Entidade adicionada na minha biblioteca! Valeu!");
    } 
  });
},

//--------------------------------------------------

//------------------Add-Dialog----------------------

addDialog(mess, message, service){

  var nodeName = mess.split("->")[0];
  console.log("\n\nDialog Node: "+nodeName+"\n\n");

  var cond = mess.split("->")[1];
  cond = remove(" ", cond);
  console.log("\n\nCondition: "+cond+"\n\n");

  var resp = mess.split("->")[2];
  console.log("\n\nResponse: "+resp+"\n\n");

  var params = {
    workspace_id: config.workspace_id,
    dialog_node: nodeName,
    conditions: '#'+cond,
    output: {
      text: resp
    },
    title: nodeName
  };
    
  service.createDialogNode(params, function(err, response) {
    if (err) {
      console.error(err);
      message.reply("Ops! Algo deu errado...Você pode olhar o log para saber o que deu errado.");
    } else {
      console.log(JSON.stringify(response, null, 2));
      message.reply("Perfeito! Já me sinto mais inteligente. Obrigado!");
    }
  });
},

//--------------------------------------------------

//-----------------Update-Dialog-----------------------

updateDialog(mess, message, service){          

  var dialogNode = mess.split("->")[0];
  console.log("\n\nDialog Node: "+dialogNode+"\n\n");

  var resps = mess.split("->")[1].split("/");
  console.log("\n\nResponses: "+resps+"\n\n");

  var newResponses = new Array();
  for (var i = 0; i< resps.length; i++){
    newResponses.push({text:resps[i]});    
  }

  for (i = 0; i < newResponses.length; i++) {
    var params = {
      workspace_id: config.workspace_id,
      dialog_node: dialogNode,
      new_output: {
        text: newResponses[i]
      }
    };

    service.updateDialogNode(params, function(err, response) {
      if (err) {
        console.error(err);
      } else {
        console.log(JSON.stringify(response, null, 2));
      }
    });
  }
},

//-------------------DELETE-DIALOGS---------------------

deleteDialog(mess, message, service){          

  var dialogNode = mess;
  
  console.log("\n\nDialog Node: "+dialogNode+"\n\n");

  var params = {
    workspace_id: config.workspace_id,
    dialog_node: dialogNode
  };
    
    service.deleteDialogNode(params, function(err, response) {
      if (err) {
        console.error(err);
        message.reply("Ops! Algo deu errado...Você pode olhar o log para saber o que deu errado."+
        "Mas uma possibilidade é que esse Dialog node não exista.");
      } else {
        console.log(JSON.stringify(response, null, 2));
        message.reply("Dialog Node apagado do meu sistema");
      }
    });
},

//--------------------------------------------------

//------------------SHOW-DIALOGS--------------------

showDialogs(message, service){          

  var params = {
    workspace_id: config.workspace_id,
  };
  
  service.listDialogNodes(params, function(err, response) {
    if (err) {
      console.error(err);
      message.reply("Ops! Algo deu errado...Pode olhar o log para saber o que houve.");
    } else {
      console.log(JSON.stringify(response, null, 2));
        var i;
        for (i = 0; i < response.dialog_nodes.length; i++) {
          message.reply("Nome do Node: "+response.dialog_nodes[i].title +
          "\nRespostas possíveis: " + response.dialog_nodes[i].output.generic.values);
        } 
    }
  });
},

//--------------------------------------------------

//------------------GET-DIALOG----------------------

getDialog(mess, message, service){        

  var dialogNode = mess;
  dialogNode = remove(" ", dialogNode);
  console.log("\n\nDialog Node: "+dialogNode+"\n\n");

  var params = {
    workspace_id: config.workspace_id,
    dialog_node: dialogNode
  };
  
  assistant.getDialogNode(params, function(err, response) {
    if (err) {
      console.error(err);
      message.reply("Ops! Algo deu errado...Você pode olhar o log para saber o que deu errado. "+
      "Pode ser que esse Dialogo não exista.");
    } else {
      console.log(JSON.stringify(response, null, 2));
      message.reply("Pronto! Essas são as informações pra esse dialogo!");
    }
  });
},

//--------------------------------------------------

//------------------SHOW-INTENTS--------------------

showIntents(message, service){
    var params = {
        workspace_id: config.workspace_id,
      };
      
      service.listIntents(params, function(err, response) {
        if (err) {
          console.error(err);
        } else {
          console.log(JSON.stringify(response, null, 2));
          var i;
          for (i = 0; i < response.intents.length; i++) {
            message.reply("---\nIntenção: "+response.intents[i].intent+"\nDescrição: "+response.intents[i].description+"\n");
          } 
          message.reply("Pronto. Isso é tudo!");
        }
      });
},

//--------------------------------------------------

//------------------HELP--------------------

helpMe(message){
  message.reply(help.helpText);
},

//--------------------------------------------------

remove(toRemove, text){
    return text.replace(toRemove + " ", "");
}
}