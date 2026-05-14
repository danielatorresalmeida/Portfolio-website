#include "tictactoe.h"

// Funcoes relacionadas com tests.

// Executa testes automaticos das funcoes principais.
void run_automatic_tests(void)
{
    char board[MAX_SIZE][MAX_SIZE];
    int old_win_length = current_win_length;
    int passed = 0;
    int total = 0;
    int row;
    int col;

    printf("%s%s\n=== AUTOMATIC TESTS ===%s\n", COLOR_BOLD, COLOR_TITLE, COLOR_RESET);
    printf("These tests check some of the main game functions.\n");
    current_win_length = 3;

    total++;
    init_board(board, 3);
    board[0][0] = 'X';
    board[0][1] = 'X';
    board[0][2] = 'X';
    if (check_winner(board, 3))
    {
        print_success("[OK] Horizontal win detected.\n");
        passed++;
    }
    else
    {
        print_error("[ERROR] Horizontal win not detected.\n");
    }

    total++;
    init_board(board, 3);
    board[0][1] = 'O';
    board[1][1] = 'O';
    board[2][1] = 'O';
    if (check_winner(board, 3))
    {
        print_success("[OK] Vertical win detected.\n");
        passed++;
    }
    else
    {
        print_error("[ERROR] Vertical win not detected.\n");
    }

    total++;
    init_board(board, 3);
    board[0][0] = 'X';
    board[1][1] = 'X';
    board[2][2] = 'X';
    if (check_winner(board, 3))
    {
        print_success("[OK] Diagonal win detected.\n");
        passed++;
    }
    else
    {
        print_error("[ERROR] Diagonal win not detected.\n");
    }

    total++;
    if (is_forbidden_first_move(0, 3, 1, 1) && !is_forbidden_first_move(1, 3, 1, 1))
    {
        print_success("[OK] First move center rule works.\n");
        passed++;
    }
    else
    {
        print_error("[ERROR] First move center rule failed.\n");
    }

    total++;
    init_board(board, 3);
    board[0][0] = 'X';
    board[0][1] = 'X';
    board[1][1] = 'O';
    computer_hard_move(board, 3, 'O', 'X', 3, &row, &col);
    if (row == 0 && col == 2)
    {
        print_success("[OK] Hard computer blocked an immediate 3x3 win.\n");
        passed++;
    }
    else
    {
        printf("%s[ERROR] Hard computer did not block as expected. It played %d,%d.%s\n", COLOR_LOSS, row, col, COLOR_RESET);
    }

    total++;
    init_board(board, 3);
    computer_random_allowed_move(board, 3, &row, &col, 1);
    if (row >= 0 && row < 3 && col >= 0 && col < 3 && !is_center_position(3, row, col))
    {
        print_success("[OK] Random computer chose a valid first move.\n");
        passed++;
    }
    else
    {
        print_error("[ERROR] Random computer chose an invalid move.\n");
    }

    current_win_length = old_win_length;
    printf("%s\nTest result: %d/%d passed.%s\n", passed == total ? COLOR_WIN : COLOR_WARNING, passed, total, COLOR_RESET);

    if (passed == total)
    {
        print_success("All automatic tests passed.\n");
    }
    else
    {
        print_error("Some tests failed. Review the functions listed above.\n");
    }
}
