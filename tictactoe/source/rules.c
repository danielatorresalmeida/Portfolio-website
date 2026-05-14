#include "tictactoe.h"

// Funcoes relacionadas com rules.

// Verifica se um segmento tem uma sequencia vencedora.
int check_segment_winner(char board[MAX_SIZE][MAX_SIZE], int start_row, int start_col, int dir_row, int dir_col)
{
    char first = board[start_row][start_col];

    if (first == ' ')
    {
        return 0;
    }

    for (int i = 1; i < current_win_length; i++)
    {
        int row = start_row + (i * dir_row);
        int col = start_col + (i * dir_col);

        if (board[row][col] != first)
        {
            return 0;
        }
    }

    return 1;
}

// Verifica se existe vencedor no tabuleiro.
int check_winner(char board[MAX_SIZE][MAX_SIZE], int size)
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

                if (end_row >= 0 && end_row < size && end_col >= 0 && end_col < size)
                {
                    if (check_segment_winner(board, row, col, directions[d][0], directions[d][1]))
                    {
                        return 1;
                    }
                }
            }
        }
    }

    return 0;
}

// Verifica se o tabuleiro esta cheio.
int is_draw(char board[MAX_SIZE][MAX_SIZE], int size)
{
    for (int i = 0; i < size; i++)
    {
        for (int j = 0; j < size; j++)
        {
            if (board[i][j] == ' ')
            {
                return 0;
            }
        }
    }

    return 1;
}

// Verifica se um segmento ainda pode ser ganho por um simbolo.
int segment_can_still_win(char board[MAX_SIZE][MAX_SIZE], int start_row, int start_col, int dir_row, int dir_col, char symbol)
{
    char opponent = symbol == 'X' ? 'O' : 'X';

    for (int i = 0; i < current_win_length; i++)
    {
        int row = start_row + (i * dir_row);
        int col = start_col + (i * dir_col);

        if (board[row][col] == opponent)
        {
            return 0;
        }
    }

    return 1;
}

// Verifica se um jogador ainda tem alguma forma possivel de ganhar.
int can_still_win(char board[MAX_SIZE][MAX_SIZE], int size, char symbol)
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

                if (end_row >= 0 && end_row < size && end_col >= 0 && end_col < size)
                {
                    if (segment_can_still_win(board, row, col, directions[d][0], directions[d][1], symbol))
                    {
                        return 1;
                    }
                }
            }
        }
    }

    return 0;
}

// Verifica se o empate ja e inevitavel.
int is_forced_draw(char board[MAX_SIZE][MAX_SIZE], int size)
{
    if (check_winner(board, size))
    {
        return 0;
    }

    if (can_still_win(board, size, 'X'))
    {
        return 0;
    }

    if (can_still_win(board, size, 'O'))
    {
        return 0;
    }

    return 1;
}

// Mostra informacao de debug sobre empate inevitavel.
void debug_forced_draw(char board[MAX_SIZE][MAX_SIZE], int size)
{
    printf("\nFORCED DRAW CHECK\n");
    printf("Can ");
    print_symbol_colored('X');
    printf(" still win? %d\n", can_still_win(board, size, 'X'));
    printf("Can ");
    print_symbol_colored('O');
    printf(" still win? %d\n", can_still_win(board, size, 'O'));
    printf("Forced draw? %d\n\n", is_forced_draw(board, size));
}

// Preenche automaticamente o resto do tabuleiro em empate inevitavel.
void auto_fill_draw(char board[MAX_SIZE][MAX_SIZE], int size)
{
    char symbols[2] = {'X', 'O'};
    int next = 0;

    for (int i = 0; i < size; i++)
    {
        for (int j = 0; j < size; j++)
        {
            if (board[i][j] == ' ')
            {
                board[i][j] = symbols[next];
                next = 1 - next;
            }
        }
    }
}
