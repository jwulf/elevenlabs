const voice = require('elevenlabs-node');
const fs = require('fs');

const apiKey = process.env.ELEVEN_LABS_API_KEY; // Your API key from Elevenlabs
const voiceID = 'pNInz6obpgDQGcFmaJgB';            // Adam
                 

const voiceResponse = voice.getVoices(apiKey).then(res => {
	console.log(res);
    fs.writeFileSync('voices.json', JSON.stringify(res, null, 2))
});