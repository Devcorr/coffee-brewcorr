TODO
=========

Start on the interaction of checkpoints and timer

* Continue filling out timer component logic and UI
  * Add check points (e.g. water cooldown time, bloom time, pour time)
    * Start by building the input and interactions in the component first, only worry about getting a transient set
      of checkpoints working stored in memory on the component.
    * Style the input to look similar to the timer
    * Inputting numbers should work like most timer apps I've used, just hit the numbers, punctuation is handled
      for you.
    * Checkpoints "scroll" behind the timer as it's ticking, getting greyed out an disappearing above it as they are 
      passed.
    * Need to be able to delete checkpoints.
    * Use an array proxy or something so ember can observe changes to checkpoints array?  

* Update ember CLI
* Alert noise for checkpoints
* Save checkpoint setup in local storage
* Deploy to github pages

Done
=========

* Get start method started
* Get basic starting and stopping working with auto refreshing UI
  * Starting is working, get stopping working next
* Format timer display nicely
  * Add pause button
* figure out how to 0 pad the minute and seconds columns
* Update UI when a checkpoint is added
