# charitywater_waterfall-game

# WATERFALL

**WATERFALL** is a browser-based physics game inspired by the work of [charity: water](https://www.charitywater.org/).

Players guide a falling water droplet through a cloud-filled Plinko-style course, collect smaller droplets, and direct the collected water into yellow jerry cans at the bottom of the board.

The project combines playful physics, water-themed visuals, and a simple collection mechanic to communicate the importance of clean water in an interactive way. And to also, perhaps, provoke. Through the irony between the game’s carefree, "gamified" nature and the real-world problem and hope of having clean water, it can echo the idea that obtaining clean water extends beyond this game; it can be physically represented--embodied--by supporting such projects in the real world.

## Gameplay

As explained, the user can move their mouse horizontally across the play area to position the cloud and preview their starting droplet. Once clicked inside the play area, to release the droplet, the droplet falls and can:
- Bounce off varying-shaped clouds
- Collect smaller water droplets and visually grow as more water is collected
- Squash and stretch during movement and collisions
- Land inside one of the yellow jerry cans to "collect" it.

The goal is to, with 7 player droplets, collect all 16 smaller droplets for a total of 2400 fl oz.

## Game Round Logic
There are:
- Game states
- Particular save states that snapshot how many smaller droplets are left, how many player droplets are left, and the total water collected so far.

## "Win" and "Retry" Conditions

You "win" by collecting all **2,400 fl oz** of available water.
You can "retry" when:
- No player droplets remain & No droplet is currently falling & Some collectible water is still left on the board

Both result screens include an option to try again and a link to learn more about charity: water.

## Features

- Physics powered by Matter.js
- Rendering and interaction powered by p5.js
- Personally produced background music, rendered through p5.sound
- Plinko-inspired cloud obstacles
- Collectible water droplets
- Dynamic player-droplet growth
- Collision squash-and-stretch animation
- Falling stretch animation
- Turn-state saving and restoration
- Title, gameplay, win, and loss screens
- Branded yellow jerry-can collection targets
- Responsive mouse-based drop positioning

## Learn More

Learn more about charity: water and its clean-water projects:

https://www.charitywater.org/

## Disclaimer

Any charity: water names, logos, branding, or related assets remain the property of their respective owners.
This project is an independent educational prototype inspired by charity: water.
Unless otherwise stated, it is not an official charity: water product and is not endorsed by or affiliated with charity: water.
