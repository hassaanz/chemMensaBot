const request = require('request-promise-native')
const Alexa = require('alexa-app')
const parser = require('xml2json')
const util = require('util')

const app = new Alexa.app('app') // eslint-disable-line
const baseURl = "https://www.swcz.de/bilderspeiseplan/xml.php?plan=1479835489"
const parserOpts = {
	object: true,
  reversible: false,
  coerce: false,
  sanitize: true,
  trim: true,
  arrayNotation: false,
  alternateTextNode: false
}

function getMenu(day, year, month) {
	day = day || 11;
	year = year || 2017;
	month = month ||12;
	const url = `${baseURl}/jahr=${year}&monat=${month}&tag=${day}`
	request(url)
	.then(function(res) {
		var mensaMenu = parser.toJson(res, parserOpts)
		console.log(util.inspect(mensaMenu, {depth: 5}))
	})
	.catch( (err) => {
		console.log('ERR', err);
	})

}

getMenu();


app.launch(function (request, response) {
	var launchOutput = 'Welcome to Your Skill.  The purpose of this skill is...  To start using the skill, say Alexa, ask ....'
	response.say(launchOutput)
	response.shouldEndSession(false)
})

app.intent('AMAZON.HelpIntent', {
	'slots': {},
	'utterances': []
}, function (request, response) {
	var helpOutput = 'Welcome to Your Skill.  The purpose of this skill is...  To start using the skill, say Alexa, ask .... What would you like to do?'
	response.say(helpOutput)
	response.shouldEndSession(false)
})

app.intent('AMAZON.StopIntent', {
	'slots': {},
	'utterances': []
}, function (request, response) {
	var stopOutput = 'Stopping your Request and Exiting Skill'
	response.say(stopOutput).send()
})

app.intent('AMAZON.CancelIntent', {
	'slots': {},
	'utterances': []
}, function (request, response) {
	var cancelOutput = 'Canceling your Request and Exiting Skill'
	response.say(cancelOutput).send()
})

app.intent('SampleIntent', {
	'slots': {},
	'utterances': ['to say the skill', 'to tell me the name', 'to recite the time']
}, function (request, response) {
	var output = 'Hi there'
	response.say(output).send()
})

module.exports = app