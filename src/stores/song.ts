import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import artist from '../artists.json'
export const useSongStore = defineStore('song',  {
  state: () => ({
    isPlaying: false,
    audio: null,
    currentTrack: null,
    currentArtist: null
  }),
  actions: {
    loadSong(artist, track) {
      this.currentArtist = artist
      this.currentTrack = track

      if(this.audio && this.audio.src) {
        this.audio.pause();
        this.isPlaying = false;
        this.audio.src = '';
      }
      this.audio = new Audio();
      this.audio.src = track.path;

      setTimeout(() => {
        this.audio.play();
        this.isPlaying = true;
      }, 200);
    },
    playOrPauseSong() {
      if(this.audio.paused) {
        this.isPlaying = !this.isPlaying;
        this.audio.play();
      } else {
        this.isPlaying = false;
        this.audio.pause();
      }
    },
    playOrPauseThisSong(artist, song) {
      if(this.audio || this.audio.src || (this.currentTrack.id !== song.id)) {
        this.loadSong(artist, song);
        return;
      }

      this.playOrPauseSong();
    },
    previusSong(currentTrack) {
      let track = artist.tracks[currentTrack.id - 2];
      this.loadSong(artist, track);
    },
    nextSong(currentTrack) {
      if(currentTrack.id === artist.tracks.length) {
        this.loadSong(artist, artist.tracks[0]);
        return;
      } else {
        let track = artist.tracks[currentTrack.id];
        this.loadSong(artist, track);
      }
    },
    playFromFirst(){
      this.resetState();
      let track = artist.tracks[0];
      this.loadSong(artist, track);
    },
    resetState(){
      this.isPlaying = false
      this.audio = null
      this.currentTrack = null
      this.currentArtist = null
    }



  }
})
