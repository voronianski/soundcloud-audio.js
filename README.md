### soundCloud-audio.js

> Wrapper around [HTML5 `<audio>`](https://developer.mozilla.org/en/docs/Web/HTML/Element/audio) and SoundCloud tracks/playlists APIs in order to stream audio easily in modern browsers. It could be treated as small replacement for official [SoundCloud SDK](https://developers.soundcloud.com/docs/api/sdks#javascript).

## Install

```bash
npm install soundcloud-audio --save
```

or

```bash
bower install soundcloud-audio --save
```

## Usage

```javascript
var SoundCloud = require('SoundCloud');

var scPlayer = new SoundCloud('YOUR_CLIENT_ID');

// if you have a stream url already you can just play it
scPlayer.play({streamUrl: 'https://api.soundcloud.com/tracks/185533328/stream'})

// in other cases load track to resolve it's data
scPlayer.load('https://soundcloud.com/djangodjango/first-light', function (track) {
    // do smth with track object
    // e.g. display data in a view etc.

    // once track is loaded it can be played
    scPlayer.play();
});

// or load playlist to resolve it's data
scPlayer.load('https://soundcloud.com/dan-deacon/sets/feel-the-lightning-track-instrumental-stems', function (tracks) {
    // do smth with array of tracks
    // e.g. display data in a view etc.
    
    // once playlist is loaded it can be played
    // after finishing track will automagically start the next one
    scPlayer.play();
});

```
