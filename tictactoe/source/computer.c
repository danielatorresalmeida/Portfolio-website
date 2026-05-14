#include "tictactoe.h"

// Funcoes relacionadas com computer.

// Escolhe a jogada do computador de acordo com a dificuldade.
void computer_move(char board[MAX_SIZE][MAX_SIZE], int size, char computer_symbol, char opponent_symbol, int difficulty, int move_count, int *row, int *col)
{
    if (difficulty == DIFFICULTY_EASY)
    {
        computer_random_allowed_move(board, size, row, col, move_count == 0);
        return;
    }

    if (difficulty == DIFFICULTY_MEDIUM)
    {
        computer_medium_move(board, size, computer_symbol, opponent_symbol, move_count, row, col);
        return;
    }

    computer_hard_move(board, size, computer_symbol, opponent_symbol, move_count, row, col);
}

// Faz uma jogada aleatoria sem restricoes especiais.
void computer_random_move(char board[MAX_SIZE][MAX_SIZE], int size, int *row, int *col)
{
    computer_random_allowed_move(board, size, row, col, 0);
}

// Faz uma jogada aleatoria numa casa permitida.
void computer_random_allowed_move(char board[MAX_SIZE][MAX_SIZE], int size, int *row, int *col, int avoid_center)
{
    int empty_count = 0;
    int choice;
    int count = 0;

    for (int i = 0; i < size; i++)
    {
        for (int j = 0; j < size; j++)
        {
            if (board[i][j] == ' ')
            {
                if (!avoid_center || !is_center_position(size, i, j))
                {
                    empty_count++;
                }
            }
        }
    }

    if (empty_count == 0 && avoid_center)
    {
        computer_random_allowed_move(board, size, row, col, 0);
        return;
    }

    if (empty_count == 0)
    {
        *row = -1;
        *col = -1;
        return;
    }

    choice = rand() % empty_count;

    for (int i = 0; i < size; i++)
    {
        for (int j = 0; j < size; j++)
        {
            if (board[i][j] == ' ')
            {
                if (!avoid_center || !is_center_position(size, i, j))
                {
                    if (count == choice)
                    {
                        *row = i;
                        *col = j;
                        return;
                    }

                    count++;
                }
            }
        }
    }
}

// Faz a jogada do computador no nivel medio.
void computer_medium_move(char board[MAX_SIZE][MAX_SIZE], int size, char computer_symbol, char opponent_symbol, int move_count, int *row, int *col)
{
    if (find_winning_move(board, size, computer_symbol, row, col))
    {
        if (!is_forbidden_first_move(move_count, size, *row, *col))
        {
            return;
        }
    }

    if (find_winning_move(board, size, opponent_symbol, row, col))
    {
        if (!is_forbidden_first_move(move_count, size, *row, *col))
        {
            return;
        }
    }

    computer_random_allowed_move(board, size, row, col, move_count == 0);
}

// Faz a jogada do computador no nivel dificil.
void computer_hard_move(char board[MAX_SIZE][MAX_SIZE], int size, char computer_symbol, char opponent_symbol, int move_count, int *row, int *col)
{
    int best_score = -1000000000;
    int best_row = -1;
    int best_col = -1;

    if (find_winning_move(board, size, computer_symbol, row, col))
    {
        if (!is_forbidden_first_move(move_count, size, *row, *col))
        {
            return;
        }
    }

    if (find_winning_move(board, size, opponent_symbol, row, col))
    {
        if (!is_forbidden_first_move(move_count, size, *row, *col))
        {
            return;
        }
    }

    // No 3x3 classico, usa minimax para jogar de forma perfeita.
    if (size == 3 && current_win_length == 3)
    {
        if (find_minimax_move(board, size, computer_symbol, opponent_symbol, move_count, row, col))
        {
            return;
        }
    }

    for (int i = 0; i < size; i++)
    {
        for (int j = 0; j < size; j++)
        {
            if (board[i][j] == ' ' && !is_forbidden_first_move(move_count, size, i, j))
            {
                int score;

                board[i][j] = computer_symbol;
                score = (2 * evaluate_board_for_symbol(board, size, computer_symbol)) - evaluate_board_for_symbol(board, size, opponent_symbol);

                if (is_center_position(size, i, j))
                {
                    score += 5;
                }

                if ((i == 0 || i == size - 1) && (j == 0 || j == size - 1))
                {
                    score += 4;
                }

                board[i][j] = ' ';

                if (score > best_score)
                {
                    best_score = score;
                    best_row = i;
                    best_col = j;
                }
            }
        }
    }

    if (best_row != -1)
    {
        *row = best_row;
        *col = best_col;
        return;
    }

    computer_random_allowed_move(board, size, row, col, move_count == 0);
}

// Verifica se um simbolo especifico ganhou.
int check_winner_for_symbol(char board[MAX_SIZE][MAX_SIZE], int size, char symbol)
{
    int directions[4][2] =
    {
        {0, 1},
        {1, 0},
        {1, 1},
        {1, -1}
    };

    for (int row = 0; row < size; row++)
    {
        for (int col = 0; col < size; col++)
        {
            for (int d = 0; d < 4; d++)
            {
                int end_row = row + ((current_win_length - 1) * directions[d][0]);
                int end_col = col + ((current_win_length - 1) * directions[d][1]);
                int same = 1;

                if (end_row < 0 || end_row >= size || end_col < 0 || end_col >= size)
                {
                    continue;
                }

                for (int i = 0; i < current_win_length; i++)
                {
                    int check_row = row + (i * directions[d][0]);
                    int check_col = col + (i * directions[d][1]);

                    if (board[check_row][check_col] != symbol)
                    {
                        same = 0;
                        break;
                    }
                }

                if (same)
                {
                    return 1;
                }
            }
        }
    }

    return 0;
}

// Procura a melhor jogada usando minimax no 3x3.
int find_minimax_move(char board[MAX_SIZE][MAX_SIZE], int size, char computer_symbol, char opponent_symbol, int move_count, int *row, int *col)
{
    int best_score = -1000000;
    int found = 0;

    for (int i = 0; i < size; i++)
    {
        for (int j = 0; j < size; j++)
        {
            if (board[i][j] == ' ' && !is_forbidden_first_move(move_count, size, i, j))
            {
                int score;

                board[i][j] = computer_symbol;
                score = minimax_score(board, size, opponent_symbol, computer_symbol, opponent_symbol, move_count + 1, 0);
                board[i][j] = ' ';

                if (!found || score > best_score)
                {
                    best_score = score;
                    *row = i;
                    *col = j;
                    found = 1;
                }
            }
        }
    }

    return found;
}

// Calcula a pontuacao minimax de uma posicao.
int minimax_score(char board[MAX_SIZE][MAX_SIZE], int size, char turn_symbol, char computer_symbol, char opponent_symbol, int move_count, int depth)
{
    char next_symbol;

    if (check_winner_for_symbol(board, size, computer_symbol))
    {
        return 10 - depth;
    }

    if (check_winner_for_symbol(board, size, opponent_symbol))
    {
        return depth - 10;
    }

    if (is_draw(board, size))
    {
        return 0;
    }

    next_symbol = turn_symbol == 'X' ? 'O' : 'X';

    if (turn_symbol == computer_symbol)
    {
        int best_score = -1000000;

        for (int i = 0; i < size; i++)
        {
            for (int j = 0; j < size; j++)
            {
                if (board[i][j] == ' ' && !is_forbidden_first_move(move_count, size, i, j))
                {
                    int score;

                    board[i][j] = turn_symbol;
                    score = minimax_score(board, size, next_symbol, computer_symbol, opponent_symbol, move_count + 1, depth + 1);
                    board[i][j] = ' ';

                    if (score > best_score)
                    {
                        best_score = score;
                    }
                }
            }
        }

        return best_score;
    }
    else
    {
        int best_score = 1000000;

        for (int i = 0; i < size; i++)
        {
            for (int j = 0; j < size; j++)
            {
                if (board[i][j] == ' ' && !is_forbidden_first_move(move_count, size, i, j))
                {
                    int score;

                    board[i][j] = turn_symbol;
                    score = minimax_score(board, size, next_symbol, computer_symbol, opponent_symbol, move_count + 1, depth + 1);
                    board[i][j] = ' ';

                    if (score < best_score)
                    {
                        best_score = score;
                    }
                }
            }
        }

        return best_score;
    }
}

// Procura uma jogada que ganha imediatamente.
int find_winning_move(char board[MAX_SIZE][MAX_SIZE], int size, char symbol, int *row, int *col)
{
    for (int i = 0; i < size; i++)
    {
        for (int j = 0; j < size; j++)
        {
            if (board[i][j] == ' ')
            {
                board[i][j] = symbol;

                if (check_winner(board, size))
                {
                    board[i][j] = ' ';
                    *row = i;
                    *col = j;
                    return 1;
                }

                board[i][j] = ' ';
            }
        }
    }

    return 0;
}

// Avalia o tabuleiro para um simbolo.
int evaluate_board_for_symbol(char board[MAX_SIZE][MAX_SIZE], int size, char symbol)
{
    int directions[4][2] =
    {
        {0, 1},
        {1, 0},
        {1, 1},
        {1, -1}
    };
    int total = 0;

    for (int row = 0; row < size; row++)
    {
        for (int col = 0; col < size; col++)
        {
            for (int d = 0; d < 4; d++)
            {
                int end_row = row + ((current_win_length - 1) * directions[d][0]);
                int end_col = col + ((current_win_length - 1) * directions[d][1]);

                if (end_row >= 0 && end_row < size && end_col >= 0 && end_col < size)
                {
                    total += evaluate_segment_for_symbol(board, row, col, directions[d][0], directions[d][1], symbol);
                }
            }
        }
    }

    return total;
}

// Avalia um segmento para um simbolo.
int evaluate_segment_for_symbol(char board[MAX_SIZE][MAX_SIZE], int start_row, int start_col, int dir_row, int dir_col, char symbol)
{
    char opponent = symbol == 'X' ? 'O' : 'X';
    int count_symbol = 0;

    for (int i = 0; i < current_win_length; i++)
    {
        int row = start_row + (i * dir_row);
        int col = start_col + (i * dir_col);

        if (board[row][col] == opponent)
        {
            return 0;
        }

        if (board[row][col] == symbol)
        {
            count_symbol++;
        }
    }

    if (count_symbol == 0)
    {
        return 1;
    }

    return power_score(count_symbol);
}

// Calcula a pontuacao de uma sequencia.
int power_score(int count)
{
    int score = 1;

    for (int i = 0; i < count; i++)
    {
        score *= 10;
    }

    return score;
}

