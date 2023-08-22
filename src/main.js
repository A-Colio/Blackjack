import Rule from './rule.js';

class Main {
    constructor() {
        this.rule = new Rule(); // Rule 객체를 생성
        this.playerCards = []; // 플레이어의 카드를 저장할 배열
        this.dealerCards = []; // 딜러의 카드를 저장할 배열
    }

    // 처음 게임 시작 시 2장의 카드를 플레이어와 딜러에게 나눠주는 메서드
    initialDeal() {
        // 플레이어에게 2장의 카드 나눠주기
        this.playerCards.push(this.rule.deck.drawCard());
        this.playerCards.push(this.rule.deck.drawCard());

        // 딜러에게 2장의 카드 나눠주기
        this.dealerCards.push(this.rule.deck.drawCard());
        this.dealerCards.push(this.rule.deck.drawCard());

        // 확인용 로그 (실제 게임에서는 딜러의 첫 카드만 노출되어야 함)
        console.log("Player's cards:", this.playerCards);
        console.log("Dealer's cards:", this.dealerCards);
    }

    // 플레이어와 딜러의 카드 합계 출력
    showTotalValues() {
        console.log("Player's total value:", this.rule.getTotalValue(this.playerCards));
        console.log("Dealer's total value:", this.rule.getTotalValue(this.dealerCards));
    }

    // 추가로 다른 게임 로직 (예: hit, stand, double down 등)을 구현...
}

// Main 객체를 생성하고 초기 카드 분배
const game = new Main();
game.initialDeal();
game.showTotalValues();
