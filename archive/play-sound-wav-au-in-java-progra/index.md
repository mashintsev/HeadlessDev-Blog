---
templateKey: blog-post
title: Play sound (wav, au) in java program
date: 2012-07-19T10:51:00.000Z
description: Play sound (wav, au) in java program
tags:
- Old posts
---

Code example to play sound in java program.  
  
  
  
  
new Thread(new Runnable() {  
  
   @Override  
   public void run() {  
try {       
  
   if (loop) { // repeat sound  
AudioData data = new AudioStream(new FileInputStream("sound.wav")).getData();  
ContinuousAudioDataStream cas = new ContinuousAudioDataStream (data);  
AudioPlayer.player.start(cas);  
   } else { // one play  
  
AudioStream as = new AudioStream( new FileInputStream("sound.au") );  
AudioPlayer.player.start(as);  
   }  
} catch (Exception e) {  
   e.printStackTrace();  
}  
   }  
}).start();  
  
If you want to stop playing you must call AudioPlayer.player.stop(arg) with argument arg. Where arg is the same object.