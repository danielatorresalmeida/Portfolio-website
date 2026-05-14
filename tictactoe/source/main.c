#include "tictactoe.h"

// Ficheiro principal. Aqui fica apenas o menu principal e as chamadas principais.

// Funcao auxiliar do jogo.
int main(void)
{
    int option;

    srand((unsigned int) time(NULL));

    while (1)
    {
        show_menu();

        if (!read_int_or_exit("Option: ", &option))
        {
            print_warning("Invalid option.\n");
            continue;
        }

        switch (option)
        {
            case 0:
                show_rules();
                break;
            case 1:
                play_player_vs_player();
                break;
            case 2:
                play_vs_computer();
                break;
            case 3:
                play_computer_vs_computer();
                break;
            case 4:
                play_tournament();
                break;
            case 5:
                play_double_elimination_tournament();
                break;
            case 6:
                play_computer_tournament();
                break;
            case 7:
                play_computer_double_elimination_tournament();
                break;
            case 8:
                toggle_clear_screen();
                break;
            case 9:
                print_ranking();
                break;
            case 10:
                play_best_of_series();
                break;
            case 11:
                run_automatic_tests();
                break;
            case 12:
                play_loaded_game();
                break;
            case 13:
                print_success("Goodbye!\n");
                return 0;
            default:
                print_warning("Invalid option.\n");
                break;
        }
    }
}
