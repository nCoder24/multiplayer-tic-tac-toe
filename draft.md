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
