# Tic Tac Toe in C

This project is a modular Tic Tac Toe game written in C. It started as a simple board game and was expanded with several game modes, computer players, tournaments, save/load support, replay, ranking, automatic tests, colors and file export.

The user interface is in English. The code comments are simple and mostly in Portuguese to make the code easier to explain during presentation.

## Main features

- Player vs Player mode
- Player vs Computer mode
- Computer vs Computer mode
- 4-player tournament
- 8-player double elimination tournament
- Automatic 4-computer tournament
- Automatic 8-computer double elimination tournament
- Best of 3 and Best of 5 mode
- Configurable board size from 3x3 to 9x9
- Configurable win rule
- Computer difficulty levels
- Save and load game
- Undo last move
- Replay game
- General ranking saved in a text file
- Automatic test mode
- Colored terminal output
- Results saved to `.txt` files with date and time
- GitHub Pages web demo in the `docs` folder

## Project structure

The code is split into several files to make the project easier to read and maintain.

```text
main.c          -> main menu and program entry point
globals.c       -> global variables shared by the project
colors.c        -> terminal colors and color helper functions
ui.c            -> menus, rules and user interface messages
input.c         -> input handling and commands
board.c         -> board creation, printing and board-related helpers
rules.c         -> win rules, draw logic and forced draw logic
game_modes.c    -> main game modes
game_core.c     -> main game loop, save/load, undo and replay
computer.c      -> computer logic, difficulty levels and minimax
tournament.c    -> 4-player and 8-player tournaments
files.c         -> file saving, timestamped filenames and statistics files
ranking.c       -> general ranking system
tests.c         -> automatic tests
tictactoe.h     -> constants, prototypes and shared declarations
Makefile        -> build rules
README.md       -> project instructions
docs/           -> GitHub Pages portfolio page and browser-playable demo
```

## Web demo and portfolio page

The `docs` folder contains a static GitHub Pages version of the project.

It includes:

```text
docs/index.html       -> portfolio page and playable browser demo
docs/styles.css       -> responsive page and board styling
docs/app.js           -> browser game logic
docs/assets/mark.svg  -> project icon
```

The browser version is meant for portfolio visitors who want to try the game quickly without compiling C code. The full terminal version remains the main C project and includes the complete feature set: tournaments, save/load, replay, ranking and automatic tests.

### Publish with GitHub Pages

1. Create a GitHub repository for this project.
2. Push all project files, including the `docs` folder.
3. In GitHub, open the repository settings.
4. Go to **Pages**.
5. Choose **Deploy from branch**.
6. Select branch **main** and folder **/docs**.
7. Save.

After GitHub finishes deploying, the page will usually be available at:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/
```

Useful Git commands:

```bash
git add .
git commit -m "Add GitHub Pages web demo"
git push
```

## Color system

The game uses colors to make the interface easier to understand.

```text
Player X              -> magenta / pink
Player O              -> blue
Wins and winners      -> green
Losses and losers     -> orange
Draws and warnings    -> yellow
Row numbers           -> bright white
Column numbers        -> cyan
Board lines           -> grey
Titles and menus      -> purple / violet
Normal text           -> default terminal color
```

This avoids depending only on red versus green and avoids using very similar colors at the same time. Player X is not red because loss messages already use a warm negative color. Rows and columns also use different colors so the player can read the board more easily.

## Manual game commands

During a manual game, the following commands can be used:

```text
q -> quit the game
m -> return to main menu
s -> save game
u -> undo last move
r -> replay game
h -> show help
```

The game uses `y/n` for yes/no questions because `s` is reserved for `save`.

## Valid board sizes

The valid board sizes are:

```text
3x3
4x4
5x5
6x6
7x7
8x8
9x9
```

The board size is chosen before starting a game mode.

## Win rules

The game supports different win rules.

```text
1. Full board line
   Example: on a 5x5 board, a player needs 5 in a row.
   This creates a stricter and longer game.

2. Classic 3 in a row
   Example: on any board, a player only needs 3 consecutive symbols.
   This creates a faster and easier game, especially on larger boards.
   It is useful for quick games and testing, but it can be too easy on 8x8 or 9x9 boards.

3. Custom winning sequence
   Example: on a 9x9 board, the player can choose 4, 5, 6, 7, 8 or 9 in a row.
   This is the recommended option for larger boards when the goal is a more balanced game.
```

Wins can happen in the following directions:

```text
Horizontal
Vertical
Diagonal descending
Diagonal ascending
```

On larger boards, smaller diagonals can also win if the chosen winning sequence allows it. The winning sequence can never be smaller than 3.

Recommended balanced settings:

```text
3x3       -> 3 in a row
4x4 / 5x5 -> 4 in a row
6x6 / 7x7 -> 5 in a row
8x8 / 9x9 -> 6 in a row
```

## First move rule

The first move cannot be in the center of the board.

For odd board sizes, there is one center square.

Example on a 3x3 board:

```text
center = row 1, column 1
```

For even board sizes, there are four center squares.

Example on a 4x4 board:

```text
row 1, column 1
row 1, column 2
row 2, column 1
row 2, column 2
```

## Computer difficulty levels

The computer has three difficulty levels.

### Easy

```text
- Does not analyse the board.
- Chooses a random free square.
- Avoids the center on the first move.
```

### Medium

```text
- If it can win immediately, it plays the winning move.
- If the opponent can win next, it blocks.
- Otherwise, it chooses a random free square.
```

### Hard

```text
- First tries to win.
- Then tries to block the opponent.
- If there is no immediate win or block, it evaluates the board.
- Gives more value to strong sequences, center positions and corners.
- On classic 3x3 with 3 in a row, it uses minimax.
```

## Tournament draw rule

In tournaments, a winner is required to continue the bracket.

If the same tournament match ends in a draw several times, the program avoids an infinite loop by randomly selecting a winner after the maximum number of repeated draws.

## Files created by the program

The program can create files such as:

```text
ranking.txt
jogo_guardado.txt
estatisticas_computador_vs_computador_YYYYMMDD_HHMMSS.txt
resumo_torneio_4_jogadores_YYYYMMDD_HHMMSS.txt
resumo_torneio_4_computadores_YYYYMMDD_HHMMSS.txt
resumo_torneio_8_jogadores_YYYYMMDD_HHMMSS.txt
resumo_torneio_8_computadores_YYYYMMDD_HHMMSS.txt
```

Files with date and time are used so old results are not overwritten.

## How to compile

### Windows with MSYS2 MINGW64 or UCRT64

Open the MSYS2 terminal, go to the project folder and compile with `mingw32-make`.

```bash
cd /c/C_Exercises/Lab_5
mingw32-make clean
mingw32-make
./tictactoe.exe
```

If `mingw32-make` is not installed, install it with MSYS2.

For MINGW64:

```bash
pacman -S mingw-w64-x86_64-make
pacman -S mingw-w64-x86_64-gcc
```

For UCRT64:

```bash
pacman -S mingw-w64-ucrt-x86_64-make
pacman -S mingw-w64-ucrt-x86_64-gcc
```

### Windows with Git Bash

Git Bash usually does not include `make` by default. If `make` or `mingw32-make` is not available, compile manually:

```bash
cd /c/C_Exercises/Lab_5
gcc -Wall -Wextra -Werror main.c globals.c colors.c ui.c input.c board.c rules.c game_modes.c game_core.c computer.c tournament.c files.c ranking.c tests.c -o tictactoe.exe
./tictactoe.exe
```

### Windows PowerShell

In PowerShell, use Windows-style paths and run the `.exe` with `./` or `.\`.

```powershell
cd C:\C_Exercises\Lab_5
gcc -Wall -Wextra -Werror main.c globals.c colors.c ui.c input.c board.c rules.c game_modes.c game_core.c computer.c tournament.c files.c ranking.c tests.c -o tictactoe.exe
.\tictactoe.exe
```

### Linux

On Linux, install GCC and Make if needed.

Ubuntu / Debian:

```bash
sudo apt update
sudo apt install build-essential
```

Compile and run:

```bash
make clean
make
./tictactoe
```

Or compile manually:

```bash
gcc -Wall -Wextra -Werror main.c globals.c colors.c ui.c input.c board.c rules.c game_modes.c game_core.c computer.c tournament.c files.c ranking.c tests.c -o tictactoe
./tictactoe
```

### macOS

Install the command line tools if needed:

```bash
xcode-select --install
```

Compile and run:

```bash
make clean
make
./tictactoe
```

Or compile manually:

```bash
gcc -Wall -Wextra -Werror main.c globals.c colors.c ui.c input.c board.c rules.c game_modes.c game_core.c computer.c tournament.c files.c ranking.c tests.c -o tictactoe
./tictactoe
```

## How to compile in VS Code

Open the project folder in VS Code.

If the terminal is MSYS2 MINGW64 or UCRT64, use:

```bash
cd /c/C_Exercises/Lab_5
mingw32-make clean
mingw32-make
./tictactoe.exe
```

If the terminal is Git Bash and `mingw32-make` does not work, use the manual GCC command:

```bash
gcc -Wall -Wextra -Werror main.c globals.c colors.c ui.c input.c board.c rules.c game_modes.c game_core.c computer.c tournament.c files.c ranking.c tests.c -o tictactoe.exe
./tictactoe.exe
```

## Useful build commands

Clean compiled files:

```bash
mingw32-make clean
```

Compile:

```bash
mingw32-make
```

Run:

```bash
./tictactoe.exe
```

Manual compile:

```bash
gcc -Wall -Wextra -Werror main.c globals.c colors.c ui.c input.c board.c rules.c game_modes.c game_core.c computer.c tournament.c files.c ranking.c tests.c -o tictactoe.exe
```

## Common errors

### `make: command not found`

`make` is not installed or not available in the current terminal.

Use:

```bash
mingw32-make
```

or compile manually with GCC.

### `gcc: command not found`

GCC is not installed or not in the PATH.

Install GCC with MSYS2 or another C compiler.

### Old menu still appears

If the old Portuguese menu appears, you are probably running an old `tictactoe.exe`.

Delete it and compile again:

```bash
rm -f tictactoe.exe
mingw32-make clean
mingw32-make
./tictactoe.exe
```

### Colors do not show correctly

The game uses ANSI escape codes. They work in most modern terminals, including MSYS2, Git Bash and recent Windows terminals.

If colors do not appear correctly, try running the game in MSYS2 MINGW64, MSYS2 UCRT64 or Windows Terminal.

## Automatic tests

The project includes an automatic test mode in the main menu.

It tests important parts of the game, such as:

```text
Horizontal win
Vertical win
Diagonal win
First move center rule
Valid computer move
Hard computer blocking logic
```

If all tests pass, the program shows:

```text
Test result: 6/6 passed.
All automatic tests passed.
```

## Final presentation notes

This project demonstrates:

```text
2D arrays
Functions
Header files
Multiple source files
Input validation
Loops and conditionals
File handling
Random numbers
Basic artificial intelligence
Minimax on classic 3x3 mode
Modular project structure
Terminal colors
Automatic testing
```
