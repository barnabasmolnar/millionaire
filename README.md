# MILLIONAIRE

A game imitating the well-known 'Who wants to be a Millionaire' TV quiz game. Find the rules and an implementation plan below.

A battleplan:

# RULES:
There are 15 questions altogether. Player can stop and cash out after the 5th question at any point. Player takes home the prize designated for the last question that was correctly answered.

In case of wrong answers:

* Wrong answer before **question 5**: player "loses", takes no cash.
* Wrong answer between **question 5-10**: player gets the prize designated for question 5.
* Wrong answer after **10th question**: player gets the prize designated for question 10.

## Lifelines:
Player will have 3 lifelines at his disposal. They can each be used once. Lifelines can be used at any point in the game. Multiple types of lifelines can be used on the same question.

There are two types of lifeline in this version of the game:

* 50/50
* "Audience polling"

The player will have two 50/50 lifelines at his disposal. A 50/50 will remove two incorrect answers.

The "audience polling" lifeline will show a graph of previous players' answers of the same question. For instance, take this question:

*What character was once considered to be the 27th letter of the alphabet?*

With the following possible answers:

* Ampersand
* Interrobang
* Tilde
* Pilcrow

The graph will show a distribution of how previous players (so really, it isn't the audience obviously but all the players that have played the game so far) answered the question:

| Answer        | % of players that chose this answer |
| ------------- | ------------- |
| Ampersand     | 45%  |
| Interrobang   | 10%  |
| Tilde         | 20%  |
| Pilcrow       | 25%  |

**An important caveat:**

The polling lifeline depends on previously recorded data. What happens if there's no/not enough data? In that case, the lifeline will be replaced with yet another 50/50 lifeline. So it's quite possible that on a given question the player will be presented with 3 50/50 lifelines. Obviously he'll only be able to use one of these on the question. Not an ideal scenario but such is life.

A question will need to have been answered N number of times before the polling lifeline becomes active on it. N can be any number but 10 will be a good default probably.

# IMPLEMENTATION:

Server side we'll use Node and express. MongoDB will be our choice of database.

Client side we'll use React.

We'll have a new game screen where the player can choose a specific category or proceed with the default one (mixed questions/general knowledge).

We'll use the https://opentdb.com API to generate 15 questions. We'll make 3 distinct requests. We'll request 5 questions with easy difficulty, 5 with medium, 5 with hard.