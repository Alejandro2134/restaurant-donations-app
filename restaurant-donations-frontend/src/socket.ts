"use client";

import { io } from "socket.io-client";

const CONSUMER_SERVICE_URL =
  process.env.REACT_APP_CONSUMER_SERVICE_URL || "http://localhost:3003";

export const socket = io(CONSUMER_SERVICE_URL);
