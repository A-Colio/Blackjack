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

const cards = require('./constants/cards');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createDeck(numDecks = 1) {
    const deck = [];
    for (let i = 0; i < numDecks; i++) {
        for (const cardKey in cards) {
            if (cards.hasOwnProperty(cardKey)) {
                deck.push(cards[cardKey]);
            }
        }
    }
    return deck;
}

function getCardValue(card) {
    if (Array.isArray(card.number)) {
        return card.number[1];
    }
    return card.number;
}

function handValue(hand) {
    let total = 0;
    let aces = 0;

    for (let card of hand) {
        total += getCardValue(card);
        if (Array.isArray(card.number)) {
            aces++;
        }
    }

    while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
    }

    return total;
}

function resetDeck() {
    deck.length = 0;
    const newDeck = createDeck(6);
    deck.push(...newDeck);
}

// 게임에 사용되는 카드가 담긴 덱
const deck = [];

// 딜러의 핸드 카드
const dealerHand = [];

// 플레이어의 핸드 카드
const playerHand = [];

resetDeck(); // 시작할 때 6개의 덱을 생성하고 셔플
shuffleArray(deck);

console.log(deck);























/*
const cards = require('./constants/cards');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 0 이상 i 이하의 난수
        [array[i], array[j]] = [array[j], array[i]]; // 요소 위치를 바꿈
    }
} // 덱 내의 카드를 셔플하는 함수.


// 게임에 사용되는 카드가 담긴 덱
const deck = []

//딜러의 핸드 카드
const dealerHand = []

// 플레이어의 핸드 카드
const playerHand = []



for ( i = 0; i < 6; i++) {
    for (const cardKey in cards) {
        if (cards.hasOwnProperty(cardKey)) {
            deck.push(cards[cardKey]);
        }
    }
}

shuffleArray(deck)

console.log(deck)
*/