import Ember from 'ember';

export default Ember.Component.extend({
  duration: 0,
  timer: null,

  start: function () {
    // use ember.run.later to schedule a timer update and save the timer in this.timer
    // have the callback call this function as its last statement
  },

  stop: function () {
    // use ember.run.cancel to stop the timer in the timer object
  },

  actions: {
    startTimer: function () {

    },

    stopTimer: function () {

    }
  }
});
