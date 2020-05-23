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

  updateCards(response) {
    const cards = response.cards;
    this.setState({ cards: cards });
    }

  getAllCards() {
    $.get('api/cards', this.updateCards)
  }

  componentDidMount() {
      this.getAllCards();
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
      <div>
        <TradingCardForm /> // Instantiating TradingCardForm
        <div id="container">{tradingCards}</div>
      </div>
    );
  }
}

class TradingCardForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      skill: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
  }

  addNewCard() {
    const data = {
      name: this.state.name,
      skill: this.state.skill
    };

    $.post('/api/cards', data, this.updateCards); // add to database
  }

  updateCards() {
    alert('done adding a new card!')
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSkillChange(e) {
    this.setState({ skill: e.target.value });
  }

  render () {
    return (
      <form>
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />

      <label for="skill">Skill:</label>
      <input
        id="skill"
        type="text"
        value={this.state.skill}
        onChange={this.handleSkillChange}
      />

      <button onClick={this.addNewCard}>Add</button> // listener for click. calls Add New Card function.
      </form>
    );
  }
}

ReactDOM.render(
  <TradingCardContainer />,
  document.getElementById('app')
);
