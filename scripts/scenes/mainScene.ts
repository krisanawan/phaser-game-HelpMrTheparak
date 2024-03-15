import { Physics} from "phaser"
import game from "../game"
import GamePlayeScene from "./gameplayScene"


export default class MainScene extends Phaser.Scene{

    cursors:Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(){
        super({
            key:'MainScene'
        
        })

    }

    create(){

        this.cursors=this.input.keyboard.createCursorKeys()

        var centerX=Number(this.game.config.width)/2;
        var centerY=Number(this.game.config.height)/2;
    
        
        var text_GameName=this.add.text(centerX,centerY-40 , 'Game Help Mr.Theparak ', { font: '80px Courier'}).setOrigin(0.5);
        

        var text_preekey=this.add.text(centerX,centerY+120,'Press "Space" to play game.',{ font: '32px Courier'}).setOrigin(0.5);

    }

    update(){

        if(this.cursors.space.isDown){
            //console.log("Data name : "+this.data.get('Name'));
            this.scene.start('GamePlayeScene');
        }

    }
   


}








