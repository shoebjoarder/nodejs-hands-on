// **************************************************
// * First Task *************************************
// **************************************************
function firstTask() {
  // * Task 1: Starts here
  Promise.resolve()
    .then(() => {
      // * cb-1
      console.log("Promise 1 resolved\n");
    })
    .then(() => {
      // * cb-2
      console.log("Promise 2 resolved\n");
    });

  setTimeout(() => {
    // * cb-3
    console.log("setTimeout executed\n");
  }, 0);
  // * Task 1: Ends here
}
/*
* Write your console log output sequence here
1. Promise 1 resolved
2. Promise 2 resolved
3. setTimeout executed

* Write your explanation of the output sequence here
1. Scheduling the Promise:
  - Promise.resolve().then(cb-1) schedules "cb-1" to the Promise Queue.
  - The ".then()" callback for the resolved Promise ("cb-1") is queued to be executed after the synchronous code finishes.

2. Scheduling the second Promise:
  - The second ".then()" in the Promise chain schedules "cb-2" to the Promise Queue after "cb-1" is executed.

3. Scheduling setTimeout(cb-3, 0):
  - setTimeout(cb-3, 0) is registered with the Event Demultiplexer.
  - The Event Demultiplexer waits for the 0ms delay and then moves "cb-3" to the Timers Queue.

4. Call Stack becomes empty:
  - At this point, all synchronous code is done, and the call stack is empty.
  - The Event Loop begins processing the different queues.

5. Processing the Microtasks Queue:
  - The Event Loop first processes the Promise Queue.
  - "cb-1" from the resolved Promise is executed:" Promise 1 resolved"

6. Processing the Microtasks Queue:
  - After "cb-1", the second ".then()" callback ("cb-2") is executed: "Promise 2 resolved"

7. Processing the Timers Queue:
  - After the Microtasks Queue is empty, the Event Loop processes the Timers Queue.
  - "cb-3" from "setTimeout(cb-3, 0)" is executed: "setTimeout executed"
*/

firstTask();
