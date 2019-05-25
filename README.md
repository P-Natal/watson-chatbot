# Discord Chatbot using Watson assintant API

I decided to commit just the core files to the application.
But all you need as pre requisite to put it all to work is:
  -Node.js;
  -An IBM Cloud account;
  -A Discord account;
  
# Starting with Watson:
It is very simple to create a chatbot on Watson. At the home page of IBM Cloud catalog you can search for "Watson Assistant".
Selecting this service you will be redirected to another page, where you can create your Watson Assistant Instance.
Select the name/region/group of resources(I only leave as default) you want for your service, then click at the big blue button that says something like "Create". 

So, When the next page is loaded you will receive your "API KEY" and "URL", these are important configurations for the Bot to work.
You can now lauch your Watson Assistant service. On it you can find lots of tutorials to create your Assistant.

For this project we will only need a "Skill". So, enter the Skills section and create one!
Now, this is important, I made my application based on a Skill I've created and configured my own way. So, if you want, you can import this skill. I've uploaded it on this project. It's only a Json file. 
If you decide to make it by yourself it's ok. But the teaching commands won't work. With that said, I advise you to import my Skill. It's just a base Skill that you can improve later on.

With your skill created we're done here.

# Discord Bot

Enter the Discord Developer Portal ("https://discordapp.com/developers");
Create an App;
Then create a Bot to you App;
Save it's credentials;
Select a pretty cool icon for it.

You can then insert your bot to a discord Server.

# How the application works?

Well, it's really simple. We use discord.js to start a Discord Client using the credentials of our Discord Bot.
This Client will be listening for any message that is sent to our Bot. When a message is received we send the content of it to the Watson Assistant API, where our Assistant will analyse it and respond to the Application with the correct answer, then this answer goes to our Bot that send a message to the user.


# Teaching Commands:

The way they work is this:
  -Watson uses its fantastic Natural Language Processing(NLP) to find out if the user is wanting to teach something. Then Watson respond to our application a request with a certain "Intent" (Wich can be "addEntity", for example) and a message explainnig that if the user wants to teach XXX, he needs to send a message with a specific format(Explained in the message). So, the user can send it to our Bot, with the user's input("teachings") on it.
  -When our Application receive this teaching commands, it can decide wich request to do at Watson Assisstant API, to insert the correct information that the user wants. 
  -This way, the user is inserting data on our Skill by himself. We don't need to collect all the data that our Bot could not respond and insert it manually.


# Closure

There's a long way to go before I can be really proud of my Application. I am not even used to Javascript yet...
But it seems pretty promising to me, and I am happy to share this small project with whoever is intersted.

For more info about Watson you can Check their documentation at: https://cloud.ibm.com/apidocs/assistant?code=node

Thanks! And bye bye!
