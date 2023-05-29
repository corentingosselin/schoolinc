create table `class_entity` (
    `id` varchar(255) not null,
    `professor_id` varchar(255) null,
    `created_at` datetime not null,
    `updated_at` datetime not null,
    primary key (`id`)
) default character set utf8mb4 engine = InnoDB;

create table `class_student_entity` (
    `id` varchar(255) not null,
    `class_id` varchar(255) not null,
    `student_id` varchar(255) not null,
    `created_at` datetime not null,
    `updated_at` datetime not null,
    primary key (`id`)
) default character set utf8mb4 engine = InnoDB;

alter table
    `class_student_entity`
add
    index `class_student_entity_class_id_index`(`class_id`);

create table `grade_entity` (
    `id` varchar(255) not null,
    `created_at` datetime not null,
    `updated_at` datetime not null,
    `grade` int not null,
    `class_id` varchar(255) not null,
    `student_id` varchar(255) not null,
    primary key (`id`)
) default character set utf8mb4 engine = InnoDB;

alter table
    `grade_entity`
add
    index `grade_entity_class_id_index`(`class_id`);

alter table
    `grade_entity`
add
    index `grade_entity_student_id_index`(`student_id`);

alter table
    `class_student_entity`
add
    constraint `class_student_entity_class_id_foreign` foreign key (`class_id`) references `class_entity` (`id`) on update cascade;

alter table
    `grade_entity`
add
    constraint `grade_entity_class_id_foreign` foreign key (`class_id`) references `class_entity` (`id`) on update cascade;

alter table
    `grade_entity`
add
    constraint `grade_entity_student_id_foreign` foreign key (`student_id`) references `class_student_entity` (`id`) on update cascade;