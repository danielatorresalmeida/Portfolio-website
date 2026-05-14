#include "tictactoe.h"

// Funcoes relacionadas com input.

// Le o nome de um jogador e aceita comandos especiais.
int read_name(char name[NAME_SIZE])
{
    char buffer[NAME_SIZE + 10];

    if (fgets(buffer, sizeof(buffer), stdin) == NULL)
    {
        strcpy(name, "Player");
        return 1;
    }

    remove_newline(buffer);

    if (is_exit_command(buffer))
    {
        exit_game_now();
    }

    if (strcmp(buffer, "0") == 0)
    {
        return 0;
    }

    if (buffer[0] == '\0')
    {
        strcpy(name, "Player");
        return 1;
    }

    strncpy(name, buffer, NAME_SIZE - 1);
    name[NAME_SIZE - 1] = '\0';

    return 1;
}

// Limpa caracteres que ficam no buffer de entrada.
void clear_buffer(void)
{
    int c;

    while ((c = getchar()) != '\n' && c != EOF)
    {
    }
}

// Remove o fim de linha de uma string.
void remove_newline(char text[])
{
    size_t length = strlen(text);

    if (length > 0 && text[length - 1] == '\n')
    {
        text[length - 1] = '\0';
    }
}

// Verifica se o texto introduzido e um comando para sair.
int is_exit_command(const char text[])
{
    char lower[100];
    size_t i;

    for (i = 0; i < sizeof(lower) - 1 && text[i] != '\0'; i++)
    {
        lower[i] = (char) tolower((unsigned char) text[i]);
    }

    lower[i] = '\0';

    if (strcmp(lower, "q") == 0 || strcmp(lower, "quit") == 0 || strcmp(lower, "exit") == 0 || strcmp(lower, "sair") == 0)
    {
        return 1;
    }

    return 0;
}

// Termina imediatamente o programa.
void exit_game_now(void)
{
    print_warning("\nExiting the game...\n");
    exit(0);
}

// Le um numero inteiro ou executa o comando de saida.
int read_int_or_exit(char prompt[], int *value)
{
    char buffer[100];
    char *end;
    long number;

    printf("%s", prompt);

    if (fgets(buffer, sizeof(buffer), stdin) == NULL)
    {
        return 0;
    }

    remove_newline(buffer);

    if (is_exit_command(buffer))
    {
        exit_game_now();
    }

    end = buffer;
    number = strtol(buffer, &end, 10);

    if (end == buffer)
    {
        return 0;
    }

    while (*end != '\0')
    {
        if (!isspace((unsigned char) *end))
        {
            return 0;
        }

        end++;
    }

    *value = (int) number;
    return 1;
}

// Le um caractere ou executa o comando de saida.
int read_char_or_exit(char prompt[], char *value)
{
    char buffer[100];

    printf("%s", prompt);

    if (fgets(buffer, sizeof(buffer), stdin) == NULL)
    {
        return 0;
    }

    remove_newline(buffer);

    if (is_exit_command(buffer))
    {
        exit_game_now();
    }

    if (buffer[0] == '\0')
    {
        return 0;
    }

    *value = buffer[0];
    return 1;
}

// Le uma jogada ou um comando especial durante a partida.
int read_move_value_or_command(char prompt[], int *value)
{
    char buffer[100];
    char *end;
    long number;

    printf("%s", prompt);

    if (fgets(buffer, sizeof(buffer), stdin) == NULL)
    {
        return 0;
    }

    remove_newline(buffer);

    if (is_exit_command(buffer))
    {
        exit_game_now();
    }

    if (strcmp(buffer, "s") == 0 || strcmp(buffer, "S") == 0)
    {
        return MOVE_SAVE;
    }

    if (strcmp(buffer, "m") == 0 || strcmp(buffer, "M") == 0)
    {
        return RETURN_TO_MENU;
    }

    if (strcmp(buffer, "h") == 0 || strcmp(buffer, "H") == 0)
    {
        return MOVE_HELP;
    }

    if (strcmp(buffer, "u") == 0 || strcmp(buffer, "U") == 0)
    {
        return MOVE_UNDO;
    }

    if (strcmp(buffer, "r") == 0 || strcmp(buffer, "R") == 0)
    {
        return MOVE_REPLAY;
    }

    end = buffer;
    number = strtol(buffer, &end, 10);

    if (end == buffer)
    {
        return 0;
    }

    while (*end != '\0')
    {
        if (!isspace((unsigned char) *end))
        {
            return 0;
        }

        end++;
    }

    *value = (int) number;
    return 1;
}

// Verifica se foi pressionada uma tecla de saida em modo automatico.
int exit_key_pressed(void)
{
#ifdef _WIN32
    if (_kbhit())
    {
        int key = _getch();

        if (key == 'q' || key == 'Q' || key == 27)
        {
            return 1;
        }
    }
#endif

    return 0;
}

// Sai do jogo se uma tecla de saida tiver sido pressionada.
void check_exit_key(void)
{
    if (exit_key_pressed())
    {
        exit_game_now();
    }
}

// Limpa o ecra se essa opcao estiver ativa.
void maybe_clear_screen(void)
{
    if (clear_screen_enabled)
    {
        printf("\033[2J\033[H");
        fflush(stdout);
    }
}

// Ativa ou desativa a limpeza automatica do ecra.
void toggle_clear_screen(void)
{
    clear_screen_enabled = !clear_screen_enabled;

    if (clear_screen_enabled)
    {
        print_success("Screen clearing enabled.\n");
    }
    else
    {
        print_warning("Screen clearing disabled.\n");
    }
}

// Faz uma pausa em milissegundos.
void wait_ms(int milliseconds)
{
    if (milliseconds <= 0)
    {
        return;
    }

#ifdef _WIN32
    Sleep((DWORD) milliseconds);
#else
    usleep((unsigned int) milliseconds * 1000U);
#endif
}

// Faz pausa entre jogadas automaticas, se necessario.
void pause_if_automatic(int automatic_game)
{
    if (automatic_game)
    {
        check_exit_key();
        wait_ms(automatic_delay_ms);
        check_exit_key();
    }
}
