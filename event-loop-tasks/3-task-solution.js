// **************************************************
// * Fifth Task *************************************
// **************************************************
function thirdTask() {
  // * Task 3: Starts here
  Promise.resolve().then(() => {
    // cb-1
    console.log("Promise 1 resolved\n");

    process.nextTick(() => {
      // cb-2
      console.log("process.nextTick inside Promise\n");
    });
  });

  process.nextTick(() => {
    // cb-3
    console.log("process.nextTick 1 executed\n");
  });

  setTimeout(() => {
    // cb-4
    console.log("setTimeout executed\n");
  }, 0);

  // * Task 3: Ends here
}
/*
* Write your console log output sequence here
1. process.nextTick 1 executed
2. Promise 1 resolved
3. process.nextTick inside Promise
4. setTimeout executed

* Write your explanation of the output sequence here
1. Scheduling Promise:
  - Promise.resolve().then(cb-1) schedules "cb-1" to the "Microtasks Queue" (Promise Queue).
  - The ".then()" callback for the resolved Promise ("cb-1") will be executed after the current synchronous code finishes.

2. Scheduling process.nextTick(cb-2) inside Promise:
  - Inside the "Promise" callback, "process.nextTick(cb-2)" is scheduled.
  - This schedules "cb-2" to the "nextTick Queue", which has the highest priority.

3. Scheduling process.nextTick(cb-3):
  - Outside the Promise, "process.nextTick(cb-3)" is scheduled.
  - This schedules "cb-3" to the "nextTick Queue".

4. Scheduling setTimeout(cb-4, 0):
  - setTimeout(cb-4, 0) is registered with the Event Demultiplexer.
  - The Event Demultiplexer waits for 0ms and then moves "cb-4" to the "Timers Queue".

5. Call Stack becomes empty:
  - At this point, all synchronous code is done, and the call stack is empty.
  - The Event Loop begins processing the different queues.

6. Processing the nextTick Queue:
  - The Event Loop first processes the "nextTick Queue", which has the highest priority.
  - "cb-3" from "process.nextTick" is executed: process.nextTick 1 executed

7. Processing the Promise Queue:
  - After "cb-3", the Event Loop processes the next callback in the "Promise Queue".
  - "cb-1" from "process.nextTick" inside the Promise is executed: "Promise 1 resolved"

8. Processing the nextTick Queue:
  - The Event Loop processes the "nextTick Queue", which has the highest priority.
  - "cb-2" from the resolved Promise is executed: "process.nextTick inside Promise"

9. Processing the Timers Queue:
  - After the "Microtasks Queue" is empty, the Event Loop processes the "Timers Queue".
  - "cb-4" from "setTimeout(cb-4, 0)" is executed: "setTimeout executed"
*/

thirdTask();
