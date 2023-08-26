# Tic Tac Toe

## Models

- User
  - name: String
  - username: String
  - password: String
  - verify(password): Boolean
- Users

  - users: [User]
  - register(userDetails): Void
  - verify(username, password): Boolean

- Player

  - username: String
  - symbol: Char
  - moves: [Int]
  - recordMove(move): Void

- Players

  - players: [Player]
  - changeTurn(): Void
  - recordMove(move): Void

- Game
  - players: Players
  - move(): Void
  - status(): Object

- GameController
  - games: [Game]
  - ongoingGames: [Game]
  - waitingList: [User]
  - createGame(): gameID
  - joinUser(username, gameID): Void

## REST API

POST /game - creates a new game
POST play/ai - [body: ai-bot] with AI BOT
POST play/random - with any active user
GET /game - [res: gameID] to get the game id (for the req requested)
POST /join/:gameID - to join a game
POST /move - [body: position] to record a game move (onl if in a game)
GET /status - to get the status of the current game (onl if in a game)

## User activity sequence

- Login/Register (if not)
- Select game mode
- Join & start the game
- Take turn & make move
- Win/Loose
- Play again with the same user / start new one

## Game Modes

- AI (easy, medium, hard)
- friend
- random
