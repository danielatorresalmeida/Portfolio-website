#include "tictactoe.h"

// Guarda a regra de vitoria atual
int current_win_length = 3;

// Guarda se o ecra deve ser limpo entre jogadas
int clear_screen_enabled = 0;

// Guarda se o tabuleiro aparece nas simulacoes automaticas
int automatic_show_board = 1;

// Guarda a pausa entre jogadas automaticas
int automatic_delay_ms = 0;

// Guarda o resumo do torneio de dupla eliminacao
char tournament_player1[MAX_TOURNAMENT_MATCHES][NAME_SIZE];
char tournament_player2[MAX_TOURNAMENT_MATCHES][NAME_SIZE];
char tournament_winner[MAX_TOURNAMENT_MATCHES][NAME_SIZE];
char tournament_loser[MAX_TOURNAMENT_MATCHES][NAME_SIZE];
int tournament_played[MAX_TOURNAMENT_MATCHES];
