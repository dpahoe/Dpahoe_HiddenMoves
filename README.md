# Dpahoe_HiddenMoves
Enables Hidden Moves (HM) usages outside battle. For RPG Maker MV.



**Introduction**

This is a plugin, which allows you to interact with events via skills. This is helpful in creating HM moves like
in Pokemon games, where you can cut a tree or move a boulder in the outer world.

**Features**

 1. Up to 8 HM skills possible
 2. Customizable texts to display, while activating and using the skill

**Plugin Commands**

 1. `HMObject skill_id` - Added to the interact-able event, like a tree or boulder.

**How to**

 *  In the Plugin screen, Enter the skill's ID and the texts to be shown while using the HM, in the parameters section.
 *  Enter Plugin Command: `HMObject skill_id` on any event that needs to be affected by that skill. This event's `Self Switch C` will turn ON, when the HM is used on it.
 *  You can then do whatever you want with the event when it's `Self Switch C ON`, like show animation, and making it disappear, or make it movable by player.

**Link**

[Link to plugin](https://github.com/dpahoe/Dpahoe_HiddenMoves/blob/master/Dpahoe_HiddenMoves.js)

**Terms**

Free for use in commercial games
