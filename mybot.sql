create table users(
  id serial not null Primary key,
  user_id bigInt not null,
  first_name text,
  user_name text,
  q1 varchar(15),
  q2 varchar(15),
  q3 varchar(15),
  q4 varchar(15),
  q5 varchar(15),
  q6 varchar(15),
  q7 varchar(15),
  q8 varchar(15),
  q9 varchar(15),
  q10 varchar(15),
  q11 text
);
ALTER TABLE users
ADD CONSTRAINT unique_user_id UNIQUE (user_id);

insert into
  users(user_id, q9)
values
  (6, 'question9_1'),
  (7, 'question9_2'),
  (8, 'question9_3'),
  (9, 'question9_4'),
  (10, 'question9_5'),
  (11, 'question9_6'),
  (12, 'question9_1'),
  (13, 'question9_5'),
  (14, 'question9_6'),
  (15, 'question9_2');

create table admins(
  id serial not null primary key,
  admin_user_name varchar(50) not null unique,
  admin_password text not null
);

insert into
  admins(admin_user_name, admin_password)
values
  ('elbek', 'movlonov');

insert into
  admins(admin_user_name, admin_password)
values
  ('elbek', 'movlonov');

create table questions(
  question_id serial Primary key,
  question_description text not null
);

insert into
  questions(question_description)
values
  (
    '3.	Ijtimoiy tarmoqlarda ro''yxatdan o''tishingizda kim yoki nima sabab bo''lgan?'
  ),
  (
    '4.  Ijtimoiy tarmoqlardagi obunachilaringiz soni qancha?'
  ),
  (
    '5.  Bir kunda qancha vaqtingizni ijtimoiy tarmoqlarda o''tkazasiz?'
  ),
  (
    '6.  Ijtimoiy tarmoqlar sizni nima bilan o''ziga jalb etadi?'
  ),
  (
    '7.  Ijtimoiy tarmoqlarda qanaqa ma''lumotlarni joylashtirishingiz mumkin?'
  ),
  (
    '8.  O''zingizni ijtimoiy tarmoqlarga qaram deb o''ylaysizmi?'
  ),
  (
    '9.  Asosan qaysi ijtimoiy tarmoqlardan foydalanasiz?'
  ),
  (
    '10. Agar Milliy ijtimoiy tarmoqlar yoki messengerlar mavjud bo''lganida ulardan foydalanardingizmi?'
  );

insert into
  questions(question_description)
values
  (
    '11. Qanaqa milliy ijtimoiy tarmoqlar yoki messenjerlar bo'' lishini xoxlaysiz ? Takliflaringizni yuboring '
  );

insert into
  users(user_id, q2)
values
(38, 'question2_1'),
(39, 'question2_2'),
(40, 'question2_3'),
(41, 'question2_2'),
(42, 'question2_4'),
(43, 'question2_4'),
(44, 'question2_4');

select
  question_description
from
  questions
where
  question_id = 1;

create table answers(
  answer_id serial Primary key,
  answer text,
  answer_question int references questions(question_id)
);

create table images(
  image_id serial not null Primary key,
  image_name varchar(20) null,
  image_path text not null,
  image bigInt not null references users(user_id) on delete cascade
);


