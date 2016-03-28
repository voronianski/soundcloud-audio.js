var CLIENT_ID = '08f79801a998c381762ec5b15e4914d5';
var PLAYLIST = 'http://soundcloud.com/jxnblk/sets/yello';
var TRACKS = 'http://soundcloud.com/shura/tracks';
var SECRET_TRACK = 'https://api.soundcloud.com/tracks/12345/stream?secret_token=s-ZUFsV';
var STREAM_WITH_TIME = 'https://api.soundcloud.com/tracks/242594586/stream#t=13:10';
var TRACK_WITH_TIME = 'https://soundcloud.com/balamii/dj-sotofett-b2b-brian-not-brian-jayda-g-jan-2016#t=13:10';

describe('soundcloud-audio', function () {
    var player;

    before(function () {
        player = new SoundCloudAudio(CLIENT_ID);
    });

    it('should create new player instance', function () {
        expect(player).to.be.ok;
    });

    describe('when resolving playlist', function () {
        var playlist;
        var firstTrack;
        var secondTrack;

        before(function (done) {
            player.resolve(PLAYLIST, function (_playlist) {
                playlist = _playlist;
                firstTrack = playlist.tracks[0].stream_url;
                secondTrack = playlist.tracks[1].stream_url;
                done();
            });
        });

        it('should have an array of tracks', function () {
            expect(playlist.tracks).to.be.an('array');
        });

        it('should have playing defined as false', function () {
            expect(player.playing).to.be.false;
        });

        it('should have playlist duration in seconds', function () {
            expect(player.duration).to.be.a('number');
        });

        describe('when playing playlist', function () {
            before(function () {
                player.play();
            });

            it('should have playing defined as true', function () {
                expect(player.playing).to.be.ok;
            });

            describe('when skipping to next track', function () {
                before(function () {
                    player.next();
                });

                it('should have second track playing', function () {
                    expect(player.playing).to.contain(secondTrack);
                });

                describe('when skipping to previous track', function () {
                    before(function () {
                        player.previous();
                    });

                    it('should have first track playing', function () {
                        expect(player.playing).to.contain(firstTrack);
                    });

                    describe('when pausing the track', function () {
                        before(function () {
                            player.pause();
                        });

                        it('should have first track playing', function () {
                            expect(player.playing).to.be.false;
                        });
                    });
                });
            });
        });
    });

    xdescribe('when resolving artist tracks', function () {
        var fakePlaylist;
        var firstTrack;
        var secondTrack;

        before(function (done) {
            player.resolve(TRACKS, function (_fakePlaylist) {
                fakePlaylist = _fakePlaylist;
                firstTrack = fakePlaylist.tracks[0].stream_url;
                secondTrack = fakePlaylist.tracks[1].stream_url;
                done();
            });
        });

        it('should have an array of tracks', function () {
            expect(fakePlaylist.tracks).to.be.an('array');
        });

        it('should have playing defined as false', function () {
            expect(player.playing).to.be.false;
        });

        it('should have playlist duration in seconds', function () {
            expect(player.duration).to.be.a('number').and.equal(0);
        });

        describe('when playing playlist', function () {
            before(function () {
                player.play();
            });

            it('should have playing defined as true', function () {
                expect(player.playing).to.be.ok;
            });

            describe('when skipping to next track', function () {
                before(function () {
                    player.next();
                });

                it('should have second track playing', function () {
                    expect(player.playing).to.contain(secondTrack);
                });

                describe('when skipping to previous track', function () {
                    before(function () {
                        player.previous();
                    });

                    it('should have first track playing', function () {
                        expect(player.playing).to.contain(firstTrack);
                    });

                    describe('when pausing the track', function () {
                        before(function () {
                            player.pause();
                        });

                        it('should have first track playing', function () {
                            expect(player.playing).to.be.false;
                        });
                    });
                });
            });
        });
    });

    describe('when streaming secret tracks', function () {
        before(function () {
            player.play({ streamUrl: SECRET_TRACK });
        });

        it('should have playing defined as the correct url', function () {
            var expected = SECRET_TRACK + '&client_id=' + CLIENT_ID;
            expect(player.playing).to.equal(expected);
        });
    });

    describe('when streaming track with time hash', function () {
        before(function () {
            player.play({ streamUrl: STREAM_WITH_TIME });
        });

        it('should have playing defined as the correct url', function () {
            var parts = STREAM_WITH_TIME.split('#');
            var expected = parts[0] + '?client_id=' + CLIENT_ID + '#' + parts[1];
            expect(player.playing).to.equal(expected);
        });

        describe('when resolving track with time hash', function () {
            before(function (done) {
                player.resolve(TRACK_WITH_TIME, function () {
                    player.play();
                    done();
                });
            });

            it('should have playing defined as the correct url', function () {
                var parts = STREAM_WITH_TIME.split('#');
                var expected = parts[0] + '?client_id=' + CLIENT_ID + '#' + parts[1];
                expect(player.playing).to.equal(expected);
            });
        });
    });
});
