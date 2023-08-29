// 베팅, insurance 아직 미구현

global.running = true;

const { Player, distandShow, diveInGame } = require("./inProgress.js");
const { createDeck } = require("./src/assets/cards.js");

const deck = createDeck(); // 덱 생성
const dealer = new Player("dealer"); // 딜러 생성
const p1 = new Player("kr"); // 플레이어 생성

main(); // hoisting

async function main() {
  while (running) {
    // 아래의 조건 만족 시 덱 초기화
    if (deck.length <= 156) {
      console.log("bring new cards...");
      deck = createDeck();
    }

    console.log("Game Start!\n");

    // 카드 잔량 출력
    console.log(`${deck.length} cards left\n`);

    // 딜러 & 플레이어 카드 분배
    // 딜러 카드 2장(1장 미공개), 플레이어 카드 2장 공개
    distandShow(deck, p1, dealer);

    // hit or stand, 승패 구분
    await diveInGame(deck, p1, dealer);

    // 게임 종료 후 패 초기화
    p1.hand.splice(0, p1.hand.length);
    dealer.hand.splice(0, dealer.hand.length);
  }
}
