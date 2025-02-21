import { ioCall, createPoll, resolvedPoll } from "../io/worker-io.js";
import * as calls from "../io/calls.js";

export const monotonicClock = {
  resolution() {
    return 1n;
  },
  now() {
    return ioCall(calls.CLOCKS_NOW);
  },
  subscribeInstant(instant) {
    return createPoll(calls.CLOCKS_INSTANT_SUBSCRIBE, null, instant);
  },
  subscribeDuration(duration) {
    duration = BigInt(duration);
    if (duration === 0n) return resolvedPoll();
    return createPoll(calls.CLOCKS_DURATION_SUBSCRIBE, null, duration);
  },
};

export const wallClock = {
  now() {
    const seconds = BigInt(Math.floor(Date.now() / 1e3));
    const nanoseconds = (Date.now() % 1e3) * 1e6;
    return { seconds, nanoseconds };
  },
  resolution() {
    return { seconds: 0n, nanoseconds: 1e6 };
  },
};
