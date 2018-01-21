
# --- !Ups
create table person (
  id                            integer not null,
  name                          varchar(255),
  address                       varchar(255),
  age                           integer not null,
  constraint pk_person primary key (id)
);
create sequence global_seq start with 100025 increment by 1;

INSERT INTO person (id, name, address, age)
VALUES  (100000, 'Person0', 'Санкт-Петербург', 24),
  (100001, 'Person1', 'Москва', 25),
  (100002, 'Person2', 'Уфа', 35),
  (100003, 'Person3', 'Калиниград', 32),
  (100004, 'Person4', 'Нижний Новгород', 20),
  (100005, 'Person5', 'Астрахань', 21),
  (100006, 'Person6', 'Волгоград', 25),
  (100007, 'Person7', 'Великий Новгород', 23),
  (100008, 'Person8', 'Владивосток', 24),
  (100009, 'Person9', 'Самара', 26),
  (100010, 'Person10', 'Казань', 45),
  (100011, 'Person11', 'Екатеринбург', 50),
  (100012, 'Person12', 'Тюмень', 53);

# --- !Downs
drop table if exists person cascade;
drop sequence if exists global_seq;


