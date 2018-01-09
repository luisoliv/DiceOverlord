//Global vars


//normal functions
function print(text)
{
	console.log(text);
}

function executeRoll(cmd)
{
	var result = []; //the array that will contain final results
	var total = 0;
	var diceRoll = 0;
	
	cmd = cmd.split('d');
	
	quantity = cmd[0].split('#');
	quantity = parseInt(quantity[1]);

	size = parseInt(cmd[1]);
	
	if(quantity > 25)
	{
		return null;
	}
	
	for(var i = 0; i < quantity; i++)
	{
		diceRoll = Math.floor( (Math.random() * size) + 1);
		result.push(diceRoll);

		total += diceRoll;
	}
	result.push(total);
	
	return result;
}

/*
	function used to debug the roll results since it changed the way it returns it
	@define arrResult array with all roll results, and the cumulative total as last member of array
*/
function logResult(arrResult)
{
	for(var i = 0; i < (arrResult.length - 1) ; i++)
	{
		console.log('\n' + i + '° ' + '= ' + arrResult[i])
	}
	console.log('\n\nTotal : ' + arrResult[ arrResult.length - 1]);
}

function parseResults(arrResult)
{
	var final = '(';
	for(var i = 0; i < (arrResult.length - 1) ; i++)
	{
		final += arrResult[i]; //implicit convertion from INT to STRING
		if( (i + 1) < (arrResult.length - 1))
			final += ', ';
	}
	final += ') = [' + arrResult[ arrResult.length - 1] + ']';

	return final;
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
    		let results = executeRoll(message);
    		//logResult(result);
    		
    		if(results)
    		{
    			client.say(chan, parseResults(results) );
    		}
    		else
    			client.say(chan,'hey ' + t + ', those are too many dices! (max. 25 dices)');
    	}
	});
}

//ENTRY_POINT
main();

function main()
{
	var nickName = 'DiceOverlord';
	var password = 'diceBot';
	var network = 'irc.freenode.net';
	var channel = '##uac';   //here you can change it for your channel
	var port = 6999;
	
	print('Welcome to the IRC Dice bot, made by luisoliv');
	connectBot(nickName,password,network,channel,port);
	
	return true;
}



