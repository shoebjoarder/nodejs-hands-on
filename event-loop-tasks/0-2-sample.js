// **************************************************
// * Second example *********************************
// **************************************************

// * Task Description
// * - We will explore the execution priorities of promises, nextTick, and setTimeout to understand how they interact in the Event Loop
// *  - Schedule a setTimeout with a delay of 0ms. Inside the setTimeout callback, log the message "setTimeout 1 executed\n"
// *  - Create a resolved Promise and chain one .then method. Inside the .then callback, log the message "Promise 1 resolved"
// *  - Use the process.nextTick to schedule a callback. Inside the callback, log the message "process.nextTick executed"
// *  - Schedule a setTimeout with a delay of 3000ms. Inside the setTimeout callback, log the message "setTimeout 2 executed\n"
// *  - Schedule a setTimeout with a delay of 2000ms. Inside the setTimeout callback, log the message "setTimeout 3 executed\n"
// * - Observe the order of execution in the console.
// * - Write the console log output sequence and provide an explanation of the execution order based on the Event Loop, Check Queue, and Timers Queue.

// * Function consisting of some asynchronous functions
function secondExample() {
  setTimeout(() => {
    // * cb-1
    console.log("setTimeout 1 executed\n");
  }, 0);

  Promise.resolve().then(() => {
    // * cb-2
    console.log("Promise 1 resolved\n");
  });

  process.nextTick(() => {
    // * cb-3
    console.log("process.nextTick executed\n");
  });

  setTimeout(() => {
    // * cb-4
    console.log("setTimeout 2 executed\n");
  }, 3000);

  setTimeout(() => {
    // * cb-5
    console.log("setTimeout 3 executed\n");
  }, 2000);
}

/*
* Console log output sequence
1. process.nextTick executed
2. Promise 1 resolved
3. setTimeout 1 executed
4. setTimeout 3 executed

* Explanation of the output sequence
1. Scheduling setTimeout(cb-1, 0):
  - setTimeout(cb-1, 0) is registered with the Event Demultiplexer.
  - The Event Demultiplexer waits for the 0ms delay and then moves "cb-1" to the Timers Queue.

2. Scheduling the Promise:
  - Promise.resolve().then(cb-2) schedules "cb-2" to the Promise Queue.
  - The Promise itself is resolved immediately, but its `.then` callback "cb-2" is queued to be executed later, after the current synchronous code finishes.

3. Scheduling process.nextTick(cb-3):
  - process.nextTick(cb-3) schedules "cb-3" to the nextTick Queue.
  - This has the highest priority and will be executed before the Promise Queue and Timers Queue.

4. Scheduling setTimeout(cb-4, 3000):
  - setTimeout(cb-4, 3000) is registered with the Event Demultiplexer to trigger after 3000ms.
  - Once the delay elapses, "cb-4" will be moved to the Timers Queue.

5. Scheduling setTimeout(cb-5, 2000):
  - setTimeout(cb-5, 2000) is registered with the Event Demultiplexer to trigger after 2000ms.
  - Once the delay elapses, "cb-5" will be moved to the Timers Queue.

6. Call Stack becomes empty:
  - At this point, all synchronous code is done, and the call stack is empty.
  - The Event Loop begins processing the different queues.

7. Processing nextTick Queue:
  - The Event Loop first checks the nextTick Queue, which has the highest priority.
  - "cb-3" from `process.nextTick is executed immediately: "process.nextTick executed"

8. Processing the Promises Queue:
  - After the nextTick Queue is empty, the Event Loop processes the Promise Queue
  - "cb-2" from the resolved Promise is executed next: "Promise 1 resolved"

9. Processing the Timers Queue:
  - The Event Loop now checks the Timers Queue.
  - "cb-1" from setTimeout(cb-1, 0) is executed: "setTimeout 1 executed"
  - After 2000ms, "cb-5" from setTimeout(cb-5, 2000) is executed: "setTimeout 3 executed"
  - After 3000ms, "cb-4" from setTimeout(cb-4, 3000) is executed: "setTimeout 2 executed"
*/

secondExample();
