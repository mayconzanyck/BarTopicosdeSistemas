# 🍺 BarAPI

Neste trabalho foi realizado o gerenciamento de um bar, incluindo o controle de mesas, cardápio de bebidas, cadastro de clientes e gerenciamento de pedidos.

##

### Descrição
O BarAPI é uma aplicação backend desenvolvida em ASP.NET Core com Entity FrameWork Core e SQLit. Ela facilita a administração de operações básicas de um bar como:
- Gerenciamento de mesas (incluindo remoção e liberação);
- Cadastro de clientes e cálculo automático de idade;
- Registro de bebidas alcoólicas e não alcoólicas;
- Controle de pedidos com validação de idade para consumo de álcool.

  ##

  ### Funcionalidades
  #### Cardápio
  - Listar Bebidas (todas, alcoólicas ou não alcóolicas);
  - Cadastras novas bebidas no cardápio.

  #### Mesas
  - Listar mesas cadastradas;
  - Cadastrar uma nova mesa;
  - Liberar uma mesa ocupada;
  - Remover uma mesa do sistema.

  #### Clientes
  - Listar clientes cadastrados;
  - Cadastrar novos clientes, com aviso se forem menor de idade (restrição de pedido de bebidas alcoólicas).

  #### Pedidos
  - Registrar novos pedidos;
  - Listar todos os pedidos, incluindo informações do cliente e bebida;
  - Validação de idade automática para pedidos de bebidas alcoólicas.

  ##

  ### Organização das entidades
  - **`Bebida`**: Representa uma bebida no cardápio (alcoólica ou não alcoólica);
  - **`Cliente`**: Representa um cliente do bar, com cálculo automático de idade;
  - **`Mesa`**: Representa uma mesa disponível para clientes;
  - **`Pedido`**: Representa um pedido realizado, relacionando cliente e bebida.


