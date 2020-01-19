use crawler;

create table website
(
  id int(11) auto_increment primary key not null,
  name varchar(45),
  update_time datetime,
  type varchar(45)
);

create table articles
(
  id int auto_increment primary key not null,
  parent_id int,
  title longtext,
  content longtext,
  url longtext,
  img longtext,
  author mediumtext,
  update_time datetime,
  create_time datetime
);