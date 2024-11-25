// **************************************************
// * Fourth Task ************************************
// **************************************************
function secondTask() {
  // * Task 2: Starts here
  process.nextTick(() => {
    // * cb-1
    console.log("process.nextTick executed\n");

    setTimeout(() => {
      // * cb-2
      console.log("setTimeout in nextTick executed\n");
    }, 500);
  });

  setImmediate(() => {
    // * cb-3
    console.log("setImmediate executed\n");

    Promise.resolve().then(() => {
      // * cb-4
      console.log("Promise in setImmediate resolved\n");
    });
  });

  // * Task 2: Ends here
}
/*
* Write your console log output here
1. process.nextTick executed
2. setImmediate executed
3. Promise in setImmediate resolved
4. setTimeout in nextTick executed

* Write your explanation of the output sequence here
1. Scheduling process.nextTick(cb-1):
  - process.nextTick(cb-1) schedules "cb-1" to the nextTick Queue.
  - This callback has the highest priority and will be executed before any other asynchronous callbacks.

2. Scheduling setImmediate(cb-3):
  - setImmediate(cb-3) schedules "cb-3" to the Check Phase of the event loop, which is processed after the Timers Queue, and therefore, moved to the Check Queue.

3. Call Stack becomes empty:
  - At this point, all synchronous code is done, and the call stack is empty.
  - The Event Loop begins processing the different queues.
  
4. Processing the nextTick Queue:
  - The Event Loop first processes the nextTick Queue, which has the highest priority.
  - "cb-1" from "process.nextTick" is executed: "process.nextTick executed"
  
5. Scheduling setTimeout(cb-2, 500) inside process.nextTick:
  - Inside "process.nextTick", another "setTimeout(cb-2, 500)" is scheduled.
  - This callback will be registered with the Event Demultiplexer and moved to the Timers Queue after 500ms.

6. Processing the Check Phase (setImmediate):
  - After the nextTick Queue is empty, the Event Loop moves to the Check Phase.
  - "cb-3" from "setImmediate" is executed: "setImmediate executed"
  
7. Scheduling Promise in setImmediate:
  - Inside "setImmediate", a Promise is created with "Promise.resolve().then(cb-4)".
  - This schedules "cb-4" to the Promise Queue, which has higher priority than the Timers Queue and the Check Phase.

8. Processing the Promise Queue:
  - After the Check Phase, the Event Loop processes the Promise Queue.
  - "cb-4" from the resolved Promise inside "setImmediate" is executed: "Promise in setImmediate resolved"

9. Processing the Timers Queue (setTimeout in nextTick):
  - After 500ms, the callback "cb-2" from "setTimeout(cb-2, 500)" is moved to the Timers Queue and executed: "setTimeout in nextTick executed"
*/

secondTask();
