import Phaser from "phaser";
import game from "../game";
import GameOverScene from "./gameoverScene";

export default class GamePlayeScene extends Phaser.Scene{


    //Game
    score:number=0;
    is_game_over:boolean=false;
    spaceDown:boolean=false;
    player_health:number=3;

    //GameObjects
    burn_ballons;
    nm_ballons;
    fall_zone;
    text;
    background;

    //Player
    player:Phaser.Physics.Arcade.Image;

    //Input Controller 
    cursors:Phaser.Types.Input.Keyboard.CursorKeys;

   
    constructor(){
        super({
            key:'GamePlayeScene'
        })
    }


    create(){ 
        

        //==================Data and text==================//
        //Set data
        this.data.set('scores',0);
        this.data.set('health',3); 
        this.data.set('is_gameover',false);

        //==========[Add background]=============
        this.background=this.add.image(Number(this.game.config.width)/2,Number(this.game.config.height)/2,'sky_night');

        //Set text
        this.text=this.add.text(20,20,'').setFontSize(24);

        this.text.setText([
            'Score : '+this.data.get('scores'),
            'Health : '+this.data.get('health'),
        ]);

        var textMove=this.add.text(Number(this.game.config.width)/2,( Number(this.game.config.height)/2)-340,'Press : Left - Right arrorw to move.').setOrigin(0.5);
        var textSpace=this.add.text(Number(this.game.config.width)/2,( Number(this.game.config.height)/2)-320,' "Space" to pick balloon.').setOrigin(0.5);

        //==================[End Data and text]==================//

        

        //==========[ Create Fall zone ]==========
        this.fall_zone=this.physics.add.image(1280/2,720,'box').setScale(5.5,0.25);
        
        //========[ Player ]=======
        this.player = this.physics.add.image(1280/2,575,"uncleNight")
        this.player.setScale(0.3,0.3)
        this.cursors=this.input.keyboard.createCursorKeys()
        //========[ End Player ]========


        //========== Create Ballon ========== 
        
        this.burn_ballons=this.physics.add.group();
        
        //Create Good_balloon (getScore++,Fall >> health--)
        for(let i=0;i<4;i++){
            const x=Phaser.Math.Between(20,1280);

            const b_balloon=this.burn_ballons.create(x,0,'bad_ballon')
            .setScale(0.5,0.5)
            .setVelocityY(Phaser.Math.Between(20,50))
            this.physics.add.existing(b_balloon);
            
            
        }

        

        this.nm_ballons=this.physics.add.group();
        
        //Create Good_balloon (getScore++,Fall >> health--)
        for(let i=0;i<4;i++){
            const x=Phaser.Math.Between(20,1280);
            const g_balloon=this.nm_ballons.create(x,0,'good_balloon').setScale(0.5,0.5);
            g_balloon.setVelocityY(Phaser.Math.Between(20,50));
            this.physics.add.existing(g_balloon);
            
        }

    }

    

    update(){

            //Set velocity Player
             this.player.setVelocity(0);

             //===========Game over condition==========
             if(this.data.get('health')<=0 || this.data.get('is_gameover')==true){
                var player_score=this.data.get('scores')
                this.data.set('is_gameover',true);
                this.resetGame();
                this.scene.restart();
                this.scene.start('GameOverScene',player_score);
             }
             //===========END Game over condition==========


            //============================= [Player Controller] ==========================
            //Set player controller 
            if(this.cursors.left.isDown){
            this.player.setVelocityX(-200)
            }
            if(this.cursors.right.isDown){
            this.player.setVelocityX(200)
            }


            //if player prees space bar
            if(this.cursors.space.isDown){

                this.spaceDown=true;
                //console.log("Space!! ON")
                
            }if(this.cursors.space.isUp){
                this.spaceDown=false;
                //console.log("Space!! UP")
            }

            //==============God Mode Game over===============
            
            if(this.cursors.shift.isDown){
                this.data.set('is_gameover',true);
            }
            
            //==============End God Mode Game over===============
            //============================= [END Player Controller] ==========================
            

            //============================= [balloon out of zone] ==========================
            this.physics.overlap(this.fall_zone,this.burn_ballons,(fall_zone,burn_ballons)=>
            {
                   
                    burn_ballons.destroy();
                    this.createNew_b_balloon();
                    this.player_health--;
                    this.data.set('health',this.player_health);
                    this.update_text();
                   
            });

            this.physics.overlap(this.fall_zone,this.nm_ballons,(fall_zone,nm_ballons)=>
            {
                    nm_ballons.destroy();
                    this.createNew_g_balloon()

            });

            //============================= [END balloon out of zone] ==========================


            //============================= [player interact with balloon] ==========================
            this.physics.overlap(this.player,this.burn_ballons,(player,burn_ballons)=>
            {
                   if(this.spaceDown==true){
                    burn_ballons.destroy();
                    this.score+=100;
                    this.data.set('scores',this.score);
                    this.update_text();
                    this.createNew_b_balloon();
                   }
            });

            this.physics.overlap(this.player,this.nm_ballons,(player,nm_ballons)=>
            {
                   if(this.spaceDown==true){
                    nm_ballons.destroy();
                    this.score-=100;
                    this.data.set('scores',this.score);
                    this.update_text();
                    this.createNew_g_balloon();
                   }
            });

            //============================= [END player interact with balloon] ==========================
            
        }

        update_text(){
            this.text.setText([
                'Score : '+this.data.get('scores'),
                'Health : '+this.data.get('health'),
            ]);

        }
        createNew_b_balloon(){
            const x=Phaser.Math.Between(20,1280);
            const b_balloon=this.burn_ballons.create(x,0,'bad_ballon')
            .setScale(0.5,0.5)
            .setVelocityY(Phaser.Math.Between(20,50))
            this.physics.add.existing(b_balloon);
        }

        createNew_g_balloon(){
            const x=Phaser.Math.Between(20,1280);
            const g_balloon=this.nm_ballons.create(x,0,'good_balloon').setScale(0.5,0.5);
            g_balloon.setVelocityY(Phaser.Math.Between(20,50));
            this.physics.add.existing(g_balloon);
        }

        resetGame(){
            this.data.set('scores',0);
            this.data.set('health',3);
            this.data.set('is_gameover',false);
        }

    }
