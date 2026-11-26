# Plano de alojamento com custo adicional de 0 € — Torres Almeida Digital
_Revisto em 26 de novembro de 2026._

## Objetivo e definição de custo
Publicar os projetos existentes e futuros sem **novas mensalidades de alojamento**. O registo e a renovação de `torresalmeida.com` e o eventual Google Workspace já existente **não são gratuitos** e estão fora deste orçamento de alojamento. Não ativar planos pagos nem mudar DNS sem verificação.

## Arquitetura recomendada

| Projeto | Tecnologia | Publicação atual | Destino sem novos custos |
| --- | --- | --- | --- |
| Portefólio | HTML/CSS/JS | [GitHub Pages](https://danielatorresalmeida.github.io/Portfolio-website/home/) | GitHub Pages; no futuro `www.torresalmeida.com` e domínio de raiz |
| OPUS (apresentação) | HTML/CSS/JS | [Página de apresentação](https://danielatorresalmeida.github.io/Portfolio-website/projects/opus/) | Continua em GitHub Pages |
| OPUS (aplicação) | PHP 8.3/Laravel 13/MySQL | Código [GitHub](https://github.com/danielatorresalmeida/opus-laravel); sem demo interativa pública | Oracle Cloud Always Free, **apenas se houver capacidade e conta gratuita válida** |
| Gestor de Tarefas Inteligente | HTML/CSS/JS, localStorage, Open-Meteo | [GitHub Pages](https://danielatorresalmeida.github.io/gestor-tarefas-inteligente/) | GitHub Pages; opcional `tasks.torresalmeida.com` |
| To-Do List App | React/TypeScript + Firebase | [GitHub Pages](https://danielatorresalmeida.github.io/To-Do-List-App/) | Preservar GitHub Pages; verificar quotas de Firebase, OAuth e autorização do domínio antes de mudar a URL |
| DevFlow Hub | Java/Spring Boot + React + PostgreSQL | Código e capturas [GitHub](https://github.com/danielatorresalmeida/DevFlow_Hub) | Futuro servidor gratuito, somente se houver recursos e configuração segura |
| Outros bots e APIs | Vários | Verificar individualmente | Não migrar serviços que já estejam operacionais sem benefício |

O GitHub Pages executa páginas estáticas e JavaScript no browser, **não executa PHP, Java/Spring Boot, processos de backend ou bancos de dados**. Não criar falsas demonstrações funcionais.

## Candidato para aplicações dinâmicas: Oracle Cloud Always Free

A Oracle documenta, em 26/11/2026:
- até **2 OCPU Ampere A1 ARM64**, **12 GB RAM** no total (1 ou 2 VMs);
- até **200 GB** de Block Volume Always Free, incluindo volumes de arranque, e até **5 backups** de volumes;
- serviços Always Free nas condições da *home region*, sujeitos a disponibilidade.

Fontes:
- <https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm>
- <https://www.oracle.com/cloud/free/>
- <https://coolify.io/docs/start-with-self-hosted>

**Restrições e riscos:** a inscrição costuma exigir cartão de crédito/débito e telefone; a Oracle pode fazer uma retenção temporária de verificação; as instâncias gratuitas podem estar esgotadas ou ser reclamadas por inatividade; o período promocional de 30 dias **não é o mesmo que Always Free**. Manter apenas elegibilidade Always Free. **Não converter a conta para Pay As You Go sem aprovação explícita.** Um orçamento/alerta não substitui limites de consumo.

### Configuração pretendida, se a conta e VM forem aprovadas

- Uma VM Ubuntu ARM64 com `VM.Standard.A1.Flex`, no máximo **2 OCPU / 12 GB**, na home region, imagem e volumes marcados *Always Free Eligible*.
- Docker Engine + Coolify autoalojado (verificar recursos e arquitetura; Coolify requer pelo menos 2 CPU, 2 GB RAM, 10 GB de disco).
- Separar containers OPUS, MariaDB/MySQL, DevFlow, PostgreSQL. Não assumir que todos os serviços podem ficar ligados em simultâneo.
- Restringir SSH a chave pública, usar firewall de sistema e Oracle VCN, HTTPS e atualizações de segurança. Não expor portas das bases de dados.
- Dados reais, palavras-passe, segredos e imagens privadas fora de GitHub. OPUS começar como **demo só de leitura**, com base de dados inicial de seeders.
- Usar volumes persistentes para bases de dados e `storage/app/public`; manter backups testados e separados do mesmo volume. Controlar espaço e quotas.
- Fazer testes por fases. Não adicionar subdomínios sem uma aplicação funcional e HTTPS.

### Se a Oracle não permitir uma VM gratuita

**Não contratar alojamento.** Manter OPUS e DevFlow como estudos de caso com código-fonte, capturas reais e vídeo de demonstração. Alojamento local temporário só quando necessário e sem expor redes domésticas ou dados pessoais. Outras opções gratuitas com discos efémeros não são substitutas seguras de MySQL persistente.

## Plano para o domínio próprio sem comprometer o email

**Nada disto altera DNS automaticamente.** Confirmar primeiro o fornecedor DNS ativo, a configuração atual da zona e os serviços que utilizam o domínio.

1. Guardar cópia dos registos atuais `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `SPF`, `DKIM`, `DMARC` e eventuais subdomínios.
2. Na configuração **Settings → Pages → Custom domain** do repositório do portefólio, preparar `www.torresalmeida.com` como domínio principal **apenas no momento de execução**, juntamente com os registos DNS recomendados pelo GitHub à data.
3. Tipicamente o `www` aponta por `CNAME` para `danielatorresalmeida.github.io`. O domínio raiz requer os registos apropriados (A/AAAA/ALIAS/ANAME conforme a documentação atual). Ativar **Enforce HTTPS** após emissão do certificado.
4. Validar a abertura de `https://www.torresalmeida.com` e `https://torresalmeida.com`; testar CSS, JS, CV, imagens, ficheiros, URLs relativas e os links dos estudos de caso.
5. Só depois substituir URLs antigas em metadados SEO, Open Graph, README, CVs e perfis.
6. Para `tasks.torresalmeida.com`, ligar o domínio nas Settings → Pages do repositório do Gestor de Tarefas e criar o CNAME correspondente.
7. **Não alterar os registos de email** MX/SPF/DKIM/DMARC para Google Workspace ou outros serviços.
8. `opus.torresalmeida.com` só deve ser criado quando a aplicação dinâmica estiver publicada e validada.

Documentação GitHub:
- <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>
- <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages>

## Sequência de trabalho sem despesas

- [x] Identificar os repositórios e os sites estáticos já publicados.
- [x] Conservar o portefólio, o Gestor de Tarefas e o To-Do List nas URLs gratuitas atuais.
- [x] Criar a página bilingue de apresentação do OPUS.
- [ ] Rever a zona DNS real e guardar uma cópia da configuração.
- [ ] Preparar e testar a alteração do domínio principal para GitHub Pages.
- [ ] Adicionar capturas reais do OPUS ao portefólio principal.
- [ ] Verificar elegibilidade/capacidade Oracle Always Free **sem criar serviços pagos**.
- [ ] Preparar e testar uma implantação ARM64 do OPUS e base de dados de demonstração.
- [ ] Confirmar backup + restauração antes de qualquer uso persistente.
- [ ] Migrar outros backends apenas depois de medir utilização de CPU, RAM e disco.

## Condição de avanço

A criação de uma conta Oracle implica verificação pessoal e potencial autorização temporária no cartão; a escolha da região é duradoura e a capacidade gratuita não é garantida. A utilizadora decide se aceita esse processo. Nenhum plano ou recurso faturável pode ser criado sem aprovação explícita.
