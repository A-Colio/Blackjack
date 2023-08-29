// import cards from "./card.json";
// 딜러의 덱에는 총 6개의 세트가 들어감.
// 카드가 사용되면 그 카드는 덱에서 버려짐.
// 카드를 반정도 사용하면 6덱을 전체를 교체
// 가장 처음에는 딜러가 카드를 한장 받고, 플레이어들은 카드를 다 오픈한 상태로 받음. 마지막에 딜러가 오픈되지 않은 카드를 한장 받음.
// 딜러의 오픈된 카드가. 에이스일 경우, 인슈얼런스(보험)
// 플레이어는 자기 차례가 왔을 때 카드를 더 받을지(HIT), 그만 받을지(STAND) 선택할 수 있음.
// 숫자의 합이 21을 넘어가면 bust. 무조건 패배.
// 21이 나올 경우. 퍼팩트.
// 에이스 한장과 10, J, Q, K 중 하나로 구성되어 2장으로 21을 완성한 경우에는 블랙잭이라고 하고. 배팅금의 3배를 받음.
// 플레이어들의 차례가 모두 종료되면, 딜러가 남은 카드 한장을 오픈함.
// 딜러가 플레이어보다 높은 경우, 플레이어는 돈을 잃음. 반대의 경우는 플레이어가 2배를 받음.
// 딜러는 숫자의 합이 16 이하일때, 무조건 히트해야 하고, 17 이상일 경우에는 무조건 스탠드해야함.
// 플레이어들의 이름을 입력받음
// 입력받은 갯수만큼
// cardsSplit을 for... arg ㄱㄱ
// for (let i = 0, name; i < 6; i++) {
//   const name = new Player();
// }
// 나중에 멀티 구현

// 딜러 & 플레이어 객체 생성할 기계

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.money = 0;
    this.win = 0;
  }

  // 카드 뽑는 함수
  takeCard(deck) {
    this.hand.push(deck.shift());
  }

  // ace 보유 판단 후 totalNum() > 21일 시 a를 1로 변환
  autoAce() {
    if (this.totalNum() > 21 && this.hasAce()) {
      for (let i = 0; i < this.hand.length; i++) {
        if (this.hand[i].name[1] === "A") {
          this.hand[i].number = 1;
          break;
        }
      }
    }
  }

  autoAce() {
    if (this.totalNum() > 21 && this.hasAce()) {
      for (let i = 0; i < this.hand.length; i++) {
        if (this.hand[i].name[1] === "A") {
          this.hand[i].number = 1;
          if (this.totalNum() > 21) {
            this.autoAce();
          } else break;
        }
      }
    }
  }

  // 패 공개
  showHand() {
    console.log(`${this.name}'s hand:`);
    for (let i = 0; i < this.hand.length; i++) {
      console.log(this.hand[i].name);
    }
    console.log(`total ${this.totalNum()}\n`);
  }

  // hit, stand, surrender 결정
  selection(deck, dealer) {
    // node.js에서 콘솔로 입력을 받을 수 있게 해주는 함수
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve, reject) => {
      rl.question("Hit | Stand | Insurance | Surrender:\n ", (selection) => {
        console.log(`\nyou choose ${selection}\n`);
        switch (selection) {
          case "hit":
            //sixteenOrLower 실행
            if (dealer.totalNum() <= 16) {
              while (dealer.totalNum() <= 16) {
                dealer.sixteenOrLower(deck);
              }
            }
            // dealer.isBlackjack(); 블랙잭 구현하기 전에 애를 넣어보림
            dealer.showHand();
            dealer.totalNum();
            this.takeCard(deck);
            this.autoAce();
            this.showHand();
            resolve("hit"); // Promise를 resolve 상태("hit")로 변경
            break;
          case "stand":
            //sixteenOrLower 실행
            while (dealer.totalNum() <= 16) {
              console.log("execute sixteen or lower\n");
              dealer.sixteenOrLower(deck);
            }
            dealer.showHand();
            dealer.totalNum();
            this.showHand();
            resolve("stand"); // Promise를 resolve 상태("stand")로 변경
            break;
          // case "insurance":
          //   if (dealer.hand[0].name[1] === "A") {
          //   }
          //   resolve("insurance");
          case "surrender":
            resolve("surrender"); // Promise를 resolve 상태("surrender")로 변경
            break;
          default:
            reject(new Error("Invalid selection")); // Promise를 reject 상태로 변경
            break;
        }
        rl.close();
      });
    });
  }

  // 패의 총합
  totalNum() {
    let total = 0;
    for (let i = 0; i < this.hand.length; i++) total += this.hand[i].number;
    return total;
  }

  // main의 dealer.totalNum() <= 16 만족시 실행
  sixteenOrLower(deck) {
    this.takeCard(deck);
    this.autoAce();
  }

  // ace 카드 보유 유무 확인
  hasAce() {
    for (let i = 0; i < this.hand.length; i++) {
      return this.hand[i].name[1] === "A" ? true : false;
    }
  }

  isBlackjack() {
    // if (A && (K ||Q || J) === 21) blackjack!!
    return this.hand.length === 2 && this.totalNum() === 21 ? true : false;
  }
}

// 베팅액을 입력받는 함수
// async function betting(player) {
//   console.log("bet? ");
//   const readline = require("read");
// }

// 승패 구분  p: player, d: dealer
function isWin(deck, player, dealer) {
  // 플레이어 블랙잭 판단
  if (player.isBlackjack()) {
    console.log("Blackjack! you win!\n");
    return "win";
  }

  // 딜러의 블랙잭 판단
  else if (dealer.isBlackjack()) {
    console.log("Blackjack! you lose!\n");
    return "lose";
  }

  // d > 21 && p <= 21
  else if (dealer.totalNum() > 21 && player.totalNum() <= 21) {
    console.log("you win!\n");
    return "win";
  }

  // (16 < d <= 21) && p <= 21 && d < p
  else if (
    dealer.totalNum() > 16 &&
    dealer.totalNum() <= 21 &&
    player.totalNum() <= 21 &&
    dealer.totalNum() < player.totalNum()
  ) {
    console.log("you win!\n");
    return "win";
  }

  // (16 < d <= 21) && (p < d)
  else if (
    dealer.totalNum() > 16 &&
    dealer.totalNum() <= 21 &&
    player.totalNum() < dealer.totalNum()
  ) {
    return "continue";
  }

  // 아
  else if (
    // dealer.isBlackjack() === false &&
    dealer.totalNum() === 21 &&
    player.totalNum() < dealer.totalNum()
  ) {
    return "continue";
  }

  // (16 < d <= 21) && p > 21
  else if (
    dealer.totalNum() > 16 &&
    dealer.totalNum() <= 21 &&
    player.totalNum() > 21
  ) {
    console.log("you lose!\n");
    return "lose";
  }

  // d > 16 && p === d      얜 좀 애매한데?
  else if (dealer.totalNum() > 16 && player.totalNum() === dealer.totalNum()) {
    console.log("draw!\n");
    return "draw";
  }

  // // d > 21 && d === p
  // else if (dealer.totalNum() > 21 && dealer.totalNum() === player.totalNum()) {
  //   return "draw";
  // }
  // // d === 21 && d === p
  // else if (
  //   dealer.totalNum() === 21 &&
  //   dealer.totalNum() === player.totalNum()
  // ) {
  //   return "draw";
  // }

  // // d > 21 && p > 21
  // else if (dealer.totalNum() > 21 && player.totalNum() > 21) {
  //   return "draw";
  // }
  else if (dealer.totalNum() > 21 && player.totalNum() > 21) {
    console.log("draw!");
    return "draw";
  }
}

// 카드 분배 & 패 공개
function distandShow(deck, player, dealer) {
  dealer.takeCard(deck);
  player.takeCard(deck);
  player.takeCard(deck);
  dealer.takeCard(deck);

  console.log(`dealer's hand:`);
  console.log(dealer.hand[0].name);
  console.log("not opened");
  console.log(`total ${dealer.totalNum() - dealer.hand[1].number}\n`);

  console.log(`player's hand:`);
  console.log(player.hand[0].name);
  console.log(player.hand[1].name);
  console.log(`total ${player.totalNum()}\n`);
}

// 게임 종료 여부 묻기
function askQuestion(query) {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// hit or stand 선택, 승패 여부 결정.
// 입력 받는 함수가 비동기여서 async, await 사용
// 자세한 사용법은 아직도 모름(gpt..)
async function diveInGame(deck, player, dealer) {
  let game = "continue";

  // 플레이어 블랙잭 판단
  if (player.isBlackjack()) {
    game = isWin();
  }

  // 딜러 블랙잭 판단
  else if (dealer.isBlackjack()) {
    game = isWin();
  }

  //게임 진행
  // else if (dealer.totalNum() <= 21) {
  while (game === "continue") {
    let choice = await player.selection(deck, dealer);
    if (choice === "stand") {
      game = isWin(deck, player, dealer);
      if (game !== "continue") break;
    }
    // else if (choice === "insurance") {     insurance 구현 전에, 베팅 먼저 구현
    //   game = isWin();}
    else if (choice === "surrender") {
      game = "surrender";
    } else game = isWin(deck, player, dealer);
  }
  // }
  // else if (dealer.totalNum() === 21) {
  //   console.log("BlackJack! you lose!");
  // } else if (dealer.totalNum() > 21) {
  //   console.log("you win!\n");
  // }
  const answer = await askQuestion(
    "Do you want to continue the game? (yes/no): "
  );

  answer !== "yes"
    ? (global.running = false)
    : console.log("-------------------------");
}

module.exports = { Player, distandShow, diveInGame, askQuestion };
