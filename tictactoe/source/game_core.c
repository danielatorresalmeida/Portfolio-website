#include "tictactoe.h"

// Funcoes relacionadas com game core.

// Cria uma partida nova e chama o ciclo principal do jogo.
int play_single_game(char player1[], char player2[], int player1_computer, int player2_computer, int difficulty1, int difficulty2, int size, int show_score)
{
    char board[MAX_SIZE][MAX_SIZE];
    int move_rows[MAX_MOVES];
    int move_cols[MAX_MOVES];
    char move_symbols[MAX_MOVES];
    int move_count = 0;
    int current_player = 0;

    init_board(board, size);

    return play_game_loop(board, move_rows, move_cols, move_symbols, &move_count, &current_player, player1, player2, player1_computer, player2_computer, difficulty1, difficulty2, size, show_score);
}

// Controla o ciclo principal de uma partida.
int play_game_loop(char board[MAX_SIZE][MAX_SIZE], int move_rows[MAX_MOVES], int move_cols[MAX_MOVES], char move_symbols[MAX_MOVES], int *move_count_ptr, int *current_player_ptr, char player1[], char player2[], int player1_computer, int player2_computer, int difficulty1, int difficulty2, int size, int show_score)
{
    int move_count = *move_count_ptr;
    int current_player = *current_player_ptr;
    int automatic_game = player1_computer && player2_computer;

    while (1)
    {
        int row = -1;
        int col = -1;
        char symbol;
        char other_symbol;
        int current_is_computer;
        int current_difficulty;
        int move_result;

        check_exit_key();
        symbol = current_player == 0 ? 'X' : 'O';
        other_symbol = current_player == 0 ? 'O' : 'X';
        current_is_computer = current_player == 0 ? player1_computer : player2_computer;
        current_difficulty = current_player == 0 ? difficulty1 : difficulty2;
        *move_count_ptr = move_count;
        *current_player_ptr = current_player;

        if (!automatic_game || automatic_show_board)
        {
            maybe_clear_screen();
            print_board(board, size);
        }

        if (current_is_computer)
        {
            computer_move(board, size, symbol, other_symbol, current_difficulty, move_count, &row, &col);

            if (!automatic_game || automatic_show_board)
            {
                if (current_player == 0)
                {
                    printf("%s (", player1);
                    print_symbol_colored(symbol);
                    printf(") played row %d, column %d.\n", row, col);
                }
                else
                {
                    printf("%s (", player2);
                    print_symbol_colored(symbol);
                    printf(") played row %d, column %d.\n", row, col);
                }
            }

            pause_if_automatic(automatic_game);
        }
        else
        {
            if (current_player == 0)
            {
                printf("%s (", player1);
                print_symbol_colored(symbol);
                printf("), make your move.\n");
            }
            else
            {
                printf("%s (", player2);
                print_symbol_colored(symbol);
                printf("), make your move.\n");
            }

            move_result = get_move(&row, &col, size);

            if (move_result == RETURN_TO_MENU)
            {
                print_warning("Returning to the main menu...\n");
                return RETURN_TO_MENU;
            }

            if (move_result == MOVE_SAVE)
            {
                save_game_to_file(SAVE_GAME_FILE, board, size, current_player, move_rows, move_cols, move_symbols, move_count, player1, player2, player1_computer, player2_computer, difficulty1, difficulty2);
                continue;
            }

            if (move_result == MOVE_UNDO)
            {
                if (move_count == 0)
                {
                    print_warning("There are no moves to undo yet.\n");
                }
                else
                {
                    move_count--;
                    board[move_rows[move_count]][move_cols[move_count]] = ' ';
                    current_player = 1 - current_player;
                    print_warning("Last move undone.\n");
                }
                continue;
            }

            if (move_result == MOVE_REPLAY)
            {
                show_replay(move_rows, move_cols, move_symbols, move_count, size, player1, player2);
                continue;
            }

            if (move_result == MOVE_HELP)
            {
                show_game_commands();
                continue;
            }

            if (!move_result)
            {
                print_warning("Invalid input. Try again.\n");
                continue;
            }

            if (row < 0 || row >= size || col < 0 || col >= size)
            {
                printf("%sPosition outside the board. Use values from 0 to %d.%s\n", COLOR_WARNING, size - 1, COLOR_RESET);
                continue;
            }

            if (is_forbidden_first_move(move_count, size, row, col))
            {
                print_warning("Special rule: the first move cannot be in the center of the board. Choose another position.\n");
                continue;
            }

            if (board[row][col] != ' ')
            {
                print_warning("Position already occupied. Try another one.\n");
                continue;
            }
        }

        if (row < 0 || col < 0)
        {
            print_game_result_summary(0, player1, player2, size, move_count);
            return 0;
        }

        board[row][col] = symbol;
        move_rows[move_count] = row;
        move_cols[move_count] = col;
        move_symbols[move_count] = symbol;
        move_count++;
        *move_count_ptr = move_count;

        if (check_winner(board, size))
        {
            if (!automatic_game || automatic_show_board)
            {
                maybe_clear_screen();
                print_board(board, size);
            }

            if (current_player == 0)
            {
                printf("%s%s won!%s\n", COLOR_WIN, player1, COLOR_RESET);
                update_ranking(player1);
            }
            else
            {
                printf("%s%s won!%s\n", COLOR_WIN, player2, COLOR_RESET);
                update_ranking(player2);
            }

            if (!automatic_game || automatic_show_board)
            {
                print_history(move_rows, move_cols, move_symbols, move_count, player1, player2);
            }

            print_game_result_summary(current_player + 1, player1, player2, size, move_count);

            if (!automatic_game && show_score && ask_replay())
            {
                show_replay(move_rows, move_cols, move_symbols, move_count, size, player1, player2);
            }

            if (show_score)
            {
                update_score(current_player + 1, player1, player2, 0);
            }

            return current_player + 1;
        }

        if (DEBUG_FORCED_DRAW)
        {
            debug_forced_draw(board, size);
        }

        if (is_forced_draw(board, size))
        {
            if (!is_draw(board, size))
            {
                if (!automatic_game || automatic_show_board)
                {
                    print_warning("Forced draw. Filling the rest of the board automatically...\n");
                }
                auto_fill_draw(board, size);
            }

            if (!automatic_game || automatic_show_board)
            {
                maybe_clear_screen();
                print_board(board, size);
                print_warning("Draw!\n");
                print_history(move_rows, move_cols, move_symbols, move_count, player1, player2);
            }
            else
            {
                print_warning("Draw!\n");
            }

            print_game_result_summary(0, player1, player2, size, move_count);

            if (!automatic_game && show_score && ask_replay())
            {
                show_replay(move_rows, move_cols, move_symbols, move_count, size, player1, player2);
            }

            if (show_score)
            {
                update_score(0, player1, player2, 0);
            }

            return 0;
        }

        current_player = 1 - current_player;
        *current_player_ptr = current_player;
    }
}

// Repete uma partida de torneio ate haver vencedor ou limite de empates.
int play_until_winner_generic(char player1[], char player2[], int player1_computer, int player2_computer, int difficulty1, int difficulty2, int size)
{
    int result;
    int draw_count = 0;
    int sorted_winner;

    while (1)
    {
        result = play_single_game(player1, player2, player1_computer, player2_computer, difficulty1, difficulty2, size, 0);

        if (result == RETURN_TO_MENU)
        {
            return RETURN_TO_MENU;
        }

        if (result != 0)
        {
            return result;
        }

        draw_count++;

        if (draw_count >= MAX_TOURNAMENT_DRAW_REPEATS)
        {
            sorted_winner = (rand() % 2) + 1;

            printf("%sThe match ended in a draw %d times in a row.%s\n", COLOR_WARNING, draw_count, COLOR_RESET);
            print_warning("To avoid an infinite loop in the tournament, this match winner will be randomly selected.\n");

            if (sorted_winner == 1)
            {
                printf("%sRandom winner: %s%s\n", COLOR_WIN, player1, COLOR_RESET);
                update_ranking(player1);
            }
            else
            {
                printf("%sRandom winner: %s%s\n", COLOR_WIN, player2, COLOR_RESET);
                update_ranking(player2);
            }

            return sorted_winner;
        }

        print_warning("Draw. Since the tournament needs a winner, the match will be repeated.\n");
        printf("%sConsecutive draws in this match: %d of %d.%s\n", COLOR_WARNING, draw_count, MAX_TOURNAMENT_DRAW_REPEATS, COLOR_RESET);
    }
}

// Atualiza e mostra a pontuacao acumulada.
void update_score(int winner, char player1[], char player2[], int reset)
{
    static int score[2] = {0, 0};

    if (reset)
    {
        score[0] = 0;
        score[1] = 0;
        return;
    }

    if (winner == 1)
    {
        score[0]++;
    }
    else if (winner == 2)
    {
        score[1]++;
    }

    printf("Score: %s=%d | %s=%d\n", player1, score[0], player2, score[1]);
}

// Pergunta se o utilizador quer jogar novamente.
int play_again(void)
{
    char answer;

    if (!read_char_or_exit("Play again? (y/n, or q to quit): ", &answer))
    {
        return 0;
    }

    if (answer == 'y' || answer == 'Y')
    {
        return 1;
    }

    return 0;
}

// Mostra o historico de jogadas.
void print_history(int move_rows[], int move_cols[], char move_symbols[], int move_count, char player1[], char player2[])
{
    print_title("\nMove history:\n");

    for (int i = 0; i < move_count; i++)
    {
        if (move_symbols[i] == 'X')
        {
            printf("%d. %s (", i + 1, player1);
            print_symbol_colored(move_symbols[i]);
            printf(") -> row %d, column %d\n", move_rows[i], move_cols[i]);
        }
        else
        {
            printf("%d. %s (", i + 1, player2);
            print_symbol_colored(move_symbols[i]);
            printf(") -> row %d, column %d\n", move_rows[i], move_cols[i]);
        }
    }

    printf("\n");
}

// Mostra o resumo final de uma partida.
void print_game_result_summary(int result, char player1[], char player2[], int size, int move_count)
{
    printf("%s%s\n=== GAME RESULT ===%s\n", COLOR_BOLD, COLOR_TITLE, COLOR_RESET);
    printf("Board: %dx%d\n", size, size);
    printf("Win rule: %d in a row\n", current_win_length);
    printf("Total real moves: %d\n", move_count);

    if (result == 1)
    {
        printf("%sWinner: %s%s\n", COLOR_WIN, player1, COLOR_RESET);
        printf("%sLoser: %s%s\n", COLOR_LOSS, player2, COLOR_RESET);
        printf("Winning symbol: ");
        print_symbol_colored('X');
        printf("\n");
    }
    else if (result == 2)
    {
        printf("%sWinner: %s%s\n", COLOR_WIN, player2, COLOR_RESET);
        printf("%sLoser: %s%s\n", COLOR_LOSS, player1, COLOR_RESET);
        printf("Winning symbol: ");
        print_symbol_colored('O');
        printf("\n");
    }
    else
    {
        printf("%sResult: Draw%s\n", COLOR_DRAW, COLOR_RESET);
    }
}

// Mostra o resumo final de uma serie.
void print_series_summary(char player1[], char player2[], int wins1, int wins2, int draws, int series_length)
{
    printf("%s%s\n=== FINAL SERIES SUMMARY ===%s\n", COLOR_BOLD, COLOR_TITLE, COLOR_RESET);
    printf("Series type: best of %d\n", series_length);
    printf("%s: %s%d wins%s\n", player1, COLOR_WIN, wins1, COLOR_RESET);
    printf("%s: %s%d wins%s\n", player2, COLOR_WIN, wins2, COLOR_RESET);
    printf("%sDraws: %d%s\n", COLOR_DRAW, draws, COLOR_RESET);

    if (wins1 > wins2)
    {
        printf("%sSeries winner: %s%s\n", COLOR_WIN, player1, COLOR_RESET);
        printf("%sSeries loser: %s%s\n", COLOR_LOSS, player2, COLOR_RESET);
    }
    else
    {
        printf("%sSeries winner: %s%s\n", COLOR_WIN, player2, COLOR_RESET);
        printf("%sSeries loser: %s%s\n", COLOR_LOSS, player1, COLOR_RESET);
    }
}

// Mostra a repeticao da partida usando o historico.
void show_replay(int move_rows[], int move_cols[], char move_symbols[], int move_count, int size, char player1[], char player2[])
{
    char replay_board[MAX_SIZE][MAX_SIZE];

    if (move_count == 0)
    {
        print_warning("There are no moves to replay yet.\n");
        return;
    }

    printf("%s%s\n=== GAME REPLAY ===%s\n", COLOR_BOLD, COLOR_TITLE, COLOR_RESET);
    init_board(replay_board, size);
    print_board(replay_board, size);

    for (int i = 0; i < move_count; i++)
    {
        replay_board[move_rows[i]][move_cols[i]] = move_symbols[i];

        if (move_symbols[i] == 'X')
        {
            printf("Move %d: %s (", i + 1, player1);
            print_symbol_colored(move_symbols[i]);
            printf(") -> row %d, column %d\n", move_rows[i], move_cols[i]);
        }
        else
        {
            printf("Move %d: %s (", i + 1, player2);
            print_symbol_colored(move_symbols[i]);
            printf(") -> row %d, column %d\n", move_rows[i], move_cols[i]);
        }

        print_board(replay_board, size);
    }
}

// Pergunta se o utilizador quer ver o replay.
int ask_replay(void)
{
    char answer;

    if (!read_char_or_exit("Watch the replay of this game? (y/n, or q to quit): ", &answer))
    {
        return 0;
    }

    return answer == 'y' || answer == 'Y';
}

// Guarda a partida atual num ficheiro.
int save_game_to_file(char filename[], char board[MAX_SIZE][MAX_SIZE], int size, int current_player, int move_rows[], int move_cols[], char move_symbols[], int move_count, char player1[], char player2[], int player1_computer, int player2_computer, int difficulty1, int difficulty2)
{
    FILE *file = fopen(filename, "w");

    if (file == NULL)
    {
        printf("%sCould not save the game to file %s.%s\n", COLOR_WARNING, filename, COLOR_RESET);
        return 0;
    }

    fprintf(file, "TICTACTOE_SAVE_V1\n");
    fprintf(file, "%d %d %d %d %d %d %d %d\n", size, current_win_length, current_player, move_count, player1_computer, player2_computer, difficulty1, difficulty2);
    fprintf(file, "%s\n", player1);
    fprintf(file, "%s\n", player2);

    for (int i = 0; i < size; i++)
    {
        for (int j = 0; j < size; j++)
        {
            fputc(board[i][j] == ' ' ? '.' : board[i][j], file);
        }
        fputc('\n', file);
    }

    for (int i = 0; i < move_count; i++)
    {
        fprintf(file, "%d %d %c\n", move_rows[i], move_cols[i], move_symbols[i]);
    }

    fclose(file);
    printf("%sGame saved successfully to: %s%s\n", COLOR_WIN, filename, COLOR_RESET);
    print_success("You can continue later using the option 'Load saved game'.\n");
    return 1;
}

// Carrega uma partida guardada de um ficheiro.
int load_game_from_file(char filename[], char board[MAX_SIZE][MAX_SIZE], int *size, int *current_player, int move_rows[], int move_cols[], char move_symbols[], int *move_count, char player1[], char player2[], int *player1_computer, int *player2_computer, int *difficulty1, int *difficulty2)
{
    FILE *file = fopen(filename, "r");
    char line[100];
    int win_length;

    if (file == NULL)
    {
        printf("%sCould not open file %s.%s\n", COLOR_WARNING, filename, COLOR_RESET);
        return 0;
    }

    if (fgets(line, sizeof(line), file) == NULL)
    {
        fclose(file);
        return 0;
    }

    remove_newline(line);

    if (strcmp(line, "TICTACTOE_SAVE_V1") != 0)
    {
        fclose(file);
        print_error("The saved game file is not valid.\n");
        return 0;
    }

    if (fscanf(file, "%d %d %d %d %d %d %d %d\n", size, &win_length, current_player, move_count, player1_computer, player2_computer, difficulty1, difficulty2) != 8)
    {
        fclose(file);
        print_error("Could not read the main saved game data.\n");
        return 0;
    }

    if (*size < 3 || *size > MAX_SIZE || win_length < 3 || win_length > *size || *move_count < 0 || *move_count > MAX_MOVES)
    {
        fclose(file);
        print_warning("The file contains invalid values.\n");
        return 0;
    }

    current_win_length = win_length;

    if (fgets(player1, NAME_SIZE, file) == NULL || fgets(player2, NAME_SIZE, file) == NULL)
    {
        fclose(file);
        print_warning("Could not read the player names.\n");
        return 0;
    }

    remove_newline(player1);
    remove_newline(player2);
    init_board(board, *size);

    for (int i = 0; i < *size; i++)
    {
        if (fgets(line, sizeof(line), file) == NULL)
        {
            fclose(file);
            print_error("Could not read the saved board.\n");
            return 0;
        }

        for (int j = 0; j < *size; j++)
        {
            if (line[j] == 'X' || line[j] == 'O')
            {
                board[i][j] = line[j];
            }
            else
            {
                board[i][j] = ' ';
            }
        }
    }

    for (int i = 0; i < *move_count; i++)
    {
        if (fscanf(file, "%d %d %c\n", &move_rows[i], &move_cols[i], &move_symbols[i]) != 3)
        {
            fclose(file);
            print_warning("Could not read the full move history.\n");
            return 0;
        }
    }

    fclose(file);
    printf("%sGame loaded successfully from: %s%s\n", COLOR_WIN, filename, COLOR_RESET);
    return 1;
}
