#!/bin/sh
killall node
nohup node index.js >> log &
