import 'phaser'
import PreloadScene from './scenes/preloadScene';
import MainScene from './scenes/mainScene';
import GamePlayeScene from './scenes/gameplayScene';
import GameOverScene from './scenes/gameoverScene';


const DEFAULT_WIDTH=1280
const DEFAULT_HEIGHT=720

var config= {
    type:Phaser.AUTO,
    backgroundColor:'000000',

    scale:{
        parent:'phaser-game',
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH,
        width:DEFAULT_WIDTH,
        height:DEFAULT_HEIGHT
    },

    scene:[PreloadScene,MainScene,GameOverScene,GamePlayeScene],

    physics: {
        default: 'arcade',
        arcade: {
          debug: true,

        }
      },

      

};



/*window.addEventListener('load',()=>{
    const game=new Phaser.Game(config)}
    );*/

export default new Phaser.Game(config);

