// **************************************************
// * First example **********************************
// **************************************************

// * Task Description
// * - We will explore the execution priorities of setImmediate and setTimeout to understand how they interact in the Event Loop
// *  - Schedule a setImmediate callback. Inside this callback, log the message "setImmediate executed\n"
// *  - Schedule a setTimeout with a delay of 0ms. Inside the setTimeout callback, log the message "setTimeout executed\n"
// * - Observe the order of execution in the console.
// * - Write the console log output sequence and provide an explanation of the execution order based on the Event Loop, Check Queue, and Timers Queue.

// * Function consisting of some asynchronous functions
function firstExample() {
  setImmediate(() => {
    // * cb-1
    console.log("setImmediate executed\n");
  });

  setTimeout(() => {
    // * cb-2
    console.log("setTimeout executed\n");
  }, 0);
}

/*
* Console log output sequence
1. setTimeout executed
2. setImmediate executed

* Explanation of the output sequence
1. Scheduling setImmediate(cb-1):
  - setImmediate(cb-1) is registered with the Event Demultiplexer.
  - The callback "cb-1" will be queued for execution in the Check Queue.

2. Scheduling setTimeout(cb-2, 0):
  - setTimeout(cb-2, 0) is registered with the Event Demultiplexer.
  - The Event Demultiplexer waits for the 0ms delay and then moves "cb-2" to the Timers Queue.

3. Call Stack becomes empty:
  - At this point, all synchronous code is done, and the call stack is empty.
  - The Event Loop begins processing the different queues.

4. Processing the Timers Queue:
  - The Event Loop first checks the Timers Queue, which holds callbacks from `setTimeout`.
  - "cb-2" from `setTimeout(cb-2, 0)` is executed: "setTimeout executed"

5. Processing the Check Phase (setImmediate):
  - After the Timers Queue is empty, the Event Loop moves to the Check Phase, where it processes `setImmediate` callbacks.
  - "cb-1" from `setImmediate(cb-1)` is executed: "setImmediate executed"
*/

firstExample();
