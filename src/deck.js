// 각 카드의 문양을 나타내는 배열
const suits = ['♠', '♦', '♥', '♣'];

// 문양에 대응하는 영어 이름을 매핑하기 위한 객체
const suitToName = {
    '♠': 'spades',
    '♦': 'diamonds',
    '♥': 'hearts',
    '♣': 'clubs'
};

// 각 카드의 값과 해당 값의 점수를 나타내는 배열
const values = [
    {name: 'A', number: [1, 11]},
    {name: '2', number: 2},
    {name: '3', number: 3},
    {name: '4', number: 4},
    {name: '5', number: 5},
    {name: '6', number: 6},
    {name: '7', number: 7},
    {name: '8', number: 8},
    {name: '9', number: 9},
    {name: '10', number: 10},
    {name: 'J', number: 10},
    {name: 'Q', number: 10},
    {name: 'K', number: 10},
];

// 모든 카드를 저장할 객체
const cards = {};

// 문양과 값을 조합하여 카드 객체를 생성하는 과정
suits.forEach((suit) => {
    values.forEach((value) => {
        const cardName = `${suit}${value.name}`;
        cards[cardName] = {
            name: cardName,
            number: value.number,
            // 이미지 경로를 생성
            image: `./assets/cardSprite/${value.name.toLowerCase()}_of_${suitToName[suit]}.svg`
        };
    });
});

// 덱 클래스: 카드를 저장하고, 섞으며, 뽑는 기능을 가지고 있음
class Deck {
    // 생성자: 기본적으로 6팩의 카드 덱을 생성
    constructor(numDecks = 6) {
        this.currentDeck = [];
        // 지정된 팩 수만큼 카드를 currentDeck에 추가
        for (let i = 0; i < numDecks; i++) {
            for (const card of Object.values(cards)) {
                this.currentDeck.push(card);
            }
        }
        // 카드를 섞음
        this.shuffle();
    }

    // 카드 섞기 메서드: 현대적인 Fisher-Yates 셔플 알고리즘 사용
    shuffle() {
        for (let i = this.currentDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.currentDeck[i], this.currentDeck[j]] = [this.currentDeck[j], this.currentDeck[i]];
        }
    }

    // 현재 덱의 카드 목록을 가져오는 메서드
    getCurrentDeck() {
        return [...this.currentDeck];
    }

    // 덱의 맨 위 카드를 뽑아 반환하는 메서드
    drawCard() {
        return this.currentDeck.pop();
    }
}
export { Deck };
