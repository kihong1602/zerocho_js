const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
const $heroName = document.querySelector('#name');
const $heroLevel = document.querySelector('#level');
const $heroHp = document.querySelector('#hp');
const $heroXp = document.querySelector('#xp');
const $heroAtt = document.querySelector('#att');
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');
const $message = document.querySelector('#message');

class Game {
  constructor(name) {
    this.monster = null;
    this.hero = null;
    this.monsterList = [
      {name: '슬라임', hp: 25, att: 10, xp: 10},
      {name: '스켈레톤', hp: 50, att: 15, xp: 20},
      {name: '마왕', hp: 150, att: 25, xp: 50}
    ];
    this.start(name);
  }

  start(name) {
    $gameMenu.addEventListener('submit', this.onGameMenuInput);
    $battleMenu.addEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('game');
    this.hero = new Hero(name, this);
    this.updateHeroStat();
  }

  changeScreen(screen) {
    switch (screen) {
      case 'start': {
        $startScreen.style.display = 'block';
        $gameMenu.style.display = 'none';
        $battleMenu.style.display = 'none';
        break;
      }
      case 'game': {
        $startScreen.style.display = 'none';
        $gameMenu.style.display = 'block';
        $battleMenu.style.display = 'none';
        break;
      }
      case 'battle': {
        $startScreen.style.display = 'none';
        $gameMenu.style.display = 'none';
        $battleMenu.style.display = 'block';
        break;
      }
    }
  }

  onGameMenuInput = (e) => {
    e.preventDefault();
    const input = e.target['menu-input'].value;
    switch (input) {
      case '1': {
        this.changeScreen('battle');
        this.createMonster();
        break;
      }
      case '2': {
        this.hero.hp = this.hero.maxHp;
        this.updateHeroStat();
        this.showMessage('충분한 휴식을 취했다.');
        break;
      }

      case '3': {
        this.showMessage('게임을 즐겨주셔서 감사합니다!');
        this.quit();
      }
    }
    e.target['menu-input'].value = '';
  }

  onBattleMenuInput = (e) => {
    e.preventDefault();
    const input = e.target['battle-input'].value;
    switch (input) {
      case '1': {
        const {hero, monster} = this;
        hero.attack(monster);
        monster.attack(hero);
        if (hero.hp <= 0) {
          this.showMessage(`${hero.level}레벨에서 전사. 주인공을 새로 생성하세요.`);
          this.quit();
        } else if (monster.hp <= 0) {
          this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 얻었다.`);
          hero.getXp(monster.xp);
          this.monster = null;
          this.updateHeroStat();
          this.updateMonsterStat();
          this.changeScreen('game');
        } else {
          this.showMessage(`${hero.att}의 피해를 주고, ${monster.att}의 피해를 받았다.`);
          this.updateHeroStat();
          this.updateMonsterStat();
        }
        break;
      }
      case '2': {
        const {hero, monster} = this;
        hero.heal(monster);
        this.showMessage('체력을 조금 회복했다.');
        this.updateHeroStat();
        break;
      }
      case '3': {
        this.changeScreen('game');
        this.showMessage('성공적으로 도망쳤다.');
        this.monster = null;
        this.updateMonsterStat();
      }
    }
    e.target['battle-input'].value = '';
  }

  updateHeroStat() {
    const {hero} = this;

    if (hero === null) {
      $heroName.textContent = '';
      $heroLevel.textContent = '';
      $heroHp.textContent = '';
      $heroXp.textContent = '';
      $heroAtt.textContent = '';
      return;
    }

    $heroName.textContent = hero.name;
    $heroLevel.textContent = `Lev.${hero.level}`;
    $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.level}`;
    $heroAtt.textContent = `ATT: ${hero.att}`;
  }

  createMonster() {
    const randomIdx = Math.floor(Math.random() * this.monsterList.length);
    const randomMonster = this.monsterList[randomIdx];

    this.monster = new Monster(
        randomMonster.name,
        randomMonster.hp,
        randomMonster.att,
        randomMonster.xp
    );
    this.updateMonsterStat();
    this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다!`);
  }

  updateMonsterStat() {
    const {monster} = this;
    if (monster === null) {
      $monsterName.textContent = '';
      $monsterHp.textContent = '';
      $monsterAtt.textContent = '';
      return;
    }

    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  }

  showMessage(text) {
    $message.textContent = text;
  }

  quit() {
    this.hero = null;
    this.monster = null;
    this.updateHeroStat();
    this.updateMonsterStat();
    $gameMenu.removeEventListener('submit', this.onGameMenuInput);
    $battleMenu.removeEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('start');
    game = null;
  }

}

class Unit {
  constructor(name, hp, att, xp) {
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.xp = xp;
    this.att = att;
  }

  attack(target) {
    target.hp -= this.att;
  }
}

class Hero extends Unit {
  constructor(name, game) {
    super(name, 100, 10, 0);
    this.level = 1;
    this.game = game;
  }

  heal(monster) {
    this.hp = Math.min(this.maxHp, this.hp + 20);
    this.hp -= monster.att;
  }

  getXp(xp) {
    this.xp += xp;
    if (this.xp >= this.level * 15) {
      this.xp -= this.level * 15;
      this.level += 1;
      this.maxHp += 5;
      this.att += 5;
      this.hp = this.maxHp;
      this.game.showMessage(`레벨업! ${this.level}레벨이 되었습니다.`);
    }
  }
}

class Monster extends Unit {

}

let game;
$startScreen.addEventListener('submit', e => {
  e.preventDefault();
  const name = e.target['name-input'].value;
  game = new Game(name);
});