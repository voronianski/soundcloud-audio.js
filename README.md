# <img src="http://www.officialpsds.com/images/thumbs/Soundcloud-Logo-psd47614.png" width="75" align="left">&nbsp;soundcloud-audio.js

[![build status](http://img.shields.io/travis/voronianski/soundcloud-audio.js.svg?style=flat)](https://travis-ci.org/voronianski/soundcloud-audio.js)
[![npm version](http://badge.fury.io/js/soundcloud-audio.svg)](http://badge.fury.io/js/soundcloud-audio)
[![Download Count](http://img.shields.io/npm/dm/soundcloud-audio.svg?style=flat)](http://www.npmjs.com/package/soundcloud-audio)
<a href="https://www.buymeacoffee.com/voronianski" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" height="20" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

> Wrapper around [HTML5 `<audio>`](https://developer.mozilla.org/en/docs/Web/HTML/Element/audio) and SoundCloud [tracks](https://developers.soundcloud.com/docs/api/reference#tracks) and [playlists](https://developers.soundcloud.com/docs/api/reference#playlists) APIs. It could be treated as a small replacement for official [SoundCloud SDK](https://developers.soundcloud.com/docs/api/sdks#javascript) or as an independent browser audio library.

## Install

```bash
npm install soundcloud-audio --save
```

## Usage

```javascript
const SoundCloudAudio = require('soundcloud-audio');

// create new instance of audio
// clientId is optional but without it you cannot play tracks directly from SoundCloud API
const scPlayer = new SoundCloudAudio('YOUR_CLIENT_ID');

// if you have a SoundCloud api stream url you can just play it like that
scPlayer.play({
  streamUrl: 'https://api.soundcloud.com/tracks/185533328/stream'
});

// OR if you want to play a NON-SoundCloud audio
scPlayer.play({ streamUrl: 'https://example.com/plain/audio/file' });

// OR if you need to load a SoundCloud track and resolve it's data
scPlayer.resolve('https://soundcloud.com/djangodjango/first-light', function(
  track
) {
  // do smth with track object
  // e.g. display data in a view etc.
  console.log(track);

  // once track is loaded it can be played
  scPlayer.play();

  // stop playing track and keep silence
  scPlayer.pause();
});

// OR a SoundCloud playlist and resolve it's data
scPlayer.resolve('http://soundcloud.com/jxnblk/sets/yello', function(playlist) {
  // do smth with array of `playlist.tracks` or playlist's metadata
  // e.g. display playlist info in a view etc.
  console.log(playlist);

  // once playlist is loaded it can be played
  scPlayer.play();

  // for playlists it's possible to switch to another track in queue
  // e.g. we do it here when playing track is finished
  scPlayer.on('ended', function() {
    scPlayer.next();
  });

  // play specific track from playlist by it's index
  scPlayer.play({ playlistIndex: 2 });
});
```

## API

#### `new SoundCloudAudio('YOUR_CLIENT_ID', 'YOUR_CUSTOM_API_URL')`

Create an instance of _SoundCloudAudio_, internally uses HTML5 `<audio>` element which is available under [audio](https://github.com/voronianski/soundcloud-audio.js#audio) property.

- first argument, client id string, is optional but it's needed if you plan to use SoundCloud API directly (you can get it here - https://developers.soundcloud.com).
- second argument, custom API url string, is also optional but it allows you to use SoundCloud API proxy to not expose your client ids in the browser

### Methods

#### `resolve(url, callback)`

If you don't have SoundCloud `stream_url` (e.g. `https://api.soundcloud.com/tracks/:id/stream`) or you need track's metadata then this method is for you. Pass original track's or playlist's url as a first argument. Once data will be resolved without errors, callback function will receive it as plain object as the only argument.

#### `play(options)`

Start playing track if it's not playing right now.

Returns a Promise and accepts `options` object:

- `options.streamUrl` - any audio streaming url string (e.g. SoundCloud track's `stream_url`), if it's passed it will be the main playing source.
- `options.playlistIndex` - number that specifies the position of the track to play in resolved SoundCloud playlist's `tracks` array.

#### `preload(streamUrl, preloadType)`

Preload track data without playing it.

- `preloadType` - this attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. It may have one of the following values:
  - `'none'` - indicates that the audio should not be preloaded
  - `'metadata'` - indicates that only audio metadata (e.g. length) is fetched
  - `'auto'` - indicates that the whole audio file could be downloaded, even if the user is not expected to use it
  - see more at [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#Attributes)

#### `pause()`

Pause playing audio.

#### `stop()`

Stop playing audio and rewind it to start.

#### `next(options)`

Skip to the next track in playlist to play.

Returns a Promise and accepts `options` object:

- `options.loop` - boolean, if set to `true` will start at the beginning of a playlist after the last track.

#### `previous()`

Return to the previous track in playlist (returns a Promise).

#### `seek(DOMEvent)`

Helper method for integrating with HTML [`<progress>`](http://caniuse.com/#feat=progressmeter) element and its' [polyfills](https://github.com/LeaVerou/HTML5-Progress-polyfill). It changes `audio.currentTime` with regarding to the progress position. Just pass the DOM event that you received on progress click and all necessary computations will be done automagically.

#### `setVolume(volumePercentage)`

Adjust the volume with a number between 0 and 1, 0 being not audible and 1 being full volume.

#### `setTime(seconds)`

Set the progress of the song to a specific number of seconds.

### Props

#### `audio`

Instance of raw `<audio>` element. There are several useful properties like `currentTime` (in `seconds`) or [events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events) you may want to listen with `addEventListener` (the full list of of them at [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)).

#### `duration`

SoundCloud track duration converted into `seconds` in order to be in sync with `audio.currentTime`.

#### `playing`

Shows the current state of the player, returns `false` or source of a currently streaming track.

### Events

_SoundCloudAudio_ provides shortcuts to subscribe or unsubscribe handler functions on native `audio` events. The list of supported events can be accessed here - https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events.

#### `on('event', handler)`

#### `off('event', handler)`

#### `unbindAll()`

```javascript
var SoundCloudAudio = require('soundcloud-audio');

var scPlayer = new SoundCloudAudio('YOUR_CLIENT_ID');

scPlayer.play({
  streamUrl: 'https://api.soundcloud.com/tracks/185533328/stream'
});
scPlayer.on('timeupdate', function() {
  console.log(scPlayer.audio.currentTime);
});
scPlayer.on('ended', function() {
  console.log(scPlayer.track.title + ' just ended!');
});
```

## Browser Support

| Chrome | Firefox | IE/Edge | Opera | Safari |
| ------ | ------- | ------- | ----- | ------ |
| 3+ ✔   | 3.5+ ✔  | 9+ ✔    | 10+ ✔ | 3.1+ ✔ |

## License

MIT Licensed

Copyright (c) 2015 Dmitri Voronianski [dmitri.voronianski@gmail.com](mailto:dmitri.voronianski@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
