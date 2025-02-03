## Project setup

```bash
$ bun install
```

## Compile and run the project

```bash
# development
$ bun start

# watch mode
$ bun start:dev

# production mode
$ bun start:prod
```

## Run tests

```bash
# test sale random machine
$ curl --location 'http://localhost:3000/sale'

# test sale specific machine
$ curl --location 'http://localhost:3000/sale?machineId=001'

# test refill random machine
$ curl --location 'http://localhost:3000/refill'

# test refill specific machine
$ curl --location 'http://localhost:3000/refill?machineId=001'

# test refill random event between MachineSaleEvent and MachineRefillEvent
$ curl --location 'http://localhost:3000/random'

# Run End to End test.
$ bun run test:e2e
```
