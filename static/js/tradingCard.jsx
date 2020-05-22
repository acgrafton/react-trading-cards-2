const tradingCardData = [
  {
    name: 'Balloonicorn',
    skill: 'video games',
    imgUrl: '/static/img/balloonicorn.jpg'
  },

  {
    name: 'Float',
    skill: 'baking pretzels',
    imgUrl: '/static/img/float.jpg'
  },

  {
    name: 'Llambda',
    skill: 'knitting scarves',
    imgUrl: '/static/img/llambda.jpg'
  }
];

class TradingCard extends React.Component {
  render() {
    return (
      <div className="card">
        <p class="card-name">
          Name: {this.props.name}
        </p>

        <div class="card-img">
          <img src={this.props.imgUrl} />
        </div>

        <p class="card-details">
          Skill: {this.props.skill}
        </p>
      </div>
    );
  }
}

class TradingCardContainer extends React.Component {
  constructor() {
    super();

    this.state = { cards: [] };
    this.updateCards = this.updateCards.bind(this);
  }

    updateCards() {
      const floatCard = {
        name: 'Float',
        skill: 'baking pretzels',
        imgUrl: '/static/img/float.jpg'
      };

    this.setState({
      cards: [ floatCard ]
    });
  }

  componentDidMount() {
    this.updateCards();
  }


  render() {
    const tradingCards = [];

    for (const currentCard of this.state.cards) {
      tradingCards.push(
        <TradingCard
          key={currentCard.name}
          name={currentCard.name}
          skill={currentCard.skill}
          imgUrl={currentCard.imgUrl}
        />
      );
    }

    return (
      <div id="container">{tradingCards}</div>
    );
  }
}

ReactDOM.render(
  <TradingCardContainer />,
  document.getElementById('app')
);
