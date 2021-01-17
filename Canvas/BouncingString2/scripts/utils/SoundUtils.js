export class Guitar {
  constructor() {
    this.guitar = _tone_0253_Acoustic_Guitar_sf2_file
    let AudioContextFunc = window.AudioContext || window.webkitAudioContext
    this.audioContext = new AudioContextFunc()
    this.output = this.audioContext.destination
    this.player = new WebAudioFontPlayer()
    this.now = 0

    this.player.loader.decodeAfterLoading(
      this.audioContext,
      '_tone_0253_Acoustic_Guitar_sf2_file'
    )
  }

  play = c =>
    this.player.queueWaveTable(
      this.audioContext,
      this.output,
      this.guitar,
      this.now,
      c,
      1.5
    )
}