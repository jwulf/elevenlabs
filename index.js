const voice = require('elevenlabs-node');
const fs = require('fs');
const tokenizer = require('sbd');
const queue = require('async/queue');
const audioconcat = require('audioconcat')

const apiKey = process.env.ELEVEN_LABS_API_KEY; // Your API key from Elevenlabs
// const voiceID = 'pNInz6obpgDQGcFmaJgB';            // Adam
const voiceID = 'Yko7PKHZNXotIFUBG7I9'				// Matthew
const fileNames = [];                     

const textInput = fs.readFileSync("./text.txt", "utf-8")

const size = textInput.length;
const sentences = size > 5000 ? tokenizer.sentences(textInput, {}).reverse() : [textInput]

const text = [""]
let row = 0
do {
	const sentence = sentences.pop()
	if (text[row].length + sentence.length > 5000) {
		row ++
		text.push("")
	}
	text[row] = text[row] + ` ${sentence}`
} while (sentences.length > 0)


const q = queue(function(task, callback) {
	console.log(`Stream ${task.fileName} started`)
    voice.textToSpeechStream(apiKey, voiceID, task.text, 0.75, 0.75).then(res => {
		res.pipe(fs.createWriteStream(task.fileName));
		res.on('end', () => {
			console.log(`Stream ${task.fileName} ended`)
			fileNames.push(`${task.fileName}`)
			callback();
		})
	});
}, 1);

text.forEach((t, i) => q.push({
	text: t,
	fileName: `audio${i}.mp3`
}))

q.drain(() => {
	audioconcat(fileNames)
		.concat('output.mp3')
		.on('start', function (command) {
			console.log('ffmpeg process started:', command)
		  })
		  .on('error', function (err, stdout, stderr) {
			console.error('Error:', err)
			console.error('ffmpeg stderr:', stderr)
		  })
		  .on('end', function (output) {
			console.error('Audio created in:', output)
		  })
})
