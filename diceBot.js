//Global vars


//normal functions
function print(text)
{
	console.log(text);
}

function executeCommand(cmd)
{
	var result = "The rolls are: {";
	var total = 0;
	var diceRoll = 0;
	
	cmd = cmd.split('d');
	
	quantity = cmd[0].split("#");
	quantity = parseInt(quantity[1]);

	size = parseInt(cmd[1]);
	
	if(quantity > 25)
	{
		return null;
	}
	
	for(var i = 0; i < quantity; i++)
	{
		diceRoll = Math.floor( (Math.random() * size) + 1);
		print("roll "+i+": "+diceRoll);
		result += diceRoll;
		
		if(i < quantity - 1)
			result += ",";
		total += diceRoll;
	}
	
	result += "} = " + total;
	
	return result;
}

function connectBot(name,pass,network,chan,port)
{
	var irc = require('irc');
	var client = new irc.Client(network, name,
	{
    	channels: [chan]
	});
	
	client.addListener('message', function (from, to, message)
	{
    	print(from + '@' + to + ' : ' + message);
    	if(message[0] == '#')
    	{
    		var result = executeCommand(message);
    		
    		if(result)
    		{
    			client.say(chan, result);
    		}
    		else
    			client.say(chan,"hey " + t + ", those are too many dices! (max. 25 dices)");
    	}
	});
}

//ENTRY_POINT
main();

function main()
{
	var nickName = "DiceOverlord";
	var password = diceBot;
	var network = "irc.freenode.net";
	var channel = "##uac";   //here you can change it for your channel
	var port = 6999;
	
	print("Welcome to the IRC Dice bot, made by luisoliv");
	connectBot(nickName,password,network,channel,port);
	
	return true;
}



