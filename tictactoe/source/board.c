#include "tictactoe.h"

// Funcoes relacionadas com board.

// Inicializa o tabuleiro com espacos vazios.
void init_board(char board[MAX_SIZE][MAX_SIZE], int size)
{
    for (int i = 0; i < size; i++)
    {
        for (int j = 0; j < size; j++)
        {
            board[i][j] = ' ';
        }
    }
}

// Mostra o tabuleiro com coordenadas e cores.
void print_board(char board[MAX_SIZE][MAX_SIZE], int size)
{
    printf("\n    ");

    // Mostra as coordenadas das colunas em ciano.
    for (int j = 0; j < size; j++)
    {
        printf("%s %d  %s", COLOR_COLUMN, j, COLOR_RESET);
    }

    printf("\n");

    for (int i = 0; i < size; i++)
    {
        printf("   ");

        // Mostra as linhas do tabuleiro com cor mais discreta.
        for (int j = 0; j < size; j++)
        {
            printf("%s---%s", COLOR_BOARD, COLOR_RESET);

            if (j < size - 1)
            {
                printf("%s+%s", COLOR_BOARD, COLOR_RESET);
            }
        }

        printf("\n");
        printf("%s %d %s", COLOR_ROW, i, COLOR_RESET);

        for (int j = 0; j < size; j++)
        {
            printf(" ");
            print_colored_symbol(board[i][j]);
            printf(" ");

            if (j < size - 1)
            {
                printf("%s|%s", COLOR_BOARD, COLOR_RESET);
            }
        }

        printf("\n");
    }

    printf("   ");

    for (int j = 0; j < size; j++)
    {
        printf("%s---%s", COLOR_BOARD, COLOR_RESET);

        if (j < size - 1)
        {
            printf("%s+%s", COLOR_BOARD, COLOR_RESET);
        }
    }

    printf("\n\n");
}

// Le a linha e a coluna da jogada.
int get_move(int *row, int *col, int size)
{
    char prompt[160];
    int result;

    snprintf(prompt, sizeof(prompt), "%sRow%s (0-%d, m menu, s save, u undo, r replay, h help, q quit): ", COLOR_ROW, COLOR_RESET, size - 1);
    result = read_move_value_or_command(prompt, row);

    if (result == MOVE_SAVE || result == MOVE_UNDO || result == MOVE_REPLAY || result == MOVE_HELP)
    {
        return result;
    }

    if (!result)
    {
        return 0;
    }

    if (*row == RETURN_TO_MENU)
    {
        return RETURN_TO_MENU;
    }

    snprintf(prompt, sizeof(prompt), "%sColumn%s (0-%d, m menu, s save, u undo, r replay, h help, q quit): ", COLOR_COLUMN, COLOR_RESET, size - 1);
    result = read_move_value_or_command(prompt, col);

    if (result == MOVE_SAVE || result == MOVE_UNDO || result == MOVE_REPLAY || result == MOVE_HELP)
    {
        return result;
    }

    if (!result)
    {
        return 0;
    }

    if (*col == RETURN_TO_MENU)
    {
        return RETURN_TO_MENU;
    }

    return 1;
}

// Verifica se uma posicao pertence ao centro do tabuleiro.
int is_center_position(int size, int row, int col)
{
    int center;
    int first_center;
    int second_center;

    if (size % 2 == 1)
    {
        center = size / 2;
        return row == center && col == center;
    }

    first_center = (size / 2) - 1;
    second_center = size / 2;

    if ((row == first_center || row == second_center) &&
        (col == first_center || col == second_center))
    {
        return 1;
    }

    return 0;
}

// Verifica se a primeira jogada tentou usar o centro.
int is_forbidden_first_move(int move_count, int size, int row, int col)
{
    if (move_count != 0)
    {
        return 0;
    }

    return is_center_position(size, row, col);
}
