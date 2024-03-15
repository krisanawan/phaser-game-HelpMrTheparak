import MainScene from "./mainScene"

export default class PreloadScene extends Phaser.Scene{


    constructor(){
        super({
            key:'PreloadScene'
        })
    }


    preload(){

        this.load.image('uncleNight','./assets/img/uncle-night.png')
        this.load.image('good_balloon','./assets/img/balloon_good.png')
        this.load.image('bad_ballon','./assets/img/balloon_burn.png')
        this.load.image('box','./assets/img/panel_BG.png')
        this.load.image('sky_night','./assets/img/SkyNight.png')
    }

    create(){
        this.scene.start('MainScene')
    }
}