FROM denoland/deno
WORKDIR /app
COPY . .
CMD deno task start
