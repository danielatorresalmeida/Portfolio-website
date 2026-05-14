CC = gcc
CFLAGS = -Wall -Wextra -Werror
TARGET = tictactoe.exe
SOURCES = main.c globals.c colors.c ui.c input.c board.c rules.c game_modes.c game_core.c computer.c tournament.c files.c ranking.c tests.c

all:
	$(CC) $(CFLAGS) $(SOURCES) -o $(TARGET)

clean:
	powershell -NoProfile -Command "Remove-Item -Force -ErrorAction SilentlyContinue '$(TARGET)', '*.o', 'ranking.txt', 'saved_game.txt', '*.txt'; exit 0"
