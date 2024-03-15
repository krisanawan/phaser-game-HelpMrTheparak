import Phaser from "phaser";
import MainScene from "./mainScene";

export default class GameOverScene extends Phaser.Scene{

    cursors:Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(){
        super({
            key:'GameOverScene'
        })

    }

    create(data){
        
        //Add keyboard input
        this.cursors=this.input.keyboard.createCursorKeys()

        //console.log("this.data : "+data)
        //==========Set Text ================
        var centerX=Number(this.game.config.width)/2;
        var centerY=Number(this.game.config.height)/2;

        var text_gameover=this.add.text(centerX,centerY-120,'[GAME OVER]',{ font: '80px Courier'}).setOrigin(0.5);
        var text_showscore=this.add.text(centerX,centerY,'Your score is '+data,{ font: '70px Courier'}).setOrigin(0.5);
        var text_presskey=this.add.text(centerX,centerY+120,'--Press space bar to play again--',{ font: '58px Courier'}).setOrigin(0.5);
        //==========End set Text ================
        
        //console.log("this score:"+data)

    }

    update(){
        if(this.cursors.space.isDown){
            this.scene.start('GamePlayeScene');
        }
    }

}