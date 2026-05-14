#include "tictactoe.h"

// Funcoes relacionadas com ui.

// Mostra o menu principal ao utilizador.
void show_menu(void)
{
    print_title("\n=== TIC TAC TOE ===\n");
    printf("0. View game rules\n");
    printf("1. Player vs Player\n");
    printf("2. Player vs Computer\n");
    printf("3. Computer vs Computer\n");
    printf("4. 4-player tournament\n");
    printf("5. 8-player double elimination tournament\n");
    printf("6. Test 4-computer tournament\n");
    printf("7. Test 8-computer double elimination tournament\n");
    printf("8. Toggle screen clearing (%s)\n", clear_screen_enabled ? "on" : "off");
    printf("9. View overall ranking\n");
    printf("10. Best of 3 / Best of 5 mode\n");
    printf("11. Run automatic tests\n");
    printf("12. Load saved game\n");
    printf("13. Exit\n");
    print_warning("Type q to quit the game at any time.\n");
}

// Mostra as regras principais do jogo.
void show_rules(void)
{
    print_title("\n=== GAME RULES ===\n");

    printf("- %sPlayer X%s always starts.\n", COLOR_PLAYER_X, COLOR_RESET);
    printf("- %sPlayer X%s uses magenta/pink during the game.\n", COLOR_PLAYER_X, COLOR_RESET);
    printf("- %sPlayer O%s uses blue during the game.\n", COLOR_PLAYER_O, COLOR_RESET);
    printf("- %sWins and winners%s are shown in green.\n", COLOR_WIN, COLOR_RESET);
    printf("- %sLosses and losers%s are shown in orange.\n", COLOR_LOSS, COLOR_RESET);
    printf("- %sDraws and warnings%s are shown in yellow.\n", COLOR_DRAW, COLOR_RESET);
    printf("- %sRow numbers%s are shown in bright white.\n", COLOR_ROW, COLOR_RESET);
    printf("- %sColumn numbers%s are shown in cyan.\n", COLOR_COLUMN, COLOR_RESET);
    printf("- %sBoard lines%s are shown in grey.\n", COLOR_BOARD, COLOR_RESET);
    printf("- %sTitles and menus%s are shown in purple.\n", COLOR_TITLE, COLOR_RESET);
    printf("- The first move cannot be in the center of the board.\n");
    printf("- Odd-sized boards have one center square.\n");
    printf("- Even-sized boards have four center squares.\n");
    printf("- Wins can be horizontal, vertical or diagonal.\n");
    printf("- Diagonals can go downwards or upwards.\n");
    printf("- The win rule can be full board line, classic 3 in a row, or a custom sequence.\n");
    printf("- Full board line creates a stricter and longer game.\n");
    printf("- Classic 3 in a row creates a faster and easier game, especially on larger boards.\n");
    printf("- Custom sequence is recommended for larger boards when you want a balanced game.\n");
    printf("- Suggested balance: 3x3 uses 3, 4x4 or 5x5 uses 4, 6x6 or 7x7 uses 5, 8x8 or 9x9 uses 6.\n");
    printf("- The winning sequence can never be smaller than 3.\n");
    printf("- On larger boards, smaller diagonals can win if the chosen sequence allows it.\n");
    printf("- %sIn tournaments, repeated draws trigger a random winner to avoid an infinite loop.%s\n", COLOR_WARNING, COLOR_RESET);
    printf("- In best of 3, the first player to 2 wins takes the series.\n");
    printf("- In best of 5, the first player to 3 wins takes the series.\n");
    printf("- Draws in best of 3 or 5 do not count as wins.\n");
    printf("- During a manual game, type s to save the game.\n");
    printf("- During a manual game, type u to undo the last move.\n");
    printf("- During a manual game, type r to replay the game.\n");
    printf("- On hard mode, the computer uses minimax on a 3x3 board with 3 in a row.\n");
    printf("- There is an automatic test mode for the main functions.\n");
    print_warning("- Type 0 in internal menus to return to the main menu.\n");
    print_warning("- Type q, quit or exit to close the game.\n");
}

// Mostra os comandos disponiveis durante uma partida manual.
void show_game_commands(void)
{
    print_title("\n=== MANUAL GAME COMMANDS ===\n");
    printf("%sq%s = quit the game\n", COLOR_CYAN, COLOR_RESET);
    printf("%sm%s = return to the main menu\n", COLOR_CYAN, COLOR_RESET);
    printf("%ss%s = save the current game\n", COLOR_CYAN, COLOR_RESET);
    printf("%su%s = undo the last move\n", COLOR_CYAN, COLOR_RESET);
    printf("%sr%s = replay the current game\n", COLOR_CYAN, COLOR_RESET);
    printf("%sh%s = show this help message\n", COLOR_CYAN, COLOR_RESET);
}

// Permite escolher o tamanho valido do tabuleiro.
int choose_size(void)
{
    int size;

    while (1)
    {
        print_title("\nValid board options:\n");
        print_return_to_menu_option();
        printf("3. 3x3 board\n");
        printf("4. 4x4 board\n");
        printf("5. 5x5 board\n");
        printf("6. 6x6 board\n");
        printf("7. 7x7 board\n");
        printf("8. 8x8 board\n");
        printf("9. 9x9 board\n");

        if (!read_int_or_exit("Choose a board option, or q to quit: ", &size))
        {
            print_warning("Invalid input.\n");
            continue;
        }

        if (size == 0)
        {
            return 0;
        }

        if (size >= 3 && size <= 9)
        {
            return size;
        }

        print_warning("Invalid size. Valid options are: 0, 3, 4, 5, 6, 7, 8 or 9.\n");
    }
}

// Permite escolher a regra de vitoria.
int choose_victory_length(int size)
{
    int option;

    while (1)
    {
        print_title("\nChoose the win rule:\n");
        print_warning("Wins can be horizontal, vertical or diagonal.\n");
        print_warning("Diagonals can go downwards or upwards.\n");
        print_return_to_menu_option();
        printf("1. Full board line (%d in a row)\n", size);
        print_warning("   Slower and stricter. Best when you want the whole row, column or diagonal.\n");
        printf("2. Classic 3 in a row\n");
        print_warning("   Faster and easier, especially on larger boards. Useful for quick games and tests.\n");
        printf("3. Choose the winning sequence length\n");
        print_warning("   Recommended for larger boards when you want a more balanced game.\n");

        if (!read_int_or_exit("Option: ", &option))
        {
            print_warning("Invalid input.\n");
            continue;
        }

        if (option == 0)
        {
            return 0;
        }

        if (option == 1)
        {
            print_success("Selected rule: full board line.\n");
            return size;
        }

        if (option == 2)
        {
            print_success("Selected rule: classic 3 in a row.\n");
            return 3;
        }

        if (option == 3)
        {
            return choose_custom_victory_length(size);
        }

        print_warning("Invalid option.\n");
    }
}

// Permite escolher uma sequencia vencedora personalizada.
int choose_custom_victory_length(int size)
{
    int length;

    while (1)
    {
        print_title("\nValid sequences for this board:\n");
        print_return_to_menu_option();

        for (int i = 3; i <= size; i++)
        {
            printf("%d. %d in a row\n", i, i);
        }

        if (!read_int_or_exit("Choose the winning sequence length: ", &length))
        {
            print_warning("Invalid input.\n");
            continue;
        }

        if (length == 0)
        {
            return 0;
        }

        if (length >= 3 && length <= size)
        {
            print_success("Selected custom winning sequence.\n");
            return length;
        }

        printf("%sInvalid sequence. Use a value between 3 and %d.%s\n", COLOR_WARNING, size, COLOR_RESET);
    }
}

// Permite escolher a dificuldade de um computador.
int choose_difficulty(char label[])
{
    int option;

    while (1)
    {
        printf("%s%s\nChoose the difficulty for %s:%s\n", COLOR_BOLD, COLOR_TITLE, label, COLOR_RESET);
        print_return_to_menu_option();
        printf("1. Easy\n");
        printf("   - Does not analyze the board.\n");
        printf("   - Chooses a random empty square.\n");
        printf("   - Avoids the center on the first move.\n");
        printf("2. Medium\n");
        printf("   - If it can win this turn, it plays the winning move.\n");
        printf("   - If the opponent can win next turn, it blocks.\n");
        printf("   - If there is no urgent move, it chooses a random empty square.\n");
        printf("3. Hard\n");
        printf("   - First tries to win.\n");
        printf("   - Then tries to block the opponent.\n");
        printf("   - If there is no immediate win or block, it evaluates all empty squares.\n");
        printf("   - Gives extra value to strong sequences, the center and the corners.\n");

        if (!read_int_or_exit("Option: ", &option))
        {
            print_warning("Invalid input.\n");
            continue;
        }

        if (option == 0)
        {
            return RETURN_TO_MENU;
        }

        if (option >= 1 && option <= 3)
        {
            return option - 1;
        }

        print_warning("Invalid option.\n");
    }
}

// Permite escolher o tipo de computadores num torneio automatico.
int choose_computer_tournament_mode(void)
{
    int mode;

    while (1)
    {
        print_title("\nChoose the computer mode:\n");
        print_return_to_menu_option();
        printf("1. All easy\n");
        printf("   - All computers play randomly.\n");
        printf("2. All medium\n");
        printf("   - All computers try to win, block, then play randomly.\n");
        printf("3. All hard\n");
        printf("   - All computers evaluate the board and choose the best available move.\n");
        printf("4. Mixed\n");
        printf("   - Odd-numbered computers: easy.\n");
        printf("   - Even-numbered computers: hard.\n");

        if (!read_int_or_exit("Option: ", &mode))
        {
            print_warning("Invalid input.\n");
            continue;
        }

        if (mode >= 0 && mode <= 4)
        {
            return mode;
        }

        print_warning("Invalid option.\n");
    }
}

// Configura a visualizacao e velocidade das partidas automaticas.
int configure_automatic_options(void)
{
    int speed;
    int board_option;

    while (1)
    {
        print_title("\nAutomatic game speed:\n");
        print_return_to_menu_option();
        printf("1. Fast, no pause between moves\n");
        printf("2. Normal, short pause between moves\n");
        printf("3. Slow, longer pause between moves\n");

        if (!read_int_or_exit("Option: ", &speed))
        {
            print_warning("Invalid input.\n");
            continue;
        }

        if (speed == 0)
        {
            return 0;
        }

        if (speed == 1)
        {
            automatic_delay_ms = 0;
            break;
        }

        if (speed == 2)
        {
            automatic_delay_ms = 500;
            break;
        }

        if (speed == 3)
        {
            automatic_delay_ms = 1200;
            break;
        }

        print_warning("Invalid option.\n");
    }

    while (1)
    {
        print_title("\nShow the board during automatic simulations?\n");
        print_return_to_menu_option();
        printf("1. Yes, show every move\n");
        printf("2. No, show only results and summaries\n");

        if (!read_int_or_exit("Option: ", &board_option))
        {
            print_warning("Invalid input.\n");
            continue;
        }

        if (board_option == 0)
        {
            return 0;
        }

        if (board_option == 1)
        {
            automatic_show_board = 1;
            return 1;
        }

        if (board_option == 2)
        {
            automatic_show_board = 0;
            return 1;
        }

        print_warning("Invalid option.\n");
    }
}

// Permite escolher melhor de 3 ou melhor de 5.
int choose_series_length(void)
{
    int option;

    while (1)
    {
        print_title("\nChoose the series type:\n");
        print_return_to_menu_option();
        printf("3. Best of 3, first to 2 wins\n");
        printf("5. Best of 5, first to 3 wins\n");
        print_warning("Draws do not count as wins.\n");

        if (!read_int_or_exit("Option: ", &option))
        {
            print_warning("Invalid input.\n");
            continue;
        }

        if (option == 0 || option == 3 || option == 5)
        {
            return option;
        }

        print_warning("Invalid option.\n");
    }
}

// Permite escolher o modo da serie.
int choose_series_mode(void)
{
    int option;

    while (1)
    {
        print_title("\nChoose the series mode:\n");
        print_return_to_menu_option();
        printf("1. Player vs Player\n");
        printf("2. Player vs Computer\n");
        printf("3. Computer vs Computer\n");

        if (!read_int_or_exit("Option: ", &option))
        {
            print_warning("Invalid input.\n");
            continue;
        }

        if (option >= 0 && option <= 3)
        {
            return option;
        }

        print_warning("Invalid option.\n");
    }
}
