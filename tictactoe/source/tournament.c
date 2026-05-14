#include "tictactoe.h"

// Funcoes relacionadas com tournament.

// Inicia o torneio com 4 jogadores humanos.
void play_tournament(void)
{
    char players[4][NAME_SIZE];
    char match_names[3][NAME_SIZE] = {"Semi-final 1", "Semi-final 2", "Final"};
    char match_player1[3][NAME_SIZE];
    char match_player2[3][NAME_SIZE];
    char match_winner[3][NAME_SIZE];
    char match_loser[3][NAME_SIZE];
    char champion[NAME_SIZE];
    char filename[120];
    int size;
    int winner1;
    int winner2;
    int final_winner;
    int result;

    print_title("=== 4-PLAYER TOURNAMENT ===\n");
    print_warning("Type 0 as the name to return to the main menu.\n");

    for (int i = 0; i < 4; i++)
    {
        printf("Player %d name: ", i + 1);
        if (!read_name(players[i]))
        {
            return;
        }
    }

    size = choose_size();
    if (size == 0)
    {
        return;
    }

    current_win_length = choose_victory_length(size);
    if (current_win_length == 0)
    {
        return;
    }

    strcpy(match_player1[0], players[0]);
    strcpy(match_player2[0], players[1]);
    printf("%s\nSemi-final 1:%s %s vs %s\n", COLOR_TITLE, COLOR_RESET, players[0], players[1]);
    result = play_until_winner_generic(players[0], players[1], 0, 0, DIFFICULTY_EASY, DIFFICULTY_EASY, size);
    if (result == RETURN_TO_MENU)
    {
        return;
    }
    winner1 = result == 1 ? 0 : 1;
    strcpy(match_winner[0], players[winner1]);
    strcpy(match_loser[0], players[winner1 == 0 ? 1 : 0]);

    strcpy(match_player1[1], players[2]);
    strcpy(match_player2[1], players[3]);
    printf("%s\nSemi-final 2:%s %s vs %s\n", COLOR_TITLE, COLOR_RESET, players[2], players[3]);
    result = play_until_winner_generic(players[2], players[3], 0, 0, DIFFICULTY_EASY, DIFFICULTY_EASY, size);
    if (result == RETURN_TO_MENU)
    {
        return;
    }
    winner2 = result == 1 ? 2 : 3;
    strcpy(match_winner[1], players[winner2]);
    strcpy(match_loser[1], players[winner2 == 2 ? 3 : 2]);

    strcpy(match_player1[2], players[winner1]);
    strcpy(match_player2[2], players[winner2]);
    printf("%s\nFinal:%s %s vs %s\n", COLOR_TITLE, COLOR_RESET, players[winner1], players[winner2]);
    result = play_until_winner_generic(players[winner1], players[winner2], 0, 0, DIFFICULTY_EASY, DIFFICULTY_EASY, size);
    if (result == RETURN_TO_MENU)
    {
        return;
    }
    final_winner = result == 1 ? winner1 : winner2;
    strcpy(match_winner[2], players[final_winner]);
    strcpy(match_loser[2], players[final_winner == winner1 ? winner2 : winner1]);
    strcpy(champion, players[final_winner]);

    printf("%s\nTournament champion: %s%s\n", COLOR_WIN, champion, COLOR_RESET);
    print_tournament4_summary("FINAL SUMMARY OF THE 4-PLAYER TOURNAMENT", match_names, match_player1, match_player2, match_winner, match_loser, 3, champion);
    create_timestamped_filename("summary_4_player_tournament", "txt", filename, sizeof(filename));
    save_tournament4_summary_to_file(filename, "FINAL SUMMARY OF THE 4-PLAYER TOURNAMENT", match_names, match_player1, match_player2, match_winner, match_loser, 3, champion);
}

// Inicia o torneio automatico com 4 computadores.
void play_computer_tournament(void)
{
    char players[4][NAME_SIZE];
    int difficulties[4];
    char match_names[3][NAME_SIZE] = {"Semi-final 1", "Semi-final 2", "Final"};
    char match_player1[3][NAME_SIZE];
    char match_player2[3][NAME_SIZE];
    char match_winner[3][NAME_SIZE];
    char match_loser[3][NAME_SIZE];
    char champion_name[NAME_SIZE];
    char filename[120];
    int mode;
    int size;
    int result;
    int winner1;
    int winner2;
    int champion;

    print_title("=== AUTOMATIC TEST OF THE 4-COMPUTER TOURNAMENT ===\n");
    print_warning("During automatic games, try pressing Q or ESC to quit.\n");

    mode = choose_computer_tournament_mode();
    if (mode == 0)
    {
        return;
    }

    for (int i = 0; i < 4; i++)
    {
        snprintf(players[i], NAME_SIZE, "Computer %d", i + 1);
    }

    for (int i = 0; i < 4; i++)
    {
        if (mode == 1)
        {
            difficulties[i] = DIFFICULTY_EASY;
        }
        else if (mode == 2)
        {
            difficulties[i] = DIFFICULTY_MEDIUM;
        }
        else if (mode == 3)
        {
            difficulties[i] = DIFFICULTY_HARD;
        }
        else
        {
            difficulties[i] = (i % 2 == 0) ? DIFFICULTY_EASY : DIFFICULTY_HARD;
        }
    }

    size = choose_size();
    if (size == 0)
    {
        return;
    }

    current_win_length = choose_victory_length(size);
    if (current_win_length == 0)
    {
        return;
    }

    if (!configure_automatic_options())
    {
        return;
    }

    strcpy(match_player1[0], players[0]);
    strcpy(match_player2[0], players[1]);
    printf("%s\nSemi-final 1:%s %s vs %s\n", COLOR_TITLE, COLOR_RESET, players[0], players[1]);
    result = play_until_winner_generic(players[0], players[1], 1, 1, difficulties[0], difficulties[1], size);
    winner1 = result == 1 ? 0 : 1;
    strcpy(match_winner[0], players[winner1]);
    strcpy(match_loser[0], players[winner1 == 0 ? 1 : 0]);

    strcpy(match_player1[1], players[2]);
    strcpy(match_player2[1], players[3]);
    printf("%s\nSemi-final 2:%s %s vs %s\n", COLOR_TITLE, COLOR_RESET, players[2], players[3]);
    result = play_until_winner_generic(players[2], players[3], 1, 1, difficulties[2], difficulties[3], size);
    winner2 = result == 1 ? 2 : 3;
    strcpy(match_winner[1], players[winner2]);
    strcpy(match_loser[1], players[winner2 == 2 ? 3 : 2]);

    strcpy(match_player1[2], players[winner1]);
    strcpy(match_player2[2], players[winner2]);
    printf("%s\nFinal:%s %s vs %s\n", COLOR_TITLE, COLOR_RESET, players[winner1], players[winner2]);
    result = play_until_winner_generic(players[winner1], players[winner2], 1, 1, difficulties[winner1], difficulties[winner2], size);
    champion = result == 1 ? winner1 : winner2;
    strcpy(match_winner[2], players[champion]);
    strcpy(match_loser[2], players[champion == winner1 ? winner2 : winner1]);
    strcpy(champion_name, players[champion]);

    printf("%s\nChampion of the automatic 4-computer tournament: %s%s\n", COLOR_WIN, champion_name, COLOR_RESET);
    print_tournament4_summary("FINAL SUMMARY OF THE 4-COMPUTER TOURNAMENT", match_names, match_player1, match_player2, match_winner, match_loser, 3, champion_name);
    create_timestamped_filename("summary_4_computer_tournament", "txt", filename, sizeof(filename));
    save_tournament4_summary_to_file(filename, "FINAL SUMMARY OF THE 4-COMPUTER TOURNAMENT", match_names, match_player1, match_player2, match_winner, match_loser, 3, champion_name);
}

// Inicia o torneio de dupla eliminacao com 8 jogadores.
void play_double_elimination_tournament(void)
{
    char players[8][NAME_SIZE];
    int difficulties[8] = {0};
    char filename[120];
    int size;
    int winner_m1;
    int winner_m2;
    int winner_m3;
    int winner_m4;
    int winner_m5;
    int winner_m6;
    int winner_m7;
    int winner_m8;
    int winner_m9;
    int winner_m10;
    int winner_m11;
    int winner_m12;
    int winner_m13;
    int winner_m14;
    int winner_m15;
    int loser_m1;
    int loser_m2;
    int loser_m3;
    int loser_m4;
    int loser_m5;
    int loser_m6;
    int loser_m7;
    int loser_m14;
    int eliminated;

    print_title("=== 8-PLAYER DOUBLE ELIMINATION TOURNAMENT ===\n");
    print_warning("Type 0 as the name to return to the main menu.\n");

    clear_tournament_results();

    for (int i = 0; i < 8; i++)
    {
        printf("Player %d name: ", i + 1);
        if (!read_name(players[i]))
        {
            return;
        }
    }

    size = choose_size();
    if (size == 0)
    {
        return;
    }

    current_win_length = choose_victory_length(size);
    if (current_win_length == 0)
    {
        return;
    }

    printf("%s\nUPPER BRACKET%s\n", COLOR_TITLE, COLOR_RESET);
    winner_m1 = play_match_8(players, difficulties, 0, 1, size, 1, &loser_m1, 0);
    if (winner_m1 == RETURN_TO_MENU) { return; }
    winner_m2 = play_match_8(players, difficulties, 2, 3, size, 2, &loser_m2, 0);
    if (winner_m2 == RETURN_TO_MENU) { return; }
    winner_m3 = play_match_8(players, difficulties, 4, 5, size, 3, &loser_m3, 0);
    if (winner_m3 == RETURN_TO_MENU) { return; }
    winner_m4 = play_match_8(players, difficulties, 6, 7, size, 4, &loser_m4, 0);
    if (winner_m4 == RETURN_TO_MENU) { return; }
    winner_m5 = play_match_8(players, difficulties, winner_m1, winner_m2, size, 5, &loser_m5, 0);
    if (winner_m5 == RETURN_TO_MENU) { return; }
    winner_m6 = play_match_8(players, difficulties, winner_m3, winner_m4, size, 6, &loser_m6, 0);
    if (winner_m6 == RETURN_TO_MENU) { return; }
    winner_m7 = play_match_8(players, difficulties, winner_m5, winner_m6, size, 7, &loser_m7, 0);
    if (winner_m7 == RETURN_TO_MENU) { return; }

    printf("%s\nLOWER BRACKET%s\n", COLOR_TITLE, COLOR_RESET);
    winner_m8 = play_match_8(players, difficulties, loser_m1, loser_m2, size, 8, &eliminated, 0);
    if (winner_m8 == RETURN_TO_MENU) { return; }
    winner_m9 = play_match_8(players, difficulties, loser_m3, loser_m4, size, 9, &eliminated, 0);
    if (winner_m9 == RETURN_TO_MENU) { return; }
    winner_m10 = play_match_8(players, difficulties, winner_m8, loser_m5, size, 10, &eliminated, 0);
    if (winner_m10 == RETURN_TO_MENU) { return; }
    winner_m11 = play_match_8(players, difficulties, winner_m9, loser_m6, size, 11, &eliminated, 0);
    if (winner_m11 == RETURN_TO_MENU) { return; }
    winner_m12 = play_match_8(players, difficulties, winner_m10, winner_m11, size, 12, &eliminated, 0);
    if (winner_m12 == RETURN_TO_MENU) { return; }
    winner_m13 = play_match_8(players, difficulties, winner_m12, loser_m7, size, 13, &eliminated, 0);
    if (winner_m13 == RETURN_TO_MENU) { return; }

    printf("%s\nGRAND FINAL%s\n", COLOR_TITLE, COLOR_RESET);
    winner_m14 = play_match_8(players, difficulties, winner_m7, winner_m13, size, 14, &loser_m14, 0);
    if (winner_m14 == RETURN_TO_MENU) { return; }

    if (winner_m14 == winner_m13)
    {
        print_warning("\nThe lower bracket winner won the Grand Final. Match 15 will be played.\n");
        winner_m15 = play_match_8(players, difficulties, winner_m7, winner_m13, size, 15, &eliminated, 0);
        if (winner_m15 == RETURN_TO_MENU) { return; }
        printf("%s\nTournament champion: %s%s\n", COLOR_WIN, players[winner_m15], COLOR_RESET);
        print_tournament_summary(players[winner_m15]);
        create_timestamped_filename("summary_8_player_double_elimination", "txt", filename, sizeof(filename));
        save_tournament_summary_to_file(filename, players[winner_m15]);
    }
    else
    {
        printf("%s\nTournament champion: %s%s\n", COLOR_WIN, players[winner_m14], COLOR_RESET);
        print_tournament_summary(players[winner_m14]);
        create_timestamped_filename("summary_8_player_double_elimination", "txt", filename, sizeof(filename));
        save_tournament_summary_to_file(filename, players[winner_m14]);
    }

    (void) loser_m14;
}

// Inicia o torneio automatico de dupla eliminacao com 8 computadores.
void play_computer_double_elimination_tournament(void)
{
    char players[8][NAME_SIZE];
    int difficulties[8];
    char filename[120];
    int mode;
    int size;
    int winner_m1;
    int winner_m2;
    int winner_m3;
    int winner_m4;
    int winner_m5;
    int winner_m6;
    int winner_m7;
    int winner_m8;
    int winner_m9;
    int winner_m10;
    int winner_m11;
    int winner_m12;
    int winner_m13;
    int winner_m14;
    int winner_m15;
    int loser_m1;
    int loser_m2;
    int loser_m3;
    int loser_m4;
    int loser_m5;
    int loser_m6;
    int loser_m7;
    int loser_m14;
    int eliminated;

    print_title("=== AUTOMATIC TEST OF THE 8-COMPUTER DOUBLE ELIMINATION TOURNAMENT ===\n");
    print_warning("During automatic games, try pressing Q or ESC to quit.\n");

    mode = choose_computer_tournament_mode();
    if (mode == 0)
    {
        return;
    }

    for (int i = 0; i < 8; i++)
    {
        snprintf(players[i], NAME_SIZE, "Computer %d", i + 1);

        if (mode == 1)
        {
            difficulties[i] = DIFFICULTY_EASY;
        }
        else if (mode == 2)
        {
            difficulties[i] = DIFFICULTY_MEDIUM;
        }
        else if (mode == 3)
        {
            difficulties[i] = DIFFICULTY_HARD;
        }
        else
        {
            difficulties[i] = (i % 2 == 0) ? DIFFICULTY_EASY : DIFFICULTY_HARD;
        }
    }

    size = choose_size();
    if (size == 0)
    {
        return;
    }

    current_win_length = choose_victory_length(size);
    if (current_win_length == 0)
    {
        return;
    }

    if (!configure_automatic_options())
    {
        return;
    }

    clear_tournament_results();

    printf("%s\nUPPER BRACKET%s\n", COLOR_TITLE, COLOR_RESET);
    winner_m1 = play_match_8(players, difficulties, 0, 1, size, 1, &loser_m1, 1);
    winner_m2 = play_match_8(players, difficulties, 2, 3, size, 2, &loser_m2, 1);
    winner_m3 = play_match_8(players, difficulties, 4, 5, size, 3, &loser_m3, 1);
    winner_m4 = play_match_8(players, difficulties, 6, 7, size, 4, &loser_m4, 1);
    winner_m5 = play_match_8(players, difficulties, winner_m1, winner_m2, size, 5, &loser_m5, 1);
    winner_m6 = play_match_8(players, difficulties, winner_m3, winner_m4, size, 6, &loser_m6, 1);
    winner_m7 = play_match_8(players, difficulties, winner_m5, winner_m6, size, 7, &loser_m7, 1);

    printf("%s\nLOWER BRACKET%s\n", COLOR_TITLE, COLOR_RESET);
    winner_m8 = play_match_8(players, difficulties, loser_m1, loser_m2, size, 8, &eliminated, 1);
    winner_m9 = play_match_8(players, difficulties, loser_m3, loser_m4, size, 9, &eliminated, 1);
    winner_m10 = play_match_8(players, difficulties, winner_m8, loser_m5, size, 10, &eliminated, 1);
    winner_m11 = play_match_8(players, difficulties, winner_m9, loser_m6, size, 11, &eliminated, 1);
    winner_m12 = play_match_8(players, difficulties, winner_m10, winner_m11, size, 12, &eliminated, 1);
    winner_m13 = play_match_8(players, difficulties, winner_m12, loser_m7, size, 13, &eliminated, 1);

    printf("%s\nGRAND FINAL%s\n", COLOR_TITLE, COLOR_RESET);
    winner_m14 = play_match_8(players, difficulties, winner_m7, winner_m13, size, 14, &loser_m14, 1);

    if (winner_m14 == winner_m13)
    {
        print_warning("\nThe lower bracket winner won the Grand Final. Match 15 will be played.\n");
        winner_m15 = play_match_8(players, difficulties, winner_m7, winner_m13, size, 15, &eliminated, 1);
        printf("%s\nAutomatic tournament champion: %s%s\n", COLOR_WIN, players[winner_m15], COLOR_RESET);
        print_tournament_summary(players[winner_m15]);
        create_timestamped_filename("summary_8_computer_double_elimination", "txt", filename, sizeof(filename));
        save_tournament_summary_to_file(filename, players[winner_m15]);
    }
    else
    {
        printf("%s\nAutomatic tournament champion: %s%s\n", COLOR_WIN, players[winner_m14], COLOR_RESET);
        print_tournament_summary(players[winner_m14]);
        create_timestamped_filename("summary_8_computer_double_elimination", "txt", filename, sizeof(filename));
        save_tournament_summary_to_file(filename, players[winner_m14]);
    }

    (void) loser_m14;
}

// Joga uma partida do torneio de 8 jogadores.
int play_match_8(char players[8][NAME_SIZE], int difficulties[8], int player1_index, int player2_index, int size, int match_number, int *loser_index, int automatic)
{
    int result;

    printf("%s\nMatch %d:%s %s vs %s\n", COLOR_TITLE, match_number, COLOR_RESET, players[player1_index], players[player2_index]);

    if (automatic)
    {
        result = play_until_winner_generic(players[player1_index], players[player2_index], 1, 1, difficulties[player1_index], difficulties[player2_index], size);
    }
    else
    {
        result = play_until_winner_generic(players[player1_index], players[player2_index], 0, 0, DIFFICULTY_EASY, DIFFICULTY_EASY, size);
    }

    if (result == RETURN_TO_MENU)
    {
        return RETURN_TO_MENU;
    }

    if (result == 1)
    {
        *loser_index = player2_index;
        save_tournament_result(match_number, players[player1_index], players[player2_index], players[player1_index], players[player2_index]);
        printf("%sWinner of Match %d: %s%s\n", COLOR_WIN, match_number, players[player1_index], COLOR_RESET);
        printf("%sEliminated/loser: %s%s\n", COLOR_LOSS, players[player2_index], COLOR_RESET);
        return player1_index;
    }

    *loser_index = player1_index;
    save_tournament_result(match_number, players[player1_index], players[player2_index], players[player2_index], players[player1_index]);
    printf("%sWinner of Match %d: %s%s\n", COLOR_WIN, match_number, players[player2_index], COLOR_RESET);
    printf("%sEliminated/loser: %s%s\n", COLOR_LOSS, players[player1_index], COLOR_RESET);
    return player2_index;
}

// Limpa o resumo do torneio de 8 jogadores.
void clear_tournament_results(void)
{
    for (int i = 0; i < MAX_TOURNAMENT_MATCHES; i++)
    {
        tournament_player1[i][0] = '\0';
        tournament_player2[i][0] = '\0';
        tournament_winner[i][0] = '\0';
        tournament_loser[i][0] = '\0';
        tournament_played[i] = 0;
    }
}

// Guarda o resultado de uma partida do torneio.
void save_tournament_result(int match_number, char player1[], char player2[], char winner[], char loser[])
{
    int index = match_number - 1;

    if (index < 0 || index >= MAX_TOURNAMENT_MATCHES)
    {
        return;
    }

    strcpy(tournament_player1[index], player1);
    strcpy(tournament_player2[index], player2);
    strcpy(tournament_winner[index], winner);
    strcpy(tournament_loser[index], loser);
    tournament_played[index] = 1;
}

// Mostra o resumo do torneio de 8 jogadores.
void print_tournament_summary(char champion[])
{
    printf("%s%s\n=== FINAL TOURNAMENT SUMMARY ===%s\n", COLOR_BOLD, COLOR_TITLE, COLOR_RESET);

    for (int i = 0; i < MAX_TOURNAMENT_MATCHES; i++)
    {
        if (!tournament_played[i])
        {
            continue;
        }

        if (i == 0)
        {
            printf("%s\nUpper bracket:%s\n", COLOR_TITLE, COLOR_RESET);
        }
        else if (i == 7)
        {
            printf("%s\nLower bracket:%s\n", COLOR_TITLE, COLOR_RESET);
        }
        else if (i == 13)
        {
            printf("%s\nGrand Final:%s\n", COLOR_TITLE, COLOR_RESET);
        }
        else if (i == 14)
        {
            printf("%s\nReset Final:%s\n", COLOR_TITLE, COLOR_RESET);
        }

        printf("Match %d: %s vs %s | %sWinner: %s%s | %sLoser: %s%s\n",
               i + 1,
               tournament_player1[i],
               tournament_player2[i],
               COLOR_WIN,
               tournament_winner[i],
               COLOR_RESET,
               COLOR_LOSS,
               tournament_loser[i],
               COLOR_RESET);
    }

    printf("%s\nFinal champion: %s%s\n", COLOR_WIN, champion, COLOR_RESET);
}

// Guarda o resumo do torneio de 8 jogadores num ficheiro.
void save_tournament_summary_to_file(char filename[], char champion[])
{
    FILE *file = fopen(filename, "w");

    if (file == NULL)
    {
        printf("%sCould not save the file %s.%s\n", COLOR_LOSS, filename, COLOR_RESET);
        return;
    }

    fprintf(file, "FINAL TOURNAMENT SUMMARY\n\n");

    for (int i = 0; i < MAX_TOURNAMENT_MATCHES; i++)
    {
        if (tournament_played[i])
        {
            fprintf(file, "Match %d: %s vs %s | Winner: %s | Loser: %s\n",
                    i + 1,
                    tournament_player1[i],
                    tournament_player2[i],
                    tournament_winner[i],
                    tournament_loser[i]);
        }
    }

    fprintf(file, "\nFinal champion: %s\n", champion);
    fclose(file);
    printf("%sFile saved successfully: %s%s\n", COLOR_WIN, filename, COLOR_RESET);
}

// Mostra o resumo do torneio de 4 jogadores.
void print_tournament4_summary(char title[], char match_names[3][NAME_SIZE], char match_player1[3][NAME_SIZE], char match_player2[3][NAME_SIZE], char match_winner[3][NAME_SIZE], char match_loser[3][NAME_SIZE], int match_count, char champion[])
{
    printf("%s%s\n=== %s ===%s\n", COLOR_BOLD, COLOR_TITLE, title, COLOR_RESET);

    for (int i = 0; i < match_count; i++)
    {
        printf("%s: %s vs %s | %sWinner: %s%s | %sLoser: %s%s\n",
               match_names[i],
               match_player1[i],
               match_player2[i],
               COLOR_WIN,
               match_winner[i],
               COLOR_RESET,
               COLOR_LOSS,
               match_loser[i],
               COLOR_RESET);
    }

    printf("%sFinal champion: %s%s\n", COLOR_WIN, champion, COLOR_RESET);
}

// Guarda o resumo do torneio de 4 jogadores num ficheiro.
void save_tournament4_summary_to_file(char filename[], char title[], char match_names[3][NAME_SIZE], char match_player1[3][NAME_SIZE], char match_player2[3][NAME_SIZE], char match_winner[3][NAME_SIZE], char match_loser[3][NAME_SIZE], int match_count, char champion[])
{
    FILE *file = fopen(filename, "w");

    if (file == NULL)
    {
        printf("%sCould not save the file %s.%s\n", COLOR_LOSS, filename, COLOR_RESET);
        return;
    }

    fprintf(file, "%s\n\n", title);

    for (int i = 0; i < match_count; i++)
    {
        fprintf(file, "%s: %s vs %s | Winner: %s | Loser: %s\n",
                match_names[i],
                match_player1[i],
                match_player2[i],
                match_winner[i],
                match_loser[i]);
    }

    fprintf(file, "\nFinal champion: %s\n", champion);
    fclose(file);
    printf("%sFile saved successfully: %s%s\n", COLOR_WIN, filename, COLOR_RESET);
}
