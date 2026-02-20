// ============================================
// Project 4: Snake Game – Turtle, Class & Module
// Follow along in VS Code to learn!
// For class use: Explanations only, no quizzes/missions
// ============================================
import { LessonData } from './types'

export const lessonP4EnData: LessonData = {
  id: "p4",
  title: "Making Snake Game",
  emoji: "🐍",
  description: "Build a Snake Game with turtle, classes, and modules!",
  chapters: [
    // ============================================
    // Chapter 1: turtle Library – Creating the Screen
    // ============================================
    {
      id: "ch1",
      title: "Creating a Screen with turtle",
      emoji: "🖥️",
      steps: [
        {
          id: "ch1-0",
          type: "explain",
          title: "🐍 What We're Making Today!",
          content: `## Let's Make a Snake Game!

![Snake Game Preview](/lessons/p4/game-preview.svg)

Control the snake with WASD keys — eat food and the tail gets longer!
Your score goes up, and if you hit a wall, it resets!

**What you'll learn by building this:**
- \`turtle\` library (graphics)
- \`class\` (classes) – Head, Tail, Tails, Food
- \`import\` (modules) – splitting code into files

💻 **Follow along by typing in VS Code!**`
        },
        {
          id: "ch1-1",
          type: "explain",
          title: "📦 What is turtle?",
          content: `## turtle = A tool that draws on the screen!

It's a library that comes built into Python.
Just \`import\` it and you can use it right away!

\`\`\`python
import turtle
\`\`\`

**Things you can do with turtle:**
- 🖥️ Create a window (screen)
- 🐢 Create a turtle (shape) and move it around
- ⌨️ Receive keyboard input

It's perfect for making games!`
        },
        {
          id: "ch1-2",
          type: "explain",
          title: "🖥️ Step 1: Creating the Screen",
          content: `## Try typing this in VS Code!

📁 Create a new folder \`snake_game\`, then create \`main.py\` inside it.

\`\`\`python
import turtle

# Width and height of the screen
w = 600
h = 600

# Half the width and height of the screen
halfW = w / 2
halfH = h / 2

# Screen
screen = turtle.Screen()
screen.title('Snake Game')
screen.setup(width=w, height=h)
screen.bgcolor('#cfe0e8')
screen.tracer(0)
\`\`\`

**Run it!** (Ctrl+F5 or Run)
If you see a light blue screen, you did it! ✅

### Line by Line Breakdown!

- \`w = 600\`, \`h = 600\` → Store screen size in variables! Change it here and the whole thing changes
- \`halfW = w / 2\` → **300**. We'll use this for wall collision detection (half the screen size)
- \`turtle.Screen()\` → Creates the game window (screen)
- \`.title('Snake Game')\` → Sets the window title
- \`.setup(width=w, height=h)\` → 600 wide, 600 tall in pixels
- \`.bgcolor('#cfe0e8')\` → Background color! \`#cfe0e8\` is light blue (HTML color code)
- \`.tracer(0)\` → Turns off automatic screen drawing, so we manually refresh with \`screen.update()\`!

### 🖥️ Run it up to here!
Add \`screen.mainloop()\` at the very bottom of your code and run (Ctrl+F5):
If you see a light blue 600×600 window, it works! ✅ (Nothing shows on screen yet — that's expected!)`
        },
        {
          id: "ch1-3",
          type: "explain",
          title: "📐 Understanding the Coordinate System",
          content: `## The center of the screen is (0, 0)!

![turtle Coordinate System](/lessons/p4/coordinate.svg)

Normally, the top-left corner is (0,0),
but in **turtle, the center of the screen is (0, 0)**!

For a 600×600 screen:
- **Right** edge: x = **300** (halfW)
- **Left** edge: x = **-300** (-halfW)
- **Top** edge: y = **300** (halfH)
- **Bottom** edge: y = **-300** (-halfH)

💡 That's why we calculated \`halfW\` and \`halfH\` in advance!
We'll use them to check if the snake went outside the walls.`
        },
      ]
    },
    // ============================================
    // Chapter 2: Snake Head – Head Class
    // ============================================
    {
      id: "ch2",
      title: "Making the Snake Head (Head)",
      emoji: "🔴",
      steps: [
        {
          id: "ch2-0",
          type: "explain",
          title: "🤔 Why Do We Need Classes?",
          content: `## What happens if we put everything in main.py?

Head, tail, food, score...
**If you put it all in one file, it's hundreds of lines!** 😱

**When you split it into classes:**
- Head class → Only head-related code!
- Tail class → One segment of the tail
- Tails class → Manages all tail segments
- Food class → Only food-related code!

![Class = Blueprint](/lessons/p4/class-diagram.svg)

📁 Create a new file \`snake.py\` in the same folder!`
        },
        {
          id: "ch2-1",
          type: "explain",
          title: "🏗️ Head Class - Basic Setup",
          content: `## Type this in snake.py!

\`\`\`python
import turtle

class Head:
    def __init__(self):
        self.a = turtle.Turtle()
        self.a.shape('circle')
        self.a.color('#587e76')
        self.a.penup()
        self.a.goto(0, 100)
        self.a.direction = 'stop'
\`\`\`

### Line by Line Breakdown!

- \`class Head:\` → Creates a class (blueprint) called **Head**!
- \`def __init__(self):\` → A function that **runs automatically** when you call \`Head()\`
- \`self\` → Refers to "myself". It's the first parameter in every function inside a class!
- \`self.a = turtle.Turtle()\` → Creates a turtle and stores it in \`self.a\`
- \`.shape('circle')\` → Circle shape
- \`.color('#587e76')\` → A greenish color (HTML color code)
- \`.penup()\` → Don't draw lines when moving (lift the pen up)
- \`.goto(0, 100)\` → Starting position at (0, 100) (slightly above center)
- \`self.a.direction = 'stop'\` → **Adding a new attribute!** Starts off stopped

💡 \`direction\` is not an attribute that originally exists on turtle.
We **created it ourselves** with \`self.a.direction = 'stop'\`!
Python lets you freely add attributes to objects like this.

### 🖥️ Run it up to here!
In main.py, add \`import snake\`, then \`head = snake.Head()\` + \`screen.update()\`:
You'll see a **green circle** slightly above center — that's the snake head! 🟢`
        },
        {
          id: "ch2-2",
          type: "explain",
          title: "🚀 Head's move() Method",
          content: `## Move based on direction!

![Grid Movement Explained](/lessons/p4/grid-move.svg)

Add this to the Head class:

\`\`\`python
    def move(self):
        if self.a.direction == 'right':
            x = self.a.xcor()
            self.a.setx(x + 20)

        elif self.a.direction == 'left':
            x = self.a.xcor()
            self.a.setx(x - 20)

        if self.a.direction == 'up':
            y = self.a.ycor()
            self.a.sety(y + 20)

        elif self.a.direction == 'down':
            y = self.a.ycor()
            self.a.sety(y - 20)
\`\`\`

### Line by Line Breakdown!

- \`def move(self):\` → The movement function called every frame!
- \`if self.a.direction == 'right':\` → If the current direction is 'right'...
- \`x = self.a.xcor()\` → Get the current x coordinate
- \`self.a.setx(x + 20)\` → Increase x by 20! (move right)
- Left is \`x - 20\`, up is \`y + 20\`, down is \`y - 20\`

💡 What if \`direction\` is \`'stop'\`? It doesn't match any \`if\`, so it doesn't move!
That's why we set \`direction = 'stop'\` at the beginning.

💡 Why use \`setx()\` and \`sety()\` instead of \`forward()\`?
We directly manipulate the x, y coordinates so it moves in a grid-like pattern!`
        },
        {
          id: "ch2-3",
          type: "explain",
          title: "⌨️ Direction Change Methods",
          content: `## Preventing reverse direction is the key!

Add this to the Head class:

\`\`\`python
    def move_up(self):
        if self.a.direction != 'down':
            self.a.direction = 'up'

    def move_down(self):
        if self.a.direction != 'up':
            self.a.direction = 'down'

    def move_right(self):
        if self.a.direction != 'left':
            self.a.direction = 'right'

    def move_left(self):
        if self.a.direction != 'right':
            self.a.direction = 'left'
\`\`\`

### Line by Line Breakdown!

- \`def move_up(self):\` → Function that gets called when the W key is pressed
- \`if self.a.direction != 'down':\` → **Only if not currently going down!**
- \`self.a.direction = 'up'\` → Change direction to up

💡 **Why block the reverse direction?**
What if the snake is going right and you press left?
→ The snake would go through its own body! 😱
→ So we **ignore the opposite direction**!

- Going up → Ignore down
- Going right → Ignore left`
        },
        {
          id: "ch2-4",
          type: "explain",
          title: "📍 Remaining Head Methods",
          content: `## Position-related methods!

Add this to the Head class:

\`\`\`python
    def getDistance(self, x, y):
        return self.a.distance(x, y)

    def getX(self):
        return self.a.xcor()

    def getY(self):
        return self.a.ycor()

    def goto(self, x, y):
        self.a.goto(x, y)
\`\`\`

### Line by Line Breakdown!

- \`def getDistance(self, x, y):\` → Calculates the **distance** between the head and (x, y)!
- \`self.a.distance(x, y)\` → A built-in distance calculation function in turtle! It automatically uses the Pythagorean theorem
- \`getX()\`, \`getY()\` → Returns the head's current x, y coordinates
- \`goto(self, x, y)\` → Teleports to the specified coordinates! Used to reset to (0, 0) when hitting a wall

💡 \`distance()\` is a **built-in method** of turtle!
No need to write the Pythagorean formula yourself — it calculates the distance for you.`
        },
      ]
    },
    // ============================================
    // Chapter 3: Tail – Tail & Tails Classes
    // ============================================
    {
      id: "ch3",
      title: "Making the Tail (Tail & Tails)",
      emoji: "🟢",
      steps: [
        {
          id: "ch3-0",
          type: "explain",
          title: "🟢 Understanding the Tail Structure",
          content: `## There are 2 classes for the tail!

**Why 2?**

- **\`Tail\` class** → **One segment** of the tail (a single green circle)
- **\`Tails\` class** → **Manages all tails** (manages multiple Tail objects in a list)

Every time the snake eats food:
1. A new \`Tail\` object is created
2. It gets added to the \`Tails\` list!

Splitting it like this keeps the roles clean:
- \`Tail\` = "I'm a single green circle"
- \`Tails\` = "I manage all the tail segments"`
        },
        {
          id: "ch3-1",
          type: "explain",
          title: "🏗️ Tail Class (One Segment)",
          content: `## Add this below Head in snake.py!

\`\`\`python
class Tail:
    def __init__(self):
        self.a = turtle.Turtle()
        self.a.penup()
        self.a.color('#c5d5c5')
        self.a.shape('circle')
        self.a.goto(0, 100)
        self.a.direction = 'stop'

    def getX(self):
        return self.a.xcor()

    def getY(self):
        return self.a.ycor()

    def goto(self, x, y):
        self.a.goto(x, y)
\`\`\`

### Line by Line Breakdown!

- \`class Tail:\` → A class representing **one segment** of the tail!
- \`self.a = turtle.Turtle()\` → Creates one turtle
- \`.color('#c5d5c5')\` → Light green! Brighter than the head (\`#587e76\`) so you can tell them apart
- \`.shape('circle')\` → Circle shape
- \`.goto(0, 100)\` → Initial position is the same as the head (will be repositioned by \`followHead()\` later)
- \`getX()\`, \`getY()\` → Current position of this tail segment
- \`goto()\` → Move this tail segment to a specific position (used in \`followHead\`)`
        },
        {
          id: "ch3-2",
          type: "explain",
          title: "🏗️ Tails Class (Managing All Tails)",
          content: `## Add this below Tail in snake.py!

\`\`\`python
class Tails:
    def __init__(self):
        self.tails = []

    def addTail(self, t):
        self.tails.append(t)

    def clear(self):
        for tail in self.tails:
            tail.goto(1000000, 1000000)
        self.tails.clear()
\`\`\`

### Line by Line Breakdown!

- \`class Tails:\` → A class that manages **all** the tails! (Note the plural 's'!)
- \`self.tails = []\` → An empty list! Tail objects will stack up here one by one
- \`def addTail(self, t):\` → Takes a Tail object \`t\` and adds it to the list
- \`self.tails.append(t)\` → Append to the end of the list!
- \`def clear(self):\` → Delete all tails when hitting a wall!
- \`tail.goto(1000000, 1000000)\` → Send them far off-screen so they're invisible!
- \`self.tails.clear()\` → Clear the list itself too

💡 Why \`goto(1000000, ...)\` instead of \`hideturtle()\`?
Sending them off-screen is one way to hide them!`
        },
        {
          id: "ch3-3",
          type: "explain",
          title: "🔄 followHead() – Follow the Leader!",
          content: `## Add this to the Tails class!

![Tail Follow Mechanism](/lessons/p4/tail-follow.svg)

\`\`\`python
    def followHead(self, x, y):
        for i in range(len(self.tails) - 1, 0, -1):
            t = self.tails[i]
            bt = self.tails[i - 1]
            t.goto(bt.getX(), bt.getY())

        if len(self.tails) > 0:
            self.tails[0].goto(x, y)
\`\`\`

### Line by Line Breakdown!

- \`def followHead(self, x, y):\` → Takes the head's x, y coordinates and moves the entire tail!
- \`range(len(self.tails) - 1, 0, -1)\` → Iterate **from back to front**!

For example, if there are 3 tail segments: \`range(2, 0, -1)\` → i = 2, 1

- \`t = self.tails[i]\` → Current tail (further back)
- \`bt = self.tails[i - 1]\` → The tail right in front
- \`t.goto(bt.getX(), bt.getY())\` → Move the current tail to where the front tail was!

Movement order (with 3 tail segments):
1. Tail 3 → moves to where Tail 2 was
2. Tail 2 → moves to where Tail 1 was
3. Tail 1 → moves to where the head was (\`self.tails[0].goto(x, y)\`)

💡 **Why from back to front?** If you go front to back, positions overlap and they all pile up!`
        },
      ]
    },
    // ============================================
    // Chapter 4: Food – Food Class
    // ============================================
    {
      id: "ch4",
      title: "Making the Food (Food)",
      emoji: "⭐",
      steps: [
        {
          id: "ch4-0",
          type: "explain",
          title: "⭐ We Need Food!",
          content: `## Let's make something for the snake to eat!

**Food rules:**
- Appears at a random position on screen
- If the snake head gets close → It's eaten!
- Eating → Tail +1, Score +10
- Food moves to a new random position

📁 Create a new file \`food.py\`!

![Project Structure](/lessons/p4/file-structure.svg)`
        },
        {
          id: "ch4-1",
          type: "explain",
          title: "🏗️ Food Class",
          content: `## Type this in food.py!

\`\`\`python
import turtle
import random

class Food:
    def __init__(self):
        self.food = turtle.Turtle()
        self.food.shape('turtle')
        self.food.color('green')
        self.food.goto(0, 0)
        self.food.penup()
        self.food.speed(0)

    def getX(self):
        return self.food.xcor()

    def getY(self):
        return self.food.ycor()

    def goToRandom(self, x1, x2, y1, y2):
        x = random.randint(x1, x2)
        y = random.randint(y1, y2)
        self.food.goto(x, y)
\`\`\`

### Line by Line Breakdown!

- \`import random\` → A library for generating random numbers!
- \`self.food = turtle.Turtle()\` → Creates a turtle for the food
- \`.shape('turtle')\` → Set the shape to **turtle**! 🐢 (Head is circle, food is turtle — easy to tell apart)
- \`.color('green')\` → Green color
- \`.goto(0, 0)\` → Initial position is the center of the screen
- \`.speed(0)\` → Maximum speed! (Moves instantly without animation)
- \`getX()\`, \`getY()\` → Current position of the food (used for collision detection!)
- \`def goToRandom(self, x1, x2, y1, y2):\` → Move to a random position within the range!
- \`random.randint(x1, x2)\` → Randomly picks one **integer** between x1 and x2!
- \`self.food.goto(x, y)\` → Teleport to the random coordinates!

💡 Why does \`goToRandom\` take the range as parameters?
So main.py can pass in the range based on the screen size!`
        },
      ]
    },
    // ============================================
    // Chapter 5: Modules – Splitting Files
    // ============================================
    {
      id: "ch5",
      title: "Splitting Files with Modules",
      emoji: "📦",
      steps: [
        {
          id: "ch5-0",
          type: "explain",
          title: "📦 What is a Module?",
          content: `## Module = a .py file!

The \`snake.py\` and \`food.py\` files we made are modules themselves!
You can \`import\` them from other files to use them.

![Project Structure](/lessons/p4/file-structure.svg)

**If you put everything in one file:** 500-line spaghetti code 🍝
**If you split into files:** Each file is short and clean! ✨

- \`snake.py\` → Head, Tail, Tails classes
- \`food.py\` → Food class
- \`main.py\` → Game execution (the director!)`
        },
        {
          id: "ch5-1",
          type: "explain",
          title: "🔗 Connecting with import!",
          content: `## Using modules in main.py!

![Connecting Files with import](/lessons/p4/import-flow.svg)

\`\`\`python
import turtle
import snake       # Import snake.py!
import food        # Import food.py!
import time
\`\`\`

### Here's how import works:

- \`import snake\` → Loads \`snake.py\` from the same folder
- \`snake.Head()\` → Use the Head class from the snake module!
- \`snake.Tails()\` → Use the Tails class from the snake module!
- \`import food\` → Loads \`food.py\` from the same folder
- \`food.Food()\` → Use the Food class from the food module!

Usage: Create objects with **moduleName.ClassName()**!

\`\`\`python
head = snake.Head()     # Create Head object
tails = snake.Tails()   # Create Tails object
my_food = food.Food()   # Create Food object
\`\`\`

💡 If you write \`food = food.Food()\`, the variable name and module name clash, causing an error!
That's why you might use \`my_food\` as the variable name. (In our code, we use \`food = food.Food()\`)`
        },
      ]
    },
    // ============================================
    // Chapter 6: Keyboard Input + Game Loop
    // ============================================
    {
      id: "ch6",
      title: "Keyboard + Game Loop",
      emoji: "⌨️",
      steps: [
        {
          id: "ch6-0",
          type: "explain",
          title: "⌨️ Connecting the Keyboard",
          content: `## Continue adding to main.py!

\`\`\`python
# Events are connected to the Screen.
screen.listen()
screen.onkeypress(head.move_up, 'w')
screen.onkeypress(head.move_down, 's')
screen.onkeypress(head.move_right, 'd')
screen.onkeypress(head.move_left, 'a')

# Uppercase too!
screen.onkeypress(head.move_up, 'W')
screen.onkeypress(head.move_down, 'S')
screen.onkeypress(head.move_right, 'D')
screen.onkeypress(head.move_left, 'A')
\`\`\`

### Line by Line Breakdown!

- \`screen.listen()\` → Start detecting keyboard input on the screen!
- \`screen.onkeypress(head.move_up, 'w')\` → **When 'w' is pressed**, run the \`head.move_up\` function!

💡 **Important:** There's no \`()\` after \`head.move_up\`!
- \`head.move_up\` = Just **passing** the function (run it later!)
- \`head.move_up()\` = Execute it **right now**
- Since we want it to run **when the key is pressed**, we leave out the ()!

💡 **Using WASD keys!** Gamer style instead of arrow keys ⌨️
We also register uppercase (W, S, D, A) so it works even with Caps Lock on!

### 🖥️ Run it up to here!
Add the keyboard connections + a simple while loop to main.py and run:
The **green circle moves 20 pixels at a time with WASD!** ⌨️
(No tail, food, or score yet)`
        },
        {
          id: "ch6-1",
          type: "explain",
          title: "🔄 Starting the Game Loop!",
          content: `## The heart of the game: the while True loop!

Add this at the bottom of main.py:

\`\`\`python
while True:
    # (Game logic will go here!)

    # Move head
    head.move()

    # Move tails
    tails.followHead(head.getX(), head.getY())

    time.sleep(0.1)
    screen.update()

screen.mainloop()
\`\`\`

### Line by Line Breakdown!

- \`while True:\` → **Infinite loop!** Keeps running until the game ends
- \`head.move()\` → Move 20 pixels based on the current direction
- \`tails.followHead(...)\` → The entire tail follows the head
- \`time.sleep(0.1)\` → **Wait 0.1 seconds**! This number determines the game speed
- \`screen.update()\` → Refresh the screen! (Since tracer(0), we must do it manually)
- \`screen.mainloop()\` → Keeps the window open (outside the while loop)

💡 Change to \`time.sleep(0.05)\` and it becomes 2x faster!
Change to \`time.sleep(0.2)\` and it slows down!

### 🖥️ Run it up to here!
The head moves with WASD, and the food (🐢 turtle shape) appears on screen!
Eating it won't do anything yet — we'll add that in the next chapter!`
        },
      ]
    },
    // ============================================
    // Chapter 7: Eating Food + Wall Collision
    // ============================================
    {
      id: "ch7",
      title: "Eating Food & Wall Collision",
      emoji: "🍽️",
      steps: [
        {
          id: "ch7-0",
          type: "explain",
          title: "📊 Creating the Score System",
          content: `## main.py – Add above the game loop!

\`\`\`python
# Variables for scoring
score = 0
high_score = 0

# Turtle for displaying score
pen = turtle.Turtle()
pen.penup()
pen.hideturtle()
pen.goto(0, halfH - 50)
pen.write('score: 0, High Score: 0',
          align="center",
          font=('candara', 24, 'bold'))
\`\`\`

### Line by Line Breakdown!

- \`score = 0\` → Current score! +10 when food is eaten
- \`high_score = 0\` → Highest score! Doesn't decrease even when hitting a wall
- \`pen = turtle.Turtle()\` → A turtle dedicated to displaying the score!
- \`.penup()\` → No drawing lines when moving
- \`.hideturtle()\` → Hide the turtle shape, show **only the text**!
- \`.goto(0, halfH - 50)\` → Position at the top of the screen (300 - 50 = 250)
- \`.write(...)\` → Display text on screen!
- \`align="center"\` → Center aligned
- \`font=('candara', 24, 'bold')\` → Font, size 24, bold`
        },
        {
          id: "ch7-1",
          type: "explain",
          title: "🍽️ Food Eating Detection",
          content: `## Add inside the while True loop!

![Distance Check Explained](/lessons/p4/distance-check.svg)

\`\`\`python
    # When the snake head touches the food
    x = food.getX()
    y = food.getY()

    if head.getDistance(x, y) < 20:
        # Tail gets longer
        tail = snake.Tail()
        tails.addTail(tail)

        # Food moves to a random position
        food.goToRandom(-(halfW-20), halfW - 20,
                        -(halfH-20), halfH - 20)

        # Score
        score += 10
        if score > high_score:
            high_score = score
        pen.clear()
        pen.write('score: {}, High Score: {}'.format(
            score, high_score),
            align="center",
            font=('candara', 24, 'bold'))
\`\`\`

### Line by Line Breakdown!

- \`x = food.getX()\` → The food's current x coordinate
- \`head.getDistance(x, y)\` → The **distance** between the head and food! A built-in turtle function
- \`if ... < 20:\` → If the distance is less than 20 pixels, it counts as "eaten!"
- \`tail = snake.Tail()\` → Create a **new Tail object**! (One green circle)
- \`tails.addTail(tail)\` → Add it to the Tails list!
- \`food.goToRandom(...)\` → Move food to a random position inside the screen! \`halfW-20\` avoids the area near walls
- \`score += 10\` → Add 10 points!
- \`if score > high_score:\` → If current score exceeds the high score, update it
- \`pen.clear()\` → Erase the previous score text! (Without this, text overlaps)
- \`pen.write(...)\` → Display the new score again
- \`.format(score, high_score)\` → Fills in the \`{}\` placeholders with the values!`
        },
        {
          id: "ch7-2",
          type: "explain",
          title: "🧱 Wall Collision Handling",
          content: `## Add inside the while True loop!

\`\`\`python
    # When the snake head hits a wall
    hx = head.getX()
    hy = head.getY()

    if hx < -halfW or hx > halfW or hy < -halfH or hy > halfH:
        # Move snake head to center
        head.goto(0, 0)
        # Remove tails
        tails.clear()
        # Score
        score = 0
        pen.clear()
        pen.write('score: {}, High Score: {}'.format(
            score, high_score),
            align="center",
            font=('candara', 24, 'bold'))
\`\`\`

### Line by Line Breakdown!

- \`hx = head.getX()\` → The head's current x coordinate
- \`if hx < -halfW\` → Did it go past the left wall? (x < -300)
- \`or hx > halfW\` → Past the right wall? (x > 300)
- \`or hy < -halfH\` → Past the bottom wall? (y < -300)
- \`or hy > halfH\` → Past the top wall? (y > 300)
- \`head.goto(0, 0)\` → Reset the head to the center of the screen!
- \`tails.clear()\` → Send all tails off-screen and clear the list
- \`score = 0\` → Reset the score! (high_score stays!)
- \`pen.clear()\` + \`pen.write(...)\` → Update the score display

💡 **high_score** never decreases!
Even if you hit a wall, the high score stays.
That's what makes the game fun! 🎯

### 🖥️ Run it up to here!
**Finally, a complete game!** 🎮
- WASD to move → eat food to grow tail + score +10
- Hit a wall and it resets! (High score stays)
- **Check the complete code in Chapter 8!**`
        },
      ]
    },
    // ============================================
    // Chapter 8: Complete! Full Code
    // ============================================
    {
      id: "ch8",
      title: "Completing the Game!",
      emoji: "🎮",
      steps: [
        {
          id: "ch8-0",
          type: "explain",
          title: "📁 Final snake.py",
          content: `## snake.py Complete Code!

Check the combined Head, Tail, and Tails we've built so far:

\`\`\`python
import turtle

class Head:
    def __init__(self):
        self.a = turtle.Turtle()
        self.a.shape('circle')
        self.a.color('#587e76')
        self.a.penup()
        self.a.goto(0, 100)
        self.a.direction = 'stop'

    def move(self):
        if self.a.direction == 'right':
            x = self.a.xcor()
            self.a.setx(x + 20)
        elif self.a.direction == 'left':
            x = self.a.xcor()
            self.a.setx(x - 20)
        if self.a.direction == 'up':
            y = self.a.ycor()
            self.a.sety(y + 20)
        elif self.a.direction == 'down':
            y = self.a.ycor()
            self.a.sety(y - 20)

    def move_up(self):
        if self.a.direction != 'down':
            self.a.direction = 'up'

    def move_down(self):
        if self.a.direction != 'up':
            self.a.direction = 'down'

    def move_right(self):
        if self.a.direction != 'left':
            self.a.direction = 'right'

    def move_left(self):
        if self.a.direction != 'right':
            self.a.direction = 'left'

    def getDistance(self, x, y):
        return self.a.distance(x, y)

    def getX(self):
        return self.a.xcor()

    def getY(self):
        return self.a.ycor()

    def goto(self, x, y):
        self.a.goto(x, y)


class Tail:
    def __init__(self):
        self.a = turtle.Turtle()
        self.a.penup()
        self.a.color('#c5d5c5')
        self.a.shape('circle')
        self.a.goto(0, 100)
        self.a.direction = 'stop'

    def getX(self):
        return self.a.xcor()

    def getY(self):
        return self.a.ycor()

    def goto(self, x, y):
        self.a.goto(x, y)


class Tails:
    def __init__(self):
        self.tails = []

    def addTail(self, t):
        self.tails.append(t)

    def clear(self):
        for tail in self.tails:
            tail.goto(1000000, 1000000)
        self.tails.clear()

    def followHead(self, x, y):
        for i in range(len(self.tails) - 1, 0, -1):
            t = self.tails[i]
            bt = self.tails[i - 1]
            t.goto(bt.getX(), bt.getY())
        if len(self.tails) > 0:
            self.tails[0].goto(x, y)
\`\`\``
        },
        {
          id: "ch8-1",
          type: "explain",
          title: "📁 Final food.py",
          content: `## food.py Complete Code!

\`\`\`python
import turtle
import random

class Food:
    def __init__(self):
        self.food = turtle.Turtle()
        self.food.shape('turtle')
        self.food.color('green')
        self.food.goto(0, 0)
        self.food.penup()
        self.food.speed(0)

    def getX(self):
        return self.food.xcor()

    def getY(self):
        return self.food.ycor()

    def goToRandom(self, x1, x2, y1, y2):
        x = random.randint(x1, x2)
        y = random.randint(y1, y2)
        self.food.goto(x, y)
\`\`\`

**3 files, each with a clear role!** ✨
- \`snake.py\` → Head (head) + Tail (one segment) + Tails (tail management)
- \`food.py\` → Food management
- \`main.py\` → Screen, input, game loop (the director!)`
        },
        {
          id: "ch8-2",
          type: "explain",
          title: "📁 Final main.py",
          content: `## main.py Complete Code!

\`\`\`python
import turtle
import snake
import time
import food

# Width and height of the screen
w = 600
h = 600
halfW = w / 2
halfH = h / 2

# Screen
screen = turtle.Screen()
screen.title('Snake Game')
screen.setup(width=w, height=h)
screen.bgcolor('#cfe0e8')
screen.tracer(0)

# Create the snake's head object
head = snake.Head()

# Events are connected to the Screen.
screen.listen()
screen.onkeypress(head.move_up, 'w')
screen.onkeypress(head.move_down, 's')
screen.onkeypress(head.move_right, 'd')
screen.onkeypress(head.move_left, 'a')
screen.onkeypress(head.move_up, 'W')
screen.onkeypress(head.move_down, 'S')
screen.onkeypress(head.move_right, 'D')
screen.onkeypress(head.move_left, 'A')

# Create the food object for the snake to eat
food = food.Food()

# Create the snake's tail object
tails = snake.Tails()

# Initialize score variables
score = 0
high_score = 0

# Score display
pen = turtle.Turtle()
pen.penup()
pen.hideturtle()
pen.goto(0, halfH - 50)
pen.write('score: 0, High Score: 0',
          align="center",
          font=('candara', 24, 'bold'))

while True:
    # When the snake head touches the food
    x = food.getX()
    y = food.getY()
    if head.getDistance(x, y) < 20:
        tail = snake.Tail()
        tails.addTail(tail)
        food.goToRandom(-(halfW-20), halfW - 20,
                        -(halfH-20), halfH - 20)
        score += 10
        if score > high_score:
            high_score = score
        pen.clear()
        pen.write('score: {}, High Score: {}'.format(
            score, high_score),
            align="center",
            font=('candara', 24, 'bold'))

    # When the snake head hits a wall
    hx = head.getX()
    hy = head.getY()
    if hx < -halfW or hx > halfW or hy < -halfH or hy > halfH:
        head.goto(0, 0)
        tails.clear()
        score = 0
        pen.clear()
        pen.write('score: {}, High Score: {}'.format(
            score, high_score),
            align="center",
            font=('candara', 24, 'bold'))

    # Move head
    head.move()

    # Move tails
    tails.followHead(head.getX(), head.getY())

    time.sleep(0.1)
    screen.update()

screen.mainloop()
\`\`\``
        },
        {
          id: "ch8-3",
          type: "explain",
          title: "🎉 Snake Game Complete!",
          content: `## Congratulations! 🎉 The Snake Game is complete!

**Run main.py in VS Code!**

**Summary of what we built:**
- 🖥️ \`turtle.Screen()\` – 600×600 game screen
- 🐍 \`Head\` class – Snake head (direction change, reverse prevention!)
- 🟢 \`Tail\` class – One tail segment
- 📋 \`Tails\` class – Manages all tails (list!)
- 🐢 \`Food\` class – Random position food
- 📊 Score + High Score system
- ⌨️ WASD keyboard input
- 🧱 Wall collision handling

**Concepts learned:**
- \`class\`, \`__init__\`, \`self\`, methods
- \`import\` (module = .py file)
- Game loop, list usage, distance calculation

**Challenge yourself:** 🌟
- Reset when the snake hits its own tail
- Add a game over screen
- Make the speed gradually increase!
- Add background music (pygame.mixer)`
        },
      ]
    },
  ]
}
