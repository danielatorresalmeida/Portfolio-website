#include "tictactoe.h"

// Funcoes relacionadas com game modes.

// Inicia o modo jogador contra jogador.
void play_player_vs_player(void)
{
    char player1[NAME_SIZE];
    char player2[NAME_SIZE];
    int size;
    int result;

    print_warning("Type 0 as the name to return to the main menu.\n");

    print_player_prompt("Player 1 name", 'X');
    if (!read_name(player1))
    {
        return;
    }

    print_player_prompt("Player 2 name", 'O');
    if (!read_name(player2))
    {
        return;
    }

    size = choose_size();
    if (size == 0)
    {
        return;
    }

    current_win_length = choose_victory_length(size);
    if (current_win_length == 0)
    {
        return;
    }

    update_score(0, player1, player2, 1);

    while (1)
    {
        result = play_single_game(player1, player2, 0, 0, DIFFICULTY_EASY, DIFFICULTY_EASY, size, 1);

        if (result == RETURN_TO_MENU)
        {
            return;
        }

        if (!play_again())
        {
            break;
        }
    }
}

// Inicia o modo jogador contra computador.
void play_vs_computer(void)
{
    char player[NAME_SIZE];
    char computer[NAME_SIZE] = "Computer";
    int size;
    int difficulty;
    int result;

    print_warning("Type 0 as the name to return to the main menu.\n");
    print_player_prompt("Player name", 'X');

    if (!read_name(player))
    {
        return;
    }

    size = choose_size();
    if (size == 0)
    {
        return;
    }

    current_win_length = choose_victory_length(size);
    if (current_win_length == 0)
    {
        return;
    }

    difficulty = choose_difficulty("Computer");
    if (difficulty == RETURN_TO_MENU)
    {
        return;
    }

    update_score(0, player, computer, 1);

    while (1)
    {
        result = play_single_game(player, computer, 0, 1, DIFFICULTY_EASY, difficulty, size, 1);

        if (result == RETURN_TO_MENU)
        {
            return;
        }

        if (!play_again())
        {
            break;
        }
    }
}

// Inicia o modo computador contra computador.
void play_computer_vs_computer(void)
{
    char computer1[NAME_SIZE] = "Computer 1";
    char computer2[NAME_SIZE] = "Computer 2";
    char filename[120];
    int size;
    int difficulty1;
    int difficulty2;
    int games;
    int result;
    int wins1 = 0;
    int wins2 = 0;
    int draws = 0;

    print_title("=== COMPUTER VS COMPUTER ===\n");
    print_warning("During automatic games, try pressing Q or ESC to quit.\n");

    difficulty1 = choose_difficulty("Computer 1");
    if (difficulty1 == RETURN_TO_MENU)
    {
        return;
    }

    difficulty2 = choose_difficulty("Computer 2");
    if (difficulty2 == RETURN_TO_MENU)
    {
        return;
    }

    size = choose_size();
    if (size == 0)
    {
        return;
    }

    current_win_length = choose_victory_length(size);
    if (current_win_length == 0)
    {
        return;
    }

    if (!configure_automatic_options())
    {
        return;
    }

    while (1)
    {
        if (!read_int_or_exit("How many automatic games do you want to simulate (1 to 50, 0 for main menu, or q to quit): ", &games))
        {
            print_warning("Invalid input.\n");
            continue;
        }

        if (games == 0)
        {
            return;
        }

        if (games >= 1 && games <= 50)
        {
            break;
        }

        print_warning("Invalid number. Use a value between 1 and 50.\n");
    }

    for (int i = 0; i < games; i++)
    {
        check_exit_key();
        printf("%s\n=== AUTOMATIC GAME %d OF %d ===%s\n", COLOR_TITLE, i + 1, games, COLOR_RESET);
        result = play_single_game(computer1, computer2, 1, 1, difficulty1, difficulty2, size, 0);

        if (result == 1)
        {
            wins1++;
        }
        else if (result == 2)
        {
            wins2++;
        }
        else
        {
            draws++;
        }
    }

    print_computer_stats(computer1, computer2, games, wins1, wins2, draws);
    create_timestamped_filename("computer_vs_computer_stats", "txt", filename, sizeof(filename));
    save_computer_stats_to_file(filename, computer1, computer2, games, wins1, wins2, draws);
}

// Inicia o modo melhor de 3 ou melhor de 5.
void play_best_of_series(void)
{
    char player1[NAME_SIZE] = "Player 1";
    char player2[NAME_SIZE] = "Player 2";
    int player1_computer = 0;
    int player2_computer = 0;
    int difficulty1 = DIFFICULTY_EASY;
    int difficulty2 = DIFFICULTY_EASY;
    int mode;
    int size;
    int series_length;
    int wins_needed;
    int wins1 = 0;
    int wins2 = 0;
    int draws = 0;
    int consecutive_draws = 0;
    int result;

    print_title("\n=== BEST OF 3 / BEST OF 5 MODE ===\n");
    printf("Best of 3 means the first player to 2 wins wins the series.\n");
    printf("Best of 5 means the first player to 3 wins wins the series.\n");
    print_warning("Draws do not count as wins. The game is repeated.\n");

    mode = choose_series_mode();
    if (mode == 0)
    {
        return;
    }

    if (mode == 1)
    {
        print_warning("Type 0 as the name to return to the main menu.\n");
        print_player_prompt("Player 1 name", 'X');
        if (!read_name(player1))
        {
            return;
        }

        print_player_prompt("Player 2 name", 'O');
        if (!read_name(player2))
        {
            return;
        }
    }
    else if (mode == 2)
    {
        strcpy(player2, "Computer");
        player2_computer = 1;

        print_warning("Type 0 as the name to return to the main menu.\n");
        print_player_prompt("Player name", 'X');
        if (!read_name(player1))
        {
            return;
        }

        difficulty2 = choose_difficulty("Computer");
        if (difficulty2 == RETURN_TO_MENU)
        {
            return;
        }
    }
    else
    {
        strcpy(player1, "Computer 1");
        strcpy(player2, "Computer 2");
        player1_computer = 1;
        player2_computer = 1;

        difficulty1 = choose_difficulty("Computer 1");
        if (difficulty1 == RETURN_TO_MENU)
        {
            return;
        }

        difficulty2 = choose_difficulty("Computer 2");
        if (difficulty2 == RETURN_TO_MENU)
        {
            return;
        }

        if (!configure_automatic_options())
        {
            return;
        }
    }

    size = choose_size();
    if (size == 0)
    {
        return;
    }

    current_win_length = choose_victory_length(size);
    if (current_win_length == 0)
    {
        return;
    }

    series_length = choose_series_length();
    if (series_length == 0)
    {
        return;
    }

    wins_needed = (series_length / 2) + 1;

    while (wins1 < wins_needed && wins2 < wins_needed)
    {
        print_title("\n=== SERIES GAME ===\n");
        printf("Current score: %s %d - %d %s | %sDraws: %d%s\n", player1, wins1, wins2, player2, COLOR_DRAW, draws, COLOR_RESET);

        result = play_single_game(player1, player2, player1_computer, player2_computer, difficulty1, difficulty2, size, 0);

        if (result == RETURN_TO_MENU)
        {
            return;
        }

        if (result == 1)
        {
            wins1++;
            consecutive_draws = 0;
        }
        else if (result == 2)
        {
            wins2++;
            consecutive_draws = 0;
        }
        else
        {
            draws++;
            consecutive_draws++;

            if (consecutive_draws >= MAX_TOURNAMENT_DRAW_REPEATS)
            {
                int sorted_winner = (rand() % 2) + 1;
                printf("%sThe series had %d consecutive draws. To avoid a loop, the next win in this round will be randomly assigned.%s\n", COLOR_WARNING, consecutive_draws, COLOR_RESET);

                if (sorted_winner == 1)
                {
                    printf("%sRandom win assigned to: %s%s\n", COLOR_WIN, player1, COLOR_RESET);
                    wins1++;
                    update_ranking(player1);
                }
                else
                {
                    printf("%sRandom win assigned to: %s%s\n", COLOR_WIN, player2, COLOR_RESET);
                    wins2++;
                    update_ranking(player2);
                }

                consecutive_draws = 0;
            }
        }
    }

    print_series_summary(player1, player2, wins1, wins2, draws, series_length);
}

// Continua uma partida carregada do ficheiro.
void play_loaded_game(void)
{
    char board[MAX_SIZE][MAX_SIZE];
    int move_rows[MAX_MOVES];
    int move_cols[MAX_MOVES];
    char move_symbols[MAX_MOVES];
    char player1[NAME_SIZE];
    char player2[NAME_SIZE];
    int size;
    int current_player;
    int move_count;
    int player1_computer;
    int player2_computer;
    int difficulty1;
    int difficulty2;

    if (!load_game_from_file(SAVE_GAME_FILE, board, &size, &current_player, move_rows, move_cols, move_symbols, &move_count, player1, player2, &player1_computer, &player2_computer, &difficulty1, &difficulty2))
    {
        return;
    }

    print_title("\nLoaded game:\n");
    printf("Player 1 (");
    print_symbol_colored('X');
    printf("): %s\n", player1);
    printf("Player 2 (");
    print_symbol_colored('O');
    printf("): %s\n", player2);
    printf("Board: %dx%d\n", size, size);
    printf("Win rule: %d in a row\n", current_win_length);
    printf("Next player: %s\n", current_player == 0 ? player1 : player2);

    play_game_loop(board, move_rows, move_cols, move_symbols, &move_count, &current_player, player1, player2, player1_computer, player2_computer, difficulty1, difficulty2, size, 1);
}
