import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Component.extend({

  classNames: ['timer-container'],

  duration: 0,
  timer: null,

  displayTime: function () {
    var millis = this.get('duration');
    var duration = moment.duration(millis);
    return "%@:%@".fmt(this.zeroPad(duration.minutes(), 2), this.zeroPad(duration.seconds(), 2));
  }.property('duration'),

  start: function () {
    // use ember.run.later to schedule a timer update and save the timer in this.timer
    // have the callback call this function as its last statement
    var checkpoint = moment();
    this.set('timer', Ember.run.later(this, function () {
      this.set('duration', this.get('duration') + moment().diff(checkpoint));
      this.start();
    }, 500));
  },

  pause: function () {
    Ember.run.cancel(this.get('timer'));
  },

  stop: function () {
    // use ember.run.cancel to stop the timer in the timer object
    this.set('duration', 0);
    Ember.run.cancel(this.get('timer'));
  },

  zeroPad: function (number, width) {
    number = number + '';
    return number.length >= width ? number : new Array(width - number.length + 1).join(0) + number;
  },

  actions: {
    startTimer: function () {
      this.start();
    },

    stopTimer: function () {
      this.stop();
    },

    pauseTimer: function () {
      this.pause();
    }
  }
});
