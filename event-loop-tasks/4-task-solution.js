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

2. Scheduling Promise(cb-5) outside setTimeout:
  - Promise.resolve().then(cb-5) schedules "cb-5" to the Promise Queue.
  - This callback is queued to be executed after the current synchronous code finishes.

3. Call Stack becomes empty:
  - After the synchronous code is done, the call stack is empty, and the Event Loop begins processing the different queues.

4. Processing the Promise Queue:
  - The Event Loop processes the callback in the "Promise Queue".
  - "cb-5" from the Promise is executed: "Promise 1 resolved"

5. Processing the Timers Queue:
  - After the "Microtasks Queue" is empty, the Event Loop processes the "Timers Queue".
  - "cb-1" from "setTimeout(cb-1, 0)" is executed: "setTimeout 1 executed"

6. Scheduling process.nextTick(cb-2) inside setTimeout:
  - Inside "cb-1" of the setTimeout, "process.nextTick(cb-2)" is scheduled.
  - "cb-2" is scheduled to the nextTick Queue, which has the highest priority.

7. Scheduling Promise(cb-3) inside setTimeout:
  - Promise.resolve().then(cb-3) schedules "cb-3" to the Promise Queue.

8. Scheduling setImmediate(cb-4):
  - setImmediate(cb-4) is registered with the Event Demultiplexer.
  - The Event Demultiplexer moves "cb-4" to the "Check Queue".

9. Processing the nextTick Queue:
  - The Event Loop first processes the nextTick Queue, which has the highest priority.
  - "cb-2" from "process.nextTick" inside "setTimeout" is executed: "process.nextTick inside setTimeout"

10. Processing the Promise Queue:
  - After the nextTick Queue is empty, the Event Loop processes the Promise Queue.
  - "cb-3" from the resolved Promise is executed: "Promise inside setTimeout resolved"

11. Processing the Check Phase (setImmediate):
  - Finally, the Event Loop moves to the Check Phase and "cb-4" from "setImmediate" is executed: "setImmediate inside setTimeout"

*/

fourthTask();
