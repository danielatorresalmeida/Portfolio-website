#include "tictactoe.h"

// Funcoes relacionadas com cores no terminal.

// Devolve a cor associada a um simbolo do jogo.
const char *get_symbol_color(char symbol)
{
    if (symbol == 'X')
    {
        return COLOR_PLAYER_X;
    }

    if (symbol == 'O')
    {
        return COLOR_PLAYER_O;
    }

    return COLOR_RESET;
}

// Mostra um simbolo do tabuleiro com a cor correta.
void print_symbol_colored(char symbol)
{
    if (symbol == 'X' || symbol == 'O')
    {
        printf("%s%c%s", get_symbol_color(symbol), symbol, COLOR_RESET);
    }
    else
    {
        printf("%c", symbol);
    }
}

// Mantem compatibilidade com o nome usado pelo tabuleiro.
void print_colored_symbol(char symbol)
{
    print_symbol_colored(symbol);
}

// Mostra uma mensagem de sucesso.
void print_success(const char text[])
{
    printf("%s%s%s", COLOR_WIN, text, COLOR_RESET);
}

// Mostra uma mensagem de aviso.
void print_warning(const char text[])
{
    printf("%s%s%s", COLOR_WARNING, text, COLOR_RESET);
}

// Mostra uma mensagem de erro.
void print_error(const char text[])
{
    printf("%s%s%s", COLOR_LOSS, text, COLOR_RESET);
}

// Mostra um titulo ou cabecalho de menu.
void print_title(const char text[])
{
    printf("%s%s%s%s", COLOR_BOLD, COLOR_TITLE, text, COLOR_RESET);
}

// Mostra prompts de nomes mantendo a entrada do utilizador na cor normal.
void print_player_prompt(const char label[], char symbol)
{
    printf("%s (", label);
    print_symbol_colored(symbol);
    printf("): %s", COLOR_RESET);
}

// Mostra a opcao padrao de voltar ao menu.
void print_return_to_menu_option(void)
{
    print_warning("0. Return to main menu\n");
}
