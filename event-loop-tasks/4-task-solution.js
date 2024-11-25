// **************************************************
// * Seventh Task ***********************************
// **************************************************
function fourthTask() {
  // * Task 4: Starts here

  setTimeout(() => {
    // cb-1
    console.log("setTimeout 1 executed\n");

    process.nextTick(() => {
      // cb-2
      console.log("process.nextTick inside setTimeout\n");
    });

    Promise.resolve().then(() => {
      // cb-3
      console.log("Promise inside setTimeout resolved\n");
    });

    setImmediate(() => {
      // cb-4
      console.log("setImmediate inside setTimeout\n");
    });
  }, 0);

  Promise.resolve().then(() => {
    // cb-5
    console.log("Promise 1 resolved\n");
  });

  // * Task 4: Ends here
}
/* 
* Write your console log output sequence here
1. Promise 1 resolved
2. setTimeout 1 executed
3. process.nextTick inside setTimeout
4. Promise inside setTimeout resolved
5. setImmediate inside setTimeout

* Write your explanation of the output sequence here
1. Scheduling setTimeout(cb-1, 0):
  - setTimeout(cb-1, 0) is registered with the Event Demultiplexer.
  - The callback "cb-1" will be moved to the Timers Queue after 0ms.

2. Scheduling Promise(cb-2) outside setTimeout:
  - Promise.resolve().then(cb-2) schedules "cb-2" to the Microtasks Queue (Promise Queue).
  - This callback is queued to be executed after the current synchronous code finishes.

3. Scheduling process.nextTick(cb-3) inside setTimeout:
  - Inside "cb-1" of the setTimeout, "process.nextTick(cb-3)" is scheduled.
  - "cb-3" is scheduled to the nextTick Queue, which has the highest priority.

4. Scheduling Promise(cb-4) inside setTimeout:
  - Inside "cb-1", "Promise.resolve().then(cb-4)" schedules "cb-4" to the Microtasks Queue (Promise Queue).

5. Scheduling setImmediate(cb-5) inside setTimeout:
  - Inside "cb-1", "setImmediate(cb-5)" is scheduled.
  - "cb-5" will be executed during the Check Phase of the event loop.

6. Call Stack becomes empty:
  - After the synchronous code is done, the call stack is empty, and the Event Loop begins processing the different queues.

7. Processing the nextTick Queue:
  - The Event Loop first processes the nextTick Queue, which has the highest priority.
  - "cb-3" from "process.nextTick" inside "setTimeout" is executed: "process.nextTick inside setTimeout"

8. Processing the Microtasks Queue (Promise Queue):
  - After the nextTick Queue is empty, the Event Loop processes the Microtasks Queue (Promise Queue).
  - "cb-2" from the resolved Promise outside "setTimeout" is executed: "Promise 1 resolved"

  - "cb-4" from the resolved Promise inside "setTimeout" is executed: "Promise inside setTimeout resolved"

9. Processing the Check Phase (setImmediate):
  - After the Microtasks Queue is empty, the Event Loop processes the Check Phase.
  - "cb-5" from "setImmediate" inside "setTimeout" is executed: "setImmediate inside setTimeout"

10. Processing the Timers Queue:
  - Finally, after 0ms, the callback "cb-1" from "setTimeout(cb-1, 0)" is moved to the Timers Queue and executed: "setTimeout 1 executed"

*/

fourthTask();
