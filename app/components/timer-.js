import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Component.extend({

  classNames: ['timer-container'],

  duration: 0,
  timer: null,

  checkpoints: Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
    sortProperties: ['millis'],
    sortAscending: true,
    content: []
  }),

  pastCheckpoints: Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
    sortProperties: ['millis'],
    sortAscending: true,
    content: []
  }),

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
      var nextCheckpoint = this.get('checkpoints.firstObject');
      this.set('duration', this.get('duration') + moment().diff(checkpoint));

      if (nextCheckpoint && this.get('duration') >= nextCheckpoint.millis) {
        this.get('checkpoints').removeAt(0);
        this.get('pastCheckpoints').pushObject(nextCheckpoint);
      }

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
    },

    createCheckpoint: function (checkpointTime) {
      var timeParts = checkpointTime.split(':');
      var checkpointMillis = ((timeParts[0] * 60) + timeParts[1]) * 1000;

      this.get('checkpoints').pushObject({
        display: checkpointTime,
        millis: checkpointMillis
      });
    }
  }
});
