# Spamton NEO — Web version
This project is an attempt at porting the spectacular Spamton NEO boss fight from Delatarune to the web, thus allowing you to enter close combat with the deceptive, oleaginous grifter himself without having to play through the game all the way to him, nor shoulder through the infamous basement challenge before you get to the boss fight.
Hopefully this makes for a fun thing to do online :)

# Setup
If you want to run this on your own computer/server, all you need is a way to host a local web server. I would recommend the "Live Server" extension for Visual Studio Code, but any method to achieve this setup will work. I haven't included the `p5.js` and `p5.sound.min.js` files in this repo, as they realistically don't represent my code and don't belong here. For development purposes, it is more convenient to have them available in the local directory, though, so you can download the `p5` libraries like so:

`curl https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js > p5.js`

`curl https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/addons/p5.sound.min.js > p5.sound.min.js`

Alternatively, you can download the files from the CDN (see links above) using a web browser.