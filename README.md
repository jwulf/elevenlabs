# Elevenlabs Utility

To setup:

```
npm i
```

Put your Elevenlabs API Key in the environment variable ELEVEN_LABS_API_KEY.

Run `node get-voices.js` to get a list of voices. Set the voice id in `idex.js` to use the voice you want.

Put your text into a file `text.txt`, then run `node index.js`. This will output a series of audio files, and then concatenate them into `output.mp3`.