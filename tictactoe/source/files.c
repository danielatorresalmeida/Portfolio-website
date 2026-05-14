#include "tictactoe.h"

// Funcoes relacionadas com files.

// Mostra estatisticas de computador contra computador.
void print_computer_stats(char player1[], char player2[], int total_games, int wins1, int wins2, int draws)
{
    double percentage1 = ((double) wins1 / total_games) * 100.0;
    double percentage2 = ((double) wins2 / total_games) * 100.0;
    double percentage_draws = ((double) draws / total_games) * 100.0;

    printf("%s%s\n=== FINAL STATISTICS ===%s\n", COLOR_BOLD, COLOR_TITLE, COLOR_RESET);
    printf("Total games: %d\n", total_games);
    printf("%sWins by %s: %d (%.2f%%)%s\n", COLOR_WIN, player1, wins1, percentage1, COLOR_RESET);
    printf("%sWins by %s: %d (%.2f%%)%s\n", COLOR_WIN, player2, wins2, percentage2, COLOR_RESET);
    printf("%sDraws: %d (%.2f%%)%s\n", COLOR_DRAW, draws, percentage_draws, COLOR_RESET);
}

// Guarda estatisticas de computador contra computador num ficheiro.
void save_computer_stats_to_file(char filename[], char player1[], char player2[], int total_games, int wins1, int wins2, int draws)
{
    FILE *file = fopen(filename, "w");
    double percentage1 = ((double) wins1 / total_games) * 100.0;
    double percentage2 = ((double) wins2 / total_games) * 100.0;
    double percentage_draws = ((double) draws / total_games) * 100.0;

    if (file == NULL)
    {
        printf("%sCould not save the file %s.%s\n", COLOR_WARNING, filename, COLOR_RESET);
        return;
    }

    fprintf(file, "FINAL STATISTICS\n\n");
    fprintf(file, "Total games: %d\n", total_games);
    fprintf(file, "Wins by %s: %d (%.2f%%)\n", player1, wins1, percentage1);
    fprintf(file, "Wins by %s: %d (%.2f%%)\n", player2, wins2, percentage2);
    fprintf(file, "Draws: %d (%.2f%%)\n", draws, percentage_draws);

    fclose(file);
    printf("%sFile saved successfully: %s%s\n", COLOR_WIN, filename, COLOR_RESET);
}

// Cria um nome de ficheiro com data e hora.
void create_timestamped_filename(char base_name[], char extension[], char output[], size_t output_size)
{
    time_t now = time(NULL);
    struct tm *local_time = localtime(&now);
    char timestamp[32];

    if (local_time == NULL)
    {
        snprintf(output, output_size, "%s.%s", base_name, extension);
        return;
    }

    strftime(timestamp, sizeof(timestamp), "%Y%m%d_%H%M%S", local_time);
    snprintf(output, output_size, "%s_%s.%s", base_name, timestamp, extension);
}
