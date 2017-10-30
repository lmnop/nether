#!/bin/bash

API_URL=https://api.lmnop.network yarn build --release &&
firebase use nether &&
firebase deploy
