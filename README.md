README - Simulador de Gerenciamento de Servidores e Apps
O que é este projeto?
Este projeto foi criado para simular adicionando apps em servidores, de maneira simples e funcional. O objetivo é gerenciar um cluster de servidores, adicionar novos servidores, alocar apps nesses servidores e lidar com a remoção de servidores e redistribuição dos apps.

Funcionalidades:

Adicionar Servidor: Crie um novo servidor em "+ Novo servidor" e veja ele aparecer na tela. Ele vai aparecer um quadradinho cinza escrito "Servidor vazio". Pode ser adicionados até 50 servidores.

Remover Servidor: Remova o servidor vazio mais recente.

Adicionar App: Você pode adicionar um novo app ao servidor, mas só pode ter 2 apps por servidor. Então, sempre que um servidor atingir esse limite, ele não poderá mais adicionar apps até que haja mais espaço.

Remover App: Você pode remover um app, e ele será redistribuído para outro servidor, caso necessário.

Limite de Apps: Cada servidor pode ter no máximo 2 apps rodando ao mesmo tempo. Se todos os servidores já estiverem cheios, o app não será adicionado.

Como Funciona?
Quando você clica em "+" ao lado de um app disponível:
O app será alocado no primeiro servidor que estiver vazio (sem nenhum app).

Se todos os servidores tiverem pelo menos 1 app, o novo app será colocado abaixo do servidor com 1 app.
Se todos os servidores já estiverem com 2 apps, não será possível adicionar o app.

Quando você clica em "-":
Ao destruir um servidor, os apps que estavam alocados nele são redistribuídos para outros servidores, respeitando a lógica de alocação (primeiro servidor vazio, depois servidor com 1 app).
Se não houver capacidade nos outros servidores para alocar os apps, eles serão totalmente removidos do sistema.

Como fica a distribuição dos apps?
Imagine que você tem 4 servidores e adiciona 4 apps. Os primeiros 4 apps vão ser alocados, um em cada servidor, no topo, e a parte de baixo deles vão estar vazias, tendo espaço para só mais um app a ser adicionado;
Depois, ao adicionar mais apps, eles irão para os servidores que já têm 1 app, e assim por diante. Os apps serão colocados no primeiro servidor disponível.

Interações:

Novo Servidor: Clica no botão "Novo Servidor" para criar um novo servidor.
Destruir Servidor: Clica no botão "Destruir" para remover o último servidor criado.
Adicionar App: Clica no botão "+" de um app para alocá-lo em um servidor.
Remover App: Clica no botão "−" de um app para removê-lo e/ou redistribuí-lo se necessário.

Tecnologias Utilizadas:

Vue.js: Para criar a interface interativa
Pinia: Arriquei a usar o Pinia para gerenciar o estado do sistema 
CSS: Estilização feita de maneira simples, com CSS normal


