## Overview

This is a very simple service for local semantic analysis.

It exposes two endpoints:

- **POST** `/analyze` accepts plain text and returns its tone of voice (either `POSITIVE`, `NEGATIVE`, or `NEUTRAL`). Be advised, first call to analyzer might take a while: the model is being cached.
- **GET** `/status` returns a JSON containing CPU and RAM utilization percentage average within the last 1 second.

## Running Tonealyzer

1. Directly

   `npm i && npm run start` will install all the dependencies and launch this service on the host machine. By default, service responds on port **3000**

2. Docker
   `docker build . -t tonealyzer && docker run -p 3000:3000 -n tonealyzer tonealyzer` will start item containerized. Use dedicated volumes for `app/log` and `app/model_cache` to keep them persistent and externally accessible.

3. Docker-compose
   `docker-compose up -d` will bring the project up. Logs and ml cache will reside in `$HOME/tonealyzer/logs` and `$HOME/tonealyzer/model_cache`, respectively.

## Configuring Tonealyzer

There are several settings you can adjust via environment variables.

- `APP_LOG_DIR` - path to logs root directory, either relative or absolute
- `APP_ML_MODEL` - model name. Defaults to 'Xenova/distilbert-base-uncased-finetuned-sst-2-english'.
- `APP_MODEL_CACHE_DIR`- model cache dir
- `LISTEN_PORT` - local port your app listens to.
