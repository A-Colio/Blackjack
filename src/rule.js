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
//

// const cards = require('../src/cards')

import { Deck } from './deck.js'; // Deck 파일의 경로를 지정해주세요.

class Rule {
    constructor() {
        this.deck = new Deck(); // 6팩의 카드 덱을 생성
    }

    isBlackjack(cards) {
        // 두 카드로 블랙잭인지 확인하는 로직
        if (cards.length !== 2) return false;
        const values = cards.map(card => card.number);
        return (values.includes(10) && values.includes([1, 11]));
    }

    getTotalValue(cards) {
        // 카드 합계 계산 로직
        let total = 0;
        let acesCount = 0;

        for (const card of cards) {
            if (Array.isArray(card.number)) { // Ace의 경우
                total += 11; // 우선 Ace를 11로 간주
                acesCount++;
            } else {
                total += card.number;
            }
        }

        // 버스트 상황에서 Ace가 있다면 11 대신 1로 간주
        while (total > 21 && acesCount > 0) {
            total -= 10; // 11에서 1을 뺌
            acesCount--;
        }

        return total;
    }

    isBusted(cards) {
        // 카드 합계가 21을 초과하는지 확인하는 로직
        return this.getTotalValue(cards) > 21;
    }

    // 추가적인 규칙들을 여기에 구현...
}

export default Rule;



/*
const { createDeck, getCurrentDeck } = require('./deck');

// 현재 게임에서 사용되는 카드 덱
let deck = createDeck(6);

// 딜러와 플레이어의 핸드 (패)
const dealerHand = [];
const playerHand = [];

// 카드를 한 장 뽑아 주어진 핸드에 추가하는 함수
function dealCard(hand) {
    const card = deck.pop();  // 덱의 맨 마지막 카드를 뽑음
    hand.push(card);          // 주어진 핸드에 카드를 추가
}

// 게임 시작 시 초기 카드 분배
function dealInitialCards() {
    for (let i = 0; i < 2; i++) {
        dealCard(playerHand);  // 플레이어에게 카드 한 장
        dealCard(dealerHand);  // 딜러에게 카드 한 장
    }
}

// 게임을 초기화하고 시작하는 함수
function startGame() {
    deck = createDeck(6);  // 새로운 덱 생성
    dealerHand.length = 0; // 딜러 핸드 초기화
    playerHand.length = 0; // 플레이어 핸드 초기화
    dealInitialCards();    // 초기 카드 분배
    console.log("Player's Hand:", playerHand);
    console.log("Dealer's Hand:", dealerHand);
}

module.exports = {
    startGame: startGame
};

startGame();
*/