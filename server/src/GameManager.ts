import { Game } from "./Game";

export class Gamemanager {
  private games: Game[];
  private pandingUser: WebSocket;
  private users: WebSocket[];
  constructor() {
    this.games = [];
    this.users = [];
  }

  addUser(socket: WebSocket) {
    //here add user function worka
    this.users.push(socket)
    //now add user function work
  }
  removeUser(socket: WebSocket) {
    //here add user function worka
    this.users = this.users.filter(user => user !== socket)
    //stop the game
  }

  private handlemessage() { }
}
