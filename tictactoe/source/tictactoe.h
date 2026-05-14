#ifndef TICTACTOE_H
#define TICTACTOE_H

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>
#include <ctype.h>

#ifdef _WIN32
#include <conio.h>
#include <windows.h>
#else
#include <unistd.h>
#endif


// Cores ANSI usadas para melhorar a leitura no terminal
#define COLOR_RESET "\033[0m"
#define COLOR_BOLD "\033[1m"
#define COLOR_DIM "\033[2m"
#define COLOR_GREY "\033[90m"
#define COLOR_WHITE "\033[97m"
#define COLOR_GREEN "\033[38;5;41m"
#define COLOR_YELLOW "\033[38;5;227m"
#define COLOR_ORANGE "\033[38;5;208m"
#define COLOR_BLUE "\033[38;5;39m"
#define COLOR_CYAN "\033[38;5;51m"
#define COLOR_MAGENTA "\033[38;5;213m"
#define COLOR_PURPLE "\033[38;5;141m"

// Cores semanticas usadas no jogo
#define COLOR_PLAYER_X COLOR_MAGENTA
#define COLOR_PLAYER_O COLOR_BLUE
#define COLOR_WIN COLOR_GREEN
#define COLOR_LOSS COLOR_ORANGE
#define COLOR_DRAW COLOR_YELLOW
#define COLOR_WARNING COLOR_YELLOW
#define COLOR_ROW COLOR_WHITE
#define COLOR_COLUMN COLOR_CYAN
#define COLOR_COORD COLOR_WHITE
#define COLOR_BOARD COLOR_GREY
#define COLOR_TITLE COLOR_PURPLE

// Tamanho maximo permitido para o tabuleiro
#define MAX_SIZE 9

// Tamanho maximo dos nomes
#define NAME_SIZE 50

// Numero maximo de jogadas possiveis
#define MAX_MOVES (MAX_SIZE * MAX_SIZE)

// Numero maximo de partidas no torneio de dupla eliminacao
#define MAX_TOURNAMENT_MATCHES 15

// Numero maximo de empates seguidos antes de sortear vencedor no torneio
#define MAX_TOURNAMENT_DRAW_REPEATS 3

// Numero maximo de jogadores guardados no ranking
#define MAX_RANKING_PLAYERS 100

// Nome do ficheiro do ranking geral
#define RANKING_FILE "ranking.txt"

// Valor usado para voltar ao menu principal
#define RETURN_TO_MENU -1

// Comandos especiais durante uma partida
#define MOVE_SAVE -2
#define MOVE_UNDO -3
#define MOVE_REPLAY -4
#define MOVE_HELP -5

// Nome do ficheiro usado para guardar uma partida
#define SAVE_GAME_FILE "saved_game.txt"

// Dificuldades do computador
#define DIFFICULTY_EASY 0
#define DIFFICULTY_MEDIUM 1
#define DIFFICULTY_HARD 2

// Ativa ou desativa mensagens de debug do empate inevitavel
#define DEBUG_FORCED_DRAW 0

// Estrutura simples para o ranking
struct RankingEntry
{
    char name[NAME_SIZE];
    int wins;
};

// Variaveis globais partilhadas pelos ficheiros do projeto
extern int current_win_length;
extern int clear_screen_enabled;
extern int automatic_show_board;
extern int automatic_delay_ms;
extern char tournament_player1[MAX_TOURNAMENT_MATCHES][NAME_SIZE];
extern char tournament_player2[MAX_TOURNAMENT_MATCHES][NAME_SIZE];
extern char tournament_winner[MAX_TOURNAMENT_MATCHES][NAME_SIZE];
extern char tournament_loser[MAX_TOURNAMENT_MATCHES][NAME_SIZE];
extern int tournament_played[MAX_TOURNAMENT_MATCHES];


const char *get_symbol_color(char symbol);
void print_symbol_colored(char symbol);
void print_colored_symbol(char symbol);
void print_success(const char text[]);
void print_warning(const char text[]);
void print_error(const char text[]);
void print_title(const char text[]);
void print_player_prompt(const char label[], char symbol);
void print_return_to_menu_option(void);
void show_menu(void);
void show_rules(void);
void show_game_commands(void);
int choose_size(void);
int choose_victory_length(int size);
int choose_custom_victory_length(int size);
int choose_difficulty(char label[]);
int choose_computer_tournament_mode(void);
int configure_automatic_options(void);
int choose_series_length(void);
int choose_series_mode(void);
int read_name(char name[NAME_SIZE]);
void clear_buffer(void);
void remove_newline(char text[]);
int is_exit_command(const char text[]);
void exit_game_now(void);
int read_int_or_exit(char prompt[], int *value);
int read_char_or_exit(char prompt[], char *value);
int read_move_value_or_command(char prompt[], int *value);
int exit_key_pressed(void);
void check_exit_key(void);
void maybe_clear_screen(void);
void toggle_clear_screen(void);
void wait_ms(int milliseconds);
void pause_if_automatic(int automatic_game);
void init_board(char board[MAX_SIZE][MAX_SIZE], int size);
void print_board(char board[MAX_SIZE][MAX_SIZE], int size);
int get_move(int *row, int *col, int size);
int is_center_position(int size, int row, int col);
int is_forbidden_first_move(int move_count, int size, int row, int col);
int check_segment_winner(char board[MAX_SIZE][MAX_SIZE], int start_row, int start_col, int dir_row, int dir_col);
int check_winner(char board[MAX_SIZE][MAX_SIZE], int size);
int is_draw(char board[MAX_SIZE][MAX_SIZE], int size);
int segment_can_still_win(char board[MAX_SIZE][MAX_SIZE], int start_row, int start_col, int dir_row, int dir_col, char symbol);
int can_still_win(char board[MAX_SIZE][MAX_SIZE], int size, char symbol);
int is_forced_draw(char board[MAX_SIZE][MAX_SIZE], int size);
void debug_forced_draw(char board[MAX_SIZE][MAX_SIZE], int size);
void auto_fill_draw(char board[MAX_SIZE][MAX_SIZE], int size);
void run_automatic_tests(void);
void play_player_vs_player(void);
void play_vs_computer(void);
void play_computer_vs_computer(void);
void play_tournament(void);
void play_computer_tournament(void);
void play_double_elimination_tournament(void);
void play_computer_double_elimination_tournament(void);
void play_best_of_series(void);
int play_single_game(char player1[], char player2[], int player1_computer, int player2_computer, int difficulty1, int difficulty2, int size, int show_score);
int play_game_loop(char board[MAX_SIZE][MAX_SIZE], int move_rows[MAX_MOVES], int move_cols[MAX_MOVES], char move_symbols[MAX_MOVES], int *move_count_ptr, int *current_player_ptr, char player1[], char player2[], int player1_computer, int player2_computer, int difficulty1, int difficulty2, int size, int show_score);
int play_until_winner_generic(char player1[], char player2[], int player1_computer, int player2_computer, int difficulty1, int difficulty2, int size);
void update_score(int winner, char player1[], char player2[], int reset);
int play_again(void);
void print_history(int move_rows[], int move_cols[], char move_symbols[], int move_count, char player1[], char player2[]);
void show_replay(int move_rows[], int move_cols[], char move_symbols[], int move_count, int size, char player1[], char player2[]);
int ask_replay(void);
int save_game_to_file(char filename[], char board[MAX_SIZE][MAX_SIZE], int size, int current_player, int move_rows[], int move_cols[], char move_symbols[], int move_count, char player1[], char player2[], int player1_computer, int player2_computer, int difficulty1, int difficulty2);
int load_game_from_file(char filename[], char board[MAX_SIZE][MAX_SIZE], int *size, int *current_player, int move_rows[], int move_cols[], char move_symbols[], int *move_count, char player1[], char player2[], int *player1_computer, int *player2_computer, int *difficulty1, int *difficulty2);
void play_loaded_game(void);
void print_game_result_summary(int result, char player1[], char player2[], int size, int move_count);
void print_series_summary(char player1[], char player2[], int wins1, int wins2, int draws, int series_length);
void computer_move(char board[MAX_SIZE][MAX_SIZE], int size, char computer_symbol, char opponent_symbol, int difficulty, int move_count, int *row, int *col);
void computer_random_move(char board[MAX_SIZE][MAX_SIZE], int size, int *row, int *col);
void computer_random_allowed_move(char board[MAX_SIZE][MAX_SIZE], int size, int *row, int *col, int avoid_center);
void computer_medium_move(char board[MAX_SIZE][MAX_SIZE], int size, char computer_symbol, char opponent_symbol, int move_count, int *row, int *col);
void computer_hard_move(char board[MAX_SIZE][MAX_SIZE], int size, char computer_symbol, char opponent_symbol, int move_count, int *row, int *col);
int check_winner_for_symbol(char board[MAX_SIZE][MAX_SIZE], int size, char symbol);
int find_minimax_move(char board[MAX_SIZE][MAX_SIZE], int size, char computer_symbol, char opponent_symbol, int move_count, int *row, int *col);
int minimax_score(char board[MAX_SIZE][MAX_SIZE], int size, char turn_symbol, char computer_symbol, char opponent_symbol, int move_count, int depth);
int find_winning_move(char board[MAX_SIZE][MAX_SIZE], int size, char symbol, int *row, int *col);
int evaluate_board_for_symbol(char board[MAX_SIZE][MAX_SIZE], int size, char symbol);
int evaluate_segment_for_symbol(char board[MAX_SIZE][MAX_SIZE], int start_row, int start_col, int dir_row, int dir_col, char symbol);
int power_score(int count);
int play_match_8(char players[8][NAME_SIZE], int difficulties[8], int player1_index, int player2_index, int size, int match_number, int *loser_index, int automatic);
void clear_tournament_results(void);
void save_tournament_result(int match_number, char player1[], char player2[], char winner[], char loser[]);
void print_tournament_summary(char champion[]);
void save_tournament_summary_to_file(char filename[], char champion[]);
void print_tournament4_summary(char title[], char match_names[3][NAME_SIZE], char match_player1[3][NAME_SIZE], char match_player2[3][NAME_SIZE], char match_winner[3][NAME_SIZE], char match_loser[3][NAME_SIZE], int match_count, char champion[]);
void save_tournament4_summary_to_file(char filename[], char title[], char match_names[3][NAME_SIZE], char match_player1[3][NAME_SIZE], char match_player2[3][NAME_SIZE], char match_winner[3][NAME_SIZE], char match_loser[3][NAME_SIZE], int match_count, char champion[]);
void print_computer_stats(char player1[], char player2[], int total_games, int wins1, int wins2, int draws);
void save_computer_stats_to_file(char filename[], char player1[], char player2[], int total_games, int wins1, int wins2, int draws);
void create_timestamped_filename(char base_name[], char extension[], char output[], size_t output_size);
void update_ranking(char winner_name[]);
int load_ranking(struct RankingEntry ranking[], int max_entries);
void save_ranking(struct RankingEntry ranking[], int count);
void print_ranking(void);

#endif
