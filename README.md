GymPass App

## RFs (Requisitos funcionais)

- [x] deve ser possível se cadastrar;
- [x] deve ser possível se autenticar;
- [ ] deve ser possível obter o perfil de um usuário logado;
- [ ] deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] deve ser possível o usuário obter seu histórico de check-ins;
- [ ] deve ser possível o usuário buscar academias próximas;
- [ ] deve ser possível o usuário buscar academias por nome;
- [ ] deve ser possível o usuário realizar check-in em uma academia;
- [ ] deve ser possível validar o check-in de um usuário;
- [ ] deve ser possível cadastrar uma academia;

## RNs (Regra de negócio)

- [x] o usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] o usuário não deve pode fazer 2 check-ins no mesmo dia;
- [ ] o usuário não pode fazer check-ins se não estiver perto (100m) da academia;
- [ ] o check-in só pode ser validado até 20 minutos após criado;
- [ ] o check-in só pode ser validado por administradores;
- [ ] a academia só pode ser cadastrada por administradores;


## RNFs (Requisitos não funcionais)

- [x] a senha do usuário precisa estar criptografada;
- [x] os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] o usuário deve ser identificado por um JWT (JSON Web Token);