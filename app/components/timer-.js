import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Component.extend({
  duration: 0,
  timer: null,

  start: function () {
    // use ember.run.later to schedule a timer update and save the timer in this.timer
    // have the callback call this function as its last statement
    var checkpoint = moment();
    Ember.run.later(this, function () {
      this.set('duration', this.get('duration') + moment().diff(checkpoint));
      this.start();
    }, 500);
  },

  stop: function () {
    // use ember.run.cancel to stop the timer in the timer object
  },

  actions: {
    startTimer: function () {
      this.start();
    },

    stopTimer: function () {

    }
  }
});
