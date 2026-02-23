// ============================================
// Project 4: Snake Game – pygame version (English)
// Follow along in VS Code to learn!
// For class use: Explanations only, no quizzes/missions
// ============================================
import { LessonData } from './types'

export const lessonP4PygameEnData: LessonData = {
  id: "p4",
  title: "Making Snake Game (pygame)",
  emoji: "🎮",
  description: "Build a Snake Game with pygame, classes, and modules!",
  chapters: [
    // ============================================
    // Chapter 1: Introduction to pygame + Creating the Screen
    // ============================================
    {
      id: "pg-ch1",
      title: "Intro to pygame + Creating a Screen",
      emoji: "🖥️",
      steps: [
        {
          id: "pg-ch1-0",
          type: "explain",
          title: "💭 What is pygame?",
          content: `💭 What if there's a **more powerful game library** than turtle? With images, sounds, and FPS control?

It's a Python module **made for building games**!
Unlike turtle, pygame provides everything you need: image rendering, sound playback, keyboard/mouse input, and frame control.

**Installation:**
\`\`\`python
pip install pygame
\`\`\`

@Key point: **pygame** = a game-specific library with more features than turtle (images, sounds, FPS, etc.)!`
        },
        {
          id: "pg-ch1-1",
          type: "explain",
          title: "💭 How is turtle different from pygame?",
          content: `💭 It's the same Snake Game... but **how do turtle and pygame differ?**

| | turtle | pygame |
|---|---|---|
| Origin point | Screen **center** (0,0) | **Top-left** (0,0) |
| y-axis direction | Up is + | **Down is +** |
| Drawing method | Turtle objects draw themselves | **You draw everything each frame** |
| Key input | \`onkeypress()\` | **Event loop** |
| Speed control | \`time.sleep()\` | \`Clock.tick(FPS)\` |
| Screen update | \`screen.update()\` | \`pygame.display.flip()\` |

@Key point: In pygame, **top-left is (0,0)** and down is +y! The opposite of turtle!`
        },
        {
          id: "pg-ch1-2",
          type: "explain",
          title: "💭 How do we create a pygame window?",
          content: `💭 How do we display a 600×600 black game window?

📁 Create a new folder \`SnakeGame_pygame\`, then create \`main.py\` inside.

\`\`\`python
import pygame
import sys

pygame.init()

WIDTH = 600
HEIGHT = 600
CELL_SIZE = 20    # Size of each cell (snake, food, tail)

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Snake Game')
\`\`\`

### Breaking it down line by line!

- \`pygame.init()\` → Initialize all pygame features!
- \`CELL_SIZE = 20\` → Snake games use a grid; we define the cell size
- \`set_mode((WIDTH, HEIGHT))\` → Set screen size using a **tuple**
- \`set_caption()\` → Set the window title

@Key point: **pygame.init() to initialize** → **set_mode() to create the screen** → **set_caption() for the title!**`
        },
        {
          id: "pg-ch1-3",
          type: "explain",
          title: "💭 How do we represent colors?",
          content: `💭 In turtle we used HTML color codes like \`'#cfe0e8'\`... but in pygame?

\`\`\`python
# pygame uses RGB tuples for colors!
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 200, 0)
RED = (255, 0, 0)
\`\`\`

Each number is a **Red (R), Green (G), Blue (B)** value from 0 to 255.

- \`(0, 0, 0)\` → Black (no light)
- \`(255, 255, 255)\` → White (all light maxed out)
- \`(0, 200, 0)\` → Green (only Green at 200)

@Key point: In pygame, colors are **(R, G, B) tuples**! Each value ranges from 0 to 255!`
        },
        {
          id: "pg-ch1-4",
          type: "explain",
          title: "💭 How do we keep the game running?",
          content: `💭 We created the screen but it closes immediately! Don't we need a **loop that runs continuously**?

\`\`\`python
clock = pygame.time.Clock()
running = True

while running:
    # 1. Handle events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # 2. Draw screen
    screen.fill(BLACK)
    pygame.display.flip()

    # 3. Control speed
    clock.tick(10)

pygame.quit()
sys.exit()
\`\`\`

### Breaking it down line by line!

- \`clock = pygame.time.Clock()\` → A clock for frame control!
- \`while running:\` → The game loop! Runs every frame
- \`pygame.event.get()\` → Check events (keyboard, mouse, window close)
- \`pygame.QUIT\` → When the X button is clicked, quit
- \`screen.fill(BLACK)\` → Fill the entire screen with black
- \`pygame.display.flip()\` → Refresh the screen!
- \`clock.tick(10)\` → **10 frames per second** (good speed for Snake)

💡 In turtle we used \`tracer(0)\` + \`update()\`, but in pygame we **redraw the entire screen every frame**!

**Run it!** If a 600×600 black window appears, you're good!

@Key point: **while loop + event handling + fill + flip + tick** = the pygame game loop!`
        },
      ]
    },
    // ============================================
    // Chapter 2: Snake Head – Head Class
    // ============================================
    {
      id: "pg-ch2",
      title: "Making the Snake Head (Head)",
      emoji: "🟩",
      steps: [
        {
          id: "pg-ch2-0",
          type: "explain",
          title: "💭 How is the Head class different in pygame?",
          content: `💭 In turtle, the \`turtle.Turtle()\` object drew itself automatically... but in pygame?

**turtle version:** The Turtle object manages position and shape on its own
**pygame version:** We **manage x, y coordinates ourselves**!

📁 Create a new file \`snake.py\` in the same folder!

\`\`\`python
import pygame

class Head:
    def __init__(self, x, y, size):
        self.x = x
        self.y = y
        self.size = size
        self.direction = 'stop'
\`\`\`

Comparing to turtle:
- turtle: \`self.a = turtle.Turtle()\` → The object handles everything
- pygame: \`self.x = x\`, \`self.y = y\` → **We store the coordinates ourselves!**

@Key point: pygame Head **manages x, y coordinates directly** — the object doesn't do it for you like turtle!`
        },
        {
          id: "pg-ch2-1",
          type: "explain",
          title: "💭 How do we move based on direction?",
          content: `💭 If direction is 'right', just increase x by 20! But **going up means subtracting y?**

Add to the Head class:

\`\`\`python
    def move(self):
        if self.direction == 'right':
            self.x += self.size
        elif self.direction == 'left':
            self.x -= self.size
        elif self.direction == 'up':
            self.y -= self.size     # Up means y decreases!
        elif self.direction == 'down':
            self.y += self.size
\`\`\`

⚠️ **Note**: pygame's y-axis is the **opposite** of turtle!
- To go up, you **subtract** y
- To go down, you **add** y

@Key point: In pygame, **up = y decreases, down = y increases** — opposite of turtle!`
        },
        {
          id: "pg-ch2-2",
          type: "explain",
          title: "💭 How do we draw the snake on screen?",
          content: `💭 In turtle, objects appeared automatically... but in pygame you have to **draw them yourself**?

Add to the Head class:

\`\`\`python
    def draw(self, screen, color):
        pygame.draw.rect(screen, color,
            (self.x, self.y, self.size, self.size))
\`\`\`

### Breaking it down line by line!

- \`pygame.draw.rect()\` → Draw a **rectangle** on screen!
- \`screen\` → Where to draw (the display)
- \`color\` → What color (RGB tuple)
- \`(self.x, self.y, self.size, self.size)\` → **(x, y, width, height)**

In turtle we chose circle/square shapes, but in pygame we **draw rectangles directly**!

@Key point: **pygame.draw.rect(screen, color, (x, y, width, height))** to draw manually!`
        },
        {
          id: "pg-ch2-3",
          type: "explain",
          title: "💭 Position checking + collision detection?",
          content: `💭 We need coordinates to check if food was eaten... and pygame has its own **collision detection method**?

Add to the Head class:

\`\`\`python
    def getX(self):
        return self.x

    def getY(self):
        return self.y

    def getRect(self):
        return pygame.Rect(self.x, self.y,
                          self.size, self.size)
\`\`\`

### Why getRect() is special!

- \`pygame.Rect\` = a **rectangle object** provided by pygame
- You can use \`colliderect()\` to easily check if two rectangles **overlap**!
- In turtle we calculated distance with \`distance() < 20\`, but in pygame we use **rectangle overlap** → more accurate!

@Key point: **pygame.Rect + colliderect()** = more accurate collision detection than turtle's distance()!`
        },
        {
          id: "pg-ch2-4",
          type: "explain",
          title: "💭 Let's display the snake in main.py!",
          content: `💭 We made the Head class... now let's **import it in main.py and draw it on screen!**

Edit main.py:

\`\`\`python
import snake

# Create snake head (center of screen)
head = snake.Head(WIDTH // 2, HEIGHT // 2, CELL_SIZE)
head.direction = 'right'    # For testing!
\`\`\`

Inside the game loop:

\`\`\`python
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    head.move()                    # Move snake
    screen.fill(BLACK)             # Fill background
    head.draw(screen, GREEN)       # Draw snake
    pygame.display.flip()          # Refresh screen
    clock.tick(10)
\`\`\`

**Run it!** If a green square moves to the right continuously, success!

@Key point: **move() to move → fill() to clear → draw() to draw → flip() to refresh** = repeat every frame!`
        },
      ]
    },
    // ============================================
    // Chapter 3: Keyboard Input
    // ============================================
    {
      id: "pg-ch3",
      title: "Controlling the Snake with Keyboard",
      emoji: "⌨️",
      steps: [
        {
          id: "pg-ch3-0",
          type: "explain",
          title: "💭 How do we make the snake move with arrow keys?",
          content: `💭 In turtle we connected functions with \`onkeypress()\`... but in pygame we **check directly in the event loop**?

Add to the Head class in snake.py:

\`\`\`python
    def go_up(self):
        if self.direction != 'down':
            self.direction = 'up'

    def go_down(self):
        if self.direction != 'up':
            self.direction = 'down'

    def go_left(self):
        if self.direction != 'right':
            self.direction = 'left'

    def go_right(self):
        if self.direction != 'left':
            self.direction = 'right'
\`\`\`

**Same logic as the turtle version!** You can't turn in the opposite direction.

@Key point: Direction switching logic is the same as turtle! **Block reverse direction** to prevent going through yourself!`
        },
        {
          id: "pg-ch3-1",
          type: "explain",
          title: "💭 How do we detect keys in the event loop?",
          content: `💭 In pygame, keyboard input is also handled as **events**?

Update the event handling in the main.py game loop:

\`\`\`python
for event in pygame.event.get():
    if event.type == pygame.QUIT:
        running = False

    if event.type == pygame.KEYDOWN:
        if event.key == pygame.K_UP:
            head.go_up()
        elif event.key == pygame.K_DOWN:
            head.go_down()
        elif event.key == pygame.K_LEFT:
            head.go_left()
        elif event.key == pygame.K_RIGHT:
            head.go_right()
\`\`\`

### turtle vs pygame key input comparison

**turtle:**
\`\`\`python
screen.onkeypress(head.move_up, 'w')   # Connect a function!
\`\`\`

**pygame:**
\`\`\`python
if event.type == pygame.KEYDOWN:        # Check directly in the event loop!
    if event.key == pygame.K_UP:
        head.go_up()
\`\`\`

💡 \`KEYDOWN\` only triggers the moment a key is pressed! Perfect for Snake.

Also, delete the test line \`head.direction = 'right'\`!

@Key point: In pygame, use **KEYDOWN inside the event loop** to handle key input!`
        },
      ]
    },
    // ============================================
    // Chapter 4: Food – Food Class
    // ============================================
    {
      id: "pg-ch4",
      title: "Making the Food (Food)",
      emoji: "🔴",
      steps: [
        {
          id: "pg-ch4-0",
          type: "explain",
          title: "💭 How do we make the Food class?",
          content: `💭 We just need to manage x, y coordinates and **draw it as a rectangle**, right?

📁 Create \`food.py\` in the same folder!

\`\`\`python
import pygame
import random

class Food:
    def __init__(self, size):
        self.size = size
        self.x = 0
        self.y = 0
\`\`\`

💡 In the turtle version we created a \`turtle.Turtle()\` object, but in pygame we only need to **store the coordinates**!

@Key point: The pygame Food class **only manages coordinates** — clean and simple without turtle objects!`
        },
        {
          id: "pg-ch4-1",
          type: "explain",
          title: "💭 How do we place food randomly on the grid?",
          content: `💭 Since the snake moves 20px at a time, the food also needs to be at **multiples of 20** to line up correctly!

Add to the Food class:

\`\`\`python
    def goToRandom(self, max_w, max_h):
        # Position must be a multiple of CELL_SIZE to fit the grid
        self.x = random.randint(0, (max_w - self.size) // self.size) * self.size
        self.y = random.randint(0, (max_h - self.size) // self.size) * self.size

    def draw(self, screen, color):
        pygame.draw.rect(screen, color,
            (self.x, self.y, self.size, self.size))

    def getRect(self):
        return pygame.Rect(self.x, self.y,
                          self.size, self.size)
\`\`\`

### Why multiples of CELL_SIZE?

- The snake moves at positions (0, 20, 40, 60, ...)
- Food must be on the same grid to overlap exactly!
- \`randint(...) * self.size\` → **Always a multiple of 20!**

@Key point: **randint() × CELL_SIZE** = random coordinates that snap to the grid!`
        },
        {
          id: "pg-ch4-2",
          type: "explain",
          title: "💭 How do we know if the snake ate the food?",
          content: `💭 If two rectangles **overlap**, it means the food was eaten! More accurate than turtle's distance()!

In main.py, create food + check collision:

\`\`\`python
import food

myFood = food.Food(CELL_SIZE)
myFood.goToRandom(WIDTH, HEIGHT)
\`\`\`

Check for collision in the game loop:

\`\`\`python
    # If snake head overlaps with food, it's eaten!
    if head.getRect().colliderect(myFood.getRect()):
        myFood.goToRandom(WIDTH, HEIGHT)
\`\`\`

Add food to the drawing section:

\`\`\`python
    screen.fill(BLACK)
    head.draw(screen, GREEN)
    myFood.draw(screen, RED)      # Draw food!
    pygame.display.flip()
\`\`\`

💡 \`colliderect()\` is pygame's built-in collision detection function!
In turtle we used \`distance() < 20\`, but in pygame we check for **rectangle overlap**!

@Key point: **colliderect()** = pygame's built-in collision detection that checks if two Rects overlap!`
        },
      ]
    },
    // ============================================
    // Chapter 5: Tail – Tail & Tails Classes
    // ============================================
    {
      id: "pg-ch5",
      title: "Making the Tail (Tail & Tails)",
      emoji: "🟢",
      steps: [
        {
          id: "pg-ch5-0",
          type: "explain",
          title: "💭 Why are tails easier in pygame?",
          content: `💭 In turtle we had to manage \`hideturtle()\` and \`showturtle()\` order... but in pygame?

**turtle version**: When moving tails, you must hide → move → show again (otherwise it flickers!)
**pygame version**: Since we redraw the screen every frame, **just change the coordinates and you're done!**

📁 Create \`tail.py\` in the same folder!

\`\`\`python
import pygame

class Tail:
    def __init__(self, x, y, size):
        self.x = x
        self.y = y
        self.size = size

    def goto(self, x, y):
        self.x = x
        self.y = y

    def getX(self):
        return self.x

    def getY(self):
        return self.y

    def draw(self, screen, color):
        pygame.draw.rect(screen, color,
            (self.x, self.y, self.size, self.size))
\`\`\`

Much simpler than the turtle version! Just store x, y coordinates and you're done.

@Key point: pygame Tail **only manages coordinates** — no need to worry about hideturtle like in turtle!`
        },
        {
          id: "pg-ch5-1",
          type: "explain",
          title: "💭 What about the Tails class that manages all tails?",
          content: `💭 Same principle as the turtle version! Manage Tails with a list and **make them follow from back to front**!

Add to tail.py:

\`\`\`python
class Tails:
    def __init__(self):
        self.tails = []

    def addTail(self, t):
        self.tails.append(t)

    def followHead(self, x, y):
        for i in range(len(self.tails) - 1, 0, -1):
            t = self.tails[i]
            front = self.tails[i - 1]
            t.goto(front.getX(), front.getY())
        if len(self.tails) > 0:
            self.tails[0].goto(x, y)

    def drawAll(self, screen, color):
        for t in self.tails:
            t.draw(screen, color)

    def clear(self):
        self.tails.clear()
\`\`\`

### Differences from the turtle version

- **followHead**: Same logic! Move from back to front
- **drawAll**: pygame exclusive! Draw all tails at once
- **clear**: In turtle you had to move them offscreen (goto(1000000, 1000000)), but in pygame **just clear the list!** They won't be drawn next frame!

@Key point: pygame Tails' clear() — **just clear the list and they disappear automatically!** Cleaner than turtle!`
        },
        {
          id: "pg-ch5-2",
          type: "explain",
          title: "💭 Connecting tails in main.py?",
          content: `💭 Add a tail when food is eaten, and order matters! **followHead comes before move!**

Add to main.py:

\`\`\`python
import tail

LIGHT_GREEN = (144, 238, 144)
tails = tail.Tails()
\`\`\`

Add tail when food is eaten:

\`\`\`python
    if head.getRect().colliderect(myFood.getRect()):
        myFood.goToRandom(WIDTH, HEIGHT)
        newTail = tail.Tail(head.getX(), head.getY(), CELL_SIZE)
        tails.addTail(newTail)
\`\`\`

Movement order in game loop:

\`\`\`python
    # Order matters!
    tails.followHead(head.getX(), head.getY())  # 1. Tails follow head position
    head.move()                                  # 2. Then head moves
\`\`\`

Drawing:

\`\`\`python
    screen.fill(BLACK)
    tails.drawAll(screen, LIGHT_GREEN)  # Draw tails first
    head.draw(screen, GREEN)            # Head on top (drawn later)
    myFood.draw(screen, RED)
    pygame.display.flip()
\`\`\`

⚠️ **followHead() must come before head.move()!** Tails follow the head's position before it moves for smooth animation.

@Key point: **followHead → move order** + drawing is **tails first, head last**!`
        },
      ]
    },
    // ============================================
    // Chapter 6: Wall Collision + Score
    // ============================================
    {
      id: "pg-ch6",
      title: "Wall Collision & Scoreboard",
      emoji: "🏆",
      steps: [
        {
          id: "pg-ch6-0",
          type: "explain",
          title: "💭 How do we detect wall collision?",
          content: `💭 Since pygame coordinates start from 0... the wall collision condition must be **different from turtle**?

Add to the game loop:

\`\`\`python
    hx = head.getX()
    hy = head.getY()

    if hx < 0 or hx >= WIDTH or hy < 0 or hy >= HEIGHT:
        head.x = WIDTH // 2
        head.y = HEIGHT // 2
        head.direction = 'stop'
        tails.clear()
        score = 0
\`\`\`

### turtle vs pygame wall collision comparison

**turtle** (center is 0,0):
\`\`\`python
if hx < -halfW or hx > halfW    # -300 ~ +300
\`\`\`

**pygame** (top-left is 0,0):
\`\`\`python
if hx < 0 or hx >= WIDTH        # 0 ~ 599
\`\`\`

Different coordinate systems mean different collision conditions!

@Key point: pygame wall collision uses the **0 to WIDTH/HEIGHT** range! Different from turtle's -halfW to +halfW!`
        },
        {
          id: "pg-ch6-1",
          type: "explain",
          title: "💭 How do we display the score on screen?",
          content: `💭 In turtle we used \`pen.write()\` to write text... but in pygame you **create text as an image and paste it**?

Add to main.py:

\`\`\`python
font = pygame.font.SysFont('candara', 30)
score = 0
high_score = 0

def drawScore(screen, score, high_score):
    text = font.render(
        f'Score: {score}  High Score: {high_score}',
        True, WHITE)
    screen.blit(text,
        (WIDTH // 2 - text.get_width() // 2, 10))
\`\`\`

### Breaking it down line by line!

- \`font.render()\` → Convert a string into an **image (Surface)**!
- \`True\` → Anti-aliasing (smooth text)
- \`screen.blit()\` → **Paste** that image onto the screen!
- \`text.get_width() // 2\` → For center alignment

In turtle, \`pen.write()\` was just one line, but in pygame it's a **render → blit** two-step process!

@Key point: pygame text = **font.render() to create the image → blit() to paste it on screen!**`
        },
        {
          id: "pg-ch6-2",
          type: "explain",
          title: "💭 Connecting score logic to the game loop?",
          content: `💭 +10 for eating food, reset on wall collision! **Add drawScore to the screen** and we're done!

When food is eaten:

\`\`\`python
    if head.getRect().colliderect(myFood.getRect()):
        myFood.goToRandom(WIDTH, HEIGHT)
        newTail = tail.Tail(head.getX(), head.getY(), CELL_SIZE)
        tails.addTail(newTail)
        score += 10
        if score > high_score:
            high_score = score
\`\`\`

Add score to screen drawing:

\`\`\`python
    screen.fill(BLACK)
    tails.drawAll(screen, LIGHT_GREEN)
    head.draw(screen, GREEN)
    myFood.draw(screen, RED)
    drawScore(screen, score, high_score)   # Score!
    pygame.display.flip()
\`\`\`

@Key point: Eat food → **score += 10**, hit wall → **score = 0** (high_score stays!)!`
        },
      ]
    },
    // ============================================
    // Chapter 7: Game Complete!
    // ============================================
    {
      id: "pg-ch7",
      title: "Game Complete!",
      emoji: "🎮",
      steps: [
        {
          id: "pg-ch7-0",
          type: "explain",
          title: "💭 Complete snake.py code",
          content: `💭 Let's look at the **complete Head class**!

\`\`\`python
import pygame

class Head:
    def __init__(self, x, y, size):
        self.x = x
        self.y = y
        self.size = size
        self.direction = 'stop'

    def move(self):
        if self.direction == 'right':
            self.x += self.size
        elif self.direction == 'left':
            self.x -= self.size
        elif self.direction == 'up':
            self.y -= self.size
        elif self.direction == 'down':
            self.y += self.size

    def go_up(self):
        if self.direction != 'down':
            self.direction = 'up'

    def go_down(self):
        if self.direction != 'up':
            self.direction = 'down'

    def go_left(self):
        if self.direction != 'right':
            self.direction = 'left'

    def go_right(self):
        if self.direction != 'left':
            self.direction = 'right'

    def draw(self, screen, color):
        pygame.draw.rect(screen, color,
            (self.x, self.y, self.size, self.size))

    def getX(self):
        return self.x

    def getY(self):
        return self.y

    def getRect(self):
        return pygame.Rect(self.x, self.y,
                          self.size, self.size)
\`\`\`

@Key point: snake.py contains the **Head class** — coordinate management, movement, direction switching, drawing, and collision detection!`
        },
        {
          id: "pg-ch7-1",
          type: "explain",
          title: "💭 Complete food.py + tail.py code",
          content: `💭 Let's check the food and tail files too!

**food.py:**
\`\`\`python
import pygame
import random

class Food:
    def __init__(self, size):
        self.size = size
        self.x = 0
        self.y = 0

    def goToRandom(self, max_w, max_h):
        self.x = random.randint(0, (max_w - self.size) // self.size) * self.size
        self.y = random.randint(0, (max_h - self.size) // self.size) * self.size

    def draw(self, screen, color):
        pygame.draw.rect(screen, color, (self.x, self.y, self.size, self.size))

    def getRect(self):
        return pygame.Rect(self.x, self.y, self.size, self.size)
\`\`\`

**tail.py:**
\`\`\`python
import pygame

class Tail:
    def __init__(self, x, y, size):
        self.x = x
        self.y = y
        self.size = size

    def goto(self, x, y):
        self.x = x
        self.y = y

    def getX(self):
        return self.x

    def getY(self):
        return self.y

    def draw(self, screen, color):
        pygame.draw.rect(screen, color, (self.x, self.y, self.size, self.size))

class Tails:
    def __init__(self):
        self.tails = []

    def addTail(self, t):
        self.tails.append(t)

    def clear(self):
        self.tails.clear()

    def followHead(self, x, y):
        for i in range(len(self.tails) - 1, 0, -1):
            t = self.tails[i]
            front = self.tails[i - 1]
            t.goto(front.getX(), front.getY())
        if len(self.tails) > 0:
            self.tails[0].goto(x, y)

    def drawAll(self, screen, color):
        for t in self.tails:
            t.draw(screen, color)
\`\`\`

@Key point: **4 files** — snake.py (Head), food.py (Food), tail.py (Tail+Tails), main.py (orchestrator)!`
        },
        {
          id: "pg-ch7-2",
          type: "explain",
          title: "💭 Complete main.py code!",
          content: `💭 The **final main.py** with everything combined! Try running it!

\`\`\`python
import pygame
import sys
import snake
import food
import tail

pygame.init()

WIDTH = 600
HEIGHT = 600
CELL_SIZE = 20

BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 200, 0)
LIGHT_GREEN = (144, 238, 144)
RED = (255, 0, 0)

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Snake Game')
clock = pygame.time.Clock()
font = pygame.font.SysFont('candara', 30)

head = snake.Head(WIDTH // 2, HEIGHT // 2, CELL_SIZE)
myFood = food.Food(CELL_SIZE)
myFood.goToRandom(WIDTH, HEIGHT)
tails = tail.Tails()

score = 0
high_score = 0

def drawScore(screen, score, high_score):
    text = font.render(f'Score: {score}  High Score: {high_score}', True, WHITE)
    screen.blit(text, (WIDTH // 2 - text.get_width() // 2, 10))

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP:
                head.go_up()
            elif event.key == pygame.K_DOWN:
                head.go_down()
            elif event.key == pygame.K_LEFT:
                head.go_left()
            elif event.key == pygame.K_RIGHT:
                head.go_right()

    tails.followHead(head.getX(), head.getY())
    head.move()

    if head.getRect().colliderect(myFood.getRect()):
        myFood.goToRandom(WIDTH, HEIGHT)
        newTail = tail.Tail(head.getX(), head.getY(), CELL_SIZE)
        tails.addTail(newTail)
        score += 10
        if score > high_score:
            high_score = score

    hx = head.getX()
    hy = head.getY()
    if hx < 0 or hx >= WIDTH or hy < 0 or hy >= HEIGHT:
        head.x = WIDTH // 2
        head.y = HEIGHT // 2
        head.direction = 'stop'
        tails.clear()
        score = 0

    screen.fill(BLACK)
    tails.drawAll(screen, LIGHT_GREEN)
    head.draw(screen, GREEN)
    myFood.draw(screen, RED)
    drawScore(screen, score, high_score)
    pygame.display.flip()
    clock.tick(10)

pygame.quit()
sys.exit()
\`\`\`

@Key point: main.py is the orchestrator that combines **screen + input + movement + collision + score + drawing**!`
        },
        {
          id: "pg-ch7-3",
          type: "explain",
          title: "🎉 Congratulations! pygame Snake Complete!",
          content: `**Run main.py in VS Code!**

## turtle vs pygame Final Comparison

| | turtle version | pygame version |
|---|---|---|
| Drawing | Turtle objects draw themselves | **Draw everything each frame** |
| Coordinates | Center is (0,0), up is +y | **Top-left is (0,0), down is +y** |
| Collision | \`distance()\` distance calculation | **\`colliderect()\` rectangle overlap** |
| Screen refresh | \`tracer(0)\` + \`update()\` | **\`fill()\` + \`flip()\`** |
| Tail removal | goto(1000000, 1000000) to hide | **Just clear() the list** |
| Text | \`pen.write()\` | **\`font.render()\` + \`blit()\`** |
| Key input | \`onkeypress()\` | **Event loop KEYDOWN** |
| Quit | \`mainloop()\` | **\`pygame.quit()\` + \`sys.exit()\`** |

**What you learned:**
- pygame initialization, screen, colors (RGB)
- Game loop (events → logic → drawing)
- Managing snake/food/tail with classes
- Splitting code into modules
- Collision detection (colliderect)
- Frame control (Clock.tick)

@Key point: **Same game, different tools!** turtle is simple, pygame is more powerful!`
        },
      ]
    },
  ]
}
