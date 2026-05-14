#include "tictactoe.h"

// Funcoes relacionadas com ranking.

// Atualiza o ranking geral com uma vitoria.
void update_ranking(char winner_name[])
{
    struct RankingEntry ranking[MAX_RANKING_PLAYERS];
    int count = load_ranking(ranking, MAX_RANKING_PLAYERS);
    int found = 0;

    if (winner_name[0] == '\0')
    {
        return;
    }

    for (int i = 0; i < count; i++)
    {
        if (strcmp(ranking[i].name, winner_name) == 0)
        {
            ranking[i].wins++;
            found = 1;
            break;
        }
    }

    if (!found && count < MAX_RANKING_PLAYERS)
    {
        strncpy(ranking[count].name, winner_name, NAME_SIZE - 1);
        ranking[count].name[NAME_SIZE - 1] = '\0';
        ranking[count].wins = 1;
        count++;
    }

    save_ranking(ranking, count);
}

// Carrega o ranking a partir do ficheiro.
int load_ranking(struct RankingEntry ranking[], int max_entries)
{
    FILE *file = fopen(RANKING_FILE, "r");
    char line[150];
    int count = 0;

    if (file == NULL)
    {
        return 0;
    }

    while (count < max_entries && fgets(line, sizeof(line), file) != NULL)
    {
        char *separator;
        int wins;

        remove_newline(line);
        separator = strrchr(line, ';');

        if (separator == NULL)
        {
            continue;
        }

        *separator = '\0';
        wins = atoi(separator + 1);

        if (line[0] == '\0')
        {
            continue;
        }

        strncpy(ranking[count].name, line, NAME_SIZE - 1);
        ranking[count].name[NAME_SIZE - 1] = '\0';
        ranking[count].wins = wins;
        count++;
    }

    fclose(file);
    return count;
}

// Guarda o ranking no ficheiro.
void save_ranking(struct RankingEntry ranking[], int count)
{
    FILE *file = fopen(RANKING_FILE, "w");

    if (file == NULL)
    {
        print_warning("Could not save the ranking.\n");
        return;
    }

    for (int i = 0; i < count; i++)
    {
        fprintf(file, "%s;%d\n", ranking[i].name, ranking[i].wins);
    }

    fclose(file);
}

// Mostra o ranking geral.
void print_ranking(void)
{
    struct RankingEntry ranking[MAX_RANKING_PLAYERS];
    int count = load_ranking(ranking, MAX_RANKING_PLAYERS);

    for (int i = 0; i < count - 1; i++)
    {
        for (int j = i + 1; j < count; j++)
        {
            if (ranking[j].wins > ranking[i].wins)
            {
                struct RankingEntry temp = ranking[i];
                ranking[i] = ranking[j];
                ranking[j] = temp;
            }
        }
    }

    printf("%s%s\n=== OVERALL RANKING ===%s\n", COLOR_BOLD, COLOR_TITLE, COLOR_RESET);

    if (count == 0)
    {
        print_warning("There are no saved wins yet.\n");
        return;
    }

    for (int i = 0; i < count; i++)
    {
        if (i == 0)
        {
            printf("%s%d. %s - %d wins%s\n", COLOR_WIN, i + 1, ranking[i].name, ranking[i].wins, COLOR_RESET);
        }
        else
        {
            printf("%d. %s - %d wins\n", i + 1, ranking[i].name, ranking[i].wins);
        }
    }
}
